/**
 * Carvault - parser de la lista de vehículos BMW de Wikipedia (referencia independiente / checklist).
 * Uso: node pipeline/parse-wikipedia-bmw.ts
 * Entrada: pipeline/.cache/wiki-list-bmw.html (descargado con la API de MediaWiki)
 * Salida: data/reference/wikipedia-bmw.json
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const html = await readFile('pipeline/.cache/wiki-list-bmw.html', 'utf8');
const tables = [...html.matchAll(/<table[\s\S]*?<\/table>/g)].map((m) => m[0]);

const clean = (s: string) =>
  s
    .replace(/<sup[\s\S]*?<\/sup>/g, '')
    .replace(/<br\s*\/?>/g, ' / ')
    .replace(/<[^>]+>/g, '')
    .replace(/&#160;|&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/\s+/g, ' ')
    .trim();

function rows(table: string): string[][] {
  return [...table.matchAll(/<tr[\s\S]*?<\/tr>/g)]
    .map((tr) => [...tr[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => clean(c[1])))
    .filter((r) => r.length > 0);
}

const current = rows(tables[0]);
const discontinued = rows(tables[2]);
console.log('T0 header:', current[0]);
console.log('T0 sample:', current.slice(1, 6));
console.log('T2 header:', discontinued[0]);
console.log('T2 sample:', discontinued.slice(1, 8));

await mkdir('data/reference', { recursive: true });
await writeFile(
  'data/reference/wikipedia-bmw.json',
  JSON.stringify(
    {
      source: 'https://en.wikipedia.org/wiki/List_of_BMW_vehicles',
      license: 'CC BY-SA 4.0',
      retrievedAt: new Date().toISOString(),
      current,
      discontinued,
    },
    null,
    2,
  ),
);
