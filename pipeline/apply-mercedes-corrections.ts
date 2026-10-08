import * as fs from 'fs';
import * as path from 'path';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

const REPLACEMENTS: Record<string, string> = {
  // 1. CLA Coupé (C118 MoPf) -> Frontal 3/4 Facelift AMG Line
  'mercedes-cla-c118-mopf': 'File:Mercedes-Benz CLA 200 AMG Line (C 118, Facelift) – f 30052024.jpg',

  // 2. CLS Coupé (C218 MoPf) -> Frontal directo Facelift Multibeam LED
  'mercedes-cls-c218-mopf': 'File:Mercedes-Benz C218 FL CLS 400 AMG Line Polar White (1).jpg',

  // 3. SL "Pagoda" (W113) -> Frontal 3/4 completo sin recortes excesivos
  'mercedes-sl-w113-pagoda': 'File:MB 230 SL, Bj. 1964, Front (2009-05-01).jpg',

  // 4. 300 SL Roadster (W198 II) -> Frontal 3/4 clásico al aire libre
  'mercedes-300-sl-roadster-w198': 'File:Mercedes-Benz 300 SL Roadster vr.jpg',

  // 5. SLS AMG (C197 Gullwing) -> Frontal 3/4 con puertas de ala de gaviota abiertas
  'mercedes-sls-amg-c197': 'File:2011 Mercedes-Benz SLS AMG LC22 Front.jpg',

  // 6. CLK DTM AMG (C209) -> Exterior frontal 3/4 carrocería ancha
  'mercedes-clk-dtm-amg-c209': 'File:Silver Mercedes-Benz CLK DTM AMG.jpg',

  // 7. CLK 63 AMG Black Series (C209) -> Exterior frontal 3/4 con tomas de carbono
  'mercedes-clk-63-black-series-c209': 'File:2008 Mercedes-Benz CLK 63 AMG Black Series in Silver, front left (Brooklyn).jpg',

  // 8. Clase C (W202 MoPf) -> Frontal 3/4 Facelift Sport
  'mercedes-clase-c-w202-mopf': 'File:Mercedes-Benz C 230 Sport (W 202, Facelift) – f 22022025.jpg',

  // 9. Clase C (W203 MoPf) -> Frontal 3/4 Facelift con ópticas transparentes
  'mercedes-clase-c-w203-mopf': 'File:Mercedes-Benz W203 front 20171214.jpg'
};

async function getFileInfo(fileName: string): Promise<any | null> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileName)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!res.ok) {
        await new Promise(r => setTimeout(r, 600));
        continue;
      }
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0] as any;
      if (!page?.imageinfo?.[0]) return null;
      const info = page.imageinfo[0];
      const headRes = await fetch(info.url, { method: 'HEAD', headers: { 'User-Agent': UA } });
      if (headRes.status === 200) {
        const meta = info.extmetadata || {};
        return {
          file: fileName,
          url: info.url,
          author: (meta.Artist?.value || 'Wikimedia contributor').replace(/<[^>]+>/g, '').trim(),
          license: meta.LicenseShortName?.value || 'CC BY-SA',
          sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileName.replace(/\s+/g, '_'))}`,
          width: info.width,
          height: info.height
        };
      }
    } catch {}
    await new Promise(r => setTimeout(r, 600));
  }
  return null;
}

async function run() {
  const catalogPath = path.resolve('data/mercedes/catalog-clean-front.json');
  const apiPath = path.resolve('public/api/v1/mercedes.json');
  const gatewayPath = path.resolve('public/api/v1/carvault.json');

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  console.log(`Aplicando sustituciones de alta precisión en ${Object.keys(REPLACEMENTS).length} modelos de Mercedes-Benz...`);

  for (const gen of catalog.generations) {
    if (REPLACEMENTS[gen.id]) {
      const fileName = REPLACEMENTS[gen.id];
      console.log(`\nResolviendo para [${gen.id}] (${gen.label}): ${fileName}...`);
      const img = await getFileInfo(fileName);
      if (img) {
        console.log(`  ✓ Asignada: ${img.file} (${img.width}x${img.height})`);
        gen.frontImage = img;
        if (gen.chassis?.[0]) {
          gen.chassis[0].frontImage = img;
        }
      } else {
        console.error(`  ❌ Error al resolver: ${fileName}`);
      }
      await new Promise(r => setTimeout(r, 300));
    }
  }

  // Recalcular stats
  const withFront = catalog.generations.filter((g: any) => g.frontImage?.url).length;
  catalog.stats.withExactFront = withFront;
  catalog.stats.missingImages = catalog.generations.length - withFront;
  catalog.stats.verifiedFrontRate = `${Math.round((withFront / catalog.generations.length) * 100)}%`;

  // Comprobar colisiones de imágenes
  const allImages = new Set<string>();
  let duplicates = 0;
  for (const g of catalog.generations) {
    if (g.frontImage?.file) {
      if (allImages.has(g.frontImage.file)) {
        console.warn(`⚠️ DUPLICADO DETECTADO: ${g.frontImage.file} en ${g.id}`);
        duplicates++;
      } else {
        allImages.add(g.frontImage.file);
      }
    }
  }

  if (duplicates === 0) {
    console.log(`\n✅ Verificación de unicidad: 0 duplicados en los ${catalog.generations.length} modelos de Mercedes-Benz.`);
  }

  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync(apiPath, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`\n🎉 Catálogo local y API pública actualizados: ${withFront}/${catalog.generations.length} frontales.`);

  // Actualizar Gateway Central
  if (fs.existsSync(gatewayPath)) {
    const gateway = JSON.parse(fs.readFileSync(gatewayPath, 'utf8'));
    const mIdx = gateway.brands.findIndex((b: any) => b.id === 'mercedes');
    if (mIdx !== -1) {
      gateway.brands[mIdx].generations = catalog.generations;
      gateway.brands[mIdx].stats = catalog.stats;
      gateway.brands[mIdx].modelsCount = catalog.generations.length;
    }
    fs.writeFileSync(gatewayPath, JSON.stringify(gateway, null, 2), 'utf8');
    console.log(`✅ Gateway central sincronizado con las nuevas fotos.`);
  }
}

run();
