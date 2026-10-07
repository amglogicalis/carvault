/**
 * Carvault - construye data/bmw/catalog.json a partir de Wikipedia (estructura) + Commons (categorías) + overrides.
 * Jerarquía: Serie -> Generación -> Chasis (F20, carrocería) -> Variante (M135i; se añade en una fase posterior).
 * Uso: node pipeline/build-catalog.ts
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const wiki = JSON.parse(await readFile('data/reference/wikipedia-bmw.json', 'utf8'));
const audit = JSON.parse(await readFile('data/_reports/audit-bmw.json', 'utf8'));
const overrides = JSON.parse(await readFile('data/bmw/overrides.json', 'utf8'));

const commonsCats: string[] = [...audit.both, ...audit.onlyCommons.map((x: any) => x.category)];
const commonsSet = new Set(commonsCats);

const CODE = /^[A-Za-z]{1,2}\d{1,3}$/;
const NOT_CAR = /(motorcycle|tricycle|freight|truck|scooter|aircraft|engine)/i;
const tokens = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
const norm = (s: string) => s.toLowerCase().replace(/^bmw\s*/, '').replace(/[^a-z0-9]+/g, '');
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const baseName = (s: string) => s.replace(/\s*\([^)]*\)/g, '').trim();
const parenCodes = (s: string) =>
  [...s.matchAll(/\(([^)]+)\)/g)].flatMap((m) => m[1].split(/[\s/,]+/)).filter((c) => CODE.test(c));

function parseYears(y: string): { start: number | null; end: number | null } {
  const m = y.match(/(\d{4})\s*(?:[–-]\s*(\d{4})?)?/);
  if (!m) return { start: null, end: null };
  const start = Number(m[1]);
  const hasRange = /[–-]/.test(y);
  return { start, end: m[2] ? Number(m[2]) : hasRange ? null : start };
}

/** Categoría de Commons para un código: token exacto; se prefiere el nombre más corto (p. ej. "BMW E46" sobre "BMW E46 Touring"). */
function commonsFor(seriesKey: string, code: string | null, fallbackName: string) {
  const forced = overrides.commonsCategory[`${seriesKey}|${code ?? fallbackName}`];
  if (forced) return { primary: forced, candidates: [forced], manual: true };
  const cands = code
    ? commonsCats.filter((c) => tokens(c).includes(code.toLowerCase()))
    : commonsCats.filter((c) => norm(c) === norm(fallbackName));
  cands.sort((a, b) => a.length - b.length);
  return { primary: cands[0] ?? null, candidates: cands.slice(0, 8), manual: false };
}

type Chassis = {
  code: string | null;
  lwb: boolean;
  parent: string | null;
  market: string | null;
  verified: boolean;
  commonsCategory: string | null;
  commonsCandidates: string[];
  commonsManual: boolean;
};
type Generation = {
  id: string;
  series: string;
  label: string;
  section: 'production' | 'prototypes';
  status: 'current' | 'discontinued';
  years: { start: number | null; end: number | null };
  class: string;
  chassis: Chassis[];
};

function buildChassis(seriesKey: string, codes: string[], fallbackName: string): Chassis[] {
  const list: (string | null)[] = codes.length ? codes : [null];
  return list.map((code) => {
    const lwb = code ? overrides.lwb[code] : undefined;
    const c = commonsFor(seriesKey, code, fallbackName);
    return {
      code,
      lwb: !!lwb,
      parent: lwb?.parent ?? null,
      market: lwb?.market ?? null,
      verified: lwb ? lwb.verified : true,
      commonsCategory: c.primary,
      commonsCandidates: c.candidates,
      commonsManual: c.manual,
    };
  });
}

const generations: Generation[] = [];
const seen = new Set<string>();
const push = (g: Generation) => {
  let id = g.id;
  for (let i = 2; seen.has(id); i++) id = `${g.id}-${i}`;
  seen.add(id);
  generations.push({ ...g, id });
};
const section = (name: string): 'production' | 'prototypes' => (overrides.prototypes.includes(name) ? 'prototypes' : 'production');

// Modelos actuales: ['', serie, códigos, intro serie, intro generación, facelift, descripción]
for (const r of wiki.current) {
  if (r.length < 7 || r[0] !== '' || !r[1]) continue;
  if (NOT_CAR.test(r[6] ?? '')) continue;
  const codes = r[2].split(/[\s/,]+/).filter((c: string) => CODE.test(c));
  push({
    id: `bmw-${slug(r[1])}-${codes.map((c: string) => c.toLowerCase()).join('-') || 'x'}`,
    series: baseName(r[1]),
    label: r[1],
    section: 'production',
    status: 'current',
    years: { start: parseYears(r[4]).start, end: null },
    class: r[6],
    chassis: buildChassis(r[1], codes, r[1]),
  });
}

// Descontinuados: [serie, años, clase]
for (const r of wiki.discontinued.slice(1)) {
  if (r.length < 3 || NOT_CAR.test(r[2])) continue;
  const codes = [...new Set(parenCodes(r[0]))];
  const name = baseName(r[0]);
  push({
    id: `bmw-${slug(r[0])}`,
    series: name,
    label: r[0],
    section: section(r[0]),
    status: 'discontinued',
    years: parseYears(r[1]),
    class: r[2],
    chassis: buildChassis(r[0], codes, name),
  });
}

const chassisAll = generations.flatMap((g) => g.chassis);
const stats = {
  generations: generations.length,
  production: generations.filter((g) => g.section === 'production').length,
  prototypes: generations.filter((g) => g.section === 'prototypes').length,
  chassis: chassisAll.length,
  lwbChassis: chassisAll.filter((c) => c.lwb).length,
  chassisWithoutCommons: chassisAll.filter((c) => !c.commonsCategory).length,
  unverified: chassisAll.filter((c) => !c.verified).length,
};
console.log(stats);
for (const g of generations)
  for (const c of g.chassis) if (!c.commonsCategory) console.log(`  sin Commons: ${g.label} [${c.code ?? '-'}]`);

await mkdir('data/bmw', { recursive: true });
await writeFile(
  'data/bmw/catalog.json',
  JSON.stringify({ brand: 'BMW', wikidata: 'Q26678', generatedAt: new Date().toISOString(), stats, generations }, null, 2),
);
void commonsSet;
