import fs from 'fs';
import path from 'path';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

const CORRECTIONS: Record<string, string> = {
  'jaguar-xk-x150-pre-facelift': 'File:Jaguar X150 front 20080223.jpg',
  'jaguar-xj-x351-facelift': 'File:2018 Jaguar XJL Autobiography Diesel V6 Automatic 3.0 Front.jpg',
  'jaguar-xj-x350': 'File:2006 Jaguar XJ Sovereign TDVi Automatic 2.8 Front.jpg'
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
  const gatewayPath = path.join(process.cwd(), 'public', 'api', 'v1', 'carvault.json');

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  for (const [genId, fileTitle] of Object.entries(CORRECTIONS)) {
    console.log(`\nProcesando: ${genId} -> ${fileTitle}`);
    const info = await getFileInfo(fileTitle);
    if (!info) {
      console.error(`❌ Falló obtención de info para ${fileTitle}`);
      process.exit(1);
    }
    const ok = await verifyHead(info.url);
    console.log(`HEAD 200: ${ok ? '🟢 OK' : '🔴 ERROR'} | URL: ${info.url}`);
    if (!ok) {
      console.error(`URL no accesible para ${fileTitle}`);
      process.exit(1);
    }

    const gen = catalog.generations.find((g: any) => g.id === genId);
    if (gen) {
      gen.frontImage = {
        file: fileTitle,
        url: info.url,
        view: 'frontal_tres_cuartos',
        timeOfDay: 'dia',
        curatedBy: 'agent-exact-restyling-distinction',
        author: info.author,
        license: info.license,
        sourceUrl: info.sourceUrl,
        width: info.width,
        height: info.height
      };
      console.log(`✅ Aplicado a ${gen.label}`);
    } else {
      console.error(`No encontrado genId ${genId}`);
      process.exit(1);
    }
  }

  // Guardar en data/ y public/api/v1/
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync(apiPath, JSON.stringify(catalog, null, 2), 'utf8');

  // Sincronizar en carvault.json
  const gateway = JSON.parse(fs.readFileSync(gatewayPath, 'utf8'));
  const jIndex = gateway.brands.findIndex((b: any) => b.id === 'jaguar');
  if (jIndex !== -1) {
    gateway.brands[jIndex].generations = catalog.generations;
    fs.writeFileSync(gatewayPath, JSON.stringify(gateway, null, 2), 'utf8');
    console.log('✅ Gateway carvault.json sincronizado.');
  }

  console.log('\n🎉 ¡Las 3 distinciones de imágenes han sido corregidas con éxito!');
}

main();
