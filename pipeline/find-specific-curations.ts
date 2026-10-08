import https from 'https';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

async function searchWiki(query: string): Promise<string[]> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=10`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const list = json.query?.search?.map((s: any) => s.title) || [];
          resolve(list);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function getFileInfo(fileTitle: string) {
  const metaUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  return new Promise((resolve) => {
    https.get(metaUrl, { headers: { 'User-Agent': UA } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const page = Object.values(json.query?.pages || {})[0] as any;
          if (!page?.imageinfo?.[0]) return resolve(null);
          const info = page.imageinfo[0];
          const meta = info.extmetadata || {};
          resolve({
            file: fileTitle,
            url: info.url,
            author: (meta.Artist?.value || 'Wikimedia contributor').replace(/<[^>]+>/g, '').trim(),
            license: meta.LicenseShortName?.value || 'CC BY-SA',
            width: info.width,
            height: info.height
          });
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const searches = [
    { target: 'XK X150 Pre-Facelift (2006-2009)', queries: ['2007 Jaguar XK front', '2008 Jaguar XK coupe front', 'Jaguar X150 2006 front'] },
    { target: 'XJ X351 Facelift (2016-2019 LED J-Blade)', queries: ['2016 Jaguar XJ front', '2017 Jaguar XJ front', '2018 Jaguar XJ front', '2019 Jaguar XJ front'] },
    { target: 'XJ X350 Original (2003-2006 Classic)', queries: ['2004 Jaguar XJ front', '2005 Jaguar XJ8 front', 'Jaguar X350 front left', '2006 Jaguar XJ front'] }
  ];

  for (const s of searches) {
    console.log(`\n========================================`);
    console.log(`Buscando para: ${s.target}`);
    console.log(`========================================`);
    for (const q of s.queries) {
      console.log(`\nQuery: "${q}"`);
      const results = await searchWiki(q);
      for (const r of results.slice(0, 4)) {
        const info: any = await getFileInfo(r);
        if (info) {
          console.log(` • ${r}`);
          console.log(`   ${info.url}`);
        }
      }
    }
  }
}

main();
