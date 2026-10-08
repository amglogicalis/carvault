import * as fs from 'fs';
import * as path from 'path';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

const REPLACEMENTS: Record<string, string> = {
  // Modelos que faltaban o tenían fotos de cabina/motor
  'lexus-is-xe10-pre-facelift': 'File:2001 Lexus IS200 in Midnight Blue, front left, 06-08-2025.jpg',
  'lexus-is-xe10-facelift': 'File:2002 Lexus IS200 in Astral Black, front left, 06-08-2025.jpg',
  'lexus-is-f-use20': 'File:2008-2010 Lexus IS F (USE20R) Sports Luxury sedan 01.jpg',
  'lexus-is-xe30-facelift': 'File:Lexus IS 300h (AVE30) Facelift IMG 5747.jpg',
  'lexus-is-xe30-facelift-2': 'File:2021 Lexus IS 300 AWD, front 3.26.21.jpg',
  'lexus-gs-l10-pre-facelift': 'File:Lexus GS L10 China 2012-08-07.jpg',
  'lexus-es-xv60': 'File:201x Lexus ES (XV60) 250 4-door sedan (01) (33832339030).jpg',
  'lexus-ls-xf20': 'File:1996 Lexus LS 400 4.0 Front.jpg',
  'lexus-ls-xf30-pre-facelift': 'File:2000–2003 Lexus LS 430 (front).jpg',
  'lexus-ls-xf40-pre-facelift': 'File:2007 Lexus LS 460 Starfire Pearl.jpg',
  'lexus-concept-lfa': 'File:Lexus LF-A 2005 TMS 1.jpg'
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
  const catalogPath = path.resolve('data/lexus/catalog-clean-front.json');
  const apiPath = path.resolve('public/api/v1/lexus.json');

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  console.log(`Aplicando sustituciones de alta precisión en ${Object.keys(REPLACEMENTS).length} modelos...`);

  for (const gen of catalog.generations) {
    if (REPLACEMENTS[gen.id]) {
      const fileName = REPLACEMENTS[gen.id];
      console.log(`\nResolviendo para [${gen.id}]: ${fileName}...`);
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

  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync(apiPath, JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n🎉 Catálogo actualizado: ${withFront}/${catalog.generations.length} frontales verificados.`);
}

run();
