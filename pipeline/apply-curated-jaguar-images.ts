import fs from 'fs';
import path from 'path';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

const CURATED_FILES: Record<string, string> = {
  'jaguar-f-type-x152-facelift-2': 'File:2021 Jaguar F-Type R-Dynamic in Portofino Blue Metallic, Front Left, 08-13-2022.jpg',
  'jaguar-f-type-x152-pre-facelift': 'File:2015 Jaguar F-Type S V6 AWD Automatic 3.0 Front.jpg',
  'jaguar-f-type-project-7': 'File:2016 Jaguar F Type Project 7 Auto 2.jpg',
  'jaguar-xj40': 'File:Jaguar XJ6 XJ40 Vanden Plas Black Cherry - front.jpg',
  'jaguar-xf-x250-facelift': 'File:Jaguar XF Facelift.jpg',
  'jaguar-xjs-facelift': 'File:1993 Jaguar XJS 4.0 Litre Convertible in New Glacier White, Front Right, 05-27-2023.jpg'
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

async function verifyHead(url: string): Promise<boolean> {
  await new Promise(r => setTimeout(r, 400));
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': UA }
    });
    return res.status === 200;
  } catch (e) {
    return false;
  }
}

async function main() {
  const catalogPath = path.join(process.cwd(), 'data', 'jaguar', 'catalog-clean-front.json');
  const apiPath = path.join(process.cwd(), 'public', 'api', 'v1', 'jaguar.json');

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  let updatedCount = 0;
  for (const [genId, fileTitle] of Object.entries(CURATED_FILES)) {
    console.log(`\nConsultando metadata para: ${genId} -> ${fileTitle}`);
    const info = await getFileInfo(fileTitle);
    if (!info) {
      console.error(`❌ No se pudo obtener info de ${fileTitle}`);
      continue;
    }
    console.log(`URL obtenida: ${info.url}`);
    const ok = await verifyHead(info.url);
    console.log(`Estado HEAD 200: ${ok ? '🟢 OK' : '🔴 FALLÓ'}`);

    if (!ok) {
      console.error(`La URL no respondió 200!`);
      continue;
    }

    const gen = catalog.generations.find((g: any) => g.id === genId);
    if (gen) {
      gen.frontImage = {
        url: info.url,
        view: 'frontal_tres_cuartos',
        timeOfDay: 'dia',
        curatedBy: 'agent-vision-curation-exact-front',
        author: info.author,
        license: info.license,
        sourceUrl: info.sourceUrl
      };
      updatedCount++;
      console.log(`✅ Aplicado a ${gen.label} (${genId})`);
    } else {
      console.warn(`No se encontró modelo con ID ${genId}`);
    }
  }

  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync(apiPath, JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n🎉 Completado: ${updatedCount} de ${Object.keys(CURATED_FILES).length} imágenes curadas y guardadas.`);
}

main();
