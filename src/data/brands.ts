export interface BrandStats {
  models: number;
  modelsLabel: string;
  specialLabel: string;
  specialValue: number | string;
  chassis: number;
  chassisLabel: string;
  withPhoto: number;
  withPhotoLabel: string;
  photoRate: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  fullName: string;
  slug: string;
  logo: string;
  country: string;
  founded: number;
  description: string;
  available: boolean;
  apiEndpoint?: string;
  stats: BrandStats;
}

export const BRANDS: BrandInfo[] = [
  {
    id: 'bmw',
    name: 'BMW',
    fullName: 'Bayerische Motoren Werke AG',
    slug: '/carvault/bmw',
    logo: '/carvault/images/brands/bmw.svg',
    country: 'Alemania',
    founded: 1916,
    description: 'Catálogo completo de modelos de producción, gama BMW M Motorsport y conceptos históricos.',
    available: true,
    apiEndpoint: '/carvault/api/v1/bmw.json',
    stats: {
      models: 200,
      modelsLabel: 'Modelos & Versiones',
      specialLabel: 'Gama BMW M',
      specialValue: 37,
      chassis: 279,
      chassisLabel: 'Chasis Distintos',
      withPhoto: 200,
      withPhotoLabel: 'Frontales con Foto',
      photoRate: '100%'
    }
  },
  {
    id: 'cupra',
    name: 'CUPRA',
    fullName: 'SEAT Cupra, S.A.U.',
    slug: '/carvault/cupra',
    logo: '/carvault/images/brands/cupra.svg',
    country: 'España',
    founded: 2018,
    description: 'Gama de deportivos crossover, compactos de altas prestaciones (VZ / VZ5) y modelos 100% eléctricos con diseño frontal Shark Nose.',
    available: true,
    apiEndpoint: '/carvault/api/v1/cupra.json',
    stats: {
      models: 13,
      modelsLabel: 'Modelos & Versiones',
      specialLabel: 'Gama VZ / VZ5',
      specialValue: 7,
      chassis: 13,
      chassisLabel: 'Chasis Distintos',
      withPhoto: 13,
      withPhotoLabel: 'Frontales con Foto',
      photoRate: '100%'
    }
  }
];

