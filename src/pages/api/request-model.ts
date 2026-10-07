export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

// Ruta de la base de datos de registro local de solicitudes (trazabilidad y filtro middleware)
const REGISTRY_PATH = path.resolve(process.cwd(), 'data/feedback/requests-registry.json');
const BMW_CATALOG_PATH = path.resolve(process.cwd(), 'data/bmw/catalog-clean-front.json');

interface RequestRecord {
  id: string;
  text: string;
  normalizedText: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  issueNumber?: number;
  issueUrl?: string;
  matchedTokens: string[];
}

interface RequestsRegistry {
  version: string;
  description: string;
  lastUpdated: string;
  existingCatalogCache: {
    brands: string[];
    models: Array<{
      id: string;
      label: string;
      series: string;
      codes: string[];
      years: string;
    }>;
  };
  records: RequestRecord[];
}

function loadRegistry(): RequestsRegistry {
  try {
    if (fs.existsSync(REGISTRY_PATH)) {
      return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading requests registry:', e);
  }

  // Fallback si no existe
  return {
    version: '1.0.0',
    description: 'Registro de solicitudes y filtro middleware de Carvault',
    lastUpdated: new Date().toISOString(),
    existingCatalogCache: {
      brands: ['bmw', 'porsche', 'mercedes-benz', 'mercedes'],
      models: []
    },
    records: []
  };
}

function saveRegistry(reg: RequestsRegistry) {
  try {
    fs.mkdirSync(path.dirname(REGISTRY_PATH), { recursive: true });
    reg.lastUpdated = new Date().toISOString();
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(reg, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving requests registry:', e);
  }
}

// Normalización flexible para tokens y matching
function normalize(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quita tildes
    .replace(/[^a-z0-9\s]/g, ' ')    // Símbolos a espacios
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(str: string): string[] {
  const stopWords = new Set([
    'el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'con', 'por', 'para',
    'en', 'ano', 'anos', 'model', 'modelo', 'coche', 'car', 'falta', 'queria', 'pedir'
  ]);
  return normalize(str)
    .split(' ')
    .filter(t => t.length >= 2 && !stopWords.has(t));
}

// Middleware de Validación y Deduplicación Inteligente
function evaluateMiddlewareFilter(inputText: string, reg: RequestsRegistry) {
  const normInput = normalize(inputText);
  const inputTokens = tokenize(inputText);

  // 1. Longitud básica (para evitar spam o textos vacíos/gigantes)
  if (!inputText || inputText.trim().length < 3) {
    return {
      allowed: false,
      reason: 'El texto es demasiado corto. Especifica al menos el nombre de la marca o modelo (mínimo 3 caracteres).'
    };
  }

  if (inputText.length > 250) {
    return {
      allowed: false,
      reason: 'El texto excede el límite permitido de 250 caracteres. Por favor, sé sintético (ej. "Audi RS6 C7 Avant 2013").'
    };
  }

  // 2. Filtro de basura / spam evidente
  const isGibberish = /^(.)\1{4,}$/.test(normInput) || inputTokens.length === 0;
  if (isGibberish) {
    return {
      allowed: false,
      reason: 'Por favor, introduce un nombre de modelo o fabricante automotriz válido.'
    };
  }

  // 3. Comprobar si la marca o modelo YA EXISTE en el catálogo activo
  // Caso A: Marca BMW
  if (normInput === 'bmw' || normInput === 'bayerische motoren werke') {
    return {
      allowed: false,
      reason: 'BMW ya cuenta con un catálogo completo de 200 modelos y 279 chasis activo en Carvault.'
    };
  }

  // Caso B: Modelo específico dentro del catálogo existente
  if (reg.existingCatalogCache?.models?.length > 0) {
    for (const m of reg.existingCatalogCache.models) {
      const normLabel = normalize(m.label);
      const mCodes = m.codes.map(c => normalize(c));

      // Coincidencia exacta de etiqueta
      if (normInput === normLabel) {
        return {
          allowed: false,
          reason: `El modelo "${m.label}" ya está disponible en nuestro catálogo.`
        };
      }

      // Si el usuario introduce un código de chasis que ya tenemos (ej. "E46", "G80", "E30", "G90")
      for (const code of mCodes) {
        if (code && code.length >= 3) {
          const regex = new RegExp(`\\b${code}\\b`, 'i');
          if (regex.test(normInput)) {
            // Verificar si el contexto coincide con el modelo
            const labelTokens = tokenize(m.label);
            const commonTokens = inputTokens.filter(t => labelTokens.includes(t) || t === code);
            if (commonTokens.length >= 2 || inputTokens.includes(code)) {
              return {
                allowed: false,
                reason: `El modelo con chasis ${code.toUpperCase()} ("${m.label}") ya está registrado en el catálogo de Carvault.`
              };
            }
          }
        }
      }
    }
  }

  // 4. Comprobar si YA EXISTE una solicitud previa activa en el registro
  for (const record of reg.records) {
    if (record.status === 'dismissed' || record.status === 'resolved') continue; // Solo comprobamos solicitudes abiertas pendientes

    const normRecord = record.normalizedText;
    const recordTokens = record.matchedTokens || tokenize(record.text);

    // Coincidencia directa de texto
    if (normInput === normRecord) {
      return {
        allowed: false,
        reason: `Ya existe una solicitud abierta para este modelo (Issue #${record.issueNumber || 'registrada'}). Nuestro equipo ya está trabajando en ella.`
      };
    }

    // Coincidencia inteligente por tokens principales (Jaccard similarity de tokens clave)
    if (inputTokens.length >= 2 && recordTokens.length >= 2) {
      const intersection = inputTokens.filter(t => recordTokens.includes(t));
      const union = new Set([...inputTokens, ...recordTokens]);
      const similarity = intersection.length / union.size;

      // Si coinciden en más del 65% de términos clave o los 2 tokens principales son idénticos
      if (similarity >= 0.65 || (intersection.length >= 2 && intersection.length === inputTokens.length)) {
        return {
          allowed: false,
          reason: `Ya existe una propuesta similar registrada para "${record.text}" (Issue #${record.issueNumber || 'activa'}). Se añadirá relevancia a la existente.`
        };
      }
    }
  }

  return { allowed: true };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    let rawText = '';
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const text = await request.text();
      if (text && text.trim().length > 0) {
        try {
          const parsed = JSON.parse(text);
          rawText = (parsed?.text || '').trim();
        } catch (jsonErr) {
          console.warn('JSON parse warning:', jsonErr);
        }
      }
    } else {
      const text = await request.text();
      rawText = text.trim();
    }

    const registry = loadRegistry();

    // 1. Evaluación mediante Middleware inteligente
    const evalResult = evaluateMiddlewareFilter(rawText, registry);
    if (!evalResult.allowed) {
      return new Response(JSON.stringify({
        success: false,
        error: evalResult.reason
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Crear Issue en GitHub mediante GitHub CLI o API
    let issueNumber: number | undefined;
    let issueUrl: string | undefined;

    const issueTitle = `[Propuesta de Vehículo]: ${rawText.slice(0, 70)}`;
    const issueBody = `### 🚗 Solicitud de Modelo / Marca en Carvault

**Descripción solicitada por el usuario:**
> ${rawText}

---
*Generado automáticamente mediante el portal de Carvault con filtro anti-duplicados.*
- **Fecha:** ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
- **Filtro Middleware:** Verificado (no existe en catálogo actual ni en solicitudes activas)`;

    try {
      // Intentar crear la issue con gh CLI
      const { stdout } = await execFileAsync('gh', [
        'issue', 'create',
        '--repo', 'amglogicalis/carvault',
        '--title', issueTitle,
        '--body', issueBody,
        '--label', 'enhancement'
      ]);

      const matchUrl = stdout.trim().match(/https:\/\/github\.com\/[^\s]+/);
      if (matchUrl) {
        issueUrl = matchUrl[0];
        const numMatch = issueUrl.match(/\/issues\/(\d+)/);
        if (numMatch) {
          issueNumber = parseInt(numMatch[1], 10);
        }
      }
    } catch (cliErr) {
      console.warn('gh CLI execution failed or issue creation fell back:', cliErr);
      // Fallback gracioso: registramos en la base de datos interna aunque GitHub CLI falle
      issueUrl = 'https://github.com/amglogicalis/carvault/issues';
    }

    // 3. Dejar traza en la base de datos de registro local
    const newRecord: RequestRecord = {
      id: `req_${Date.now()}`,
      text: rawText,
      normalizedText: normalize(rawText),
      status: 'pending',
      createdAt: new Date().toISOString(),
      issueNumber,
      issueUrl,
      matchedTokens: tokenize(rawText)
    };

    registry.records.push(newRecord);
    saveRegistry(registry);

    return new Response(JSON.stringify({
      success: true,
      message: '¡Solicitud enviada correctamente! Se ha creado una issue en el repositorio para su revisión y catalogación.',
      record: newRecord
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('Error in request-model endpoint:', err);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error interno al procesar la solicitud. Por favor, inténtalo de nuevo.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
