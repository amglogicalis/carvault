import https from 'https';

async function searchWiki(query: string): Promise<string[]> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=8`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'CarvaultBot/2.0 (carvault@example.com)' } }, (res) => {
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

async function getImageUrl(fileTitle: string): Promise<string | null> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'CarvaultBot/2.0 (carvault@example.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages || {};
          for (const k in pages) {
            const ii = pages[k].imageinfo;
            if (ii && ii[0]?.url) return resolve(ii[0].url);
          }
          resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const targets = [
    { id: 'f-type-project-7', q: '"Project 7" Jaguar Goodwood' },
    { id: 'f-type-project-7-alt', q: '"F-Type Project 7"' },
    { id: 'xjs-facelift', q: 'Jaguar XJS 4.0 front' },
    { id: 'xjs-facelift-alt', q: 'Jaguar XJ-S Celebration front' },
    { id: 'f-type-pre-facelift-direct', q: 'Jaguar F-Type 2013 front' },
    { id: 'f-type-pre-facelift-alt', q: '2015 Jaguar F-Type front' },
  ];

  for (const t of targets) {
    console.log(`\n=== TARGET: ${t.id} (${t.q}) ===`);
    const results = await searchWiki(t.q);
    for (const r of results.slice(0, 5)) {
      const imgUrl = await getImageUrl(r);
      console.log(` - ${r} -> ${imgUrl}`);
    }
  }
}

main();
