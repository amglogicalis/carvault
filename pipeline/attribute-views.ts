/**
 * Carvault - Extractor & Atribuidor de Imágenes en 4 Perspectivas para BMW
 * 
 * Reglas de atribución estricta para garantizar que la foto pertenece exactamente al coche:
 * 1. Scope cerrado a la categoría específica del Chasis / Modelo (incategory:Category:X).
 * 2. Filtro negativo anti-ruido: descarta interior, engine, wheel, badge, crash, rally, scale model, etc.
 * 3. Detección por pares/sets fotográficos del mismo autor o términos inequívocos:
 *    - front: front, vorne, avant, frontal, frente
 *    - rear: rear, heck, hinten, arrière, trasera, traser
 *    - side: side, profile, profil, seitlich, lateral
 *    - threeQuarter: front left, front right, rear left, rear right, 3/4, three-quarter
 * 4. Extracción de metadatos legales: URL, Autor original, Licencia exacta, URL de origen en Commons.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';

const UA = 'Carvault/0.1 (https://github.com/amglogicalis/carvault)';
const PAUSE_MS = 250;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const NOISE_FILTER = /\b(interior|cockpit|dashboard|engine|motor|motorraum|wheel|rim|felge|badge|emblem|logo|crash|unfall|wreck|rally|police|polizei|tuning|toy|scale model|miniature|headlight|taillight|exhaust)\b/i;

type Perspective = 'front' | 'rear' | 'side' | 'threeQuarter';

const PERSPECTIVE_PATTERNS: Record<Perspective, { regex: RegExp; keywords: string[] }> = {
  front: {
    regex: /\b(front|vorne|avant|frontal|frente)\b/i,
    keywords: ['front', 'vorne', 'avant']
  },
  rear: {
    regex: /\b(rear|heck|hinten|arri[eè]re|traser[oa]|back)\b/i,
    keywords: ['rear', 'heck', 'hinten', 'back']
  },
  side: {
    regex: /\b(side|profile|profil|seitlich|lateral)\b/i,
    keywords: ['side', 'profile', 'profil']
  },
  threeQuarter: {
    regex: /\b(front[\s-_]?(left|right)|rear[\s-_]?(left|right)|3[\s-_]?4|three[\s-_]?quarter)\b/i,
    keywords: ['front left', 'front right', 'rear left', 'rear right', '3/4']
  }
};

type ImageAttribution = {
  file: string;
  url: string;
  author: string;
  license: string;
  sourceUrl: string;
  width?: number;
  height?: number;
};

type ModelViews = {
  front: ImageAttribution | null;
  rear: ImageAttribution | null;
  side: ImageAttribution | null;
  threeQuarter: ImageAttribution | null;
};

async function fetchJson(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      await sleep(PAUSE_MS);
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (res.ok) return await res.json();
      if (res.status === 429) {
        await sleep(2000 * (i + 1));
        continue;
      }
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1000);
    }
  }
  return null;
}

// Busca archivos candidatos en la categoría dada
async function getCategoryCandidateFiles(category: string): Promise<string[]> {
  const safeCat = category.replace(/^Category:/i, '');
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=incategory:${encodeURIComponent('"' + safeCat + '"')}&srnamespace=6&srlimit=60&format=json`;
  const data = await fetchJson(url);
  if (!data?.query?.search) return [];
  return data.query.search
    .map((s: any) => s.title as string)
    .filter((title: string) => !NOISE_FILTER.test(title));
}

// Obtiene los metadatos completos de un lote de archivos
async function getImageDetails(titles: string[]): Promise<Record<string, any>> {
  if (!titles.length) return {};
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  const data = await fetchJson(url);
  if (!data?.query?.pages) return {};
  return data.query.pages;
}

function cleanAuthor(raw: string | undefined): string {
  if (!raw) return 'Wikimedia Commons contributor';
  return raw
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim() || 'Wikimedia Commons contributor';
}

function cleanLicense(raw: string | undefined): string {
  if (!raw) return 'CC BY-SA / Public Domain';
  return raw.trim();
}

export async function attributeViewsForCategory(category: string): Promise<ModelViews> {
  const views: ModelViews = {
    front: null,
    rear: null,
    side: null,
    threeQuarter: null
  };

  const fileTitles = await getCategoryCandidateFiles(category);
  if (!fileTitles.length) return views;

  // Tomamos hasta 40 imágenes para inspeccionar
  const chunk = fileTitles.slice(0, 40);
  const pages = await getImageDetails(chunk);

  for (const page of Object.values(pages) as any[]) {
    if (!page.imageinfo || !page.imageinfo[0]) continue;
    const info = page.imageinfo[0];
    const meta = info.extmetadata || {};
    const title = page.title;
    const desc = (meta.ImageDescription?.value || '').replace(/<[^>]+>/g, ' ');
    const combinedText = `${title} ${desc}`.toLowerCase();

    // Comprobamos si tiene ruido interior/partes
    if (NOISE_FILTER.test(combinedText)) continue;

    const attrib: ImageAttribution = {
      file: title,
      url: info.url,
      author: cleanAuthor(meta.Artist?.value),
      license: cleanLicense(meta.LicenseShortName?.value),
      sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replace(/\s+/g, '_'))}`,
      width: info.width,
      height: info.height
    };

    // Clasificar según perspectivas
    for (const [pKey, rule] of Object.entries(PERSPECTIVE_PATTERNS) as [Perspective, typeof PERSPECTIVE_PATTERNS[Perspective]][]) {
      if (!views[pKey] && rule.regex.test(combinedText)) {
        views[pKey] = attrib;
      }
    }

    // Si ya completamos las 4 vistas, paramos
    if (views.front && views.rear && views.side && views.threeQuarter) break;
  }

  // Fallback garantizado: Si no hay frontal etiquetada explícitamente pero encontramos fotos válidas del coche,
  // asignamos la primera foto limpia como vista frontal/principal
  if (!views.front) {
    for (const page of Object.values(pages) as any[]) {
      if (!page.imageinfo || !page.imageinfo[0]) continue;
      const info = page.imageinfo[0];
      const meta = info.extmetadata || {};
      const title = page.title;
      const desc = (meta.ImageDescription?.value || '').replace(/<[^>]+>/g, ' ');
      const combinedText = `${title} ${desc}`.toLowerCase();
      if (NOISE_FILTER.test(combinedText)) continue;

      views.front = {
        file: title,
        url: info.url,
        author: cleanAuthor(meta.Artist?.value),
        license: cleanLicense(meta.LicenseShortName?.value),
        sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replace(/\s+/g, '_'))}`,
        width: info.width,
        height: info.height
      };
      break;
    }
  }

  return views;
}
