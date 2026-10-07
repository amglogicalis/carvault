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

// Asignación con los IDs reales y exactos de catalog-clean-front.json
const EXACT_MATCHES: Record<string, string> = {
  // Modelos BMW M y producción
  'bmw-z4-m-roadsterz4-m-coup-m': 'File:BMW Z4 M Coupé front 20100328.jpg',
  'bmw-m8-f91-f92-f93': 'File:BMW M8 (F92) Washington DC Metro Area, USA.jpg',
  'bmw-x3-m-f97': 'File:BMW X3M (F97) Greater Toronto Area, Canada.jpg',
  'bmw-x4-m-f98': 'File:BMW X4M Competition (F98) Washington DC Metro Area, USA (1).jpg',
  'bmw-x6-m-f86': 'File:BMW X6M F86 (28004084531).jpg',
  'bmw-new-class-coup-s': 'File:BMW 2000 C Automatic PL 2.jpg',

  // Prototipos y Conceptos icónicos
  'bmw-concept-concept-skytop': 'File:2024 BMW Concept Skytop 2.jpg',
  'bmw-concept-nazca-c2': 'File:BMW Nazca C2.JPG',
  'bmw-concept-nazca-m12': 'File:1991 BMW Nazca (6957208570).jpg',
  'bmw-concept-3-0-csl-hommage': 'File:BMW 3.0 CSL Hommage 06.JPG',
  'bmw-concept-3-0-csl-hommage-r': 'File:BMW 3.0 CSL Hommage R (2015) 1X7A0119.jpg',
  'bmw-concept-m1-homage': 'File:BMW M1 Homage Concept (15109679445).jpg',
  'bmw-concept-328-hommage': 'File:Festival automobile international 2012 - BMW 328 Hommage - 001.jpg',
  'bmw-concept-2002-hommage-concept': 'File:FoS20162016 0624 104959AA (27886437065).jpg',
  'bmw-concept-vision-m-next': 'File:BMW Vision M NEXT IAA 2019 JM 0090.jpg',
  'bmw-concept-concept-i4': 'File:BMW Concept i4.png',
  'bmw-concept-xm-concept': 'File:2023 BMW XM (TH).jpg',
  'bmw-concept-i-vision-dee': 'File:BMW i Vision Dee IAA 2023 1X7A0414.jpg',
  'bmw-concept-vision-neue-klasse-x': 'File:BMW Vision Neue Klasse IAA 2023 1X7A0221.jpg',
  'bmw-concept-i-vision-circular': 'File:BMW i Vision Circular Concept IAA 2021 1X7A0294.jpg',
  'bmw-concept-gran-lusso-coup': 'File:BMW GranLusso Coupé.JPG',
  'bmw-concept-vision-future-luxury-7-series-2019': 'File:BMW Vision Future Luxury (15).JPG',
  'bmw-concept-vision-next-100': 'File:BMW next 100.png',
  'bmw-concept-z07': 'File:Scan z07 01.jpg',
  'bmw-concept-z9': 'File:BMW Z9GT 1999 01.jpg',
  'bmw-concept-2800-spicup': 'File:BMW Spicup.jpg',
  'bmw-concept-2200-ti-garmisch': 'File:2002ti-Garmisch 2019-05-26-II.jpg',
  'bmw-concept-e1-z11': 'File:BMW E1 01.jpg',
  'bmw-concept-vision-connecteddrive': 'File:TheBMWVisionConnectedDrive.jpg'
};

const catalog = JSON.parse(await readFile('data/bmw/catalog-clean-front.json', 'utf8'));

let applied = 0;

for (const [id, file] of Object.entries(EXACT_MATCHES)) {
  const gen = catalog.generations.find((g: any) => g.id === id);
  if (!gen) {
    console.warn(`ID no encontrado: ${id}`);
    continue;
  }

  const imgInfo = await getFileInfo(file);
  if (imgInfo) {
    gen.frontImage = imgInfo;
    for (const c of gen.chassis) {
      c.frontImage = imgInfo;
    }
    applied++;
    console.log(`✓ [${gen.label}] -> ${imgInfo.file}`);
  } else {
    console.error(`✗ Error al cargar info de: ${file}`);
  }
}

catalog.stats.withExactFront = catalog.generations.filter((g: any) => !!g.frontImage).length;
console.log(`\n¡Asignación completada!`);
console.log(`Nuevas imágenes aplicadas en esta fase: ${applied}`);
console.log(`Total de modelos con imagen frontal verificada: ${catalog.stats.withExactFront} / ${catalog.generations.length}`);

await writeFile('data/bmw/catalog-clean-front.json', JSON.stringify(catalog, null, 2));
await writeFile('public/api/v1/bmw.json', JSON.stringify(catalog, null, 2));
console.log('Archivos guardados en disco.');
