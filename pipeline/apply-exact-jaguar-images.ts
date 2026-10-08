import fs from 'fs';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

const EXACT_FILES: Record<string, string> = {
  'jaguar-xe-x760-facelift': 'File:2020 Jaguar XE R-Dynamic S AWD Auto.jpg',
  'jaguar-xe-sv-project-8': 'File:2018 Jaguar XE SV Project 8 Auto.jpg',
  'jaguar-s-type-x200-pre-facelift': "File:'00-'02 Jaguar S-Type.JPG",
  'jaguar-s-type-x200-facelift': "File:'06-'08 Jaguar S-Type.jpg",
  'jaguar-xk120': 'File:1951 Jaguar XK120 HCC22.jpg',
  'jaguar-d-type': 'File:1956JaguarD-TypeLongNose.jpg',
  'jaguar-c-x75-concept': 'File:Silver jaguar c-x75.jpg',
  'jaguar-e-type-series-1': 'File:1963 Jaguar XK-E Roadster.jpg',
  'jaguar-e-type-series-3': 'File:1972 Jaguar E-Type Series 3 Coupe at Capel Manor, Enfield, London, England.jpg',
  'jaguar-i-pace-x590': 'File:2018 Jaguar I-Pace EV400 AWD Front.jpg',
  'jaguar-f-pace-x761-pre-facelift': 'File:2018 Jaguar F-PACE Portfolio, front left, 06-14-2026.jpg',
  'jaguar-xj220': 'File:Jaguar XJ220 1997 - front.jpg',
  'jaguar-xk8-x100-facelift': 'File:2005 Jaguar XK8 Convertible Automatic 4.2 Front.jpg',
  'jaguar-xk8-x100-pre-facelift': 'File:1997 Jaguar XK8 Coupe Automatic 4.0 Front.jpg',
  'jaguar-e-pace-x540-facelift': 'File:2022 Jaguar E-Pace P250 SE front left.jpg',
  'jaguar-e-pace-x540-pre-facelift': 'File:Jaguar E-Pace D180 AWD S – Frontansicht, 24. Juni 2018 Düsseldorf.jpg',
  'jaguar-xj40': 'File:Jaguar XJ 3.6 Sovereign (XJ40) front.jpg',
  'jaguar-xjs-facelift': 'File:Jaguar XJS registered January 1978 5343cc.JPG',
  'jaguar-xjs-pre-facelift': 'File:1984 Jaguar XJS BTCC (52877487050).jpg'
};

async function getFileInfo(fileTitle: string) {
  await new Promise(r => setTimeout(r, 400));
  const metaUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  const mRes = await fetch(metaUrl, { headers: { 'User-Agent': UA } });
  if (!mRes.ok) return null;
  const mData = await mRes.json();
  const page = Object.values(mData.query?.pages || {})[0] as any;
  if (!page?.imageinfo?.[0]) return null;
  const info = page.imageinfo[0];
  const meta = info.extmetadata || {};
  return {
    file: fileTitle,
    url: info.url,
    author: (meta.Artist?.value || 'Wikimedia contributor').replace(/<[^>]+>/g, '').trim(),
    license: meta.LicenseShortName?.value || 'CC BY-SA',
    sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replace(/\s+/g, '_'))}`,
    width: info.width,
    height: info.height
  };
}

async function run() {
  const catalog = JSON.parse(fs.readFileSync('data/jaguar/catalog-clean-front.json', 'utf8'));

  for (const [genId, fileTitle] of Object.entries(EXACT_FILES)) {
    const gen = catalog.generations.find((g: any) => g.id === genId);
    if (!gen) {
      console.warn('No encontrado genId:', genId);
      continue;
    }
    console.log(`Verificando y aplicando: ${genId} -> ${fileTitle}...`);
    const imgInfo = await getFileInfo(fileTitle);
    if (imgInfo) {
      await new Promise(r => setTimeout(r, 400));
      const headRes = await fetch(imgInfo.url, { method: 'HEAD', headers: { 'User-Agent': UA } });
      if (headRes.status === 200) {
        console.log(`  ✓ HTTP 200 OK: ${imgInfo.url}`);
        gen.frontImage = imgInfo;
      } else {
        console.warn(`  ❌ Status ${headRes.status} para ${imgInfo.url}`);
      }
    } else {
      console.warn(`  ❌ No se pudo obtener info de ${fileTitle}`);
    }
  }

  fs.writeFileSync('data/jaguar/catalog-clean-front.json', JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync('public/api/v1/jaguar.json', JSON.stringify(catalog, null, 2), 'utf8');
  console.log('✅ Catálogo de Jaguar actualizado con imágenes exactas.');
}

run();
