/**
 * Carvault - Asignador de Frontal por Coincidencia Exacta de Chasis
 * 
 * Regla de Oro: La imagen DEBE corresponder exactamente al modelo y generación/chasis indicado.
 * 1. Si el chasis es E46, busca específicamente 'BMW E46 front' / 'BMW M3 E46 front'.
 * 2. Si el chasis es F20, busca 'BMW F20 front'.
 * 3. Si el modelo es G87 (M2), busca 'BMW M2 G87 front'.
 * 4. NUNCA heredar fotos de la serie genérica (evita que un M3 E46 reciba la foto de un G80).
 * 5. Filtro estricto contra partes mecánicas, frenos, pinzas o motores.
 */

import { readFile, writeFile } from 'node:fs/promises';

const UA = 'Carvault/0.1 (https://github.com/amglogicalis/carvault)';
const PAUSE_MS = 250;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const STRICT_NOISE = /\b(caliper|brake|bremse|pinza|wheel|rim|felge|tire|reifen|engine|motor|valve|piston|exhaust|auspuff|interior|dashboard|cockpit|seat|sitz|steering|lenkrad|headlight|taillight|badge|emblem|logo|speedometer|gearbox|transmission|suspension|door handle|mirror|mirror glass)\b/i;

async function fetchJson(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      await sleep(PAUSE_MS);
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (res.ok) return await res.json();
      if (res.status === 429) {
        await sleep(1500 * (i + 1));
        continue;
      }
    } catch (e) {
      if (i === retries - 1) return null;
      await sleep(800);
    }
  }
  return null;
}

// Búsqueda específica en Commons con el código de chasis exacto en la query
async function findExactChassisFront(queryStr: string): Promise<any | null> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(queryStr)}&srnamespace=6&srlimit=8&format=json`;
  const sData = await fetchJson(url);
  if (!sData?.query?.search?.length) return null;

  const validTitles = sData.query.search
    .map((s: any) => s.title as string)
    .filter((t: string) => !STRICT_NOISE.test(t));

  if (!validTitles.length) return null;

  const titlesToFetch = validTitles.slice(0, 5);
  const metaUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titlesToFetch.join('|'))}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  const mData = await fetchJson(metaUrl);
  if (!mData?.query?.pages) return null;

  for (const p of Object.values(mData.query.pages) as any[]) {
    if (!p.imageinfo?.[0]) continue;
    const info = p.imageinfo[0];
    const meta = info.extmetadata || {};
    const title = p.title;
    const desc = (meta.ImageDescription?.value || '').replace(/<[^>]+>/g, ' ');
    const combined = `${title} ${desc}`.toLowerCase();

    if (STRICT_NOISE.test(combined)) continue;

    return {
      file: title,
      url: info.url,
      author: (meta.Artist?.value || 'Wikimedia contributor').replace(/<[^>]+>/g, '').trim(),
      license: meta.LicenseShortName?.value || 'CC BY-SA',
      sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replace(/\s+/g, '_'))}`,
      width: info.width,
      height: info.height,
    };
  }
  return null;
}

// Artículo exacto de Wikipedia (ej: "BMW 3 Series (E46)", "BMW 1 Series (F20)")
async function findWikipediaArticleImage(articleTitle: string): Promise<any | null> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(articleTitle.replace(/\s+/g, '_'))}&prop=pageimages|imageinfo&pithumbsize=1200&format=json`;
  const data = await fetchJson(url);
  if (!data?.query?.pages) return null;
  const page = Object.values(data.query.pages)[0] as any;
  if (!page || !page.thumbnail || !page.pageimage) return null;

  const fileTitle = `File:${page.pageimage}`;
  const metaUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  const metaData = await fetchJson(metaUrl);
  const metaPage = metaData?.query?.pages ? Object.values(metaData.query.pages)[0] as any : null;
  const extMeta = metaPage?.imageinfo?.[0]?.extmetadata || {};

  return {
    file: fileTitle,
    url: page.thumbnail.source,
    author: (extMeta.Artist?.value || 'Wikimedia contributor').replace(/<[^>]+>/g, '').trim(),
    license: extMeta.LicenseShortName?.value || 'CC BY-SA',
    sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replace(/\s+/g, '_'))}`,
    width: page.thumbnail.width,
    height: page.thumbnail.height,
  };
}

const catalog = JSON.parse(await readFile('data/bmw/catalog.json', 'utf8'));
console.log(`Ejecutando asignación exacta de frontal para ${catalog.generations.length} modelos...`);

let exactFound = 0;

for (const gen of catalog.generations) {
  const chCode = gen.chassis[0]?.code || '';
  let img = null;

  // 1. Probar Wikipedia con el chasis exacto en el título
  if (chCode) {
    const articleCandidates = [
      `BMW ${gen.series} (${chCode})`,
      `BMW ${gen.label}`,
      `BMW (${chCode})`
    ];
    for (const art of articleCandidates) {
      img = await findWikipediaArticleImage(art);
      if (img) break;
    }
  }

  // 2. Si no, búsqueda precisa en Commons: "BMW [Modelo/Serie] [Chasis] front"
  if (!img) {
    const queries = [];
    if (chCode) queries.push(`BMW ${gen.series} ${chCode} front`);
    if (chCode) queries.push(`BMW ${chCode} front`);
    queries.push(`BMW ${gen.label} front`);

    for (const q of queries) {
      img = await findExactChassisFront(q);
      if (img) break;
    }
  }

  gen.frontImage = img;
  for (const ch of gen.chassis) ch.frontImage = img;

  if (img) exactFound++;
  console.log(`${gen.label} [${chCode}]: ${img ? '✓ ' + img.file : '✗ Sin frontal exacto'}`);
}

catalog.stats.withExactFront = exactFound;
console.log(`\nCompletado: ${exactFound} de ${catalog.generations.length} modelos con frontal exacto.`);

await writeFile('data/bmw/catalog-clean-front.json', JSON.stringify(catalog, null, 2));
await writeFile('public/api/v1/bmw.json', JSON.stringify(catalog, null, 2));
