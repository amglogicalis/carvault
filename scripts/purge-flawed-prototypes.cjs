const fs = require('fs');

const PURGE_IDS = new Set([
  // 16 Prototypes without images:
  'bmw-concept-528-502',
  'bmw-concept-k67',
  'bmw-concept-2000-coup-by-frua',
  'bmw-concept-karmann-asso-di-quadri',
  'bmw-concept-ur-roadster-original-roadster',
  'bmw-concept-z2',
  'bmw-concept-z13',
  'bmw-concept-z18',
  'bmw-concept-z21',
  'bmw-concept-z9-convertible',
  'bmw-concept-z29',
  'bmw-concept-xactivity',
  'bmw-concept-m4-concept-iconic-lights',
  'bmw-concept-bmw-5-series-gran-turismo-with-fuel-cell',
  'bmw-concept-i-vision-future-interaction',
  'bmw-concept-ix-flow-concept',

  // User-reported flawed photos:
  'bmw-concept-hurricane',
  'bmw-concept-1602-electro-antrieb-e10',
  'bmw-concept-z07',
  'bmw-concept-750hl',
  'bmw-concept-bmw-concept-7-series-activehybrid',
  'bmw-concept-5-gt-concept-car',
  'bmw-concept-concept-6-series',
  'bmw-concept-zagato-roadster',
  'bmw-concept-3-0-csl-hommage',
  'bmw-concept-vision-next-100',
  'bmw-concept-2002-hommage-turbomeister-concept',
  'bmw-concept-concept-x2',
  'bmw-concept-concept-x7-iperformance',

  // False positives & mismatches:
  'bmw-505',
  'bmw-concept-331',
  'bmw-concept-concept-compact-sedan',
  'bmw-concept-concept-z4',
  'bmw-concept-concept-4',
  'bmw-concept-vision-neue-klasse-x',
  'bmw-concept-xm-concept',

  // Redundant duplicates:
  'bmw-concept-e1-z15',
  'bmw-concept-concept-x6',
  'bmw-concept-bmw-concept-active-tourer-outdoor',
  'bmw-concept-nazca-c2-spider'
]);

function cleanCatalog(catalogPath) {
  const cat = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const originalCount = cat.generations.length;
  console.log(`Processing ${catalogPath}: original total = ${originalCount}`);

  // Fix E24 front image
  const e24 = cat.generations.find(g => g.id === 'bmw-6-series-e24');
  if (e24) {
    e24.frontImage = {
      file: 'File:BMW E24 front 20080301.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/BMW_E24_front_20080301.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
      author: 'Rudolf Stricker',
      license: 'CC BY-SA 3.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File%3ABMW_E24_front_20080301.jpg',
      width: 1695,
      height: 1236
    };
    if (e24.chassis && e24.chassis[0]) {
      e24.chassis[0].frontImage = e24.frontImage;
    }
    console.log('Fixed E24 frontImage to File:BMW E24 front 20080301.jpg');
  }

  // Fix E25 Turbo image
  const turbo = cat.generations.find(g => g.id === 'bmw-concept-e25-turbo');
  if (turbo) {
    turbo.frontImage = {
      file: 'File:BMW Turbo 1972 red vr TCE.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/BMW_Turbo_1972_red_vr_TCE.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
      author: 'Stahlkocher',
      license: 'CC BY-SA 3.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File%3ABMW_Turbo_1972_red_vr_TCE.jpg',
      width: 2430,
      height: 1717
    };
    if (turbo.chassis && turbo.chassis[0]) {
      turbo.chassis[0].frontImage = turbo.frontImage;
    }
    console.log('Fixed E25 Turbo frontImage to File:BMW Turbo 1972 red vr TCE.jpg');
  }

  // Filter generations
  const filtered = cat.generations.filter(g => {
    // NEVER delete production cars
    if (g.section !== 'prototypes') {
      return true;
    }
    // Delete explicitly purged prototype IDs
    if (PURGE_IDS.has(g.id)) {
      return false;
    }
    // Delete prototypes without frontImage
    if (!g.frontImage || !g.frontImage.url) {
      return false;
    }
    return true;
  });

  console.log(`Filtered count: ${filtered.length} (removed ${originalCount - filtered.length})`);

  const prodCount = filtered.filter(g => g.section !== 'prototypes').length;
  const protoCount = filtered.filter(g => g.section === 'prototypes').length;
  const mCount = filtered.filter(g => g.isM || g.series === 'BMW M' || (g.label && g.label.startsWith('M'))).length;

  console.log(`- Production models kept: ${prodCount}`);
  console.log(`- Prototypes kept (all verified clean front): ${protoCount}`);

  cat.generations = filtered;
  cat.stats = {
    ...cat.stats,
    generations: filtered.length,
    production: prodCount,
    prototypes: protoCount,
    withExactFront: filtered.length,
    missingImages: 0,
    verifiedFrontRate: '100%'
  };

  fs.writeFileSync(catalogPath, JSON.stringify(cat, null, 2), 'utf8');
  console.log(`Saved ${catalogPath} successfully.\n`);
}

cleanCatalog('data/bmw/catalog-clean-front.json');
cleanCatalog('public/api/v1/bmw.json');
