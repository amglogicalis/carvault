import fs from 'fs';
import path from 'path';

function main() {
  const gatewayPath = path.join(process.cwd(), 'public', 'api', 'v1', 'carvault.json');
  const jaguarCatalogPath = path.join(process.cwd(), 'data', 'jaguar', 'catalog-clean-front.json');

  const gateway = JSON.parse(fs.readFileSync(gatewayPath, 'utf8'));
  const jaguarCatalog = JSON.parse(fs.readFileSync(jaguarCatalogPath, 'utf8'));

  const jIndex = gateway.brands.findIndex((b: any) => b.id === 'jaguar');
  if (jIndex !== -1) {
    gateway.brands[jIndex].generations = jaguarCatalog.generations;
    gateway.brands[jIndex].stats = jaguarCatalog.stats;
    if (gateway.stats) {
      gateway.stats.totalGenerations = gateway.brands.reduce((acc: number, b: any) => acc + (b.generations?.length || 0), 0);
    }
    fs.writeFileSync(gatewayPath, JSON.stringify(gateway, null, 2), 'utf8');
    console.log('✅ Gateway sincronizado con éxito con las nuevas imágenes de Jaguar.');
  } else {
    console.error('Marca jaguar no encontrada en gateway!');
  }
}

main();
