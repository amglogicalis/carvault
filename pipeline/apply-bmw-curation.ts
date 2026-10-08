import * as fs from 'fs';
import * as path from 'path';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

const EXACT_FILES: Record<string, { file: string; label?: string }> = {
  // Grupo 1: M535i E12 (M front con spoiler)
  'bmw-m535i-e12': { file: 'File:BMW M535i (E12) at Techno Classica 2018, Essen (IMG 9155).jpg' },

  // Grupo 2: M635CSi E24
  'bmw-m-635-csi-e24': { file: 'File:1985 BMW M635CSi - 9.jpg' },

  // Grupo 3: M5 E28 y M535i E28
  'bmw-m5-e28': { file: 'File:BMW M5 E28.jpg' },
  'bmw-m535i-e28': { file: 'File:BMW M535i PL 86.JPG' },

  // Grupo 4: M5 E34 y E34 Facelift (1994-1996 riñones anchos V8)
  'bmw-m5-e34': { file: 'File:BMW M5 E34 front.jpg' },
  'bmw-5-series-e34-facelift': { file: 'File:1995 BMW 525i (E34) Touring station wagon (2015-07-24).jpg' },

  // Grupo 5: 850CSi E31 (tope de gama BMW Motorsport en producción)
  'bmw-m8-e31': {
    file: 'File:850CSI Front.JPG',
    label: 'BMW 850CSi (E31)'
  },

  // Grupo 6: M3 E36 y E36 Facelift (1996-2000 calandra abultada)
  'bmw-m3-e36': { file: 'File:BMW M3 E36 berline.jpg' },
  'bmw-3-series-e36-facelift': { file: 'File:BMW 320i Cabriolet (E36 2C, Facelift) – Frontansicht, 8. Juni 2011, Wülfrath.jpg' },

  // Grupo 7: 1M Coupe E82
  'bmw-1m-coupe-e82': { file: 'File:BMW 1M Coupé (front).jpg' },

  // Grupo 8: X5 M E70 y X5 E70 Facelift (LCI 2010-2013)
  'bmw-x5-m-e70': { file: 'File:2010 BMW E70 X5 M.jpg' },
  'bmw-x5-e70-facelift': { file: 'File:BMW E70 LCI X5 xDrive 30d Space Gray (1).jpg' },

  // Grupo 9: X6 M E71 (genuino M)
  'bmw-x6-m-e71': { file: 'File:BMW X6 M (E71) – Frontansicht, 2. Juli 2011, Düsseldorf.jpg' },

  // Grupo 10: 6 Series F06/F12/F13 estándar (640i Gran Coupe no M)
  'bmw-6-series-f06-f12-f13': { file: 'File:BMW 640i Gran Coupé (F06) front.JPG' },

  // Grupo 11: 3 Series G21 (Touring) y G50 (Neue Klasse)
  'bmw-3-series-g21': {
    file: 'File:2023-02-04 BMW G21-Hybrid front logo 50years-M.jpg',
    label: 'BMW Serie 3 Touring (G21)'
  },
  'bmw-3-series-g50': {
    file: 'File:BMW Vision Neue Klasse, IAA Summit 2023, Munich (P1110888).jpg',
    label: 'BMW Serie 3 (G50 / Neue Klasse)'
  },

  // Grupo 12: 5 Series G61 (Touring) y G60 (Sedan)
  'bmw-5-series-g61': {
    file: 'File:BMW G61 520d Ditzingen Mobil IMG 9762.jpg',
    label: 'BMW Serie 5 Touring (G61)'
  },
  'bmw-5-series-g60-g68': {
    file: 'File:BMW_G60_520i_1X7A2443.jpg',
    label: 'BMW Serie 5 (G60/G68)'
  },

  // Grupo 13: Z1 Prototype
  'bmw-concept-z1-prototype': { file: 'File:BMW Z1 Magic Violet 01 Front.jpg' },

  // Grupo 14: E39 Facelift (2000-2003 con faros Angel Eyes)
  'bmw-5-series-e39-facelift': { file: 'File:2001 bmw 530i.jpg' },

  // Grupo 15: Z4 E85 Facelift (2006-2008 antinieblas alargados)
  'bmw-z4-e85-facelift': { file: 'File:BMW Z4 Facelift 20090321 front-1.jpg' },

  // Grupo 16: E60 Facelift (2007-2010 LCI con ópticas transparentes)
  'bmw-5-series-e60-facelift': { file: 'File:BMW 520d (E60) Facelift front 20100723.jpg' },

  // Grupo 17: E63 Pre-Facelift (2003-2007 645Ci original)
  'bmw-6-series-e63-pre-facelift': { file: 'File:BMW 645Ci front 20100411.jpg' },

  // Grupo 18: X3 E83 Facelift (2006-2010 LCI paragolpes pintados)
  'bmw-x3-e83-facelift': { file: 'File:BMW X3 (E83) Facelift front 20100926.jpg' },

  // Grupo 19: F22 Facelift (2017-2021 LCI con faros LED hexagonales)
  'bmw-2-series-f22-facelift': { file: 'File:BMW M240i Coupé (F22) front.jpg' }
};

async function getFileInfo(fileName: string): Promise<any | null> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileName)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!res.ok) {
        await new Promise(r => setTimeout(r, 1000));
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
    await new Promise(r => setTimeout(r, 800));
  }
  return null;
}

async function run() {
  const catalogFile = path.resolve('data/bmw/catalog-clean-front.json');
  const apiFile = path.resolve('public/api/v1/bmw.json');

  const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));

  console.log('Resolviendo e inyectando las 19 curaciones de BMW...');
  let updatedCount = 0;

  for (const gen of catalog.generations) {
    const curation = EXACT_FILES[gen.id];
    if (curation) {
      console.log(`\nProcesando [${gen.id}]: ${gen.label}...`);
      if (curation.label) {
        console.log(`  Etiqueta actualizada: "${gen.label}" -> "${curation.label}"`);
        gen.label = curation.label;
      }

      const imgInfo = await getFileInfo(curation.file);
      if (imgInfo) {
        console.log(`  ✓ Imagen asignada: ${curation.file}`);
        gen.frontImage = imgInfo;
        updatedCount++;
      } else {
        console.error(`  ❌ ERROR al obtener imagen para: ${curation.file}`);
      }
      await new Promise(r => setTimeout(r, 400));
    }
  }

  // Guardar en data/ y public/api/v1/
  fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync(apiFile, JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n🎉 Curación completada con éxito: ${updatedCount}/${Object.keys(EXACT_FILES).length} modelos actualizados.`);
}

run();
