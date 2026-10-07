/**
 * Carvault - auditoría de completitud: árbol de Commons vs Wikidata.
 * Uso: node pipeline/audit-completeness.ts
 * Salida: data/_reports/audit-bmw.json (+ resumen por consola)
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const UA = 'Carvault/0.1 (https://github.com/amglogicalis/carvault)';
const ROOT = 'BMW automobiles by model';
const MAX_DEPTH = 3;
const CACHE_DIR = 'pipeline/.cache/commons';
const PAUSE_MS = 400; // cortesía con la API de Wikimedia
// Subcategorías que no son modelos/generaciones (ruido de Commons)
const NOISE =
  /\b(by (year|color|colour|country|location|body|engine|decade|type|photographer|coachbuilder|model year)|interior|engine|wheels?|badges?|logos?|details?|dashboards?|taillights?|headlights?|racing|race cars?|tuning|wrecks?|crashed|parked|in |at |of |videos?|diagrams?|drawings?|models? \(toys?\)|scale models?|police|taxi|advertising|museum|rally|sport|motorsport|art|vehicle|production)\b/i;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getJson(url: string, tries = 6): Promise<any> {
  await mkdir(CACHE_DIR, { recursive: true });
  const file = `${CACHE_DIR}/${createHash('sha1').update(url).digest('hex')}.json`;
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {}
  for (let i = 0; i < tries; i++) {
    await sleep(PAUSE_MS);
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
    if (res.ok) {
      const json = await res.json();
      await writeFile(file, JSON.stringify(json));
      return json;
    }
    const retryAfter = Number(res.headers.get('retry-after')) || 0;
    await sleep(Math.max(retryAfter * 1000, 3000 * 2 ** i));
  }
  throw new Error('failed: ' + url);
}

async function subcats(cat: string): Promise<string[]> {
  const out: string[] = [];
  let cont = '';
  do {
    const j = await getJson(
      'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtype=subcat&cmlimit=500&format=json' +
        `&cmtitle=${encodeURIComponent('Category:' + cat)}${cont}`,
    );
    for (const m of j.query?.categorymembers ?? []) out.push((m.title as string).replace(/^Category:/, ''));
    cont = j.continue?.cmcontinue ? `&cmcontinue=${encodeURIComponent(j.continue.cmcontinue)}` : '';
  } while (cont);
  return out;
}

const seen = new Map<string, { depth: number; parent: string }>();
async function crawl(cat: string, depth: number) {
  for (const s of await subcats(cat)) {
    if (seen.has(s) || NOISE.test(s)) continue;
    seen.set(s, { depth, parent: cat });
    if (depth < MAX_DEPTH) await crawl(s, depth + 1);
  }
}
await crawl(ROOT, 1);
console.log(`Categorías de Commons (ruido filtrado, profundidad ${MAX_DEPTH}): ${seen.size}`);

// Wikidata: categorías ya conocidas (informe previo de coverage.ts)
const cov = JSON.parse(await readFile('data/_reports/coverage-Q26678.json', 'utf8'));
const wdCats = new Set<string>(cov.rows.map((r: any) => r.category));

const onlyCommons = [...seen.entries()].filter(([c]) => !wdCats.has(c)).map(([c, v]) => ({ category: c, ...v }));
const onlyWikidata = [...wdCats].filter((c) => !seen.has(c) && c !== ROOT);
const both = [...seen.keys()].filter((c) => wdCats.has(c));

console.log({ commonsTotal: seen.size, wikidataTotal: wdCats.size, inBoth: both.length, onlyCommons: onlyCommons.length, onlyWikidata: onlyWikidata.length });
console.log('\nEjemplos solo en Commons (faltan en Wikidata):');
for (const x of onlyCommons.slice(0, 40)) console.log(`  d${x.depth} ${x.category}  <- ${x.parent}`);

await mkdir('data/_reports', { recursive: true });
await writeFile('data/_reports/audit-bmw.json', JSON.stringify({ both, onlyCommons, onlyWikidata }, null, 2));
