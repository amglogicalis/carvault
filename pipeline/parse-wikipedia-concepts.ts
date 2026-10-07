/**
 * Carvault - parser de "List of BMW concept vehicles" (Wikipedia).
 * Uso: node pipeline/parse-wikipedia-concepts.ts
 * Entrada: pipeline/.cache/wiki-concepts-bmw.html
 * Salida: data/reference/wikipedia-bmw-concepts.json
 */
import { readFile, writeFile } from 'node:fs/promises';

const html = await readFile('pipeline/.cache/wiki-concepts-bmw.html', 'utf8');
const table = html.match(/<table[\s\S]*?<\/table>/)![0];

const clean = (s: string) =>
  s
    .replace(/<sup[\s\S]*?<\/sup>/g, '')
    .replace(/<br\s*\/?>/g, ' / ')
    .replace(/<[^>]+>/g, '')
    .replace(/&#160;|&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const concepts: { year: number; model: string; designer: string | null }[] = [];
let year = 0;
for (const tr of table.matchAll(/<tr[\s\S]*?<\/tr>/g)) {
  const cells = [...tr[0].matchAll(/<t([hd])[^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => ({ th: c[1] === 'h', text: clean(c[2]) }));
  if (!cells.length || cells.some((c) => c.th && /^Year$/i.test(c.text))) continue;
  // El año puede venir en una celda con rowspan: si la primera celda es un año, se actualiza; si no, se hereda.
  let i = 0;
  if (/^\d{4}$/.test(cells[0].text)) {
    year = Number(cells[0].text);
    i = 1;
  }
  const model = cells[i]?.text;
  if (!model || !year) continue;
  concepts.push({ year, model, designer: cells[i + 1]?.text || null });
}

console.log(`Conceptos: ${concepts.length}`);
console.log(concepts.slice(0, 6), '...', concepts.slice(-4));
await writeFile(
  'data/reference/wikipedia-bmw-concepts.json',
  JSON.stringify(
    { source: 'https://en.wikipedia.org/wiki/List_of_BMW_concept_vehicles', license: 'CC BY-SA 4.0', retrievedAt: new Date().toISOString(), concepts },
    null,
    2,
  ),
);
