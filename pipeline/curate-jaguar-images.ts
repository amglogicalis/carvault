import fs from 'fs';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

async function searchImageForModel(query: string): Promise<any | null> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=10&format=json`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) return null;
    const data = await res.json();
    for (const item of data.query?.search || []) {
      const title = item.title as string;
      if (/rear|interior|engine|wheel|badge|side|caliper|cockpit|dashboard|tail|svg|pdf/i.test(title)) continue;
      
      const metaUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
      const mRes = await fetch(metaUrl, { headers: { 'User-Agent': UA } });
      if (!mRes.ok) continue;
      const mData = await mRes.json();
      const page = Object.values(mData.query?.pages || {})[0] as any;
      if (!page?.imageinfo?.[0]) continue;
      const info = page.imageinfo[0];
      const headRes = await fetch(info.url, { method: 'HEAD', headers: { 'User-Agent': UA } });
      if (headRes.status === 200) {
        const meta = info.extmetadata || {};
        return {
          file: title,
          url: info.url,
          author: (meta.Artist?.value || 'Wikimedia contributor').replace(/<[^>]+>/g, '').trim(),
          license: meta.LicenseShortName?.value || 'CC BY-SA',
          sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replace(/\s+/g, '_'))}`,
          width: info.width,
          height: info.height
        };
      }
    }
  } catch {}
  return null;
}

const MISSING_MAP: Record<string, string> = {
  'jaguar-xk8-x100-facelift': 'Jaguar XK8 4.2 front',
  'jaguar-xj40': 'Jaguar XJ40 front',
  'jaguar-xe-x760-facelift': 'Jaguar XE facelift front',
  'jaguar-xe-sv-project-8': 'Jaguar Project 8 front',
  'jaguar-f-pace-x761-pre-facelift': 'Jaguar F-Pace front',
  'jaguar-e-pace-x540-facelift': 'Jaguar E-Pace front facelift',
  'jaguar-e-pace-x540-pre-facelift': 'Jaguar E-Pace front',
  'jaguar-i-pace-x590': 'Jaguar I-Pace front EV400',
  'jaguar-s-type-x200-facelift': 'Jaguar S-Type facelift front',
  'jaguar-s-type-x200-pre-facelift': 'Jaguar S-Type front',
  'jaguar-xj220': 'Jaguar XJ220 front',
  'jaguar-xjs-facelift': 'Jaguar XJS facelift front',
  'jaguar-xjs-pre-facelift': 'Jaguar XJS front',
  'jaguar-e-type-series-1': 'Jaguar E-Type Series 1 front',
  'jaguar-e-type-series-3': 'Jaguar E-Type Series 3 front',
  'jaguar-xk120': 'Jaguar XK120 front',
  'jaguar-d-type': 'Jaguar D-Type front',
  'jaguar-c-x75-concept': 'Jaguar C-X75 front'
};

async function run() {
  const catalog = JSON.parse(fs.readFileSync('data/jaguar/catalog-clean-front.json', 'utf8'));

  for (const gen of catalog.generations) {
    if (MISSING_MAP[gen.id]) {
      console.log(`Buscando imagen real para ${gen.label} (${gen.id})...`);
      const img = await searchImageForModel(MISSING_MAP[gen.id]);
      if (img) {
        console.log(`  ✓ Encontrada: ${img.file}`);
        gen.frontImage = img;
      } else {
        console.warn(`  ❌ No se encontró imagen para ${gen.id}`);
      }
    }
  }

  fs.writeFileSync('data/jaguar/catalog-clean-front.json', JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync('public/api/v1/jaguar.json', JSON.stringify(catalog, null, 2), 'utf8');
  console.log('✅ Catálogo curado y guardado.');
}

run();
