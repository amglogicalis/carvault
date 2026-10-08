/**
 * Carvault Image Auditor v2.0 - Verificador Híbrido Inteligente con Caché Persistente
 * 
 * Evalúa las 3 preguntas clave por cada coche:
 * 1. ¿El ángulo es frontal (se ve el frontal del coche)?
 * 2. ¿Se ve bien con la iluminación (luz de día/estudio)?
 * 3. ¿La imagen coincide con el modelo y generación? (con Gemini Vision + Fallback resiliente)
 * 
 * Uso:
 *   npx tsx pipeline/audit-images.ts --brand=cupra
 *   npx tsx pipeline/audit-images.ts --brand=bmw --limit=10
 *   npx tsx pipeline/audit-images.ts --brand=cupra --force
 */

import fs from 'fs';
import path from 'path';

interface ImageAuditCacheEntry {
  url: string;
  brand: string;
  modelId: string;
  modelLabel: string;
  verifiedAt: string;
  isFrontView: boolean;
  angle: string;
  lighting: string;
  isLightingGood: boolean;
  matchesModel: boolean | 'dudoso';
  status: 'PASS' | 'FAIL' | 'REVIEW';
  reason: string;
}

interface CacheFile {
  version: number;
  lastUpdated: string;
  entries: Record<string, ImageAuditCacheEntry>;
}

// Cargar variables de entorno desde .env si existe
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = (match[2] || '').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const CACHE_DIR = path.resolve(process.cwd(), 'pipeline/.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'image_audit_cache.json');
const REPORTS_DIR = path.resolve(process.cwd(), 'data/_reports');

// Asegurar directorios
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

function loadCache(): CacheFile {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    } catch {
      // Ignorar error de lectura
    }
  }
  return { version: 1, lastUpdated: new Date().toISOString(), entries: {} };
}

function saveCache(cache: CacheFile) {
  cache.lastUpdated = new Date().toISOString();
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
}

// Descargar imagen como Buffer
async function downloadImageBuffer(url: string, timeoutMs = 15000): Promise<{ buffer: Buffer; contentType: string } | null> {
  await new Promise(r => setTimeout(r, 400));
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)'
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const arrayBuf = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    return { buffer: Buffer.from(arrayBuf), contentType };
  } catch {
    return null;
  }
}

// Llamada a Gemini con reintentos y fallback elegante
async function evaluateWithGemini(
  imageBuffer: Buffer,
  mimeType: string,
  modelLabel: string,
  chassis: string,
  apiKey: string
): Promise<{
  isFront: boolean;
  angle: string;
  lighting: string;
  isLightingGood: boolean;
  matchesModel: boolean | 'dudoso';
  reason: string;
}> {
  if (!apiKey) {
    return {
      isFront: true,
      angle: 'desconocido',
      lighting: 'desconocido',
      isLightingGood: true,
      matchesModel: 'dudoso',
      reason: 'No hay GEMINI_API_KEY configurada. Marcado como dudoso para revisión del agente.'
    };
  }

  // Modelos ordenados por preferencia
  const modelsToTry = ['gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  const b64 = imageBuffer.toString('base64');

  const isPreFacelift = /pre-facelift|pre-lci/i.test(modelLabel);
  const isFacelift = !isPreFacelift && /facelift|lci|restyling/i.test(modelLabel);
  let restylingClause = '';
  if (isFacelift) {
    restylingClause = '\n⚠️ REGLA CRÍTICA DE RESTYLING: El modelo es una versión FACELIFT / RESTYLING (fase actualizada). Comprueba faros, firma LED y paragolpes. Si la foto corresponde a la versión pre-facelift previa, debes responder estrictamente "matches_target_model": false.';
  } else if (isPreFacelift) {
    restylingClause = '\n⚠️ REGLA CRÍTICA DE RESTYLING: El modelo es una versión PRE-FACELIFT (diseño original inicial). Si la foto muestra los faros o parachoques del restyling posterior, debes responder estrictamente "matches_target_model": false.';
  }

  const prompt = `Actúa como auditor automotriz experto y analiza esta foto de vehículo.
Modelo esperado a verificar: "${modelLabel}" (Chasis/Generación: ${chassis || 'No especificado'}).${restylingClause}

Responde OBLIGATORIAMENTE en formato JSON con estas claves exactas:
{
  "is_front_view": true o false (true si se ve el frontal directo o ángulo 3/4 frontal; false si es trasera, lateral puro o interior),
  "angle": "frontal" | "frontal_tres_cuartos" | "lateral" | "trasera" | "interior",
  "lighting": "dia" | "noche" | "estudio",
  "is_lighting_good": true o false (false solo si está a oscuras, de noche cerrada o completamente ilegible),
  "matches_target_model": true o false,
  "reason": "Explicación breve en español de máximo 1 frase"
}`;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inlineData: { mimeType: mimeType.includes('png') ? 'image/png' : 'image/jpeg', data: b64 } }
              ]
            }
          ]
        })
      });

      if (!res.ok) {
        continue; // Intentar siguiente modelo si hay 503 o 429
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Extraer bloque JSON
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          isFront: Boolean(parsed.is_front_view),
          angle: parsed.angle || 'frontal',
          lighting: parsed.lighting || 'dia',
          isLightingGood: parsed.is_lighting_good !== false && parsed.lighting !== 'noche',
          matchesModel: Boolean(parsed.matches_target_model),
          reason: parsed.reason || 'Verificación completada por IA.'
        };
      }
    } catch {
      // Continuar al siguiente modelo
    }
  }

  // Fallback si todos los modelos de Gemini fallan
  return {
    isFront: true,
    angle: 'frontal_estimado',
    lighting: 'dia_estimado',
    isLightingGood: true,
    matchesModel: 'dudoso',
    reason: 'Gemini temporalmente no disponible (503/cuota). Fallback activado: pendiente de confirmación del agente.'
  };
}

async function main() {
  const args = process.argv.slice(2);
  const brandArg = args.find(a => a.startsWith('--brand='))?.split('=')[1] || 'cupra';
  const limitArg = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '0', 10);
  const idsArg = args.find(a => a.startsWith('--ids='))?.split('=')[1]?.split(',').map(s => s.trim()) || [];
  const force = args.includes('--force');

  console.log(`\n======================================================`);
  console.log(`🔍 CARVAULT AUDITOR DE IMÁGENES v2.0`);
  console.log(`   Marca: ${brandArg.toUpperCase()} | Modo Force: ${force}`);
  console.log(`======================================================\n`);

  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    console.log(`⚠️  Aviso: No se detectó GEMINI_API_KEY. Se activará el fallback automático (dudoso) para la identidad.`);
  } else {
    console.log(`✅ API Key detectada y configurada.`);
  }

  const catalogPath = path.resolve(process.cwd(), `data/${brandArg.toLowerCase()}/catalog-clean-front.json`);
  if (!fs.existsSync(catalogPath)) {
    console.error(`❌ No se encontró el catálogo en: ${catalogPath}`);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  let generations = catalog.generations || [];
  if (idsArg.length > 0) {
    generations = generations.filter((g: any) => idsArg.includes(g.id));
  }
  if (limitArg > 0) generations = generations.slice(0, limitArg);

  console.log(`📋 Total modelos a auditar: ${generations.length}\n`);

  const cache = loadCache();
  const results: Array<{
    id: string;
    label: string;
    url: string | null;
    isFront: boolean;
    angle: string;
    isLightingGood: boolean;
    lighting: string;
    matchesModel: boolean | 'dudoso';
    status: 'PASS' | 'FAIL' | 'REVIEW';
    reason: string;
    fromCache: boolean;
  }> = [];

  for (let i = 0; i < generations.length; i++) {
    const g = generations[i];
    const imgUrl = g.frontImage?.url || null;
    const chassisCode = (g.chassis || []).map((c: any) => c.code).filter(Boolean).join(', ');

    process.stdout.write(`[${i + 1}/${generations.length}] ${g.label.padEnd(42)} `);

    // 1. Error: Sin imagen
    if (!imgUrl) {
      console.log(`❌ ERROR: Sin imagen asignada`);
      results.push({
        id: g.id,
        label: g.label,
        url: null,
        isFront: false,
        angle: 'ninguno',
        isLightingGood: false,
        lighting: 'ninguna',
        matchesModel: false,
        status: 'FAIL',
        reason: 'El modelo no tiene ninguna imagen asignada en el catálogo.',
        fromCache: false
      });
      continue;
    }

    // 2. Caché persistente
    if (!force && cache.entries[imgUrl] && cache.entries[imgUrl].status === 'PASS') {
      const cached = cache.entries[imgUrl];
      console.log(`🟢 PASS (en caché)`);
      results.push({
        id: g.id,
        label: g.label,
        url: imgUrl,
        isFront: cached.isFrontView,
        angle: cached.angle,
        isLightingGood: cached.isLightingGood,
        lighting: cached.lighting,
        matchesModel: cached.matchesModel,
        status: cached.status,
        reason: cached.reason + ' (Verificado previamente)',
        fromCache: true
      });
      continue;
    }

    // 3. Comprobación de red y descarga
    const downloaded = await downloadImageBuffer(imgUrl);
    if (!downloaded) {
      console.log(`❌ ERROR: URL caída o inaccesible (HTTP 404/Timeout)`);
      results.push({
        id: g.id,
        label: g.label,
        url: imgUrl,
        isFront: false,
        angle: 'error_red',
        isLightingGood: false,
        lighting: 'error_red',
        matchesModel: false,
        status: 'FAIL',
        reason: 'La imagen no pudo descargarse o devolvió un código de error HTTP.',
        fromCache: false
      });
      continue;
    }

    // 4. Inferencia con Gemini (con rate limiter suave)
    await new Promise(r => setTimeout(r, 600)); // Rate limit respetuoso
    const evalResult = await evaluateWithGemini(
      downloaded.buffer,
      downloaded.contentType,
      g.label,
      chassisCode,
      apiKey
    );

    let status: 'PASS' | 'FAIL' | 'REVIEW' = 'PASS';
    if (!evalResult.isFront || !evalResult.isLightingGood || evalResult.matchesModel === false) {
      status = 'FAIL';
    } else if (evalResult.matchesModel === 'dudoso') {
      status = 'REVIEW';
    }

    const statusIcon = status === 'PASS' ? '🟢 PASS' : status === 'REVIEW' ? '🟡 DUDOSO' : '🔴 FALLO';
    console.log(`${statusIcon} (${evalResult.angle}, ${evalResult.lighting})`);

    // Guardar en caché si fue PASS o REVIEW
    cache.entries[imgUrl] = {
      url: imgUrl,
      brand: brandArg.toUpperCase(),
      modelId: g.id,
      modelLabel: g.label,
      verifiedAt: new Date().toISOString(),
      isFrontView: evalResult.isFront,
      angle: evalResult.angle,
      lighting: evalResult.lighting,
      isLightingGood: evalResult.isLightingGood,
      matchesModel: evalResult.matchesModel,
      status,
      reason: evalResult.reason
    };

    results.push({
      id: g.id,
      label: g.label,
      url: imgUrl,
      isFront: evalResult.isFront,
      angle: evalResult.angle,
      isLightingGood: evalResult.isLightingGood,
      lighting: evalResult.lighting,
      matchesModel: evalResult.matchesModel,
      status,
      reason: evalResult.reason,
      fromCache: false
    });
  }

  saveCache(cache);

  // 5. Generar Reporte Markdown
  const total = results.length;
  const passCount = results.filter(r => r.status === 'PASS').length;
  const reviewCount = results.filter(r => r.status === 'REVIEW').length;
  const failCount = results.filter(r => r.status === 'FAIL').length;

  const dateStr = new Date().toISOString().split('T')[0];
  const reportPath = path.join(REPORTS_DIR, `audit-${brandArg.toLowerCase()}.md`);

  let md = `# Reporte de Auditoría de Imágenes — ${brandArg.toUpperCase()}\n\n`;
  md += `**Fecha de ejecución:** ${dateStr}  \n`;
  md += `**Total de modelos analizados:** ${total}  \n`;
  md += `- 🟢 **Aprobados (PASS):** ${passCount} (${((passCount / total) * 100).toFixed(1)}%)\n`;
  md += `- 🟡 **Dudosos (Pendientes de agente):** ${reviewCount}\n`;
  md += `- 🔴 **Fallos (Requieren reemplazo):** ${failCount}\n\n`;

  md += `## Tabla Detallada con Semáforo de Verificación\n\n`;
  md += `| Modelo / Coche | Imagen | 1. ¿Frontal? | 2. ¿Buena Luz? | 3. ¿Coincide Modelo? | Estado | Observación |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: | :---: | :--- |\n`;

  for (const r of results) {
    const q1 = r.isFront ? `🟢 Sí (${r.angle})` : `🔴 No (${r.angle})`;
    const q2 = r.isLightingGood ? `🟢 Sí (${r.lighting})` : `🔴 No (${r.lighting})`;
    const q3 = r.matchesModel === true ? `🟢 Sí` : r.matchesModel === 'dudoso' ? `🟡 Dudoso` : `🔴 No`;
    const stBadge = r.status === 'PASS' ? `🟢 **PASS**` : r.status === 'REVIEW' ? `🟡 **REVISAR**` : `🔴 **FALLO**`;
    const imgLink = r.url ? `[Ver foto](${r.url})` : `*Sin imagen*`;

    md += `| **${r.label}** | ${imgLink} | ${q1} | ${q2} | ${q3} | ${stBadge} | ${r.reason} |\n`;
  }

  fs.writeFileSync(reportPath, md, 'utf8');

  console.log(`\n======================================================`);
  console.log(`📊 RESUMEN FINAL:`);
  console.log(`   🟢 Aprobados: ${passCount}/${total}`);
  console.log(`   🟡 Dudosos (Pendientes de agente): ${reviewCount}`);
  console.log(`   🔴 Fallos: ${failCount}`);
  console.log(`📄 Reporte Markdown guardado en: data/_reports/audit-${brandArg.toLowerCase()}.md`);
  console.log(`💾 Caché actualizada en: pipeline/.cache/image_audit_cache.json`);
  console.log(`======================================================\n`);
}

main().catch(console.error);
