/**
 * Carvault - Pipeline de atribución masiva de imágenes para todo el catálogo BMW.
 * 
 * Itera cada generación y chasis en data/bmw/catalog.json:
 * 1. Recupera imágenes de Commons asegurando correspondencia estricta de modelo.
 * 2. Guarda el resultado con atribución legal en data/bmw/catalog-with-images.json.
 * 3. Incorpora caché en disco (pipeline/.cache/views/) para poder reanudar sin perder progreso.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { attributeViewsForCategory } from './attribute-views.ts';

const CACHE_DIR = 'pipeline/.cache/views';
await mkdir(CACHE_DIR, { recursive: true });

const catalog = JSON.parse(await readFile('data/bmw/catalog.json', 'utf8'));

console.log(`Iniciando atribución de imágenes para ${catalog.generations.length} modelos de BMW...`);

let processedChassis = 0;
let withAtLeastOneView = 0;
let withAllFourViews = 0;

for (const gen of catalog.generations) {
  for (const ch of gen.chassis) {
    processedChassis++;
    const cat = ch.commonsCategory;
    if (!cat) {
      ch.images = { front: null, rear: null, side: null, threeQuarter: null };
      continue;
    }

    const cacheKey = createHash('sha1').update(cat).digest('hex');
    const cacheFile = `${CACHE_DIR}/${cacheKey}.json`;

    let views;
    try {
      views = JSON.parse(await readFile(cacheFile, 'utf8'));
    } catch {
      views = await attributeViewsForCategory(cat);
      await writeFile(cacheFile, JSON.stringify(views));
    }

    ch.images = views;
    const viewCount = Object.values(views).filter(Boolean).length;
    if (viewCount > 0) withAtLeastOneView++;
    if (viewCount === 4) withAllFourViews++;

    if (processedChassis % 10 === 0 || viewCount > 0) {
      console.log(`[${processedChassis}/${catalog.stats.chassis}] ${gen.label} (${ch.code || 'base'}): ${viewCount}/4 vistas encontradas`);
    }
  }
}

catalog.stats.withAtLeastOneView = withAtLeastOneView;
catalog.stats.withAllFourViews = withAllFourViews;

console.log('\n--- Resumen de Atribución ---');
console.log(`Total chasis procesados: ${processedChassis}`);
console.log(`Con al menos 1 vista: ${withAtLeastOneView}`);
console.log(`Con las 4 vistas completas: ${withAllFourViews}`);

await writeFile('data/bmw/catalog-with-images.json', JSON.stringify(catalog, null, 2));
console.log('Catálogo con imágenes guardado en data/bmw/catalog-with-images.json');
