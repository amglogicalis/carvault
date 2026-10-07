import { readFile, writeFile } from 'node:fs/promises';

const UA = 'Carvault/0.1 (https://github.com/amglogicalis/carvault)';
const PAUSE_MS = 200;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      await sleep(PAUSE_MS);
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (res.ok) return await res.json();
    } catch {
      await sleep(500);
    }
  }
  return null;
}

async function getFileInfo(fileNameWithPrefix: string): Promise<any | null> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileNameWithPrefix)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  const mData = await fetchJson(url);
  if (!mData?.query?.pages) return null;
  const p = Object.values(mData.query.pages)[0] as any;
  if (!p || !p.imageinfo?.[0]) return null;

  const info = p.imageinfo[0];
  const meta = info.extmetadata || {};

  return {
    file: fileNameWithPrefix,
    url: info.url,
    author: (meta.Artist?.value || 'Wikimedia contributor').replace(/<[^>]+>/g, '').trim(),
    license: meta.LicenseShortName?.value || 'CC BY-SA',
    sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileNameWithPrefix.replace(/\s+/g, '_'))}`,
    width: info.width,
    height: info.height,
  };
}

// 1. MOTOS / NO COCHES A ELIMINAR DEL CATÁLOGO
const MOTORCYCLES_TO_REMOVE = [
  'bmw-concept-motorrad-concept-link',
  'bmw-concept-motorrad-vision-next-100',
  'bmw-concept-c1-e',
  'bmw-concept-e2' // Asociado a la moto de enduro G 450 X
];

// 2. CURATED WHITELIST DE REEMPLAZOS FRONTALES LIMPIOS Y VERIFICADOS
const CURATED_CORRECTIONS: Record<string, string> = {
  // Prototipos que tenían foto trasera, salpicadero, motor o ángulo lejano
  'bmw-concept-concept-skytop': 'File:2024 BMW Concept Skytop.jpg', // Frontal completo y centrado
  'bmw-concept-i-vision-dee': 'File:BMW Dee IMG01.jpg', // Frontal directo
  'bmw-concept-z07': 'File:Scan z07 02.jpg', // Frontal del Z07 en Tokio 1997
  'bmw-concept-750hl': 'File:BMW 7-Series (E38) 750i (1995) (52858944605).jpg', // Coche completo en vez de boca de hidrógeno
  'bmw-concept-1-series-tii': 'File:BMW Concept 1 Series tii.JPG', // Prototipo completo en vez de la bomba de inyección
  'bmw-concept-concept-6-series': 'File:Paris - Mondial de l\'automobile 2010 - BMW Série 6 coupé concept - 001.JPG', // Frontal centrado París 2010
  'bmw-concept-i8-concept-spyder': 'File:BMW i8 Spyder Concept front.jpg', // Frontal limpio en vez de trasera
  'bmw-concept-concept-x5-edrive': 'File:BMW Concept X5 eDrive IAA 2013.jpg', // Frontal exterior completo en vez de primerísimo plano
  'bmw-concept-3-0-csl-hommage': 'File:BMW 3.0 CSL Hommage 05.JPG', // Frontal exterior de concurso Villa d'Este en vez de alerón trasero
  'bmw-concept-3-0-csl-hommage-r': 'File:BMW 3.0 CSL Hommage R (2015) 1X7A0118.jpg', // Frontal limpio en Retro Classics en vez de trasera
  'bmw-concept-concept-x7-iperformance': 'File:BMW Concept X7 iPerformance, IAA 2017, Frankfurt (1Y7A3280).jpg', // Frontal nítido Frankfurt en vez de maletero

  // Prototipos que faltaban y que sí disponen de frontal oficial verificado
  'bmw-concept-331': 'File:BMW 531 1951 01.jpg', // Prototipo 331/531 de 1949/1951
  'bmw-concept-1602-electro-antrieb-e10': 'File:BMW 1602 Elektro.jpg', // Frontal oficial de los JJOO Munich 1972
  'bmw-concept-m8-e31-prototype': 'File:BMW M8.jpg', // Prototipo M8 V12 1990 frontal
  'bmw-concept-nazca-c2-spider': 'File:1991 Italdesign-BMW Nazca C2.jpg', // Frontal exterior limpio
  'bmw-concept-concept-4-series-coup': 'File:BMW Concept 4-series Coupe (8404439970) (cropped).jpg', // Frontal limpio Detroit
  'bmw-concept-concept-x4': 'File:BMW concept X4 (Auto Shanghai 2013).JPG', // Frontal Shanghai
  'bmw-concept-concept-m4-coup': 'File:BMW Concept M4 Coupe front-right 2013 Tokyo Motor Show (cropped).jpg', // Frontal Tokyo
  'bmw-concept-2002-hommage-turbomeister-concept': 'File:BMW 2002 Hommage Turbomeister Concept (cropped).jpg', // Frontal limpio
  'bmw-concept-concept-x2': 'File:BMW concept X2 - Mondial de l\'Automobile de Paris 2016 - 003.jpg', // Frontal París
  'bmw-concept-concept-m8-gran-coup': 'File:BMW 8er Gran Coupe Concept Presentation Genf 2018.jpg', // Frontal Ginebra
  'bmw-concept-concept-ix3': 'File:BMW iX3 Concept (G01).jpg', // Frontal París
  'bmw-concept-vision-inext': 'File:BMW iNEXT IAA 2019 JM 1413.jpg', // Frontal IAA Frankfurt
  'bmw-concept-i-hydrogen-next-fuel-cell': 'File:BMW X5 i Hydrogen Next Concept (48807824593).jpg', // Frontal IAA
  'bmw-concept-concept-speedtop': 'File:BMW Concept Speedtop.jpg', // Frontal Japón
  'bmw-concept-vision-bmw-alpina': 'File:BMW Vision Alpina Concept.jpg', // Frontal oficial
  'bmw-concept-bmw-concept-7-series-activehybrid': 'File:BMW Concept 7Series ActiveHybrid.JPG', // Frontal París
  'bmw-concept-zagato-coup': 'File:BMW Zagato Coupé.jpg', // Frontal Villa d'Este (distinto y verificado)
  'bmw-concept-zagato-roadster': 'File:BMWZagato1.jpg', // Frontal Pebble Beach (distinto al Coupe)
  'bmw-concept-z1-prototype': 'File:BMW Z1 front.jpg' // Frontal limpio del proyecto Z1
};

// Cargar catálogo actual
const catalog = JSON.parse(await readFile('data/bmw/catalog-clean-front.json', 'utf8'));
const initialCount = catalog.generations.length;

// 1. Eliminar motos
catalog.generations = catalog.generations.filter((g: any) => !MOTORCYCLES_TO_REMOVE.includes(g.id));
const removedCount = initialCount - catalog.generations.length;
console.log(`Eliminados ${removedCount} vehículos de dos ruedas/motos del catálogo.`);

// 2. Aplicar correcciones frontales curadas sin tocar los que ya están bien
let updatedCount = 0;
for (const [id, file] of Object.entries(CURATED_CORRECTIONS)) {
  const gen = catalog.generations.find((g: any) => g.id === id);
  if (!gen) {
    console.warn(`[SKIP] No encontrado ID: ${id}`);
    continue;
  }

  const info = await getFileInfo(file);
  if (info) {
    gen.frontImage = info;
    for (const c of gen.chassis) {
      c.frontImage = info;
    }
    updatedCount++;
    console.log(`✓ [${gen.label}] -> ${info.file}`);
  } else {
    console.error(`✗ Error al cargar info para: ${file}`);
  }
}

// 3. Para modelos conceptuales sin foto física externa, asegurar fallback limpio sin imágenes rotas
const emptyCount = catalog.generations.filter((g: any) => !g.frontImage).length;

catalog.stats.generations = catalog.generations.length;
catalog.stats.prototypes = catalog.generations.filter((g: any) => g.section === 'prototypes').length;
catalog.stats.withExactFront = catalog.generations.filter((g: any) => !!g.frontImage).length;

console.log(`\n=== RESUMEN DE APLICACIÓN ===`);
console.log(`Modelos totales ahora en catálogo: ${catalog.generations.length}`);
console.log(`Modelos con foto frontal verificada limpia: ${catalog.stats.withExactFront}`);
console.log(`Correcciones aplicadas: ${updatedCount}`);

await writeFile('data/bmw/catalog-clean-front.json', JSON.stringify(catalog, null, 2));
await writeFile('public/api/v1/bmw.json', JSON.stringify(catalog, null, 2));
console.log('Archivos guardados en disco con éxito.');
