/**
 * Carvault - Parser de Modelos BMW M (Históricos y Actuales)
 * Extrae tanto los M puros (M1, M2, M3, M4, M5, M6, M8, X5M, etc.)
 * como las generaciones correspondientes con sus códigos de chasis propios (F87, G87, E46, E30, F80, G80...).
 */
import { readFile, writeFile } from 'node:fs/promises';

const html = await readFile('pipeline/.cache/wiki-bmw-m.html', 'utf8');

type MCar = {
  model: string;
  series: string;
  chassis: string[];
  years: { start: number; end: number | null; display: string };
  engine: string;
  power: string;
  body: string;
  categoryHint: string;
};

const mCars: MCar[] = [];

// 1. Current M Cars (párrafos de lista)
const currentMatches = [
  { model: 'M2', series: '2 Series', chassis: ['G87'], start: 2023, body: 'Coupé', engine: '3.0L Twin-Turbo I6' },
  { model: 'M3', series: '3 Series', chassis: ['G80', 'G81'], start: 2021, body: 'Saloon / Estate', engine: '3.0L Twin-Turbo I6' },
  { model: 'M4', series: '4 Series', chassis: ['G82', 'G83'], start: 2021, body: 'Coupé / Convertible', engine: '3.0L Twin-Turbo I6' },
  { model: 'M5', series: '5 Series', chassis: ['G90', 'G99'], start: 2024, body: 'Saloon / Touring', engine: '4.4L Twin-Turbo V8 Hybrid' },
  { model: 'X5 M', series: 'X5', chassis: ['F95'], start: 2020, body: 'SAV', engine: '4.4L Twin-Turbo V8' },
  { model: 'X6 M', series: 'X6', chassis: ['F96'], start: 2020, body: 'SAC', engine: '4.4L Twin-Turbo V8' },
  { model: 'XM', series: 'XM', chassis: ['G09'], start: 2022, body: 'SAV', engine: '4.4L Twin-Turbo V8 Hybrid' },
];

for (const c of currentMatches) {
  mCars.push({
    model: c.model,
    series: c.series,
    chassis: c.chassis,
    years: { start: c.start, end: null, display: `${c.start} – Actualidad` },
    engine: c.engine,
    power: 'M High Performance',
    body: c.body,
    categoryHint: `BMW ${c.model}`
  });
}

// 2. Previous M Cars (Tabla T1)
const tables = [...html.matchAll(/<table[\s\S]*?<\/table>/g)].map(m => m[0]);
const t1 = tables[1];
const rows = [...t1.matchAll(/<tr[\s\S]*?<\/tr>/g)].map(tr => {
  return [...tr[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(c => 
    c[1].replace(/<[^>]+>/g, '').replace(/&#160;|&nbsp;/g, ' ').replace(/&amp;/g, '&').trim()
  );
});

for (const r of rows.slice(1)) {
  if (r.length < 7) continue;
  const yearsRaw = r[0];
  const modelRaw = r[1];
  const typeRaw = r[2];
  const engineRaw = `${r[3]} ${r[4]}`.trim();
  const powerRaw = r[5];
  const bodyRaw = r[6];

  const ym = yearsRaw.match(/(\d{4})\s*(?:[–-]\s*(\d{4})?)?/);
  if (!ym) continue;
  const start = Number(ym[1]);
  const end = ym[2] ? Number(ym[2]) : null;

  const chassis = typeRaw.split(/[\s/,]+/).filter(c => /^[A-Za-z]{1,2}\d{1,3}(\/\d)?$/.test(c));

  let series = 'M Series';
  if (/^M1/i.test(modelRaw)) series = 'M1';
  else if (/^M2/i.test(modelRaw)) series = '2 Series';
  else if (/^M3/i.test(modelRaw)) series = '3 Series';
  else if (/^M4/i.test(modelRaw)) series = '4 Series';
  else if (/^M5/i.test(modelRaw)) series = '5 Series';
  else if (/^M6/i.test(modelRaw)) series = '6 Series';
  else if (/^M8/i.test(modelRaw)) series = '8 Series';
  else if (/X5/i.test(modelRaw)) series = 'X5';
  else if (/X6/i.test(modelRaw)) series = 'X6';
  else if (/Z4|Roadster|Coupe/i.test(modelRaw)) series = 'Z Series';

  mCars.push({
    model: modelRaw,
    series,
    chassis: chassis.length ? chassis : [typeRaw],
    years: { start, end, display: end ? `${start} – ${end}` : `${start}` },
    engine: engineRaw,
    power: powerRaw,
    body: bodyRaw,
    categoryHint: `BMW ${modelRaw}`
  });
}

console.log(`Modelos M extraídos: ${mCars.length}`);
await writeFile('data/reference/wikipedia-bmw-m.json', JSON.stringify(mCars, null, 2));
