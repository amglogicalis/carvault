/**
 * Carvault - Pipeline de Actualización a Vista Frontal Única & Limpia
 * 
 * Recorre todos los modelos del catálogo:
 * 1. Intenta obtener la foto de portada del artículo de Wikipedia (calidad enciclopédica garantizada).
 * 2. Si no, busca con filtro estricto en Wikimedia Commons (front exterior, descartando frenos/motores).
 * 3. Actualiza cada coche con un campo único `frontImage` limpio.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { getWikipediaLeadImage, getStrictCommonsFrontImage } from './attribute-strict-front.ts';

const CACHE_DIR = 'pipeline/.cache/front_only';
await mkdir(CACHE_DIR, { recursive: true });

const catalog = JSON.parse(await readFile('data/bmw/catalog.json', 'utf8'));

console.log(`Actualizando vista frontal única para ${catalog.generations.length} modelos de BMW...`);

let successCount = 0;
let processed = 0;

for (const gen of catalog.generations) {
  processed++;
  const cacheKey = createHash('sha1').update(gen.id).digest('hex');
  const cacheFile = `${CACHE_DIR}/${cacheKey}.json`;

  let frontImg = null;
  try {
    frontImg = JSON.parse(await readFile(cacheFile, 'utf8'));
  } catch {
    // 1. Probar Wikipedia Lead Image
    // Generar nombres posibles de artículos (ej. "BMW M2", "BMW 3 Series (E46)", etc.)
    const wikiCandidates = [
      gen.label.replace(/\s*\([^)]*\)/g, '').trim(),
      gen.label,
      `BMW ${gen.series}`,
      `BMW ${gen.label}`
    ];

    for (const cand of wikiCandidates) {
      frontImg = await getWikipediaLeadImage(cand);
      if (frontImg) break;
    }

    // 2. Si falló Wikipedia, recurrir a Commons estricto
    if (!frontImg && gen.chassis[0]?.commonsCategory) {
      frontImg = await getStrictCommonsFrontImage(gen.chassis[0].commonsCategory);
    }

    await writeFile(cacheFile, JSON.stringify(frontImg));
  }

  // Asignar al modelo y a sus chasis
  gen.frontImage = frontImg;
  for (const ch of gen.chassis) {
    ch.frontImage = frontImg;
  }

  if (frontImg) successCount++;

  if (processed % 15 === 0 || frontImg) {
    console.log(`[${processed}/${catalog.generations.length}] ${gen.label}: ${frontImg ? '✓ Frontal exterior encontrado' : '✗ Sin foto'}`);
  }
}

catalog.stats.withFrontImage = successCount;
console.log(`\n--- Resumen Final: ${successCount} de ${catalog.generations.length} modelos con frontal exterior limpio ---`);

await writeFile('data/bmw/catalog-clean-front.json', JSON.stringify(catalog, null, 2));
await writeFile('public/api/v1/bmw.json', JSON.stringify(catalog, null, 2));
console.log('Catálogo guardado en data/bmw/catalog-clean-front.json y public/api/v1/bmw.json');
