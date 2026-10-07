/**
 * Carvault - construye data/bmw/catalog.json:
 * 1. Producción + Prototipos y Conceptos (desde Wikipedia list + concepts)
 * 2. Modelos actuales con años: start -> null, label: "start - Actualidad"
 * 3. Variantes de chasis obtenidas del árbol exhaustivo de Commons (commons-tree-bmw.json)
 * 4. Jerarquía completa: Serie -> Generación -> Chasis -> Variantes
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const wiki = JSON.parse(await readFile('data/reference/wikipedia-bmw.json', 'utf8'));
const wikiConcepts = JSON.parse(await readFile('data/reference/wikipedia-bmw-concepts.json', 'utf8'));
const commonsTree = JSON.parse(await readFile('data/_reports/commons-tree-bmw.json', 'utf8'));
const overrides = JSON.parse(await readFile('data/bmw/overrides.json', 'utf8'));

const CODE = /^[A-Za-z]{1,2}\d{1,3}$/;
const NOT_CAR = /(motorcycle|tricycle|freight|truck|scooter|aircraft|engine)/i;
const tokens = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
const norm = (s: string) => s.toLowerCase().replace(/^bmw\s*/, '').replace(/[^a-z0-9]+/g, '');
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const baseName = (s: string) => s.replace(/\s*\([^)]*\)/g, '').trim();
const parenCodes = (s: string) =>
  [...s.matchAll(/\(([^)]+)\)/g)].flatMap((m) => m[1].split(/[\s/,]+/)).filter((c) => CODE.test(c));

const allCommonsCategories = Object.keys(commonsTree);

function parseYears(y: string): { start: number | null; end: number | null; display: string } {
  const m = y.match(/(\d{4})\s*(?:[–-]\s*(\d{4})?)?/);
  if (!m) return { start: null, end: null, display: y };
  const start = Number(m[1]);
  const hasRange = /[–-]/.test(y);
  const end = m[2] ? Number(m[2]) : null;
  const isPresent = hasRange && !end;
  const display = isPresent ? `${start} – Actualidad` : end ? `${start} – ${end}` : `${start}`;
  return { start, end, display };
}

function commonsFor(seriesKey: string, code: string | null, fallbackName: string) {
  const forced = overrides.commonsCategory[`${seriesKey}|${code ?? fallbackName}`];
  if (forced) return { primary: forced, candidates: [forced], manual: true };
  const cands = code
    ? allCommonsCategories.filter((c) => tokens(c).includes(code.toLowerCase()))
    : allCommonsCategories.filter((c) => norm(c) === norm(fallbackName));
  cands.sort((a, b) => a.length - b.length);
  return { primary: cands[0] ?? null, candidates: cands.slice(0, 8), manual: false };
}

// Extrae variantes a partir del commonsTree para una categoría base dada
const VARIANT_NOISE = /\b(by |color|colour|interior|engine|wheels?|badges?|details?|crashed|museum|tuning|models?|racing|rally|police|taxi)\b/i;
function findVariantsForCategory(parentCategory: string | null): string[] {
  if (!parentCategory) return [];
  const directChildren: string[] = [];
  for (const [cat, meta] of Object.entries(commonsTree) as [string, { parent: string }][]) {
    if (meta.parent === parentCategory && !VARIANT_NOISE.test(cat)) {
      directChildren.push(cat.replace(/^BMW\s+/i, ''));
    }
  }
  return directChildren;
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
  variants: string[];
};

type Generation = {
  id: string;
  series: string;
  label: string;
  section: 'production' | 'prototypes';
  status: 'current' | 'discontinued' | 'concept';
  years: { start: number | null; end: number | null; display: string };
  class: string;
  designer?: string | null;
  chassis: Chassis[];
};

function buildChassis(seriesKey: string, codes: string[], fallbackName: string): Chassis[] {
  const list: (string | null)[] = codes.length ? codes : [null];
  return list.map((code) => {
    const lwb = code ? overrides.lwb[code] : undefined;
    const c = commonsFor(seriesKey, code, fallbackName);
    const variants = findVariantsForCategory(c.primary);
    return {
      code,
      lwb: !!lwb,
      parent: lwb?.parent ?? null,
      market: lwb?.market ?? null,
      verified: lwb ? lwb.verified : true,
      commonsCategory: c.primary,
      commonsCandidates: c.candidates,
      commonsManual: c.manual,
      variants,
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

// 1. Modelos actuales
for (const r of wiki.current) {
  if (r.length < 7 || r[0] !== '' || !r[1]) continue;
  if (NOT_CAR.test(r[6] ?? '')) continue;
  const codes = r[2].split(/[\s/,]+/).filter((c: string) => CODE.test(c));
  const startYr = parseYears(r[4]).start;
  push({
    id: `bmw-${slug(r[1])}-${codes.map((c: string) => c.toLowerCase()).join('-') || 'x'}`,
    series: baseName(r[1]),
    label: r[1],
    section: 'production',
    status: 'current',
    years: { start: startYr, end: null, display: `${startYr} – Actualidad` },
    class: r[6],
    chassis: buildChassis(r[1], codes, r[1]),
  });
}

// 2. Descontinuados
for (const r of wiki.discontinued.slice(1)) {
  if (r.length < 3 || NOT_CAR.test(r[2])) continue;
  const codes = [...new Set(parenCodes(r[0]))];
  const name = baseName(r[0]);
  const isProto = overrides.prototypes.includes(r[0]) || overrides.prototypes.includes(name);
  push({
    id: `bmw-${slug(r[0])}`,
    series: name,
    label: r[0],
    section: isProto ? 'prototypes' : 'production',
    status: 'discontinued',
    years: parseYears(r[1]),
    class: r[2],
    chassis: buildChassis(r[0], codes, name),
  });
}

// 3. Prototipos y Conceptos (Wikipedia Concepts)
for (const c of wikiConcepts.concepts) {
  const cName = c.model;
  // Comprobar si ya existe en producción para evitar duplicados
  const exists = generations.some((g) => norm(g.label) === norm(cName) || norm(g.series) === norm(cName));
  if (exists) continue;

  const commons = commonsFor('concept', null, `BMW ${cName}`);
  const variants = findVariantsForCategory(commons.primary);

  push({
    id: `bmw-concept-${slug(cName)}`,
    series: 'Concept / Prototype',
    label: `BMW ${cName}`,
    section: 'prototypes',
    status: 'concept',
    years: { start: c.year, end: c.year, display: `${c.year}` },
    class: 'Concept car / Prototype',
    designer: c.designer ?? null,
    chassis: [
      {
        code: null,
        lwb: false,
        parent: null,
        market: null,
        verified: true,
        commonsCategory: commons.primary,
        commonsCandidates: commons.candidates,
        commonsManual: commons.manual,
        variants,
      },
    ],
  });
}

const chassisAll = generations.flatMap((g) => g.chassis);
const stats = {
  generations: generations.length,
  production: generations.filter((g) => g.section === 'production').length,
  prototypes: generations.filter((g) => g.section === 'prototypes').length,
  chassis: chassisAll.length,
  lwbChassis: chassisAll.filter((c) => c.lwb).length,
  totalVariants: chassisAll.reduce((acc, c) => acc + c.variants.length, 0),
  chassisWithoutCommons: chassisAll.filter((c) => !c.commonsCategory).length,
};

console.log('Stats del catálogo completo:', stats);

await mkdir('data/bmw', { recursive: true });
await writeFile(
  'data/bmw/catalog.json',
  JSON.stringify({ brand: 'BMW', wikidata: 'Q26678', generatedAt: new Date().toISOString(), stats, generations }, null, 2),
);
