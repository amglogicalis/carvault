import fs from 'fs';
import path from 'path';

function main() {
  const gatewayPath = path.join(process.cwd(), 'public', 'api', 'v1', 'carvault.json');
  const gateway = JSON.parse(fs.readFileSync(gatewayPath, 'utf8'));

  for (const brandId of ['bmw', 'cupra', 'jaguar']) {
    const catalogPath = path.join(process.cwd(), 'data', brandId, 'catalog-clean-front.json');
    if (fs.existsSync(catalogPath)) {
      const cat = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      const idx = gateway.brands.findIndex((b: any) => b.id === brandId);
      if (idx !== -1) {
        gateway.brands[idx].generations = cat.generations;
        gateway.brands[idx].stats = cat.stats;
        gateway.brands[idx].modelsCount = cat.generations.length;
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
