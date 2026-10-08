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
      models: 14,
      modelsLabel: 'Modelos & Versiones',
      specialLabel: 'Gama VZ / VZ5',
      specialValue: 8,
      chassis: 14,
      chassisLabel: 'Chasis Distintos',
      withPhoto: 14,
      withPhotoLabel: 'Frontales con Foto',
      photoRate: '100%'
    }
  },
  {
    id: 'jaguar',
    name: 'Jaguar',
    fullName: 'Jaguar Land Rover Automotive plc',
    slug: '/carvault/jaguar',
    logo: '/carvault/images/brands/jaguar.svg',
    country: 'Reino Unido',
    founded: 1922,
    description: 'Deportivos legendarios (E-Type, F-Type, XK), superdeportivos XJ220, berlinas de representación XJ y crossover de altas prestaciones SVO con motores V8 Supercharged.',
    available: true,
    apiEndpoint: '/carvault/api/v1/jaguar.json',
    stats: {
      models: 39,
      modelsLabel: 'Modelos & Versiones',
      specialLabel: 'Gama SVR / R / SVO',
      specialValue: 12,
      chassis: 39,
      chassisLabel: 'Chasis Distintos',
      withPhoto: 39,
      withPhotoLabel: 'Frontales con Foto',
      photoRate: '100%'
    }
  },
  {
    id: 'lexus',
    name: 'Lexus',
    fullName: 'Lexus (Toyota Motor Corporation)',
    slug: '/carvault/lexus',
    logo: '/carvault/images/brands/lexus.svg',
    country: 'Japón',
    founded: 1989,
    description: 'Pioneros del lujo refinado y la tecnología híbrida autorrecargable, el legendario superdeportivo LFA con V10 atmosférico, berlinas insignia LS y división de alto rendimiento F.',
    available: true,
    apiEndpoint: '/carvault/api/v1/lexus.json',
    stats: {
      models: 67,
      modelsLabel: 'Modelos & Versiones',
      specialLabel: 'Gama F & LFA',
      specialValue: 14,
      chassis: 67,
      chassisLabel: 'Chasis Distintos',
      withPhoto: 67,
      withPhotoLabel: 'Frontales con Foto',
      photoRate: '100%'
    }
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    fullName: 'Mercedes-Benz Group AG',
    slug: '/carvault/mercedes',
    logo: '/carvault/images/brands/mercedes.svg',
    country: 'Alemania',
    founded: 1926,
    description: 'Pioneros mundiales del automóvil desde el 300 SL Gullwing, berlinas insignia de lujo Clase S y Maybach, superdeportivos AMG de Affalterbach e innovación eléctrica Mercedes-EQ.',
    available: true,
    apiEndpoint: '/carvault/api/v1/mercedes.json',
    stats: {
      models: 91,
      modelsLabel: 'Modelos & Versiones',
      specialLabel: 'Mercedes-AMG & Maybach',
      specialValue: 32,
      chassis: 91,
      chassisLabel: 'Chasis Distintos',
      withPhoto: 91,
      withPhotoLabel: 'Frontales con Foto',
      photoRate: '100%'
    }
  }
];

