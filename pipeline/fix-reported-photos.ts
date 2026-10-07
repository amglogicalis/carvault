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

// Reemplazos de máxima calidad con vista exterior frontal limpia
const REPLACEMENTS: Record<string, string> = {
  // 1. BMW 3/20 PS (1932) -> Vista frontal exterior limpia en festival de elegancia
  'bmw-3-20-ps': 'File:BMW 3-20HP AM 4 (1933) Classic-Gala 2021 1X7A0137.jpg',

  // 2. BMW 315 (1934) -> Vista frontal exterior despejada
  'bmw-315': 'File:Brown, black BMW 315 (front).jpg',

  // 3. BMW 501 (1952) -> Frontal del "Barockengel"
  'bmw-501': 'File:BMW Barockengel - front.jpg',

  // 4. BMW 507 roadster (1956) -> Vista frontal completa de concurso
  'bmw-507': 'File:BMW 507 Classic-Gala 2022 1X7A0188.jpg',

  // 5. BMW 3200 CS (1962) -> Frontal icónico Bertone
  'bmw-3200-cs': 'File:BMW 3200 CS (1961) Classic-Gala 2022 1X7A0178.jpg',

  // 6. BMW Z4 (E85/E86) -> Sustituir foto del salpicadero/dash por frontal exterior limpio
  'bmw-z4-e85-e86': 'File:BMW Z4 Roadster 2.2i (E85) front.JPG',

  // 7. BMW Serie 1 (E81/E82/E87/E88) -> Sustituir foto lejana con Porsche por frontal centrado de E87
  'bmw-1-series-e81-e82-e87-e88': 'File:BMW E87 front 20080417.jpg',

  // 8. BMW Serie 2 Gran Coupé (F44) -> Sustituir ángulo recortado por frontal limpio
  'bmw-2-series-f44': 'File:BMW 218i Gran Coupé (F44) front.jpg',

  // 9. BMW 325 (1937) -> En lugar de un recortado confuso, esquema de fábrica oficial del Kfz. 1 Einheitsfahrgestell
  'bmw-325': 'File:D. 600, Kfz. 1 auf Einheitsfahrgestell I für l. Pkw.png'
};

const catalog = JSON.parse(await readFile('data/bmw/catalog-clean-front.json', 'utf8'));

let count = 0;
for (const [id, file] of Object.entries(REPLACEMENTS)) {
  const gen = catalog.generations.find((g: any) => g.id === id);
  if (!gen) {
    console.warn(`No se encontró ${id}`);
    continue;
  }

  const imgInfo = await getFileInfo(file);
  if (imgInfo) {
    gen.frontImage = imgInfo;
    for (const c of gen.chassis) {
      c.frontImage = imgInfo;
    }
    count++;
    console.log(`✓ Actualizado [${gen.label}] con ${imgInfo.file}`);
  } else {
    console.error(`✗ No se pudo obtener info de ${file}`);
  }
}

await writeFile('data/bmw/catalog-clean-front.json', JSON.stringify(catalog, null, 2));
await writeFile('public/api/v1/bmw.json', JSON.stringify(catalog, null, 2));

console.log(`\nReemplazo completado: ${count} modelos con nueva foto frontal limpia.`);
