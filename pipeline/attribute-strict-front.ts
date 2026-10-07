/**
 * Carvault - Extractor de Vista Frontal Única & Estricta (Coche Completo)
 * 
 * Estrategia de Calidad:
 * 1. Intento 1: Foto de portada oficial del artículo enciclopédico de Wikipedia (Lead Image).
 *    Wikipedia siempre utiliza como portada una fotografía frontal o 3/4 del coche completo exterior.
 * 2. Intento 2: Búsqueda estricta en Wikimedia Commons con filtro obligatorio de frontal exterior:
 *    - Palabras requeridas: front, vorne, avant, frontal, front-view, front quarter
 *    - Filtro negativo exhaustivo: DESCARTA frenos, pinzas (calipers), llantas, ruedas, motores, escapes, interiores, faros en primer plano, etc.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';

const UA = 'Carvault/0.1 (https://github.com/amglogicalis/carvault)';
const PAUSE_MS = 200;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Filtro negativo riguroso contra primeros planos y piezas mecánicas (como la pinza M dorada)
const STRICT_NOISE = /\b(caliper|brake|bremse|pinza|wheel|rim|felge|tire|reifen|engine|motor|valve|piston|exhaust|auspuff|interior|dashboard|cockpit|seat|sitz|steering|lenkrad|headlight|taillight|badge|emblem|logo|speedometer|gearbox|transmission|suspension|door handle|mirror|mirror glass)\b/i;

// Requerir explícitamente términos frontales
const STRICT_FRONT = /\b(front|vorne|avant|frontal|frente|front-view|front quarter|3\/4)\b/i;

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

// 1. Obtener imagen de cabecera de Wikipedia
export async function getWikipediaLeadImage(title: string): Promise<any | null> {
  const cleanTitle = title.replace(/\s+/g, '_');
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(cleanTitle)}&prop=pageimages|imageinfo&pithumbsize=1200&format=json`;
  const data = await fetchJson(url);
  if (!data?.query?.pages) return null;
  const page = Object.values(data.query.pages)[0] as any;
  if (!page || !page.thumbnail || !page.pageimage) return null;

  // Obtener metadatos legales del archivo
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

// 2. Búsqueda estricta en Commons por frontal exterior
export async function getStrictCommonsFrontImage(category: string): Promise<any | null> {
  const safeCat = category.replace(/^Category:/i, '');
  const query = `incategory:"${safeCat}" (front OR vorne OR avant OR "front-view" OR "front left" OR "front right")`;
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=15&format=json`;
  const sData = await fetchJson(searchUrl);
  if (!sData?.query?.search?.length) return null;

  const validTitles = sData.query.search
    .map((s: any) => s.title as string)
    .filter((t: string) => !STRICT_NOISE.test(t) && STRICT_FRONT.test(t));

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
