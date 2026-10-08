import fs from 'fs';
import path from 'path';

function main() {
  const gatewayPath = path.join(process.cwd(), 'public', 'api', 'v1', 'carvault.json');
  const gateway = JSON.parse(fs.readFileSync(gatewayPath, 'utf8'));

  gateway.endpoints = gateway.endpoints || {};
  gateway.endpoints.brands = gateway.endpoints.brands || {};
  gateway.endpoints.brands.lexus = '/api/v1/lexus.json';
  gateway.endpoints.brands.mercedes = '/api/v1/mercedes.json';

  const brandMetas: Record<string, any> = {
    bmw: { name: 'BMW', fullName: 'Bayerische Motoren Werke', country: 'Alemania' },
    cupra: { name: 'CUPRA', fullName: 'SEAT Cupra, S.A.U.', country: 'España' },
    jaguar: { name: 'Jaguar', fullName: 'Jaguar Land Rover Automotive plc', country: 'Reino Unido' },
    lexus: { name: 'Lexus', fullName: 'Lexus (Toyota Motor Corporation)', country: 'Japón' },
    mercedes: { name: 'Mercedes-Benz', fullName: 'Mercedes-Benz Group AG', country: 'Alemania' },
  };

  for (const brandId of ['bmw', 'cupra', 'jaguar', 'lexus', 'mercedes']) {
    const catalogPath = path.join(process.cwd(), 'data', brandId, 'catalog-clean-front.json');
    if (fs.existsSync(catalogPath)) {
      const cat = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      const idx = gateway.brands.findIndex((b: any) => b.id === brandId);
      if (idx !== -1) {
        gateway.brands[idx].generations = cat.generations;
        gateway.brands[idx].stats = cat.stats;
        gateway.brands[idx].modelsCount = cat.generations.length;
      } else {
        const meta = brandMetas[brandId] || { name: brandId, fullName: brandId, country: '' };
        gateway.brands.push({
          id: brandId,
          name: meta.name,
          fullName: meta.fullName,
          country: meta.country,
          logo: `/images/brands/${brandId}.svg`,
          catalogUrl: `/${brandId}`,
          apiUrl: `/api/v1/${brandId}.json`,
          stats: cat.stats,
          modelsCount: cat.generations.length,
          generations: cat.generations
        });
      }
    }
  }

  if (gateway.stats) {
    gateway.stats.totalGenerations = gateway.brands.reduce((acc: number, b: any) => acc + (b.generations?.length || 0), 0);
  }
  fs.writeFileSync(gatewayPath, JSON.stringify(gateway, null, 2), 'utf8');
  console.log('✅ Gateway sincronizado con éxito con todas las marcas.');
}

main();
