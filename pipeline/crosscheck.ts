/**
 * Carvault - cruce Wikipedia (checklist) vs Commons + Wikidata.
 * Uso: node pipeline/crosscheck.ts
 * Salida: data/_reports/crosscheck-bmw.json
 */
import { readFile, writeFile } from 'node:fs/promises';

const wiki = JSON.parse(await readFile('data/reference/wikipedia-bmw.json', 'utf8'));
const audit = JSON.parse(await readFile('data/_reports/audit-bmw.json', 'utf8'));
const cov = JSON.parse(await readFile('data/_reports/coverage-Q26678.json', 'utf8'));

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/^bmw\s*/, '')
    .replace(/[^a-z0-9]+/g, '');

const commonsCats: string[] = [...audit.both, ...audit.onlyCommons.map((x: any) => x.category)];
const wikidataCats: string[] = cov.rows.map((r: any) => r.category);
const wikidataNames: string[] = cov.rows.map((r: any) => r.name);
const commonsIdx = commonsCats.map((c) => ({ c, n: norm(c) }));
const wdIdx = [...wikidataCats, ...wikidataNames].map(norm);

type Entry = { series: string; codes: string[]; years: string; kind: 'current' | 'discontinued'; cls?: string };
const entries: Entry[] = [];

// Tabla actual: filas con 7 celdas: ['', serie, códigos, intro, actual, facelift, desc]
for (const r of wiki.current) {
  if (r.length >= 6 && r[0] === '' && r[1]) {
    entries.push({ series: r[1], codes: r[2].split(/[\s/,]+/).filter(Boolean), years: `${r[3]}–`, kind: 'current', cls: r[6] });
  }
}
// Tabla descontinuados: [serie, años, clase]; saltar cabecera
for (const r of wiki.discontinued.slice(1)) {
  if (r.length >= 3) entries.push({ series: r[0], codes: [], years: r[1], kind: 'discontinued', cls: r[2] });
}

const isCar = (e: Entry) => !/(motorcycle|tricycle|freight|truck|scooter|aircraft|engine)/i.test(e.cls ?? '');

// Códigos de chasis dentro de paréntesis: "3 Series (E90/E91/E92/E93)" -> E90,E91,E92,E93
const parenCodes = (s: string) =>
  [...s.matchAll(/\(([^)]+)\)/g)].flatMap((m) => m[1].split(/[\s/,]+/)).filter((c) => /^[A-Za-z]{1,2}\d{1,3}$/.test(c));
const baseName = (s: string) => s.replace(/\s*\([^)]*\)/g, '').trim();

const results = entries.filter(isCar).map((e) => {
  const codes = [...new Set([...e.codes, ...parenCodes(e.series)])].filter((c) => /^[A-Za-z]{1,2}\d{1,3}$/.test(c));
  const check = (k: string) => ({
    commons: commonsIdx.filter((x) => x.n.includes(k)).map((x) => x.c),
    wikidata: wdIdx.some((w) => w.includes(k)),
  });
  // Si hay códigos de chasis, se comprueba cada uno; si no, el nombre base de la serie
  const keys = codes.length ? codes : [baseName(e.series)];
  const perKey = keys.map((k) => ({ key: k, ...check(norm(k)) }));
  return {
    ...e,
    codes,
    perKey: perKey.map((p) => ({ key: p.key, commons: p.commons.length, wikidata: p.wikidata, sample: p.commons.slice(0, 2) })),
    commonsMissingKeys: perKey.filter((p) => p.commons.length === 0).map((p) => p.key),
    wikidataMissingKeys: perKey.filter((p) => !p.wikidata).map((p) => p.key),
  };
});

const missingCommons = results.filter((r) => r.commonsMissingKeys.length > 0);
const missingWikidata = results.filter((r) => r.wikidataMissingKeys.length > 0);
console.log({
  wikipediaCars: results.length,
  entriesWithCommonsGaps: missingCommons.length,
  entriesWithWikidataGaps: missingWikidata.length,
});
console.log('\nEn Wikipedia pero SIN categoría en Commons (códigos/serie faltantes):');
for (const r of missingCommons) console.log(`  [${r.kind}] ${r.series} (${r.years}) -> faltan: ${r.commonsMissingKeys.join(', ')}`);

await writeFile('data/_reports/crosscheck-bmw.json', JSON.stringify({ results, missingCommons, missingWikidata }, null, 2));
