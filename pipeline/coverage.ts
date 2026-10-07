/**
 * Carvault - medición de cobertura de fotos por generación (Wikidata + Wikimedia Commons).
 * Uso: node pipeline/coverage.ts [QID_marca]   (por defecto BMW = Q26678)
 * Salida: data/_reports/coverage-<QID>.json y un resumen por consola.
 */
import { mkdir, writeFile } from 'node:fs/promises';

const UA = 'Carvault/0.1 (https://github.com/amglogicalis/carvault)';
const BRAND = process.argv[2] ?? 'Q26678';

type View = 'front' | 'rear' | 'side' | 'threeQuarter';
const VIEW_HINTS: Record<View, RegExp> = {
  front: /\b(front|frontal|vorne|avant|frente)\b/i,
  rear: /\b(rear|back|heck|hinten|arri[eè]re|trasera|trasero)\b/i,
  side: /\b(side|profile|seitlich|lateral|profil)\b/i,
  threeQuarter: /\b(3[\s-_]?4|three[\s-_]?quarter|front[\s-_]?left|front[\s-_]?right|rear[\s-_]?left|rear[\s-_]?right)\b/i,
};

async function getJson(url: string, tries = 3): Promise<any> {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
    if (res.ok) return res.json();
    if (res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
      continue;
    }
    throw new Error(`${res.status} ${url}`);
  }
  throw new Error(`Failed after retries: ${url}`);
}

async function sparql(query: string) {
  const url = 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(query);
  return (await getJson(url)).results.bindings as Record<string, { value: string }>[];
}

async function commonsFiles(category: string): Promise<string[]> {
  const files: string[] = [];
  let cont = '';
  do {
    const url =
      'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtype=file&cmlimit=500&format=json' +
      `&cmtitle=${encodeURIComponent('Category:' + category)}${cont}`;
    const j = await getJson(url);
    for (const m of j.query?.categorymembers ?? []) files.push(m.title as string);
    cont = j.continue?.cmcontinue ? `&cmcontinue=${encodeURIComponent(j.continue.cmcontinue)}` : '';
  } while (cont);
  return files;
}

const models = await sparql(`
SELECT DISTINCT ?m ?mLabel ?cat WHERE {
  ?m wdt:P176 wd:${BRAND}; wdt:P31/wdt:P279* wd:Q3231690.
  ?m wdt:P373 ?cat.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`);
console.log(`Modelos con categoría de Commons: ${models.length}`);

const rows = [];
for (const m of models) {
  const category = m.cat.value;
  let files: string[] = [];
  try {
    files = await commonsFiles(category);
  } catch (e) {
    console.warn(`  ! ${category}: ${(e as Error).message}`);
  }
  const views: Record<View, number> = { front: 0, rear: 0, side: 0, threeQuarter: 0 };
  for (const f of files)
    for (const v of Object.keys(VIEW_HINTS) as View[]) if (VIEW_HINTS[v].test(f)) views[v]++;
  const covered = (Object.values(views) as number[]).filter((n) => n > 0).length;
  rows.push({ qid: m.m.value.split('/').pop(), name: m.mLabel.value, category, files: files.length, views, viewsCovered: covered });
  console.log(`${m.mLabel.value.padEnd(32)} files=${String(files.length).padStart(4)} views=${covered}/4`);
}

const summary = {
  brand: BRAND,
  generatedAt: new Date().toISOString(),
  models: rows.length,
  withAnyPhoto: rows.filter((r) => r.files > 0).length,
  withAll4Hints: rows.filter((r) => r.viewsCovered === 4).length,
  withAtLeast2: rows.filter((r) => r.viewsCovered >= 2).length,
};
console.log('\nResumen', summary);
await mkdir('data/_reports', { recursive: true });
await writeFile(`data/_reports/coverage-${BRAND}.json`, JSON.stringify({ summary, rows }, null, 2));
