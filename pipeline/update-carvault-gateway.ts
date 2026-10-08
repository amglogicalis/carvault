import fs from 'fs';
import path from 'path';

const gatewayPath = path.resolve(process.cwd(), 'public/api/v1/carvault.json');
const jaguarPath = path.resolve(process.cwd(), 'data/jaguar/catalog-clean-front.json');

const gateway = JSON.parse(fs.readFileSync(gatewayPath, 'utf8'));
const jaguarCatalog = JSON.parse(fs.readFileSync(jaguarPath, 'utf8'));

// 1. Agregar endpoint
gateway.endpoints.brands.jaguar = '/api/v1/jaguar.json';

// 2. Agregar o actualizar entrada de marca
const brandObj = {
  id: 'jaguar',
  name: 'Jaguar',
  fullName: 'Jaguar Land Rover Automotive plc',
  country: 'Reino Unido',
  logo: '/images/brands/jaguar.svg',
  catalogUrl: '/jaguar',
  apiUrl: '/api/v1/jaguar.json',
  stats: jaguarCatalog.stats,
  modelsCount: jaguarCatalog.generations.length,
  generations: jaguarCatalog.generations
};

const existingIndex = gateway.brands.findIndex((b: any) => b.id === 'jaguar');
if (existingIndex >= 0) {
  gateway.brands[existingIndex] = brandObj;
} else {
  gateway.brands.push(brandObj);
}

fs.writeFileSync(gatewayPath, JSON.stringify(gateway, null, 2), 'utf8');
console.log('✅ Gateway Central public/api/v1/carvault.json actualizado con Jaguar.');
