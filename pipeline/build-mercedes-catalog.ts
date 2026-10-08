import * as fs from 'fs';
import * as path from 'path';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

interface MercedesCarDef {
  id: string;
  series: string;
  label: string;
  section: 'm-performance' | 'production' | 'prototypes';
  status: 'past' | 'current' | 'concept';
  years: { start: number; end: number | null; display: string };
  class: string;
  chassisCode: string;
  packages: string[];
  preferredFile?: string;
  searchQueries: string[];
  engines: Array<{
    modelBadge: string;
    engineCode: string;
    architecture: string;
    cylinders: number;
    displacementCc: number;
    displacementL: number;
    fuel: 'Gasolina' | 'Híbrido' | 'Híbrido Enchufable' | 'Eléctrico' | 'Diésel';
    powerHp: number;
    torqueNm: number;
    topSpeedKmh: number;
    accel0to100: number;
    feedSystem: string;
    notes?: string;
  }>;
}

export const MERCEDES_MODELS: MercedesCarDef[] = [
  // ==========================================
  // SUPERDEPORTIVOS & GAMA AMG LEGENDARIOS
  // ==========================================
  {
    id: 'mercedes-300-sl-w198',
    series: '300 SL',
    label: 'Mercedes-Benz 300 SL Gullwing (W198)',
    section: 'm-performance',
    status: 'past',
    years: { start: 1954, end: 1957, display: '1954 – 1957' },
    class: 'Icono Clásico • Puertas de Ala de Gaviota • Inyección directa mecánica Bosch',
    chassisCode: 'W198 I',
    packages: ['Standard Gullwing', 'Alloy Body Lightweight'],
    preferredFile: 'File:Mercedes-Benz 300 SL Gullwing Coupe (W 198) – f 29012023.jpg',
    searchQueries: ['Mercedes-Benz 300 SL Gullwing front', 'Mercedes 300 SL Coupe front', 'Mercedes-Benz 300 SL front'],
    engines: [{
      modelBadge: '300 SL Gullwing',
      engineCode: 'M198',
      architecture: '6 cilindros en línea inclinado a 50º con cárter seco',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 215,
      torqueNm: 275,
      topSpeedKmh: 260,
      accel0to100: 8.8,
      feedSystem: 'Inyección mecánica directa Bosch de alta presión en cámara',
      notes: 'El primer coche de producción del mundo con inyección directa de gasolina. Chasis tubular ultraligero.'
    }]
  },
  {
    id: 'mercedes-300-sl-roadster-w198',
    series: '300 SL',
    label: 'Mercedes-Benz 300 SL Roadster (W198 II)',
    section: 'm-performance',
    status: 'past',
    years: { start: 1957, end: 1963, display: '1957 – 1963' },
    class: 'Gran Turismo Roadster Clásico • Eje trasero oscilante pivotante • Frenos de disco Dunlop',
    chassisCode: 'W198 II',
    packages: ['Roadster Soft-Top', 'Hardtop Coupe Spec'],
    preferredFile: 'File:Mercedes-Benz 300 SL Roadster (1957) (51376885343).jpg',
    searchQueries: ['Mercedes-Benz 300 SL Roadster front', 'Mercedes 300 SL Roadster 1958 front', '300 SL Roadster front'],
    engines: [{
      modelBadge: '300 SL Roadster',
      engineCode: 'M198 III',
      architecture: '6 cilindros en línea atmosférico con bloque de aluminio (desde 1962)',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 225,
      torqueNm: 280,
      topSpeedKmh: 250,
      accel0to100: 8.6,
      feedSystem: 'Inyección directa mecánica Bosch',
      notes: 'Suspensión trasera refinada de bajo pivote que transformó radicalmente la estabilidad a alta velocidad.'
    }]
  },
  {
    id: 'mercedes-190e-evo2-w201',
    series: '190 E',
    label: 'Mercedes-Benz 190 E 2.5-16 Evolution II (W201)',
    section: 'm-performance',
    status: 'past',
    years: { start: 1990, end: 1991, display: '1990 – 1991' },
    class: 'Leyenda DTM Homologation Special • Kit aerodinámico brutal • 235 CV Cosworth/AMG',
    chassisCode: 'W201',
    packages: ['Evolution II DTM Homologation'],
    preferredFile: 'File:1990 Mercedes-Benz 190E 2.5-16 Evolution II (45898822554).jpg',
    searchQueries: ['Mercedes-Benz 190E Evolution II front', '190 E 2.5-16 Evolution II front', 'Mercedes 190 E Evo II front'],
    engines: [{
      modelBadge: '190 E 2.5-16 Evo II',
      engineCode: 'M102.992',
      architecture: '4 cilindros en línea 16 válvulas DOHC carrera corta con culata Cosworth/AMG',
      cylinders: 4,
      displacementCc: 2463,
      displacementL: 2.5,
      fuel: 'Gasolina',
      powerHp: 235,
      torqueNm: 245,
      topSpeedKmh: 250,
      accel0to100: 7.1,
      feedSystem: 'Inyección electrónica-mecánica Bosch KE-Jetronic, corte a 7.700 rpm',
      notes: 'Solo 502 unidades fabricadas. Coeficiente aerodinámico Cx 0.29 con alerón trasero regulable de competición.'
    }]
  },
  {
    id: 'mercedes-clk-gtr-w297',
    series: 'CLK GTR',
    label: 'Mercedes-Benz CLK GTR Straßenversion (W297)',
    section: 'm-performance',
    status: 'past',
    years: { start: 1998, end: 1999, display: '1998 – 1999' },
    class: 'Homologación FIA GT1 • Chasis de carbono monocasco • 6.9L V12 atmosférico',
    chassisCode: 'W297',
    packages: ['Coupe Straßenversion', 'Roadster Edition'],
    preferredFile: 'File:Mercedes-Benz CLK-GTR (49998633718).jpg',
    searchQueries: ['Mercedes-Benz CLK GTR front', 'CLK GTR Strassenversion front', 'Mercedes CLK GTR front'],
    engines: [{
      modelBadge: 'CLK GTR V12',
      engineCode: 'M297',
      architecture: 'V12 atmosférico a 60º de competición con cárter seco',
      cylinders: 12,
      displacementCc: 6898,
      displacementL: 6.9,
      fuel: 'Gasolina',
      powerHp: 612,
      torqueNm: 775,
      topSpeedKmh: 344,
      accel0to100: 3.8,
      feedSystem: 'Inyección electrónica multipunto Bosch Motronic de competición',
      notes: 'Construido por Mercedes-AMG e HWA AG para dominar el Campeonato FIA GT1. Solo 26 unidades de calle producidas.'
    }]
  },
  {
    id: 'mercedes-slr-mclaren-c199',
    series: 'SLR McLaren',
    label: 'Mercedes-Benz SLR McLaren (C199)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2003, end: 2009, display: '2003 – 2009' },
    class: 'Superdeportivo Gran Turismo • Monocasco CFRP fabricado por McLaren • Aerofreno activo',
    chassisCode: 'C199',
    packages: ['Base Coupé', 'SLR Roadster'],
    preferredFile: 'File:Mercedes-Benz SLR McLaren (Front).jpg',
    searchQueries: ['Mercedes-Benz SLR McLaren front', 'SLR McLaren front', 'Mercedes SLR front'],
    engines: [{
      modelBadge: 'SLR 5.4 V8 Kompressor',
      engineCode: 'M155',
      architecture: 'V8 a 90º Supercharged con compresor volumétrico Lysholm y cárter seco',
      cylinders: 8,
      displacementCc: 5439,
      displacementL: 5.4,
      fuel: 'Gasolina',
      powerHp: 626,
      torqueNm: 780,
      topSpeedKmh: 334,
      accel0to100: 3.8,
      feedSystem: 'Inyección electrónica secuencial con doble intercooler agua-aire',
      notes: 'Desarrollado y producido en el McLaren Technology Centre en Woking, Reino Unido. Salidas de escape laterales en aletas delanteras.'
    }]
  },
  {
    id: 'mercedes-slr-722-edition',
    series: 'SLR McLaren',
    label: 'Mercedes-Benz SLR McLaren 722 Edition',
    section: 'm-performance',
    status: 'past',
    years: { start: 2006, end: 2009, display: '2006 – 2009' },
    class: 'Superdeportivo Track-Tuned • Homenaje Stirling Moss Mille Miglia 1955 • 650 CV',
    chassisCode: 'C199',
    packages: ['722 Coupé', '722 S Roadster'],
    preferredFile: 'File:Mercedes-Benz SLR McLaren 722 Edition (48011299557).jpg',
    searchQueries: ['Mercedes-Benz SLR McLaren 722 front', 'SLR McLaren 722 Edition front', 'SLR 722 front'],
    engines: [{
      modelBadge: 'SLR 722 Edition',
      engineCode: 'M155 722',
      architecture: 'V8 a 90º Supercharged con cárter seco y gestión AMG recalibrada',
      cylinders: 8,
      displacementCc: 5439,
      displacementL: 5.4,
      fuel: 'Gasolina',
      powerHp: 650,
      torqueNm: 820,
      topSpeedKmh: 337,
      accel0to100: 3.6,
      feedSystem: 'Compresor volumétrico Lysholm a 0.9 bar',
      notes: 'Suspensiones 10 mm más bajas, llantas de aleación ligera de 19 pulgadas y splitter frontal en fibra de carbono expuesta.'
    }]
  },
  {
    id: 'mercedes-sls-amg-c197',
    series: 'SLS AMG',
    label: 'Mercedes-Benz SLS AMG (C197 Gullwing)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2010, end: 2014, display: '2010 – 2014' },
    class: 'Superdeportivo Gullwing • Primer coche desarrollado íntegramente por AMG en Affalterbach',
    chassisCode: 'C197',
    packages: ['Gullwing Coupé', 'Roadster (R197)', 'GT Edition'],
    preferredFile: 'File:Mercedes-Benz SLS AMG (C 197) – Frontansicht, 23. Juni 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes-Benz SLS AMG front', 'Mercedes SLS AMG Gullwing front', 'SLS AMG front'],
    engines: [{
      modelBadge: 'SLS AMG 6.2 V8',
      engineCode: 'M159',
      architecture: 'V8 atmosférico a 90º de alto régimen con cárter seco',
      cylinders: 8,
      displacementCc: 6208,
      displacementL: 6.2,
      fuel: 'Gasolina',
      powerHp: 571,
      torqueNm: 650,
      topSpeedKmh: 317,
      accel0to100: 3.8,
      feedSystem: 'Inyección electrónica multipunto de competición, corte a 7.200 rpm',
      notes: 'Motor central delantero con transmisión transaxle AMG SPEEDSHIFT DCT de 7 velocidades y árbol de transmisión de fibra de carbono.'
    }]
  },
  {
    id: 'mercedes-sls-amg-black-series',
    series: 'SLS AMG',
    label: 'Mercedes-Benz SLS AMG Black Series',
    section: 'm-performance',
    status: 'past',
    years: { start: 2013, end: 2014, display: '2013 – 2014' },
    class: 'Pinnacle Black Series • Inspirado en SLS GT3 • 631 CV a 8.000 rpm • 70 kg aligerado',
    chassisCode: 'C197',
    packages: ['Black Series Track Package', 'Aerodynamics Package'],
    preferredFile: 'File:Mercedes-Benz SLS AMG Black Series (9297686851).jpg',
    searchQueries: ['Mercedes-Benz SLS AMG Black Series front', 'SLS AMG Black Series front', 'SLS Black Series front'],
    engines: [{
      modelBadge: 'SLS Black Series 6.2 V8',
      engineCode: 'M159 Black Series',
      architecture: 'V8 atmosférico a 90º optimizado con levas de competición y conductos pulidos',
      cylinders: 8,
      displacementCc: 6208,
      displacementL: 6.2,
      fuel: 'Gasolina',
      powerHp: 631,
      torqueNm: 635,
      topSpeedKmh: 315,
      accel0to100: 3.6,
      feedSystem: 'Inyección de alto flujo, corte de inyección a 8.000 rpm',
      notes: 'Frenos cerámicos AMG de serie, escape completo de titanio y diferencial autoblocante electrónico AMG.'
    }]
  },
  {
    id: 'mercedes-amg-gt-c190-pre',
    series: 'AMG GT',
    label: 'Mercedes-AMG GT / GT S (C190 Pre-Facelift)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2014, end: 2017, display: '2014 – 2017' },
    class: 'Deportivo Biplaza • Estructura Spaceframe de aluminio • V8 Biturbo "Hot inside V"',
    chassisCode: 'C190',
    packages: ['GT', 'GT S', 'Edition 1'],
    preferredFile: 'File:Mercedes-AMG GT S (C 190) – Frontansicht, 2. August 2015, Düsseldorf.jpg',
    searchQueries: ['Mercedes-AMG GT S C190 front', 'Mercedes-AMG GT 2015 front', 'AMG GT S front'],
    engines: [{
      modelBadge: 'AMG GT S 4.0 V8',
      engineCode: 'M178 DE40 AL',
      architecture: 'V8 Biturbo a 90º con turbos gemelos en el interior de la bancada (Hot-V) y cárter seco',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 510,
      torqueNm: 650,
      topSpeedKmh: 310,
      accel0to100: 3.8,
      feedSystem: 'Inyección directa piezoeléctrica guiada por pulverización Bosch',
      notes: 'Parrilla frontal diamantada original previa a la introducción de la parrilla Panamericana de lamas verticales.'
    }]
  },
  {
    id: 'mercedes-amg-gt-r-c190-mopf',
    series: 'AMG GT',
    label: 'Mercedes-AMG GT R / GT Black Series (C190 MoPf)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2017, end: 2021, display: '2017 – 2021' },
    class: 'Superdeportivo Nordschleife • "Beast of the Green Hell" • Parrilla Panamericana & Aerodinámica Activa',
    chassisCode: 'C190 MoPf',
    packages: ['GT R', 'GT R Pro', 'GT Black Series'],
    preferredFile: 'File:Mercedes-AMG GT R (C 190) – Frontansicht, 30. Juni 2017, Düsseldorf.jpg',
    searchQueries: ['Mercedes-AMG GT R front', 'AMG GT R C190 front', 'Mercedes-AMG GT Black Series front'],
    engines: [{
      modelBadge: 'AMG GT R 4.0 V8 Biturbo',
      engineCode: 'M178',
      architecture: 'V8 Biturbo a 90º con cárter seco, turbocompresores optimizados a 1.35 bar',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 585,
      torqueNm: 700,
      topSpeedKmh: 318,
      accel0to100: 3.6,
      feedSystem: 'Inyección directa guiada por pulverización, control de tracción AMG de 9 niveles',
      notes: 'Eje trasero direccional activo, perfil aerodinámico activo de carbono en bajos y suspensión coilover ajustable.'
    }]
  },
  {
    id: 'mercedes-amg-gt-c192',
    series: 'AMG GT',
    label: 'Mercedes-AMG GT Coupé (C192)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2023, end: null, display: '2023 – Presente' },
    class: 'Superdeportivo 2+2 Gran Turismo • Tracción total 4MATIC+ totalmente variable • Suspensión hidráulica semi-activa',
    chassisCode: 'C192',
    packages: ['GT 55 4MATIC+', 'GT 63 4MATIC+', 'GT 63 S E-PERFORMANCE'],
    preferredFile: 'File:2024 Mercedes-AMG GT 63 4MATIC+ (C 192) in Spectral Blue Magno, front right.jpg',
    searchQueries: ['Mercedes-AMG GT C192 front', '2024 Mercedes-AMG GT 63 front', 'Mercedes AMG GT 2024 front'],
    engines: [{
      modelBadge: 'AMG GT 63 4MATIC+',
      engineCode: 'M177 DE40 AL',
      architecture: 'V8 Biturbo a 90º Hot-V con doble turbocompresor twin-scroll',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 585,
      torqueNm: 800,
      topSpeedKmh: 315,
      accel0to100: 3.2,
      feedSystem: 'Inyección directa de alta presión con desactivación de cilindros AMG Cylinder Management',
      notes: 'Segunda generación con configuración de asientos 2+2 opcional, estabilización hidráulica activa antivuelco AMG ACTIVE RIDE CONTROL.'
    }]
  },
  {
    id: 'mercedes-amg-one',
    series: 'AMG ONE',
    label: 'Mercedes-AMG ONE',
    section: 'm-performance',
    status: 'current',
    years: { start: 2022, end: null, display: '2022 – Presente' },
    class: 'Hypercar F1 para la calle • Motor Mercedes-AMG Petronas F1 1.6L V6 Turbo Híbrido • 1.063 CV',
    chassisCode: 'W01',
    packages: ['F1 Edition Homologation'],
    preferredFile: 'File:Festival of Speed 2023 - Mercedes-AMG One (53051410915).jpg',
    searchQueries: ['Mercedes-AMG ONE front', 'Mercedes AMG One front', 'AMG One Goodwood front'],
    engines: [{
      modelBadge: 'AMG ONE E-PERFORMANCE',
      engineCode: 'PU106B Hybrid',
      architecture: '1.6L V6 Turbo a 90º de Fórmula 1 derivado de los monoplazas campeones del mundo con 4 motores eléctricos',
      cylinders: 6,
      displacementCc: 1599,
      displacementL: 1.6,
      fuel: 'Híbrido Enchufable',
      powerHp: 1063,
      torqueNm: 1200,
      topSpeedKmh: 352,
      accel0to100: 2.9,
      feedSystem: 'Turbocompresor asistido eléctricamente (MGU-H) + MGU-K en cigüeñal + 2 motores en eje delantero, régimen a 11.000 rpm',
      notes: 'Récord oficial absoluto de vehículos de producción en el Nürburgring Nordschleife (6:30.705). Monocasco de carbono con aerodinámica activa.'
    }]
  },
  {
    id: 'mercedes-amg-gt-4door-x290-pre',
    series: 'AMG GT 4-Door',
    label: 'Mercedes-AMG GT 4-Door Coupé (X290 Pre-Facelift)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2018, end: 2021, display: '2018 – 2021' },
    class: 'Berlina Coupé 4 Puertas de Altas Prestaciones • Chasis rígido reforzado AMG • Tracción total 4MATIC+',
    chassisCode: 'X290',
    packages: ['GT 43 4MATIC+', 'GT 53 4MATIC+', 'GT 63 S 4MATIC+'],
    preferredFile: 'File:Mercedes-AMG GT 63 S 4MATIC+ 4-Door Coupé (X 290) – Frontansicht, 21. September 2018, Düsseldorf.jpg',
    searchQueries: ['Mercedes-AMG GT 63 S 4-Door front', 'Mercedes X290 front', 'AMG GT 4-Door 2019 front'],
    engines: [{
      modelBadge: 'AMG GT 63 S 4MATIC+',
      engineCode: 'M177 DE40 AL',
      architecture: 'V8 Biturbo a 90º con soportes dinámicos de motor y modo Drift',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 639,
      torqueNm: 900,
      topSpeedKmh: 315,
      accel0to100: 3.2,
      feedSystem: 'Inyección directa guiada por pulverización Bosch con turbos Twin-Scroll',
      notes: 'Aceleración de 0 a 100 km/h en 3.2 segundos con transmisión AMG SPEEDSHIFT MCT 9G de embrague húmedo.'
    }]
  },
  {
    id: 'mercedes-amg-gt-4door-x290-mopf',
    series: 'AMG GT 4-Door',
    label: 'Mercedes-AMG GT 63 S E-PERFORMANCE (X290 MoPf)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2021, end: null, display: '2021 – Presente' },
    class: 'Superberlina Híbrida de Altas Prestaciones • 843 CV combinados • Batería HPB desarrollada con F1',
    chassisCode: 'X290 MoPf',
    packages: ['MoPf Exterior Design', 'GT 63 S E-PERFORMANCE'],
    preferredFile: 'File:Mercedes-AMG GT 63 S E-Performance (X 290) IMG 5752.jpg',
    searchQueries: ['Mercedes-AMG GT 63 S E-Performance front', 'X290 MoPf front', 'AMG GT 63 S E Performance front'],
    engines: [{
      modelBadge: 'GT 63 S E-PERFORMANCE',
      engineCode: 'M177 + EDU Electric',
      architecture: 'V8 Biturbo 4.0L combinado con motor eléctrico síncrono permanente de 204 CV en el eje trasero',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Híbrido Enchufable',
      powerHp: 843,
      torqueNm: 1470,
      topSpeedKmh: 316,
      accel0to100: 2.9,
      feedSystem: 'Batería AMG High Performance de 6.1 kWh con refrigeración directa individual de celdas derivada de F1',
      notes: 'La berlina de producción de serie más potente jamás creada por Mercedes-AMG en Affalterbach.'
    }]
  },
  {
    id: 'mercedes-clk-dtm-amg-c209',
    series: 'CLK',
    label: 'Mercedes-Benz CLK DTM AMG (C209)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2004, end: 2006, display: '2004 – 2006' },
    class: 'Homologación Campeón DTM Bernd Schneider • 582 CV Kompressor • Ensanchanche extremo de carbono',
    chassisCode: 'C209 DTM',
    packages: ['Coupe DTM (100 unidades)', 'Cabriolet DTM (80 unidades)'],
    preferredFile: 'File:Mercedes-Benz CLK DTM AMG (C 209) – Frontansicht, 17. Juli 2011, Düsseldorf.jpg',
    searchQueries: ['Mercedes CLK DTM AMG front', 'CLK DTM AMG front', 'Mercedes-Benz CLK DTM front'],
    engines: [{
      modelBadge: 'CLK DTM 5.4 V8 Kompressor',
      engineCode: 'M113.994 Kompressor',
      architecture: 'V8 a 90º Supercharged con pistones forjados y cárter reforzado',
      cylinders: 8,
      displacementCc: 5439,
      displacementL: 5.4,
      fuel: 'Gasolina',
      powerHp: 582,
      torqueNm: 800,
      topSpeedKmh: 320,
      accel0to100: 3.9,
      feedSystem: 'Compresor volumétrico Lysholm con refrigeración intermedia de alta capacidad',
      notes: 'Solo 100 coupés y 80 cabrios construidos para conmemorar el título de Bernd Schneider en el DTM 2003.'
    }]
  },
  {
    id: 'mercedes-clk-63-black-series-c209',
    series: 'CLK',
    label: 'Mercedes-Benz CLK 63 AMG Black Series (C209)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2007, end: 2009, display: '2007 – 2009' },
    class: 'Safety Car F1 de Carretera • Ensanches de carbono • 6.2L V8 atmosférico de 507 CV',
    chassisCode: 'C209 BS',
    packages: ['Black Series Clubsport'],
    preferredFile: 'File:Mercedes-Benz CLK 63 AMG Black Series (C 209) – Frontansicht, 23. Juni 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes-Benz CLK 63 AMG Black Series front', 'CLK 63 Black Series front', 'CLK 63 AMG Black Series front'],
    engines: [{
      modelBadge: 'CLK 63 Black Series 6.2 V8',
      engineCode: 'M156.982',
      architecture: 'V8 atmosférico a 90º de alto régimen diseñado desde cero por AMG',
      cylinders: 8,
      displacementCc: 6208,
      displacementL: 6.2,
      fuel: 'Gasolina',
      powerHp: 507,
      torqueNm: 630,
      topSpeedKmh: 300,
      accel0to100: 4.3,
      feedSystem: 'Inyección multipunto secuencial con admisión de doble vía y corte a 7.200 rpm',
      notes: 'Sin asientos traseros para aligerar peso, diferencial trasero autoblocante con radiador activo y suspensión coilover de circuito.'
    }]
  },
  {
    id: 'mercedes-sl-65-black-series-r230',
    series: 'SL',
    label: 'Mercedes-Benz SL 65 AMG Black Series (R230)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2008, end: 2011, display: '2008 – 2011' },
    class: 'Monstruo V12 Biturbo de Fibra de Carbono • Techo fijo coupé CFRP • 670 CV y 1.000 Nm limitados',
    chassisCode: 'R230 BS',
    packages: ['Black Series Limited (350 unidades)'],
    preferredFile: 'File:Mercedes-Benz SL 65 AMG Black Series (R 230) – Frontansicht, 21. September 2014, Düsseldorf.jpg',
    searchQueries: ['Mercedes-Benz SL 65 AMG Black Series front', 'SL 65 Black Series front', 'SL 65 AMG Black Series front'],
    engines: [{
      modelBadge: 'SL 65 Black Series 6.0 V12 Biturbo',
      engineCode: 'M275.983 AMG',
      architecture: 'V12 a 60º Twin-Turbo con turbos de mayor sección y wastegates ampliadas',
      cylinders: 12,
      displacementCc: 5980,
      displacementL: 6.0,
      fuel: 'Gasolina',
      powerHp: 670,
      torqueNm: 1000,
      topSpeedKmh: 320,
      accel0to100: 3.8,
      feedSystem: 'Intercoolers agua-aire un 70% mayores, par motor limitado electrónicamente desde 1.200 Nm',
      notes: 'Vías ensanchadas en 97 mm delante y 85 mm detrás, alerón trasero retráctil que se eleva a 120 km/h.'
    }]
  },
  {
    id: 'mercedes-c63-black-series-c204',
    series: 'Clase C',
    label: 'Mercedes-Benz C 63 AMG Coupé Black Series (C204)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2011, end: 2013, display: '2011 – 2013' },
    class: 'Pinnacle C-Class V8 Atmosférico • Pistones forjados de SLS AMG • Paquete aerodinámico de carbono',
    chassisCode: 'C204 BS',
    packages: ['Black Series Standard', 'Track Package', 'Aerodynamics Package'],
    preferredFile: 'File:Mercedes-Benz C 63 AMG Coupé Black Series (C 204) – Frontansicht, 23. Juni 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes C 63 AMG Coupe Black Series front', 'C63 AMG Black Series front', 'C 63 Black Series front'],
    engines: [{
      modelBadge: 'C 63 Black Series 6.2 V8',
      engineCode: 'M156.985',
      architecture: 'V8 atmosférico a 90º con componentes internos del motor SLS AMG (cigüeñal, bielas y pistones forjados)',
      cylinders: 8,
      displacementCc: 6208,
      displacementL: 6.2,
      fuel: 'Gasolina',
      powerHp: 517,
      torqueNm: 620,
      topSpeedKmh: 300,
      accel0to100: 4.2,
      feedSystem: 'Inyección electrónica multipunto de alta precisión AMG',
      notes: 'Uno de los deportivos de motor atmosférico más cotizados y admirados en la historia moderna de Mercedes-Benz.'
    }]
  },

  // ==========================================
  // CLASE A (COMPACTOS PREMIUM)
  // ==========================================
  {
    id: 'mercedes-clase-a-w168-pre',
    series: 'Clase A',
    label: 'Mercedes-Benz Clase A (W168 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 1997, end: 2001, display: '1997 – 2001' },
    class: 'Compacto Monovolumen • Chasis Sandwich de seguridad patentado • Pionero ESP de serie',
    chassisCode: 'W168',
    packages: ['Classic', 'Elegance', 'Avantgarde'],
    preferredFile: 'File:Mercedes A 160 Avantgarde (W 168) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes-Benz W168 front', 'Mercedes A-Klasse W168 1998 front', 'Mercedes W168 front'],
    engines: [{
      modelBadge: 'A 160',
      engineCode: 'M166.960',
      architecture: '4 cilindros en línea inclinado a 59º montado en piso sándwich',
      cylinders: 4,
      displacementCc: 1598,
      displacementL: 1.6,
      fuel: 'Gasolina',
      powerHp: 102,
      torqueNm: 150,
      topSpeedKmh: 182,
      accel0to100: 10.8,
      feedSystem: 'Inyección multipunto indirecta VDO',
      notes: 'El motor se desliza bajo el piso del habitáculo en caso de choque frontal para proteger a los ocupantes.'
    }]
  },
  {
    id: 'mercedes-clase-a-w168-mopf',
    series: 'Clase A',
    label: 'Mercedes-Benz Clase A (W168 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2001, end: 2004, display: '2001 – 2004' },
    class: 'Compacto Monovolumen MoPf • Nueva óptica transparente • Versión Larga V168 disponible',
    chassisCode: 'W168 MoPf',
    packages: ['Classic MoPf', 'Elegance MoPf', 'Avantgarde MoPf', 'LWB V168'],
    preferredFile: 'File:Mercedes A 140 Classic (W 168, Facelift) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes A-Klasse W168 facelift front', 'Mercedes W168 facelift front', 'Mercedes A 140 W168 front'],
    engines: [{
      modelBadge: 'A 190',
      engineCode: 'M166.990',
      architecture: '4 cilindros en línea atmosférico',
      cylinders: 4,
      displacementCc: 1898,
      displacementL: 1.9,
      fuel: 'Gasolina',
      powerHp: 125,
      torqueNm: 180,
      topSpeedKmh: 198,
      accel0to100: 8.8,
      feedSystem: 'Inyección electrónica multipunto',
      notes: 'Parachoques rediseñados, molduras laterales protectoras y materiales de tacto suave en salpicadero.'
    }]
  },
  {
    id: 'mercedes-clase-a-w169-pre',
    series: 'Clase A',
    label: 'Mercedes-Benz Clase A (W169 / C169 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2004, end: 2008, display: '2004 – 2008' },
    class: 'Segunda Generación Concepto Sandwich • Carrocería 3p (C169) y 5p (W169) • Suspensión trasera de eje parabólico',
    chassisCode: 'W169',
    packages: ['Classic', 'Elegance', 'Avantgarde', 'Coupé 3p'],
    preferredFile: 'File:Mercedes A 150 Classic (W 169) – Frontansicht, 21. Mai 2011, Velbert.jpg',
    searchQueries: ['Mercedes-Benz W169 front', 'Mercedes A-Klasse W169 front', 'Mercedes W169 2005 front'],
    engines: [{
      modelBadge: 'A 200 Turbo',
      engineCode: 'M266.980',
      architecture: '4 cilindros en línea Turboalimentado 8 válvulas SOHC',
      cylinders: 4,
      displacementCc: 2034,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 193,
      torqueNm: 280,
      topSpeedKmh: 228,
      accel0to100: 7.5,
      feedSystem: 'Inyección electrónica multipunto con turbocompresor de baja inercia',
      notes: 'Transmisión continuamente variable AUTOTRONIC CVT o manual de 6 marchas.'
    }]
  },
  {
    id: 'mercedes-clase-a-w169-mopf',
    series: 'Clase A',
    label: 'Mercedes-Benz Clase A (W169 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2008, end: 2012, display: '2008 – 2012' },
    class: 'Compacto Monovolumen MoPf • Nueva parrilla de lamas perforadas • Tecnología BlueEFFICIENCY',
    chassisCode: 'W169 MoPf',
    packages: ['Classic MoPf', 'Elegance MoPf', 'Avantgarde MoPf', 'BlueEFFICIENCY'],
    preferredFile: 'File:Mercedes-Benz A 160 BlueEFFICIENCY Avantgarde (W 169, Facelift) – Frontansicht, 19. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W169 facelift front', 'Mercedes A-Klasse W169 facelift front', 'Mercedes A 160 W169 facelift front'],
    engines: [{
      modelBadge: 'A 180 CDI',
      engineCode: 'OM640.940',
      architecture: '4 cilindros en línea Turbodiésel Common Rail 16V',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Diésel',
      powerHp: 109,
      torqueNm: 250,
      topSpeedKmh: 186,
      accel0to100: 10.8,
      feedSystem: 'Inyección Common-Rail con turbo de geometría variable',
      notes: 'Consumo homologado de 4.5 l/100 km con sistema Start/Stop ECO.'
    }]
  },
  {
    id: 'mercedes-clase-a-w176-pre',
    series: 'Clase A',
    label: 'Mercedes-Benz Clase A (W176 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2012, end: 2015, display: '2012 – 2015' },
    class: 'Reinvención Compacto Deportivo Premium • Plataforma MFA • Coeficiente aerodinámico Cx 0.27',
    chassisCode: 'W176',
    packages: ['Style', 'Urban', 'AMG Line', 'Night Package'],
    preferredFile: 'File:Mercedes-Benz A 200 BlueEFFICIENCY Urban (W 176) – Frontansicht, 24. September 2012, Velbert.jpg',
    searchQueries: ['Mercedes W176 front', 'Mercedes A-Klasse W176 2013 front', 'Mercedes A 200 W176 front'],
    engines: [{
      modelBadge: 'A 250 Sport',
      engineCode: 'M270 DE20 AL',
      architecture: '4 cilindros en línea Turbo con inyección directa de tercera generación Camtronic',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 211,
      torqueNm: 350,
      topSpeedKmh: 240,
      accel0to100: 6.6,
      feedSystem: 'Inyección directa guiada por pulverización a 200 bar',
      notes: 'Desarrollado con el tren de rodaje Sport engineered by AMG y cambio de doble embrague 7G-DCT.'
    }]
  },
  {
    id: 'mercedes-amg-a45-w176-mopf',
    series: 'Clase A',
    label: 'Mercedes-AMG A 45 4MATIC (W176 MoPf)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2015, end: 2018, display: '2015 – 2018' },
    class: 'Hot Hatch Referente Mundial • 381 CV • 2.0 Turbo más potente de producción en su era',
    chassisCode: 'W176 MoPf',
    packages: ['AMG Base', 'AMG Aerodynamic Package', 'AMG Dynamic Plus'],
    preferredFile: 'File:Mercedes-AMG A 45 4MATIC (W 176, Facelift) – Frontansicht, 23. April 2016, Düsseldorf.jpg',
    searchQueries: ['Mercedes-AMG A 45 W176 facelift front', 'Mercedes A45 AMG 2016 front', 'A45 AMG facelift front'],
    engines: [{
      modelBadge: 'A 45 AMG 4MATIC',
      engineCode: 'M133 DE20 AL',
      architecture: '4 cilindros en línea Turbo Twin-Scroll ensamblado a mano "One Man, One Engine"',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 381,
      torqueNm: 475,
      topSpeedKmh: 270,
      accel0to100: 4.2,
      feedSystem: 'Presión de sobrealimentación a 1.8 bar con inyectores piezoeléctricos Bosch',
      notes: 'Diferencial autoblocante mecánico en el eje delantero con el paquete AMG DYNAMIC PLUS.'
    }]
  },
  {
    id: 'mercedes-clase-a-w177-pre',
    series: 'Clase A',
    label: 'Mercedes-Benz Clase A (W177 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2018, end: 2022, display: '2018 – 2022' },
    class: 'Compacto Tecnológico de Vanguardia • Debut del sistema MBUX con pantalla panorámica y control por voz inteligente',
    chassisCode: 'W177',
    packages: ['Progressive', 'AMG Line', 'Edition 1'],
    preferredFile: 'File:Mercedes-Benz W177 1X7A6242.jpg',
    searchQueries: ['Mercedes W177 front', 'Mercedes A-Klasse W177 front', 'Mercedes-Benz A 200 W177 front'],
    engines: [{
      modelBadge: 'A 250 4MATIC',
      engineCode: 'M260 DE20 AL',
      architecture: '4 cilindros en línea Turbo con tecnología CONICSHAPE en cilindros para reducir fricción',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 224,
      torqueNm: 350,
      topSpeedKmh: 250,
      accel0to100: 6.2,
      feedSystem: 'Inyección directa guiada por pulverización Bosch',
      notes: 'Faros MULTIBEAM LED con 18 diodos controlables individualmente por faro.'
    }]
  },
  {
    id: 'mercedes-amg-a45s-w177-mopf',
    series: 'Clase A',
    label: 'Mercedes-AMG A 45 S 4MATIC+ (W177 MoPf)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2022, end: null, display: '2022 – Presente' },
    class: 'Megahatch Extremo • Motor 4 cilindros de serie más potente del mundo (421 CV) • AMG TORQUE CONTROL con Drift Mode',
    chassisCode: 'W177 MoPf',
    packages: ['AMG A 35 MoPf', 'AMG A 45 S MoPf', 'AMG Street Style Edition'],
    preferredFile: 'File:Mercedes-AMG A 45 S 4MATIC+ (W 177, Facelift) – f 29042023.jpg',
    searchQueries: ['Mercedes-AMG A 45 S W177 facelift front', 'Mercedes A45 S 2023 front', 'A 45 S facelift front'],
    engines: [{
      modelBadge: 'A 45 S 4MATIC+',
      engineCode: 'M139',
      architecture: '4 cilindros en línea Turbo montado a 180º invertido (escape hacia atrás) con turbocompresor de rodillos',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 421,
      torqueNm: 500,
      topSpeedKmh: 270,
      accel0to100: 3.9,
      feedSystem: 'Doble inyección: directa piezoeléctrica a 200 bar + indirecta en colector a 6.7 bar, soplado a 2.1 bar',
      notes: 'Diferencial trasero AMG TORQUE CONTROL con dos embragues multidisco electrohidráulicos independientes para vectorización de par.'
    }]
  },

  // ==========================================
  // CLASE B (SPORTS TOURER)
  // ==========================================
  {
    id: 'mercedes-clase-b-w245-pre',
    series: 'Clase B',
    label: 'Mercedes-Benz Clase B (W245 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2005, end: 2008, display: '2005 – 2008' },
    class: 'Sports Tourer Compacto • Espacio interior de berlina ejecutiva en dimensiones compactas',
    chassisCode: 'W245',
    packages: ['Chrom-Paket', 'Sport-Paket'],
    preferredFile: 'File:Mercedes-Benz B 170 (W 245) – Frontansicht, 11. Mai 2011, Velbert.jpg',
    searchQueries: ['Mercedes B-Klasse W245 front', 'Mercedes W245 front', 'Mercedes-Benz B 170 W245 front'],
    engines: [{
      modelBadge: 'B 200 Turbo',
      engineCode: 'M266.980',
      architecture: '4 cilindros en línea Turbo',
      cylinders: 4,
      displacementCc: 2034,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 193,
      torqueNm: 280,
      topSpeedKmh: 225,
      accel0to100: 7.6,
      feedSystem: 'Inyección electrónica multipunto con turbo',
      notes: 'Capacidad de maletero de hasta 2.245 litros con el sistema de asientos extraíbles EASY-VARIO-PLUS.'
    }]
  },
  {
    id: 'mercedes-clase-b-w245-mopf',
    series: 'Clase B',
    label: 'Mercedes-Benz Clase B (W245 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2008, end: 2011, display: '2008 – 2011' },
    class: 'Sports Tourer MoPf • Nuevo capó y paragolpes envolvente • Versiones NGT de gas natural',
    chassisCode: 'W245 MoPf',
    packages: ['Standard MoPf', 'Sport-Paket MoPf', 'BlueEFFICIENCY'],
    preferredFile: 'File:Mercedes-Benz B 180 BlueEFFICIENCY (W 245, Facelift) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W245 facelift front', 'Mercedes B-Klasse W245 facelift front', 'Mercedes B 180 W245 facelift front'],
    engines: [{
      modelBadge: 'B 200 CDI',
      engineCode: 'OM640.941',
      architecture: '4 cilindros en línea Turbodiésel Common Rail',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Diésel',
      powerHp: 140,
      torqueNm: 300,
      topSpeedKmh: 200,
      accel0to100: 9.6,
      feedSystem: 'Common-rail con inyectores electromagnéticos a 1.600 bar',
      notes: 'Estreno del asistente de aparcamiento automático Active Parking Assist.'
    }]
  },
  {
    id: 'mercedes-clase-b-w246-pre',
    series: 'Clase B',
    label: 'Mercedes-Benz Clase B (W246 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2011, end: 2014, display: '2011 – 2014' },
    class: 'Monovolumen Compacto Tecnológico • Aerodinámica récord Cx 0.26 • Sistema de frenado COLLISION PREVENTION ASSIST de serie',
    chassisCode: 'W246',
    packages: ['Style', 'Urban', 'Night Package', 'Sport'],
    preferredFile: 'File:Mercedes-Benz B 180 BlueEFFICIENCY Urban (W 246) – Frontansicht, 24. März 2012, Velbert.jpg',
    searchQueries: ['Mercedes W246 front', 'Mercedes B-Klasse W246 front', 'Mercedes B 180 W246 front'],
    engines: [{
      modelBadge: 'B 220 4MATIC',
      engineCode: 'M270 DE20 AL',
      architecture: '4 cilindros en línea Turbo con tracción total',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 184,
      torqueNm: 300,
      topSpeedKmh: 225,
      accel0to100: 7.5,
      feedSystem: 'Inyección directa guiada por pulverización',
      notes: 'Primer modelo de Mercedes-Benz con el cambio automático de doble embrague 7G-DCT.'
    }]
  },
  {
    id: 'mercedes-clase-b-w246-mopf',
    series: 'Clase B',
    label: 'Mercedes-Benz Clase B (W246 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2014, end: 2018, display: '2014 – 2018' },
    class: 'Sports Tourer MoPf • Faros LED High Performance • Versión Electric Drive / B 250 e',
    chassisCode: 'W246 MoPf',
    packages: ['Style MoPf', 'Urban MoPf', 'AMG Line MoPf', 'Electric Drive'],
    preferredFile: 'File:Mercedes-Benz B 180 d Urban (W 246, Facelift) – Frontansicht, 25. Juni 2016, Düsseldorf.jpg',
    searchQueries: ['Mercedes W246 facelift front', 'Mercedes B-Klasse W246 facelift front', 'Mercedes B 180 W246 facelift front'],
    engines: [{
      modelBadge: 'B 250 e Electric Drive',
      engineCode: 'EM0004 Tesla Drivetrain',
      architecture: 'Motor eléctrico síncrono desarrollado conjuntamente con Tesla',
      cylinders: 0,
      displacementCc: 0,
      displacementL: 0.0,
      fuel: 'Eléctrico',
      powerHp: 180,
      torqueNm: 340,
      topSpeedKmh: 160,
      accel0to100: 7.9,
      feedSystem: 'Batería de iones de litio de 28 kWh con función RANGE PLUS',
      notes: 'Batería y tren de potencia suministrados por Tesla Motors.'
    }]
  },
  {
    id: 'mercedes-clase-b-w247-mopf',
    series: 'Clase B',
    label: 'Mercedes-Benz Clase B (W247 MoPf)',
    section: 'production',
    status: 'current',
    years: { start: 2022, end: null, display: '2022 – Presente' },
    class: 'Sports Tourer Confort y Espacio • Tecnología MBUX generación NTG7 • Motores electrificados Mild-Hybrid 48V e Híbridos Enchufables',
    chassisCode: 'W247 MoPf',
    packages: ['Progressive MoPf', 'AMG Line MoPf'],
    preferredFile: 'File:Mercedes-Benz W247 Facelift IMG 0517.jpg',
    searchQueries: ['Mercedes W247 facelift front', 'Mercedes B-Klasse W247 2023 front', 'Mercedes B 250 e W247 front'],
    engines: [{
      modelBadge: 'B 250 e PHEV',
      engineCode: 'M282 + E-Motor',
      architecture: '4 cilindros en línea 1.33L Turbo acoplado a motor eléctrico síncrono de 109 CV',
      cylinders: 4,
      displacementCc: 1332,
      displacementL: 1.3,
      fuel: 'Híbrido Enchufable',
      powerHp: 218,
      torqueNm: 450,
      topSpeedKmh: 223,
      accel0to100: 7.6,
      feedSystem: 'Batería de alto voltaje de 15.6 kWh con recarga rápida opcional en CC a 22 kW',
      notes: 'Autonomía 100% eléctrica de hasta 77 km en ciclo WLTP urbano.'
    }]
  },

  // ==========================================
  // CLASE C (SEDANES, RANCHERAS Y COUPÉS)
  // ==========================================
  {
    id: 'mercedes-190-w201',
    series: '190 (W201)',
    label: 'Mercedes-Benz 190 / 190 E "Baby Benz" (W201)',
    section: 'production',
    status: 'past',
    years: { start: 1982, end: 1993, display: '1982 – 1993' },
    class: 'Pionero Compacto Ejecutivo • Suspensión trasera multibrazo de 5 brazos independiente • Calidad constructiva legendaria',
    chassisCode: 'W201',
    packages: ['190', '190 E', '190 D', 'Sportline'],
    preferredFile: 'File:Mercedes-Benz 190 E 2.0 (W 201) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W201 front', 'Mercedes 190E front', 'Mercedes-Benz 190 E W201 front'],
    engines: [{
      modelBadge: '190 E 2.3-16',
      engineCode: 'M102.983',
      architecture: '4 cilindros en línea 16 válvulas DOHC con culata desarrollada por Cosworth',
      cylinders: 4,
      displacementCc: 2299,
      displacementL: 2.3,
      fuel: 'Gasolina',
      powerHp: 185,
      torqueNm: 235,
      topSpeedKmh: 230,
      accel0to100: 7.5,
      feedSystem: 'Inyección mecánica-electrónica Bosch K-Jetronic / KE-Jetronic',
      notes: 'Récords mundiales de velocidad y resistencia en Nardò en 1983 (50.000 km a 247.9 km/h de media).'
    }]
  },
  {
    id: 'mercedes-clase-c-w202-pre',
    series: 'Clase C',
    label: 'Mercedes-Benz Clase C (W202 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 1993, end: 1997, display: '1993 – 1997' },
    class: 'Primera Generación con denominación Clase C • Líneas clásicas de Bruno Sacco • Estreno de C 36 AMG',
    chassisCode: 'W202',
    packages: ['Classic', 'Esprit', 'Elegance', 'Sport'],
    preferredFile: 'File:Mercedes C 180 Classic (W 202) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W202 front', 'Mercedes-Benz C-Klasse W202 front', 'Mercedes C 180 W202 front'],
    engines: [{
      modelBadge: 'C 36 AMG',
      engineCode: 'M104.941 AMG',
      architecture: '6 cilindros en línea DOHC 24V ensamblado a mano por AMG',
      cylinders: 6,
      displacementCc: 3606,
      displacementL: 3.6,
      fuel: 'Gasolina',
      powerHp: 280,
      torqueNm: 385,
      topSpeedKmh: 250,
      accel0to100: 6.7,
      feedSystem: 'Inyección electrónica multipunto Bosch HFM',
      notes: 'El primer coche desarrollado conjuntamente bajo el acuerdo oficial entre Daimler-Benz y AMG.'
    }]
  },
  {
    id: 'mercedes-clase-c-w202-mopf',
    series: 'Clase C',
    label: 'Mercedes-Benz Clase C (W202 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 1997, end: 2000, display: '1997 – 2000' },
    class: 'Clase C MoPf • Nuevos paragolpes integrados • Estreno del motor V8 C 43 AMG y pionero turbodiésel CDI',
    chassisCode: 'W202 MoPf',
    packages: ['Classic MoPf', 'Esprit MoPf', 'Elegance MoPf', 'Sport MoPf'],
    preferredFile: 'File:Mercedes C 200 CDI Classic (W 202, Facelift) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W202 facelift front', 'Mercedes C-Klasse W202 facelift front', 'Mercedes C 43 AMG W202 front'],
    engines: [{
      modelBadge: 'C 43 AMG V8',
      engineCode: 'M113.944',
      architecture: 'V8 a 90º SOHC 24 válvulas con 2 bujías por cilindro',
      cylinders: 8,
      displacementCc: 4266,
      displacementL: 4.3,
      fuel: 'Gasolina',
      powerHp: 306,
      torqueNm: 410,
      topSpeedKmh: 250,
      accel0to100: 6.5,
      feedSystem: 'Inyección electrónica secuencial Bosch ME 2.0',
      notes: 'La primera berlina compacta en la historia de Mercedes-Benz propulsada por un motor V8.'
    }]
  },
  {
    id: 'mercedes-clase-c-w203-pre',
    series: 'Clase C',
    label: 'Mercedes-Benz Clase C (W203 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2000, end: 2004, display: '2000 – 2004' },
    class: 'Diseño de faros de doble óvalo entrelazados • Aerodinámica líder Cx 0.26 • Carrocerías Sedán, Familiar (S203) y Sportcoupé (CL203)',
    chassisCode: 'W203',
    packages: ['Classic', 'Elegance', 'Avantgarde'],
    preferredFile: 'File:Mercedes C 180 Elegance (W 203) – Frontansicht, 21. Mai 2011, Velbert.jpg',
    searchQueries: ['Mercedes W203 front', 'Mercedes-Benz C-Klasse W203 front', 'Mercedes C 200 W203 front'],
    engines: [{
      modelBadge: 'C 32 AMG V6 Kompressor',
      engineCode: 'M112.961 AMG',
      architecture: 'V6 a 90º con compresor volumétrico e intercooler agua-aire',
      cylinders: 6,
      displacementCc: 3199,
      displacementL: 3.2,
      fuel: 'Gasolina',
      powerHp: 354,
      torqueNm: 450,
      topSpeedKmh: 250,
      accel0to100: 5.2,
      feedSystem: 'Compresor volumétrico helicoidal de doble tornillo IHI con 1.1 bar',
      notes: 'Aceleración fulgurante superando a sus rivales coetáneos con cambio AMG SPEEDSHIFT 5G-Tronic.'
    }]
  },
  {
    id: 'mercedes-clase-c-w203-mopf',
    series: 'Clase C',
    label: 'Mercedes-Benz Clase C (W203 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2004, end: 2007, display: '2004 – 2007' },
    class: 'Clase C MoPf • Óptica de cristal transparente • Chasis con reglaje DIRECT CONTROL y C 55 AMG V8 atmosférico',
    chassisCode: 'W203 MoPf',
    packages: ['Classic MoPf', 'Elegance MoPf', 'Avantgarde MoPf', 'AMG Sportpaket'],
    preferredFile: 'File:Mercedes C 180 Kompressor Classic (W 203, Facelift) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W203 facelift front', 'Mercedes C-Klasse W203 facelift front', 'Mercedes C 55 AMG W203 front'],
    engines: [{
      modelBadge: 'C 55 AMG V8',
      engineCode: 'M113.988',
      architecture: 'V8 atmosférico a 90º con frontal alargado 8 cm adaptado de la Clase CLK',
      cylinders: 8,
      displacementCc: 5439,
      displacementL: 5.4,
      fuel: 'Gasolina',
      powerHp: 367,
      torqueNm: 510,
      topSpeedKmh: 250,
      accel0to100: 5.2,
      feedSystem: 'Inyección electrónica Bosch ME 2.8',
      notes: 'Requirió alargar la estructura del morro para acomodar el bloque V8 de 5.4 litros.'
    }]
  },
  {
    id: 'mercedes-clase-c-w204-pre',
    series: 'Clase C',
    label: 'Mercedes-Benz Clase C (W204 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2007, end: 2011, display: '2007 – 2011' },
    class: 'Doble personalidad de frontal (Estrella en capó para Elegance vs Parrilla deportiva para Avantgarde) • Debut del C 63 AMG 6.2L V8',
    chassisCode: 'W204',
    packages: ['Classic', 'Elegance', 'Avantgarde', 'AMG Sports Package'],
    preferredFile: 'File:Mercedes-Benz C 200 CDI BlueEFFICIENCY Avantgarde (W 204) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W204 front', 'Mercedes C-Klasse W204 2008 front', 'Mercedes C 220 W204 front'],
    engines: [{
      modelBadge: 'C 63 AMG 6.2 V8',
      engineCode: 'M156.985',
      architecture: 'V8 atmosférico a 90º de alto régimen diseñado por AMG',
      cylinders: 8,
      displacementCc: 6208,
      displacementL: 6.2,
      fuel: 'Gasolina',
      powerHp: 457,
      torqueNm: 600,
      topSpeedKmh: 250,
      accel0to100: 4.5,
      feedSystem: 'Inyección electrónica de alta respuesta con admisión variable de magnesio',
      notes: 'Sonido de escape gutural legendario y cambio AMG SPEEDSHIFT PLUS 7G-TRONIC con golpe de gas automático al reducir.'
    }]
  },
  {
    id: 'mercedes-clase-c-w204-mopf',
    series: 'Clase C',
    label: 'Mercedes-Benz Clase C (W204 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2011, end: 2014, display: '2011 – 2014' },
    class: 'Clase C MoPf • Faros de forma de onda en C con LED • Más de 2.000 componentes nuevos y debut de la carrocería Coupé C204',
    chassisCode: 'W204 MoPf',
    packages: ['Elegance MoPf', 'Avantgarde MoPf', 'AMG Line MoPf', 'Coupé C204'],
    preferredFile: 'File:Mercedes-Benz C 180 BlueEFFICIENCY Avantgarde (W 204, Facelift) – Frontansicht, 21. Juni 2011, Wuppertal.jpg',
    searchQueries: ['Mercedes W204 facelift front', 'Mercedes C-Klasse W204 facelift front', 'Mercedes C 250 W204 facelift front'],
    engines: [{
      modelBadge: 'C 350 BlueEFFICIENCY',
      engineCode: 'M276 DE35',
      architecture: 'V6 a 60º atmosférico con inyección directa piezoeléctrica BlueDIRECT',
      cylinders: 6,
      displacementCc: 3498,
      displacementL: 3.5,
      fuel: 'Gasolina',
      powerHp: 306,
      torqueNm: 370,
      topSpeedKmh: 250,
      accel0to100: 6.0,
      feedSystem: 'Inyección directa piezoeléctrica guiada por pulverización a 200 bar',
      notes: 'Nuevo salpicadero con pantalla integrada y transmisión automática 7G-TRONIC PLUS.'
    }]
  },
  {
    id: 'mercedes-clase-c-w205-pre',
    series: 'Clase C',
    label: 'Mercedes-Benz Clase C (W205 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2014, end: 2018, display: '2014 – 2018' },
    class: 'Estructura híbrida aluminio-acero (100 kg más ligero) • Suspensión neumática AIRMATIC opcional • C 63 V8 Biturbo',
    chassisCode: 'W205',
    packages: ['Base', 'Avantgarde', 'Exclusive', 'AMG Line'],
    preferredFile: 'File:Mercedes-Benz C 220 BlueTEC Avantgarde (W 205) – Frontansicht, 22. März 2014, Düsseldorf.jpg',
    searchQueries: ['Mercedes W205 front', 'Mercedes C-Klasse W205 front', 'Mercedes C 220 W205 front'],
    engines: [{
      modelBadge: 'AMG C 63 S V8 Biturbo',
      engineCode: 'M177 DE40 AL',
      architecture: 'V8 Biturbo a 90º con turbos en el interior de la V (Hot-inside V)',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 510,
      torqueNm: 700,
      topSpeedKmh: 290,
      accel0to100: 4.0,
      feedSystem: 'Inyección directa de alta presión guiada por pulverización',
      notes: 'Diferencial autoblocante trasero de control electrónico y soportes de motor dinámicos activos.'
    }]
  },
  {
    id: 'mercedes-clase-c-w205-mopf',
    series: 'Clase C',
    label: 'Mercedes-Benz Clase C (W205 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2018, end: 2021, display: '2018 – 2021' },
    class: 'Clase C MoPf • Cuadro digital de 12.3 pulgadas • Faros MULTIBEAM LED con luces de carretera ULTRA RANGE de 650 metros',
    chassisCode: 'W205 MoPf',
    packages: ['Avantgarde MoPf', 'Exclusive MoPf', 'AMG Line MoPf', 'Night Edition'],
    preferredFile: 'File:Mercedes-Benz W205 Facelift IMG 0524.jpg',
    searchQueries: ['Mercedes W205 facelift front', 'Mercedes C-Klasse W205 facelift front', 'Mercedes C 200 W205 facelift front'],
    engines: [{
      modelBadge: 'AMG C 43 4MATIC',
      engineCode: 'M276 DE30 AL',
      architecture: 'V6 Biturbo a 60º con turbocompresores más grandes y soplado a 1.1 bar',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 390,
      torqueNm: 520,
      topSpeedKmh: 250,
      accel0to100: 4.7,
      feedSystem: 'Inyección directa con cambio AMG SPEEDSHIFT TCT 9G y reparto 31:69',
      notes: 'Estreno del motor turbodiésel OM654 de aluminio ultraligero y microhibridación EQ Boost de 48V.'
    }]
  },
  {
    id: 'mercedes-clase-c-w206',
    series: 'Clase C',
    label: 'Mercedes-Benz Clase C (W206)',
    section: 'production',
    status: 'current',
    years: { start: 2021, end: null, display: '2021 – Presente' },
    class: 'Arquitectura Eléctrica y Tecnológica de Clase S • Pantalla táctil vertical central de 11.9" • Eje trasero direccional opcional',
    chassisCode: 'W206',
    packages: ['Avantgarde', 'AMG Line', 'C 43 4MATIC', 'C 63 S E-PERFORMANCE'],
    preferredFile: 'File:Mercedes-Benz W206 IMG 4376.jpg',
    searchQueries: ['Mercedes W206 front', 'Mercedes C-Klasse W206 front', 'Mercedes C 220 d W206 front'],
    engines: [{
      modelBadge: 'AMG C 63 S E-PERFORMANCE',
      engineCode: 'M139l + Electric Motor',
      architecture: '4 cilindros en línea 2.0L Turbo longitudinal con turbocompresor eléctrico de gases de escape asistido por F1',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Híbrido Enchufable',
      powerHp: 680,
      torqueNm: 1020,
      topSpeedKmh: 280,
      accel0to100: 3.4,
      feedSystem: 'E-Turbo F1 de 400V que gira a 175.000 rpm + motor eléctrico trasero de 204 CV',
      notes: 'La berlina más avanzada tecnológicamente de su categoría, con par combinado superior a 1.000 Nm.'
    }]
  },

  // ==========================================
  // CLASE E (BERLINAS EJECUTIVAS)
  // ==========================================
  {
    id: 'mercedes-clase-e-w123',
    series: 'Clase E',
    label: 'Mercedes-Benz W123 (Serie E)',
    section: 'production',
    status: 'past',
    years: { start: 1976, end: 1985, display: '1976 – 1985' },
    class: 'El automóvil más fiable e indestructible de la historia • Más de 2.7 millones de unidades • Berlina, Familiar (T-Modell S123) y Coupé (C123)',
    chassisCode: 'W123',
    packages: ['Standard', 'T-Modell S123', 'Coupé C123'],
    preferredFile: 'File:Mercedes-Benz 230 E (W 123) – Frontansicht, 22. August 2011, Düsseldorf.jpg',
    searchQueries: ['Mercedes W123 front', 'Mercedes-Benz W123 front', 'Mercedes 230 E W123 front'],
    engines: [{
      modelBadge: '300 D Turbodiesel',
      engineCode: 'OM617.952',
      architecture: '5 cilindros en línea Turbodiésel con precámara de inyección Bosch',
      cylinders: 5,
      displacementCc: 2998,
      displacementL: 3.0,
      fuel: 'Diésel',
      powerHp: 125,
      torqueNm: 250,
      topSpeedKmh: 175,
      accel0to100: 14.0,
      feedSystem: 'Bomba de inyección mecánica en línea Bosch MW con turbocompresor Garrett',
      notes: 'Famoso por superar con facilidad más de 1.000.000 de kilómetros sin abrir motor.'
    }]
  },
  {
    id: 'mercedes-clase-e-w124-mopf1',
    series: 'Clase E',
    label: 'Mercedes-Benz W124 / 500 E (MoPf 1)',
    section: 'production',
    status: 'past',
    years: { start: 1989, end: 1993, display: '1989 – 1993' },
    class: 'Ingeniería Máxima de Bruno Sacco • Chasis ensanchado fabricado por Porsche • El lobo con piel de cordero',
    chassisCode: 'W124 MoPf 1',
    packages: ['Elegance', 'Sportline', '500 E Porsche Spec'],
    preferredFile: 'File:Mercedes-Benz 500 E (W 124) – Frontansicht, 23. Juni 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes-Benz 500 E W124 front', 'Mercedes 500 E front', 'Mercedes W124 500 E front'],
    engines: [{
      modelBadge: '500 E V8 (Ensamblado por Porsche)',
      engineCode: 'M119.974',
      architecture: 'V8 a 90º DOHC 32 válvulas atmosférico',
      cylinders: 8,
      displacementCc: 4973,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 326,
      torqueNm: 480,
      topSpeedKmh: 250,
      accel0to100: 6.1,
      feedSystem: 'Inyección electrónica Bosch LH-Jetronic con medidor de masa de aire de hilo caliente',
      notes: 'Ensamblado a mano en la factoría de Porsche en Zuffenhausen ("Rössle-Bau"). Vías ensanchadas en 56 mm.'
    }]
  },
  {
    id: 'mercedes-clase-e-w124-mopf2',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W124 MoPf 2)',
    section: 'production',
    status: 'past',
    years: { start: 1993, end: 1995, display: '1993 – 1995' },
    class: 'Nacimiento oficial de la denominación "Clase E" • Parrilla integrada en el capó • Intermitentes delanteros transparentes',
    chassisCode: 'W124 MoPf 2',
    packages: ['E-Klasse Standard', 'Sportline', 'Cabriolet A124', 'Coupé C124'],
    preferredFile: 'File:Mercedes-Benz E 220 (W 124, 2. Facelift) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W124 facelift front', 'Mercedes E-Klasse W124 facelift front', 'Mercedes E 200 W124 front'],
    engines: [{
      modelBadge: 'E 320 24V',
      engineCode: 'M104.992',
      architecture: '6 cilindros en línea DOHC 24 válvulas con distribución variable',
      cylinders: 6,
      displacementCc: 3199,
      displacementL: 3.2,
      fuel: 'Gasolina',
      powerHp: 220,
      torqueNm: 315,
      topSpeedKmh: 235,
      accel0to100: 7.8,
      feedSystem: 'Inyección electrónica Bosch HFM con admisión de resonancia dual',
      notes: 'La última iteración del legendario W124, culminando una década de perfección mecánica.'
    }]
  },
  {
    id: 'mercedes-clase-e-w210-pre',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W210 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 1995, end: 1999, display: '1995 – 1999' },
    class: 'Revolución de diseño de cuatro faros redondos • Galardonado con el Red Dot Design Award • Pionero faros de Xenón',
    chassisCode: 'W210',
    packages: ['Classic', 'Elegance', 'Avantgarde'],
    preferredFile: 'File:Mercedes-Benz E 200 Classic (W 210) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W210 front', 'Mercedes E-Klasse W210 front', 'Mercedes E 200 W210 front'],
    engines: [{
      modelBadge: 'E 55 AMG V8',
      engineCode: 'M113.980',
      architecture: 'V8 a 90º SOHC 24 válvulas con cárter de aluminio',
      cylinders: 8,
      displacementCc: 5439,
      displacementL: 5.4,
      fuel: 'Gasolina',
      powerHp: 354,
      torqueNm: 530,
      topSpeedKmh: 250,
      accel0to100: 5.7,
      feedSystem: 'Inyección electrónica multipunto Bosch ME 2.0',
      notes: 'La berlina ejecutiva más rápida y contundente de su era.'
    }]
  },
  {
    id: 'mercedes-clase-e-w210-mopf',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W210 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 1999, end: 2002, display: '1999 – 2002' },
    class: 'Clase E MoPf • Intermitentes integrados en retrovisores exteriores • Cuadro con pantalla multifunción y volante multifunción',
    chassisCode: 'W210 MoPf',
    packages: ['Classic MoPf', 'Elegance MoPf', 'Avantgarde MoPf'],
    preferredFile: 'File:Mercedes-Benz E 220 CDI Classic (W 210, Facelift) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W210 facelift front', 'Mercedes E-Klasse W210 facelift front', 'Mercedes E 220 CDI W210 front'],
    engines: [{
      modelBadge: 'E 320 CDI',
      engineCode: 'OM613.961',
      architecture: '6 cilindros en línea Turbodiésel Common Rail 24V',
      cylinders: 6,
      displacementCc: 3222,
      displacementL: 3.2,
      fuel: 'Diésel',
      powerHp: 197,
      torqueNm: 470,
      topSpeedKmh: 230,
      accel0to100: 8.3,
      feedSystem: 'Inyección Common-Rail Bosch con turbo de geometría variable VNT',
      notes: 'Revolucionó el rendimiento diésel entregando 470 Nm de par motor desde 1.800 rpm.'
    }]
  },
  {
    id: 'mercedes-clase-e-w211-pre',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W211 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2002, end: 2006, display: '2002 – 2006' },
    class: 'Elegancia Aerodinámica Fluida • Frenos electrohidráulicos Sensotronic Brake Control (SBC) • Suspensión AIRMATIC DC',
    chassisCode: 'W211',
    packages: ['Classic', 'Elegance', 'Avantgarde'],
    preferredFile: 'File:Mercedes-Benz E 220 CDI Elegance (W 211) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W211 front', 'Mercedes E-Klasse W211 front', 'Mercedes E 270 CDI W211 front'],
    engines: [{
      modelBadge: 'E 55 AMG V8 Kompressor',
      engineCode: 'M113.990 Kompressor',
      architecture: 'V8 a 90º Supercharged con compresor Lysholm e intercooler de agua',
      cylinders: 8,
      displacementCc: 5439,
      displacementL: 5.4,
      fuel: 'Gasolina',
      powerHp: 476,
      torqueNm: 700,
      topSpeedKmh: 250,
      accel0to100: 4.7,
      feedSystem: 'Inyección electrónica multipunto de alta capacidad a 1.2 bar de soplado',
      notes: 'Capaz de rivalizar en aceleración en línea recta con superdeportivos contemporáneos.'
    }]
  },
  {
    id: 'mercedes-clase-e-w211-mopf',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W211 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2006, end: 2009, display: '2006 – 2009' },
    class: 'Clase E MoPf • Parrilla más afilada con punta en V • Sistema de seguridad PRE-SAFE de serie y retorno a frenos hidráulicos convencionales ADAPTIVE BRAKE',
    chassisCode: 'W211 MoPf',
    packages: ['Classic MoPf', 'Elegance MoPf', 'Avantgarde MoPf', 'AMG Sportpaket'],
    preferredFile: 'File:Mercedes-Benz E 200 Kompressor Elegance (W 211, Facelift) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W211 facelift front', 'Mercedes E-Klasse W211 facelift front', 'Mercedes E 63 AMG W211 front'],
    engines: [{
      modelBadge: 'E 63 AMG 6.2 V8',
      engineCode: 'M156.983',
      architecture: 'V8 atmosférico a 90º de 6.2 litros desarrollado por AMG',
      cylinders: 8,
      displacementCc: 6208,
      displacementL: 6.2,
      fuel: 'Gasolina',
      powerHp: 514,
      torqueNm: 630,
      topSpeedKmh: 250,
      accel0to100: 4.5,
      feedSystem: 'Inyección electrónica de alta respuesta con cambio 7G-TRONIC AMG SPEEDSHIFT',
      notes: 'La berlina más potente de su clase con motor atmosférico de giro rápido.'
    }]
  },
  {
    id: 'mercedes-clase-e-w212-pre',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W212 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2009, end: 2013, display: '2009 – 2013' },
    class: 'Diseño Esculpido con 4 Faros Angulares Romboidales • Aletas traseras estilo "Ponton" • Asistente de atención ATTENTION ASSIST',
    chassisCode: 'W212',
    packages: ['Elegance', 'Avantgarde', 'AMG Sports Package'],
    preferredFile: 'File:Mercedes-Benz E 250 CDI BlueEFFICIENCY Avantgarde (W 212) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W212 front', 'Mercedes E-Klasse W212 2010 front', 'Mercedes E 350 W212 front'],
    engines: [{
      modelBadge: 'E 63 AMG V8 Biturbo',
      engineCode: 'M157 DE55 AL',
      architecture: 'V8 Biturbo a 90º con inyección directa piezoeléctrica',
      cylinders: 8,
      displacementCc: 5461,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 525,
      torqueNm: 700,
      topSpeedKmh: 250,
      accel0to100: 4.3,
      feedSystem: 'Doble turbocompresor con intercooler agua-aire y cambio AMG SPEEDSHIFT MCT 7 velocidades',
      notes: 'La berlina V8 Biturbo con embrague húmedo multidisco en lugar de convertidor de par.'
    }]
  },
  {
    id: 'mercedes-clase-e-w212-mopf',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W212 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2013, end: 2016, display: '2013 – 2016' },
    class: 'El MoPf más ambicioso de la historia (inversión de 1.000 millones €) • Faros unificados Full-LED • Estreno de Intelligent Drive y tracción 4MATIC en AMG',
    chassisCode: 'W212 MoPf',
    packages: ['Elegance MoPf', 'Avantgarde MoPf', 'AMG Line MoPf', 'E 63 S 4MATIC'],
    preferredFile: 'File:Mercedes-Benz E 220 BlueTEC Avantgarde (W 212, Facelift) – Frontansicht, 25. Oktober 2014, Düsseldorf.jpg',
    searchQueries: ['Mercedes W212 facelift front', 'Mercedes E-Klasse W212 facelift front', 'Mercedes E 63 S AMG W212 front'],
    engines: [{
      modelBadge: 'E 63 S AMG 4MATIC',
      engineCode: 'M157 DE55 AL High Power',
      architecture: 'V8 Biturbo a 90º con tracción total deportiva AMG 4MATIC (33:67)',
      cylinders: 8,
      displacementCc: 5461,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 585,
      torqueNm: 800,
      topSpeedKmh: 300,
      accel0to100: 3.6,
      feedSystem: 'Inyección directa guiada por pulverización a 200 bar con turbos a 1.3 bar',
      notes: 'La primera berlina AMG de altas prestaciones en incorporar tracción integral permanente.'
    }]
  },
  {
    id: 'mercedes-clase-e-w213-pre',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W213 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2016, end: 2020, display: '2016 – 2020' },
    class: 'La berlina más inteligente del mundo en su lanzamiento • Conducción semiautónoma DRIVE PILOT • Doble pantalla Widescreen Cockpit',
    chassisCode: 'W213',
    packages: ['Avantgarde', 'Exclusive', 'AMG Line'],
    preferredFile: 'File:Mercedes-Benz W213 IMG 0184.jpg',
    searchQueries: ['Mercedes W213 front', 'Mercedes E-Klasse W213 front', 'Mercedes E 220 d W213 front'],
    engines: [{
      modelBadge: 'AMG E 63 S 4MATIC+',
      engineCode: 'M177 DE40 AL',
      architecture: 'V8 Biturbo a 90º Hot-V con turbocompresores Twin-Scroll y tracción 4MATIC+ totalmente variable',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 612,
      torqueNm: 850,
      topSpeedKmh: 300,
      accel0to100: 3.4,
      feedSystem: 'Desactivación selectiva de cilindros AMG Cylinder Management y modo Drift 100% propulsión trasera',
      notes: 'Capaz de enviar el 100% del par motor al eje trasero mediante su diferencial autoblocante electrohidráulico.'
    }]
  },
  {
    id: 'mercedes-clase-e-w213-mopf',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W213 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2020, end: 2023, display: '2020 – 2023' },
    class: 'Clase E MoPf • Faros afilados más rasgados • Volante capacitivo con doble radio • Asistente de atascos activo',
    chassisCode: 'W213 MoPf',
    packages: ['Avantgarde MoPf', 'Exclusive MoPf', 'AMG Line MoPf', 'All-Terrain MoPf'],
    preferredFile: 'File:Mercedes-Benz W213 Facelift IMG 0528.jpg',
    searchQueries: ['Mercedes W213 facelift front', 'Mercedes E-Klasse W213 facelift front', 'Mercedes E 53 AMG W213 front'],
    engines: [{
      modelBadge: 'AMG E 53 4MATIC+',
      engineCode: 'M256 E30 DEH LA G',
      architecture: '6 cilindros en línea Turbo con compresor eléctrico adicional (eZV) y alternador-arrancador integrado EQ Boost',
      cylinders: 6,
      displacementCc: 2999,
      displacementL: 3.0,
      fuel: 'Híbrido',
      powerHp: 435,
      torqueNm: 520,
      topSpeedKmh: 270,
      accel0to100: 4.5,
      feedSystem: 'Sistema eléctrico de 48 voltios sin correas auxiliares con impulso eléctrico instantáneo de 22 CV y 250 Nm',
      notes: 'Respuesta al acelerador instantánea gracias al compresor eléctrico que gira a 70.000 rpm en 300 milisegundos.'
    }]
  },
  {
    id: 'mercedes-clase-e-w214',
    series: 'Clase E',
    label: 'Mercedes-Benz Clase E (W214)',
    section: 'production',
    status: 'current',
    years: { start: 2023, end: null, display: '2023 – Presente' },
    class: 'La berlina ejecutiva de la era digital • Pantalla MBUX Superscreen panorámica • Óptica trasera con gráficos de la estrella Mercedes',
    chassisCode: 'W214',
    packages: ['Avantgarde', 'Exclusive', 'AMG Line', 'Night Package'],
    preferredFile: 'File:2024 Mercedes-Benz E 220 d Exclusive Line (W 214), front.jpg',
    searchQueries: ['Mercedes W214 front', 'Mercedes E-Klasse W214 front', '2024 Mercedes-Benz E-Class front'],
    engines: [{
      modelBadge: 'E 400 e 4MATIC PHEV',
      engineCode: 'M254 + E-Motor',
      architecture: '4 cilindros en línea 2.0L Turbo acoplado a motor eléctrico síncrono permanente de 129 CV',
      cylinders: 4,
      displacementCc: 1999,
      displacementL: 2.0,
      fuel: 'Híbrido Enchufable',
      powerHp: 381,
      torqueNm: 650,
      topSpeedKmh: 250,
      accel0to100: 5.3,
      feedSystem: 'Batería de 25.4 kWh con autonomía eléctrica de hasta 115 km WLTP',
      notes: 'Eje trasero direccional con ángulo de hasta 4.5 grados y cámara selfie/vídeo en salpicadero para videoconferencias.'
    }]
  },

  // ==========================================
  // CLASE S (BUQUE INSIGNIA DE LUJO)
  // ==========================================
  {
    id: 'mercedes-clase-s-w116',
    series: 'Clase S',
    label: 'Mercedes-Benz Clase S / 450 SEL 6.9 (W116)',
    section: 'production',
    status: 'past',
    years: { start: 1972, end: 1980, display: '1972 – 1980' },
    class: 'Primer modelo oficialmente denominado "S-Klasse" (Sonderklasse) • Primer coche del mundo con frenos ABS (1978)',
    chassisCode: 'W116',
    packages: ['Standard S', 'Long SEL', '450 SEL 6.9'],
    preferredFile: 'File:Mercedes-Benz 450 SEL 6.9 (W 116) – Frontansicht, 24. Juni 2012, Düsseldorf.jpg',
    searchQueries: ['Mercedes W116 front', 'Mercedes 450 SEL 6.9 front', 'Mercedes-Benz W116 front'],
    engines: [{
      modelBadge: '450 SEL 6.9',
      engineCode: 'M100.985',
      architecture: 'V8 a 90º de gigantesca cilindrada con cárter seco',
      cylinders: 8,
      displacementCc: 6834,
      displacementL: 6.9,
      fuel: 'Gasolina',
      powerHp: 286,
      torqueNm: 550,
      topSpeedKmh: 225,
      accel0to100: 7.4,
      feedSystem: 'Inyección mecánica continua Bosch K-Jetronic con cárter seco de 12 litros de aceite',
      notes: 'Suspensión hidroneumática autonivelante en las 4 ruedas que ofrecía una comodidad de marcha inalcanzable.'
    }]
  },
  {
    id: 'mercedes-clase-s-w126',
    series: 'Clase S',
    label: 'Mercedes-Benz Clase S / 560 SEL (W126)',
    section: 'production',
    status: 'past',
    years: { start: 1979, end: 1991, display: '1979 – 1991' },
    class: 'La cumbre de Bruno Sacco • Pionero del airbag para conductor y pretensores de cinturón • La Clase S más longeva y exitosa',
    chassisCode: 'W126',
    packages: ['Standard SE', 'Long SEL', 'SEC Coupé (C126)'],
    preferredFile: 'File:Mercedes-Benz 560 SEL (W 126) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W126 front', 'Mercedes 560 SEL front', 'Mercedes-Benz W126 front'],
    engines: [{
      modelBadge: '560 SEL V8',
      engineCode: 'M117.968',
      architecture: 'V8 a 90º de aleación de aluminio y silicio (Alusil)',
      cylinders: 8,
      displacementCc: 5547,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 300,
      torqueNm: 455,
      topSpeedKmh: 250,
      accel0to100: 6.9,
      feedSystem: 'Inyección electrónica-mecánica Bosch KE-Jetronic',
      notes: 'Utilizado por mandatarios y jefes de estado de todo el planeta como epítome del lujo y la distinción diplomática.'
    }]
  },
  {
    id: 'mercedes-clase-s-w140',
    series: 'Clase S',
    label: 'Mercedes-Benz Clase S / S 600 V12 "Catedral" (W140)',
    section: 'production',
    status: 'past',
    years: { start: 1991, end: 1998, display: '1991 – 1998' },
    class: 'Ingeniería sin límites de presupuesto • Cristales dobles aislantes de 10 mm • Cierre asistido de puertas Soft-Close y estreno del ESP',
    chassisCode: 'W140',
    packages: ['Standard SE', 'Long SEL / LWB', 'S 600 V12 Spec', 'SEC / CL Coupé C140'],
    preferredFile: 'File:Mercedes-Benz S 600 (W 140) – Frontansicht, 23. Juni 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes W140 front', 'Mercedes S 600 W140 front', 'Mercedes-Benz W140 front'],
    engines: [{
      modelBadge: 'S 600 V12 48V',
      engineCode: 'M120.980',
      architecture: 'V12 atmosférico a 60º DOHC 48 válvulas de aluminio macizo',
      cylinders: 12,
      displacementCc: 5987,
      displacementL: 6.0,
      fuel: 'Gasolina',
      powerHp: 408,
      torqueNm: 580,
      topSpeedKmh: 250,
      accel0to100: 6.0,
      feedSystem: 'Doble unidad de inyección electrónica Bosch Motronic LH secuencial (una por cada bancada de 6 cilindros)',
      notes: 'El motor que sirvió de base a Horacio Pagani para propulsar el mítico Pagani Zonda.'
    }]
  },
  {
    id: 'mercedes-clase-s-w220-pre',
    series: 'Clase S',
    label: 'Mercedes-Benz Clase S (W220 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 1998, end: 2002, display: '1998 – 2002' },
    class: 'Silueta Aerodinámica Esbelta • Suspensión neumática AIRMATIC de serie • Control de crucero adaptativo por radar DISTRONIC',
    chassisCode: 'W220',
    packages: ['Standard', 'LWB V220', 'S 55 AMG', 'Designo'],
    preferredFile: 'File:Mercedes-Benz S 320 (W 220) – Frontansicht, 21. Mai 2011, Velbert.jpg',
    searchQueries: ['Mercedes W220 front', 'Mercedes S-Klasse W220 front', 'Mercedes S 500 W220 front'],
    engines: [{
      modelBadge: 'S 500 V8',
      engineCode: 'M113.960',
      architecture: 'V8 a 90º SOHC 24 válvulas con 2 bujías por cilindro',
      cylinders: 8,
      displacementCc: 4966,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 306,
      torqueNm: 460,
      topSpeedKmh: 250,
      accel0to100: 6.5,
      feedSystem: 'Inyección electrónica secuencial con desconexión selectiva de cilindros ZAS',
      notes: 'Pionero en estrenar el sistema de arranque sin llave KEYLESS-GO mediante tarjeta inteligente.'
    }]
  },
  {
    id: 'mercedes-clase-s-w220-mopf',
    series: 'Clase S',
    label: 'Mercedes-Benz Clase S (W220 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2002, end: 2005, display: '2002 – 2005' },
    class: 'Clase S MoPf • Faros de cristal claro • Estreno del sistema preventivo PRE-SAFE y monstruosos V12 Biturbo S 600 y S 65 AMG',
    chassisCode: 'W220 MoPf',
    packages: ['Standard MoPf', 'LWB MoPf', 'S 55 Kompressor', 'S 65 AMG V12 Biturbo'],
    preferredFile: 'File:Mercedes-Benz S 350 (W 220, Facelift) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W220 facelift front', 'Mercedes S-Klasse W220 facelift front', 'Mercedes S 600 W220 facelift front'],
    engines: [{
      modelBadge: 'S 65 AMG 6.0 V12 Biturbo',
      engineCode: 'M275.980 AMG',
      architecture: 'V12 Twin-Turbo a 60º con intercoolers agua-aire',
      cylinders: 12,
      displacementCc: 5980,
      displacementL: 6.0,
      fuel: 'Gasolina',
      powerHp: 612,
      torqueNm: 1000,
      topSpeedKmh: 250,
      accel0to100: 4.4,
      feedSystem: 'Inyección electrónica Bosch ME con turbocompresores gemelos y 1.000 Nm de par limitado',
      notes: 'La berlina de producción en serie más potente del mundo en su época.'
    }]
  },
  {
    id: 'mercedes-clase-s-w221-pre',
    series: 'Clase S',
    label: 'Mercedes-Benz Clase S (W221 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2005, end: 2009, display: '2005 – 2009' },
    class: 'Presencia Imponente con Pasos de Rueda Musculosos • Sistema COMAND con mando giratorio de aluminio • Asistente de visión nocturna Night View Assist',
    chassisCode: 'W221',
    packages: ['Standard', 'LWB V221', 'AMG Sports Package'],
    preferredFile: 'File:Mercedes-Benz S 350 (W 221) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W221 front', 'Mercedes S-Klasse W221 front', 'Mercedes S 500 W221 front'],
    engines: [{
      modelBadge: 'S 500 5.5 V8',
      engineCode: 'M273.961',
      architecture: 'V8 a 90º DOHC 32 válvulas con distribución continuamente variable',
      cylinders: 8,
      displacementCc: 5461,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 388,
      torqueNm: 530,
      topSpeedKmh: 250,
      accel0to100: 5.4,
      feedSystem: 'Inyección electrónica multipunto con colector de admisión de magnesio de longitud variable',
      notes: 'Suspensión activa hidráulica Active Body Control (ABC) que neutraliza por completo el balanceo en curva.'
    }]
  },
  {
    id: 'mercedes-clase-s-w221-mopf',
    series: 'Clase S',
    label: 'Mercedes-Benz Clase S (W221 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2009, end: 2013, display: '2009 – 2013' },
    class: 'Clase S MoPf • Nuevos faros con tiras de LED diurnas • Pantalla SPLITVIEW (conductor y copiloto ven contenidos distintos en la misma pantalla)',
    chassisCode: 'W221 MoPf',
    packages: ['Standard MoPf', 'LWB MoPf', 'S 63 AMG MoPf', 'S 65 AMG MoPf'],
    preferredFile: 'File:Mercedes-Benz S 350 BlueTEC (W 221, Facelift) – Frontansicht, 25. August 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes W221 facelift front', 'Mercedes S-Klasse W221 facelift front', 'Mercedes S 350 W221 facelift front'],
    engines: [{
      modelBadge: 'S 63 AMG 5.5 V8 Biturbo',
      engineCode: 'M157 DE55 AL',
      architecture: 'V8 Biturbo a 90º con inyección directa piezoeléctrica y cambio AMG SPEEDSHIFT MCT 7G',
      cylinders: 8,
      displacementCc: 5461,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 544,
      torqueNm: 800,
      topSpeedKmh: 250,
      accel0to100: 4.5,
      feedSystem: 'Doble turbocompresor con 571 CV y 900 Nm con el paquete AMG Performance Package',
      notes: 'Consumo reducido en un 25% respecto al motor atmosférico 6.2 V8 previo gracias al Stop/Start ECO.'
    }]
  },
  {
    id: 'mercedes-clase-s-w222-pre',
    series: 'Clase S',
    label: 'Mercedes-Benz Clase S (W222 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2013, end: 2017, display: '2013 – 2017' },
    class: 'Primer coche del mundo 100% libre de bombillas incandescentes (más de 500 LEDs) • MAGIC BODY CONTROL con cámara de escaneo de asfalto ROAD SURFACE SCAN',
    chassisCode: 'W222',
    packages: ['Standard', 'LWB V222', 'Mercedes-Maybach X222', 'S 63 AMG 4MATIC'],
    preferredFile: 'File:Mercedes-Benz S 350 BlueTEC (W 222) – Frontansicht, 20. Oktober 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes W222 front', 'Mercedes S-Klasse W222 front', 'Mercedes S 350 W222 front'],
    engines: [{
      modelBadge: 'S 63 AMG 4MATIC',
      engineCode: 'M157 DE55 AL',
      architecture: 'V8 Biturbo a 90º con tracción total deportiva 4MATIC (33:67)',
      cylinders: 8,
      displacementCc: 5461,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 585,
      torqueNm: 900,
      topSpeedKmh: 250,
      accel0to100: 4.0,
      feedSystem: 'Inyección directa piezoeléctrica guiada por pulverización a 200 bar',
      notes: 'Batería de arranque de iones de litio de serie para ahorrar más de 20 kg de peso.'
    }]
  },
  {
    id: 'mercedes-maybach-s650-w222-mopf',
    series: 'Clase S',
    label: 'Mercedes-Maybach Clase S / S 650 (X222 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2017, end: 2020, display: '2017 – 2020' },
    class: 'Submarca de Ultralujo Mercedes-Maybach • Batalla alargada 20 cm respecto a la versión larga • Parrilla de lamas verticales de traje diplomático y V12 Biturbo',
    chassisCode: 'X222 MoPf',
    packages: ['Maybach S 560', 'Maybach S 650 V12', 'Maybach Pullman (VV222)'],
    preferredFile: 'File:Mercedes-Maybach S 650 (X 222, Facelift) – Frontansicht, 19. Mai 2019, Düsseldorf.jpg',
    searchQueries: ['Mercedes-Maybach S 650 front', 'Mercedes Maybach X222 facelift front', 'Maybach S 650 front'],
    engines: [{
      modelBadge: 'Maybach S 650 V12',
      engineCode: 'M279 E60 AL',
      architecture: 'V12 Biturbo a 60º 36 válvulas con encendido multichispa',
      cylinders: 12,
      displacementCc: 5980,
      displacementL: 6.0,
      fuel: 'Gasolina',
      powerHp: 630,
      torqueNm: 1000,
      topSpeedKmh: 250,
      accel0to100: 4.7,
      feedSystem: 'Turbos de alto rendimiento con intercoolers refrigerados por agua y 1.000 Nm disponibles desde 2.300 rpm',
      notes: 'Asientos traseros Executive First-Class con función de masaje con efecto de piedras calientes y copas de champán plateadas Robbe & Berking.'
    }]
  },
  {
    id: 'mercedes-clase-s-w223',
    series: 'Clase S',
    label: 'Mercedes-Benz Clase S (W223)',
    section: 'production',
    status: 'current',
    years: { start: 2020, end: null, display: '2020 – Presente' },
    class: 'Referente Mundial Absoluto de Confort y Tecnología • Conducción autónoma Nivel 3 DRIVE PILOT homologada • Airbags frontales para plazas traseras y eje direccional 10º',
    chassisCode: 'W223',
    packages: ['Standard W223', 'LWB V223', 'AMG Line', 'Maybach Z223'],
    preferredFile: 'File:Mercedes-Benz W223 IMG 4022.jpg',
    searchQueries: ['Mercedes W223 front', 'Mercedes S-Klasse W223 front', 'Mercedes S 500 W223 front'],
    engines: [{
      modelBadge: 'AMG S 63 E-PERFORMANCE',
      engineCode: 'M177 + EDU Rear Axle',
      architecture: 'V8 Biturbo 4.0L combinado con motor eléctrico trasero de 190 CV',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Híbrido Enchufable',
      powerHp: 802,
      torqueNm: 1430,
      topSpeedKmh: 290,
      accel0to100: 3.3,
      feedSystem: 'Batería HPB desarrollada con Mercedes-AMG Petronas F1 de 13.1 kWh',
      notes: 'La Clase S más potente jamás fabricada, con aceleración descomunal manteniendo el silencio sepulcral de marcha.'
    }]
  },

  // ==========================================
  // CLASE CLA & CLS (BERLINAS COUPÉ)
  // ==========================================
  {
    id: 'mercedes-cla-c117-pre',
    series: 'CLA',
    label: 'Mercedes-Benz CLA Coupé (C117 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2013, end: 2016, display: '2013 – 2016' },
    class: 'Coupé de 4 Puertas Compacto • Récord aerodinámico de producción mundial Cx 0.22 • Puertas sin marco',
    chassisCode: 'C117',
    packages: ['Urban', 'AMG Line', 'Edition 1', 'CLA 45 AMG'],
    preferredFile: 'File:Mercedes-Benz CLA 220 CDI Urban (C 117) – Frontansicht, 23. Juni 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes C117 front', 'Mercedes CLA C117 front', 'Mercedes CLA 220 C117 front'],
    engines: [{
      modelBadge: 'CLA 45 AMG 4MATIC',
      engineCode: 'M133 DE20 AL',
      architecture: '4 cilindros en línea 2.0L Turbo Twin-Scroll',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 360,
      torqueNm: 450,
      topSpeedKmh: 250,
      accel0to100: 4.6,
      feedSystem: 'Inyección directa guiada por pulverización con turbo a 1.8 bar',
      notes: 'Tracción total AMG 4MATIC con distribución de par adaptativa y cambio AMG SPEEDSHIFT DCT de 7 marchas.'
    }]
  },
  {
    id: 'mercedes-cla-c117-mopf',
    series: 'CLA',
    label: 'Mercedes-Benz CLA Coupé (C117 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2016, end: 2019, display: '2016 – 2019' },
    class: 'CLA MoPf • Faros LED High Performance de serie • Integración de smartphones Apple CarPlay y Android Auto',
    chassisCode: 'C117 MoPf',
    packages: ['Urban MoPf', 'AMG Line MoPf', 'Night Package', 'Shooting Brake X117'],
    preferredFile: 'File:Mercedes-Benz CLA 200 Shooting Brake Urban (X 117, Facelift) – Frontansicht, 25. Juni 2016, Düsseldorf.jpg',
    searchQueries: ['Mercedes C117 facelift front', 'Mercedes CLA facelift front', 'Mercedes CLA 200 C117 facelift front'],
    engines: [{
      modelBadge: 'CLA 45 AMG MoPf',
      engineCode: 'M133 DE20 AL MoPf',
      architecture: '4 cilindros en línea Turbo potenciado a 381 CV con relaciones de cambio más cortas',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 381,
      torqueNm: 475,
      topSpeedKmh: 270,
      accel0to100: 4.2,
      feedSystem: 'Inyección piezoeléctrica Bosch de alta precisión',
      notes: 'Paragolpes delantero en diseño A-Wing con flics aerodinámicos.'
    }]
  },
  {
    id: 'mercedes-cla-c118-pre',
    series: 'CLA',
    label: 'Mercedes-Benz CLA Coupé (C118 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2019, end: 2023, display: '2019 – 2023' },
    class: 'Segunda Generación CLA • Vías más anchas (+63 mm delante) • Sistema MBUX con asistente gestual para interior',
    chassisCode: 'C118',
    packages: ['Progressive', 'AMG Line', 'Shooting Brake X118', 'CLA 35 / 45 S AMG'],
    preferredFile: 'File:Mercedes-Benz C118 IMG 0935.jpg',
    searchQueries: ['Mercedes C118 front', 'Mercedes CLA C118 front', 'Mercedes CLA 200 C118 front'],
    engines: [{
      modelBadge: 'AMG CLA 45 S 4MATIC+',
      engineCode: 'M139',
      architecture: '4 cilindros en línea Turbo invertido con AMG TORQUE CONTROL',
      cylinders: 4,
      displacementCc: 1991,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 421,
      torqueNm: 500,
      topSpeedKmh: 270,
      accel0to100: 4.0,
      feedSystem: 'Doble inyección con turbocompresor de rodillos a 2.1 bar de soplado',
      notes: 'Modo Drift para derrapes controlados gracias a sus dos embragues multidisco traseros.'
    }]
  },
  {
    id: 'mercedes-cla-c118-mopf',
    series: 'CLA',
    label: 'Mercedes-Benz CLA Coupé (C118 MoPf)',
    section: 'production',
    status: 'current',
    years: { start: 2023, end: null, display: '2023 – Presente' },
    class: 'CLA MoPf • Nueva parrilla con patrón de micro-estrellas Mercedes • Faros LED rediseñados y electrificación Mild-Hybrid 48V',
    chassisCode: 'C118 MoPf',
    packages: ['Progressive MoPf', 'AMG Line MoPf', 'AMG CLA 35 / 45 S MoPf'],
    preferredFile: 'File:2023 Mercedes-Benz CLA 200 Coupé (C 118, Facelift) in Cosmos Black Metallic, front left.jpg',
    searchQueries: ['Mercedes CLA C118 facelift front', 'Mercedes C118 facelift front', 'Mercedes CLA 2024 front'],
    engines: [{
      modelBadge: 'CLA 250 e PHEV MoPf',
      engineCode: 'M282 + E-Motor',
      architecture: '4 cilindros en línea 1.33L Turbo híbrido enchufable',
      cylinders: 4,
      displacementCc: 1332,
      displacementL: 1.3,
      fuel: 'Híbrido Enchufable',
      powerHp: 218,
      torqueNm: 450,
      topSpeedKmh: 229,
      accel0to100: 7.6,
      feedSystem: 'Batería de 15.6 kWh con recarga CA hasta 11 kW y CC opcional a 22 kW',
      notes: 'Autonomía en modo cero emisiones ampliada hasta 82 km en ciudad.'
    }]
  },
  {
    id: 'mercedes-cls-c219-pre',
    series: 'CLS',
    label: 'Mercedes-Benz CLS Coupé (C219 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2004, end: 2008, display: '2004 – 2008' },
    class: 'El Creador de la Categoría "Berlina Coupé de 4 Puertas" • Diseño icónico esculpido por Michael Fink • Perfil arqueado sin rival',
    chassisCode: 'C219',
    packages: ['Standard', 'Designo', 'CLS 55 AMG Kompressor'],
    preferredFile: 'File:Mercedes CLS 350 (C 219) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes C219 front', 'Mercedes CLS C219 front', 'Mercedes CLS 350 C219 front'],
    engines: [{
      modelBadge: 'CLS 55 AMG Kompressor',
      engineCode: 'M113.990 Kompressor',
      architecture: 'V8 Supercharged a 90º con compresor Lysholm',
      cylinders: 8,
      displacementCc: 5439,
      displacementL: 5.4,
      fuel: 'Gasolina',
      powerHp: 476,
      torqueNm: 700,
      topSpeedKmh: 250,
      accel0to100: 4.7,
      feedSystem: 'Inyección electrónica multipunto de alto caudal',
      notes: 'Un hito estético que obligó a toda la industria automotriz a crear berlinas de corte coupé.'
    }]
  },
  {
    id: 'mercedes-cls-c219-mopf',
    series: 'CLS',
    label: 'Mercedes-Benz CLS Coupé (C219 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2008, end: 2010, display: '2008 – 2010' },
    class: 'CLS MoPf • Parrilla de dos lamas transversales • Pilotos traseros LED en forma de flecha y retrovisores con intermitentes LED',
    chassisCode: 'C219 MoPf',
    packages: ['Standard MoPf', 'Grand Edition', 'CLS 63 AMG V8'],
    preferredFile: 'File:Mercedes CLS 350 CGI (C 219, Facelift) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes C219 facelift front', 'Mercedes CLS C219 facelift front', 'Mercedes CLS 63 AMG C219 front'],
    engines: [{
      modelBadge: 'CLS 63 AMG 6.2 V8',
      engineCode: 'M156.983',
      architecture: 'V8 atmosférico a 90º de alto régimen de 6.2 litros',
      cylinders: 8,
      displacementCc: 6208,
      displacementL: 6.2,
      fuel: 'Gasolina',
      powerHp: 514,
      torqueNm: 630,
      topSpeedKmh: 250,
      accel0to100: 4.5,
      feedSystem: 'Inyección electrónica multipunto con cambio 7G-TRONIC AMG SPEEDSHIFT',
      notes: 'Edición Grand Edition con pintura mate Designo Magno Platinum.'
    }]
  },
  {
    id: 'mercedes-cls-c218-pre',
    series: 'CLS',
    label: 'Mercedes-Benz CLS Coupé (C218 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2010, end: 2014, display: '2010 – 2014' },
    class: 'Segunda Generación CLS • Primer coche de serie con faros Dynamic Full-LED • Estreno de la carrocería Shooting Brake (X218)',
    chassisCode: 'C218',
    packages: ['Standard', 'AMG Sport Package', 'Shooting Brake X218', 'CLS 63 AMG'],
    preferredFile: 'File:Mercedes-Benz CLS 350 BlueEFFICIENCY (C 218) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes C218 front', 'Mercedes CLS C218 front', 'Mercedes CLS 350 C218 front'],
    engines: [{
      modelBadge: 'CLS 63 AMG 5.5 V8 Biturbo',
      engineCode: 'M157 DE55 AL',
      architecture: 'V8 Biturbo a 90º con inyección directa guiada por pulverización',
      cylinders: 8,
      displacementCc: 5461,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 525,
      torqueNm: 700,
      topSpeedKmh: 250,
      accel0to100: 4.4,
      feedSystem: 'Doble turbocompresor con transmisión AMG SPEEDSHIFT MCT 7 velocidades',
      notes: 'Capó, aletas delanteras, puertas y tapa de maletero fabricadas íntegramente en aluminio.'
    }]
  },
  {
    id: 'mercedes-cls-c218-mopf',
    series: 'CLS',
    label: 'Mercedes-Benz CLS Coupé (C218 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2014, end: 2018, display: '2014 – 2018' },
    class: 'CLS MoPf • Estreno mundial de los faros MULTIBEAM LED matriciales • Cambio automático 9G-TRONIC de 9 velocidades',
    chassisCode: 'C218 MoPf',
    packages: ['Standard MoPf', 'AMG Line MoPf', 'Final Edition', 'CLS 63 S 4MATIC'],
    preferredFile: 'File:Mercedes-Benz CLS 220 BlueTEC (C 218, Facelift) – Frontansicht, 25. Oktober 2014, Düsseldorf.jpg',
    searchQueries: ['Mercedes C218 facelift front', 'Mercedes CLS C218 facelift front', 'Mercedes CLS 63 S AMG C218 front'],
    engines: [{
      modelBadge: 'CLS 63 S AMG 4MATIC',
      engineCode: 'M157 DE55 AL High Power',
      architecture: 'V8 Biturbo con tracción total permanente deportiva 4MATIC',
      cylinders: 8,
      displacementCc: 5461,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 585,
      torqueNm: 800,
      topSpeedKmh: 250,
      accel0to100: 3.6,
      feedSystem: 'Inyección directa piezoeléctrica con diferencial trasero autoblocante mecánico',
      notes: 'La carrocería Shooting Brake ofrecía suelo de maletero opcional en madera de cerezo americano Designo.'
    }]
  },
  {
    id: 'mercedes-cls-c257-mopf',
    series: 'CLS',
    label: 'Mercedes-Benz CLS Coupé (C257 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2021, end: 2023, display: '2021 – 2023' },
    class: 'La Tercera y Última Generación CLS • Parrilla frontal de diseño Shark-Nose invertido • Cinco plazas por primera vez en la gama',
    chassisCode: 'C257 MoPf',
    packages: ['Avantgarde MoPf', 'AMG Line MoPf', 'CLS 53 4MATIC+'],
    preferredFile: 'File:Mercedes-Benz C257 Facelift IMG 5440.jpg',
    searchQueries: ['Mercedes C257 facelift front', 'Mercedes CLS C257 facelift front', 'Mercedes CLS 53 AMG C257 front'],
    engines: [{
      modelBadge: 'AMG CLS 53 4MATIC+',
      engineCode: 'M256 E30 DEH LA G',
      architecture: '6 cilindros en línea Turbo con compresor eléctrico eZV y asistencia híbrida EQ Boost de 48V',
      cylinders: 6,
      displacementCc: 2999,
      displacementL: 3.0,
      fuel: 'Híbrido',
      powerHp: 435,
      torqueNm: 520,
      topSpeedKmh: 270,
      accel0to100: 4.5,
      feedSystem: 'Sobrealimentación doble (turbo de gases + compresor eléctrico a 70.000 rpm)',
      notes: 'La despedida definitiva de la emblemática saga CLS que definió una era en el diseño automotriz.'
    }]
  },
  {
    id: 'mercedes-cle-c236',
    series: 'CLE',
    label: 'Mercedes-Benz CLE Coupé / Cabriolet (C236 / A236)',
    section: 'production',
    status: 'current',
    years: { start: 2023, end: null, display: '2023 – Presente' },
    class: 'El Renacimiento del Gran Coupé • Fusión del dinamismo de la Clase C con la presencia y porte de la Clase E',
    chassisCode: 'C236',
    packages: ['Avantgarde', 'AMG Line', 'CLE 53 4MATIC+ Coupé'],
    preferredFile: 'File:Mercedes-Benz CLE 220 d Coupé AMG Line (C 236) in High-Tech Silver, front right.jpg',
    searchQueries: ['Mercedes-Benz CLE C236 front', 'Mercedes CLE Coupe front', 'CLE 53 AMG front'],
    engines: [{
      modelBadge: 'AMG CLE 53 4MATIC+',
      engineCode: 'M256M',
      architecture: '6 cilindros en línea 3.0L Turbo optimizado con compresor eléctrico adicional y EQ Boost 48V',
      cylinders: 6,
      displacementCc: 2999,
      displacementL: 3.0,
      fuel: 'Híbrido',
      powerHp: 449,
      torqueNm: 560,
      topSpeedKmh: 270,
      accel0to100: 4.2,
      feedSystem: 'Función Overboost a 600 Nm durante 10 segundos con tracción total totalmente variable AMG Performance 4MATIC+',
      notes: 'Vías ensanchadas en 58 mm delante y 75 mm detrás respecto al CLE estándar, con eje trasero direccional de serie.'
    }]
  },

  // ==========================================
  // CLASE SL (ROADSTERS & GRAN TURISMO)
  // ==========================================
  {
    id: 'mercedes-sl-w113-pagoda',
    series: 'SL',
    label: 'Mercedes-Benz SL "Pagoda" (W113)',
    section: 'production',
    status: 'past',
    years: { start: 1963, end: 1971, display: '1963 – 1971' },
    class: 'Obra Maestra de Paul Bracq • Techo rígido cóncavo de seguridad inspirado en pagodas orientales • Primer roadster con habitáculo de seguridad y zonas de deformación',
    chassisCode: 'W113',
    packages: ['230 SL', '250 SL', '280 SL'],
    preferredFile: 'File:Mercedes-Benz 280 SL Pagode (W 113) – Frontansicht, 23. Juni 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes W113 Pagoda front', 'Mercedes 280 SL Pagode front', 'Mercedes-Benz W113 front'],
    engines: [{
      modelBadge: '280 SL Pagoda',
      engineCode: 'M130.983',
      architecture: '6 cilindros en línea atmosférico SOHC',
      cylinders: 6,
      displacementCc: 2778,
      displacementL: 2.8,
      fuel: 'Gasolina',
      powerHp: 170,
      torqueNm: 240,
      topSpeedKmh: 200,
      accel0to100: 9.0,
      feedSystem: 'Inyección mecánica multipunto Bosch de 6 pistones en bomba',
      notes: 'Uno de los roadsters clásicos más elegantes, codiciados y cotizados de todos los tiempos.'
    }]
  },
  {
    id: 'mercedes-sl-r107',
    series: 'SL',
    label: 'Mercedes-Benz SL / SLC (R107 / C107)',
    section: 'production',
    status: 'past',
    years: { start: 1971, end: 1989, display: '1971 – 1989' },
    class: 'El Roadster más longevo de Mercedes (18 años en producción) • Pilotos acanalados antisuciedad • Motores V8 de gran cubicaje',
    chassisCode: 'R107',
    packages: ['Roadster Hardtop R107', 'Coupe SLC C107', '560 SL US-Spec'],
    preferredFile: 'File:Mercedes-Benz 500 SL (R 107) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes R107 front', 'Mercedes-Benz 500 SL R107 front', 'Mercedes R107 SL front'],
    engines: [{
      modelBadge: '500 SL V8',
      engineCode: 'M117.962',
      architecture: 'V8 a 90º de aluminio atmosférico',
      cylinders: 8,
      displacementCc: 4973,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 245,
      torqueNm: 400,
      topSpeedKmh: 225,
      accel0to100: 7.3,
      feedSystem: 'Inyección continua Bosch K-Jetronic / KE-Jetronic',
      notes: 'Símbolo del lujo, el glamour de Beverly Hills y el éxito profesional durante los años 70 y 80.'
    }]
  },
  {
    id: 'mercedes-sl-r129-pre',
    series: 'SL',
    label: 'Mercedes-Benz SL (R129 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 1989, end: 1995, display: '1989 – 1995' },
    class: 'Revolución Tecnológica de Bruno Sacco • Barra antivuelco automática que se despliega en 0.3 segundos • Capota electrohidráulica con 15 cilindros hidráulicos',
    chassisCode: 'R129',
    packages: ['Standard SL', 'Hardtop Aluminium', '500 SL', '600 SL V12'],
    preferredFile: 'File:Mercedes-Benz 500 SL (R 129) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes R129 front', 'Mercedes-Benz 500 SL R129 front', 'Mercedes R129 SL front'],
    engines: [{
      modelBadge: '600 SL V12 48V',
      engineCode: 'M120.981',
      architecture: 'V12 a 60º DOHC 48 válvulas atmosférico',
      cylinders: 12,
      displacementCc: 5987,
      displacementL: 6.0,
      fuel: 'Gasolina',
      powerHp: 394,
      torqueNm: 570,
      topSpeedKmh: 250,
      accel0to100: 6.1,
      feedSystem: 'Inyección electrónica secuencial Bosch LH-Jetronic con doble gestión',
      notes: 'Asientos integrales de magnesio fundido con cinturón incorporado capaces de soportar impactos extremos.'
    }]
  },
  {
    id: 'mercedes-sl-r129-mopf',
    series: 'SL',
    label: 'Mercedes-Benz SL / SL 73 AMG (R129 MoPf)',
    section: 'm-performance',
    status: 'past',
    years: { start: 1998, end: 2001, display: '1998 – 2001' },
    class: 'R129 MoPf • Pasos de rueda redondeados y nuevas llantas de 5 radios • El motor V12 de mayor cilindrada en un coche de calle (7.3 litros)',
    chassisCode: 'R129 MoPf',
    packages: ['SL 500 MoPf', 'SL 600 MoPf', 'SL 73 AMG (85 unidades)'],
    preferredFile: 'File:Mercedes-Benz SL 500 (R 129, 2. Facelift) – Frontansicht, 11. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes R129 facelift front', 'Mercedes SL 500 R129 facelift front', 'Mercedes SL 73 AMG front'],
    engines: [{
      modelBadge: 'SL 73 AMG 7.3 V12',
      engineCode: 'M120 AMG 7.3',
      architecture: 'V12 atmosférico a 60º ampliado a 7.3 litros por AMG',
      cylinders: 12,
      displacementCc: 7291,
      displacementL: 7.3,
      fuel: 'Gasolina',
      powerHp: 525,
      torqueNm: 750,
      topSpeedKmh: 300,
      accel0to100: 4.8,
      feedSystem: 'Inyección secuencial Bosch Motronic optimizada por AMG',
      notes: 'Solo 85 unidades fabricadas. El propulsor que Horacio Pagani eligió posteriormente para el Pagani Zonda C12 S y Zonda F.'
    }]
  },
  {
    id: 'mercedes-sl-r230-pre',
    series: 'SL',
    label: 'Mercedes-Benz SL (R230 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2001, end: 2006, display: '2001 – 2006' },
    class: 'Pionero con Techo Rígido Retráctil Vario-Roof (se pliega en 16 segundos) • Faros de doble óvalo interconectados • Suspensión Active Body Control (ABC)',
    chassisCode: 'R230',
    packages: ['Standard SL', 'SL 55 AMG Kompressor', 'SL 65 AMG V12 Biturbo'],
    preferredFile: 'File:Mercedes-Benz SL 500 (R 230) – Frontansicht, 21. Mai 2011, Velbert.jpg',
    searchQueries: ['Mercedes R230 front', 'Mercedes-Benz SL 500 R230 front', 'Mercedes SL 55 AMG R230 front'],
    engines: [{
      modelBadge: 'SL 55 AMG Kompressor',
      engineCode: 'M113.992 Kompressor',
      architecture: 'V8 Supercharged a 90º con compresor Lysholm e intercooler',
      cylinders: 8,
      displacementCc: 5439,
      displacementL: 5.4,
      fuel: 'Gasolina',
      powerHp: 500,
      torqueNm: 700,
      topSpeedKmh: 250,
      accel0to100: 4.7,
      feedSystem: 'Inyección electrónica multipunto secuencial con soplado a 0.8 bar',
      notes: 'El coche de uso diario preferido por Steve Jobs, conocido por circular legalmente sin matrícula en California.'
    }]
  },
  {
    id: 'mercedes-sl-r230-mopf',
    series: 'SL',
    label: 'Mercedes-Benz SL (R230 MoPf 2)',
    section: 'production',
    status: 'past',
    years: { start: 2008, end: 2011, display: '2008 – 2011' },
    class: 'R230 MoPf • Frontal afilado monocromo con faros de flecha • Sistema de calefacción de cuello AIRSCARF integrado en reposacabezas',
    chassisCode: 'R230 MoPf',
    packages: ['Standard MoPf', 'AMG Sports Package', 'SL 63 AMG', 'SL 65 AMG'],
    preferredFile: 'File:Mercedes-Benz SL 350 (R 230, 2. Facelift) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes R230 facelift front', 'Mercedes-Benz SL R230 facelift front', 'Mercedes SL 63 AMG R230 front'],
    engines: [{
      modelBadge: 'SL 63 AMG 6.2 V8',
      engineCode: 'M156.984',
      architecture: 'V8 atmosférico a 90º con cambio deportivo AMG SPEEDSHIFT MCT 7G',
      cylinders: 8,
      displacementCc: 6208,
      displacementL: 6.2,
      fuel: 'Gasolina',
      powerHp: 525,
      torqueNm: 630,
      topSpeedKmh: 250,
      accel0to100: 4.6,
      feedSystem: 'Inyección electrónica secuencial con régimen máximo a 7.200 rpm',
      notes: 'Dirección directa dependiente del ángulo y función de arrancada Race Start.'
    }]
  },
  {
    id: 'mercedes-sl-r231-mopf',
    series: 'SL',
    label: 'Mercedes-Benz SL (R231 MoPf)',
    section: 'production',
    status: 'past',
    years: { start: 2016, end: 2020, display: '2016 – 2020' },
    class: 'Estructura monomaterial de aluminio (140 kg más ligero) • Sistema limpiaparabrisas MAGIC VISION CONTROL • Suspensión con inclinación activa en curva',
    chassisCode: 'R231 MoPf',
    packages: ['Standard MoPf', 'AMG Line MoPf', 'SL 63 AMG', 'SL 65 AMG V12'],
    preferredFile: 'File:Mercedes-Benz SL 400 (R 231, Facelift) – Frontansicht, 23. Juli 2016, Düsseldorf.jpg',
    searchQueries: ['Mercedes R231 facelift front', 'Mercedes-Benz SL R231 facelift front', 'Mercedes SL 400 R231 front'],
    engines: [{
      modelBadge: 'SL 63 AMG 5.5 V8 Biturbo',
      engineCode: 'M157 DE55 AL',
      architecture: 'V8 Biturbo a 90º con inyección directa guiada por pulverización',
      cylinders: 8,
      displacementCc: 5461,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 585,
      torqueNm: 900,
      topSpeedKmh: 300,
      accel0to100: 4.1,
      feedSystem: 'Doble turbocompresor con intercooler agua-aire y cambio AMG SPEEDSHIFT MCT 7G',
      notes: 'Techo panorámico con vidrio electrocrómico MAGIC SKY CONTROL con opacidad regulable eléctricamente.'
    }]
  },
  {
    id: 'mercedes-amg-sl-r232',
    series: 'SL',
    label: 'Mercedes-AMG SL Roadster (R232)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2021, end: null, display: '2021 – Presente' },
    class: 'Retorno a las Raíces: Capota de Lona Clásica (-21 kg) • Desarrollado 100% por Mercedes-AMG • Configuración de asientos 2+2 y tracción 4MATIC+ de serie',
    chassisCode: 'R232',
    packages: ['SL 43', 'SL 55 4MATIC+', 'SL 63 4MATIC+', 'SL 63 S E-PERFORMANCE'],
    preferredFile: 'File:Mercedes-AMG SL 63 4MATIC+ (R 232) – Frontansicht, 29. April 2022, Velbert.jpg',
    searchQueries: ['Mercedes-AMG SL R232 front', 'Mercedes SL 63 R232 front', 'Mercedes SL Roadster 2022 front'],
    engines: [{
      modelBadge: 'AMG SL 63 4MATIC+',
      engineCode: 'M177 DE40 AL',
      architecture: 'V8 Biturbo a 90º Hot-V ensamblado a mano en Affalterbach',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 585,
      torqueNm: 800,
      topSpeedKmh: 315,
      accel0to100: 3.6,
      feedSystem: 'Inyección directa guiada por pulverización a 200 bar con turbocompresores Twin-Scroll',
      notes: 'Eje trasero direccional activo de serie, estabilización hidráulica antivuelco y pantalla central táctil con inclinación regulable entre 12º y 32º.'
    }]
  },

  // ==========================================
  // CLASE G (EL REY DEL TODOTERRENO)
  // ==========================================
  {
    id: 'mercedes-clase-g-w460',
    series: 'Clase G',
    label: 'Mercedes-Benz Clase G (W460 / W461 "Geländewagen")',
    section: 'production',
    status: 'past',
    years: { start: 1979, end: 1991, display: '1979 – 1991' },
    class: 'Icono Todoterreno Inmortal • Chasis de largueros y travesaños • Fabricado a mano en Graz (Austria) por Magna Steyr',
    chassisCode: 'W460',
    packages: ['Station Wagon Corto', 'Station Wagon Largo', 'Cabriolet', 'Professional W461'],
    preferredFile: 'File:Mercedes-Benz 280 GE (W 460) – Frontansicht, 24. Juni 2012, Düsseldorf.jpg',
    searchQueries: ['Mercedes W460 front', 'Mercedes G-Klasse W460 front', 'Mercedes 280 GE W460 front'],
    engines: [{
      modelBadge: '300 GD Diésel',
      engineCode: 'OM617.931',
      architecture: '5 cilindros en línea atmosférico diésel indestructible',
      cylinders: 5,
      displacementCc: 2998,
      displacementL: 3.0,
      fuel: 'Diésel',
      powerHp: 88,
      torqueNm: 172,
      topSpeedKmh: 130,
      accel0to100: 22.0,
      feedSystem: 'Bomba de inyección mecánica Bosch en línea',
      notes: 'Dos bloqueos de diferencial mecánicos al 100% y capacidad de vadeo insuperable.'
    }]
  },
  {
    id: 'mercedes-clase-g-w463-classic',
    series: 'Clase G',
    label: 'Mercedes-Benz Clase G / G 55 & G 63 AMG (W463 Clásico)',
    section: 'm-performance',
    status: 'past',
    years: { start: 1990, end: 2018, display: '1990 – 2018' },
    class: 'Transformación a Icono de Lujo Mundial • Tres bloqueos de diferencial 100% de accionamiento eléctrico • Escapes laterales dobles bajo estriberas',
    chassisCode: 'W463 Clásico',
    packages: ['G 500 V8', 'G 55 AMG Kompressor', 'G 63 AMG Biturbo', 'G 65 AMG V12 Biturbo', 'G 500 4x4²'],
    preferredFile: 'File:Mercedes-Benz G 63 AMG (W 463) – Frontansicht, 23. Juni 2013, Düsseldorf.jpg',
    searchQueries: ['Mercedes G 63 AMG W463 front', 'Mercedes G-Klasse W463 front', 'Mercedes G55 AMG front'],
    engines: [{
      modelBadge: 'G 63 AMG 5.5 V8 Biturbo',
      engineCode: 'M157 DE55 AL',
      architecture: 'V8 Biturbo a 90º con inyección directa de alta presión',
      cylinders: 8,
      displacementCc: 5461,
      displacementL: 5.5,
      fuel: 'Gasolina',
      powerHp: 571,
      torqueNm: 760,
      topSpeedKmh: 210,
      accel0to100: 5.4,
      feedSystem: 'Inyección directa guiada por pulverización con doble turbo y cambio AMG SPEEDSHIFT PLUS 7G-TRONIC',
      notes: 'Capaz de subir pendientes de hasta el 100% (45 grados) y mantener estabilidad lateral en inclinaciones de hasta 54% (28.4 grados).'
    }]
  },
  {
    id: 'mercedes-amg-g63-w463-gen2',
    series: 'Clase G',
    label: 'Mercedes-AMG G 63 (W463 2ª Generación)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2018, end: 2024, display: '2018 – 2024' },
    class: 'Reinvención Total del Icono • Eje delantero con suspensión independiente de doble triángulo desarrollada por AMG • Salpicadero digital Widescreen',
    chassisCode: 'W463 Gen2',
    packages: ['G 500 V8', 'AMG G 63', 'AMG Night Package', 'Edition 1'],
    preferredFile: 'File:Mercedes-AMG G 63 (W 463, 2. Generation) – Frontansicht, 25. August 2018, Düsseldorf.jpg',
    searchQueries: ['Mercedes-AMG G 63 W463 2019 front', 'Mercedes G63 AMG 2019 front', 'Mercedes G-Class 2019 front'],
    engines: [{
      modelBadge: 'AMG G 63 4.0 V8 Biturbo',
      engineCode: 'M177 DE40 AL',
      architecture: 'V8 Biturbo a 90º Hot-V con doble turbocompresor Twin-Scroll',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 585,
      torqueNm: 850,
      topSpeedKmh: 240,
      accel0to100: 4.5,
      feedSystem: 'Inyección directa guiada por pulverización con desactivación de cilindros AMG Cylinder Management',
      notes: 'Conservó intactos los tres pulsadores cromados de bloqueo de diferenciales (central, trasero y delantero) en el centro de la consola.'
    }]
  },
  {
    id: 'mercedes-g580-eq-w465',
    series: 'Clase G',
    label: 'Mercedes-Benz G 580 con Tecnología EQ (W465)',
    section: 'production',
    status: 'current',
    years: { start: 2024, end: null, display: '2024 – Presente' },
    class: 'El Todoterreno Eléctrico Definitivo • 4 Motores eléctricos independientes en cada rueda • Función G-TURN (gira 360º sobre su propio eje)',
    chassisCode: 'W465',
    packages: ['Standard G 580 EQ', 'Edition ONE'],
    preferredFile: 'File:Mercedes-Benz G 580 with EQ Technology (W 465) in MANUFAKTUR South Seas Blue Magno, front right.jpg',
    searchQueries: ['Mercedes-Benz G 580 with EQ Technology front', 'Mercedes G 580 EQ front', 'Mercedes electric G-Class front'],
    engines: [{
      modelBadge: 'G 580 con Tecnología EQ',
      engineCode: '4x Electric Motors Individual',
      architecture: '4 motores eléctricos integrados en el chasis de largueros con reductoras individuales de 2 velocidades LOW RANGE',
      cylinders: 0,
      displacementCc: 0,
      displacementL: 0.0,
      fuel: 'Eléctrico',
      powerHp: 587,
      torqueNm: 1164,
      topSpeedKmh: 180,
      accel0to100: 4.7,
      feedSystem: 'Batería de alto voltaje de 116 kWh útil integrada en el bastidor con placa protectora de carbono de 26 mm en bajos',
      notes: 'Capacidad de vadeo de 850 mm (150 mm más que las versiones térmicas gracias a la estanqueidad total de la batería).'
    }]
  },

  // ==========================================
  // SUVS: GLC, GLE, GLS
  // ==========================================
  {
    id: 'mercedes-glc-x253-pre',
    series: 'GLC',
    label: 'Mercedes-Benz GLC SUV / Coupé (X253 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2015, end: 2019, display: '2015 – 2019' },
    class: 'Sucesor del GLK • El SUV más vendido de Mercedes-Benz a nivel mundial • Suspensión neumática AIR BODY CONTROL',
    chassisCode: 'X253',
    packages: ['Exclusive', 'Off-Road', 'AMG Line', 'GLC Coupé C253', 'GLC 63 AMG'],
    preferredFile: 'File:Mercedes-Benz GLC 250 4MATIC Exclusive (X 253) – Frontansicht, 27. Februar 2016, Düsseldorf.jpg',
    searchQueries: ['Mercedes GLC X253 front', 'Mercedes-Benz GLC 250 X253 front', 'Mercedes GLC front'],
    engines: [{
      modelBadge: 'AMG GLC 63 S 4MATIC+',
      engineCode: 'M177 DE40 AL',
      architecture: 'V8 Biturbo a 90º Hot-V (único SUV mediano de su categoría con motor V8)',
      cylinders: 8,
      displacementCc: 3982,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 510,
      torqueNm: 700,
      topSpeedKmh: 280,
      accel0to100: 3.8,
      feedSystem: 'Inyección directa guiada por pulverización con cambio AMG SPEEDSHIFT MCT 9G',
      notes: 'Récord de SUV de producción más rápido en el Nürburgring Nordschleife en 2018 (7:49.369).'
    }]
  },
  {
    id: 'mercedes-glc-x254',
    series: 'GLC',
    label: 'Mercedes-Benz GLC SUV (X254)',
    section: 'production',
    status: 'current',
    years: { start: 2022, end: null, display: '2022 – Presente' },
    class: 'Segunda Generación GLC • Coeficiente aerodinámico mejorado Cx 0.29 • Función "Capó Transparente" en pantalla central',
    chassisCode: 'X254',
    packages: ['Avantgarde', 'AMG Line', 'GLC Coupé C254', 'AMG GLC 43 / 63 S E-PERFORMANCE'],
    preferredFile: 'File:Mercedes-Benz X254 IMG 7490.jpg',
    searchQueries: ['Mercedes GLC X254 front', 'Mercedes-Benz GLC 220 d X254 front', '2023 Mercedes GLC front'],
    engines: [{
      modelBadge: 'GLC 300 de 4MATIC PHEV',
      engineCode: 'OM654M + E-Motor',
      architecture: '4 cilindros en línea Turbodiésel 2.0L combinado con motor eléctrico síncrono de 136 CV',
      cylinders: 4,
      displacementCc: 1993,
      displacementL: 2.0,
      fuel: 'Híbrido Enchufable',
      powerHp: 335,
      torqueNm: 750,
      topSpeedKmh: 219,
      accel0to100: 6.4,
      feedSystem: 'Batería de 31.2 kWh con autonomía eléctrica de hasta 128 km WLTP',
      notes: 'Capacidad de remolque de 2.000 kg y asistente de maniobras para remolque Trailer Manoeuvring Assist.'
    }]
  },
  {
    id: 'mercedes-clase-m-w163',
    series: 'Clase M / GLE',
    label: 'Mercedes-Benz Clase M (W163)',
    section: 'production',
    status: 'past',
    years: { start: 1997, end: 2005, display: '1997 – 2005' },
    class: 'Pionero SUV Premium Moderno • Primer SUV con control de tracción electrónico 4-ETS • Fabricado en Tuscaloosa (Alabama, EE.UU.)',
    chassisCode: 'W163',
    packages: ['Standard', 'Inspiration', 'Final Edition', 'ML 55 AMG'],
    preferredFile: 'File:Mercedes-Benz ML 320 (W 163) – Frontansicht, 23. Juni 2011, Velbert.jpg',
    searchQueries: ['Mercedes W163 front', 'Mercedes ML 320 W163 front', 'Mercedes-Benz W163 front'],
    engines: [{
      modelBadge: 'ML 55 AMG V8',
      engineCode: 'M113.981',
      architecture: 'V8 atmosférico a 90º SOHC 24V de 5.4 litros',
      cylinders: 8,
      displacementCc: 5439,
      displacementL: 5.4,
      fuel: 'Gasolina',
      powerHp: 347,
      torqueNm: 510,
      topSpeedKmh: 235,
      accel0to100: 6.8,
      feedSystem: 'Inyección electrónica secuencial Bosch ME 2.8',
      notes: 'El primer SUV deportivo de altas prestaciones de la historia creado por Mercedes-AMG.'
    }]
  },
  {
    id: 'mercedes-gle-v167-mopf',
    series: 'Clase M / GLE',
    label: 'Mercedes-Benz GLE SUV / Maybach GLS 600 (V167 / X167 MoPf)',
    section: 'production',
    status: 'current',
    years: { start: 2023, end: null, display: '2023 – Presente' },
    class: 'SUV Ejecutivo de Gran Tamaño • Suspensión electrohidráulica E-ACTIVE BODY CONTROL de 48V • Función Free Driving Assist para desatascar el vehículo de arena',
    chassisCode: 'V167 MoPf',
    packages: ['AMG Line MoPf', 'GLE Coupé C167 MoPf', 'Maybach GLS 600 X167'],
    preferredFile: 'File:Mercedes-Benz V167 Facelift IMG 0520.jpg',
    searchQueries: ['Mercedes GLE V167 facelift front', 'Mercedes-Benz GLE 2024 front', 'Mercedes V167 facelift front'],
    engines: [{
      modelBadge: 'GLE 450 d 4MATIC',
      engineCode: 'OM656M',
      architecture: '6 cilindros en línea Turbodiésel 3.0L con microhibridación EQ Boost de 48 voltios',
      cylinders: 6,
      displacementCc: 2989,
      displacementL: 3.0,
      fuel: 'Híbrido',
      powerHp: 367,
      torqueNm: 750,
      topSpeedKmh: 250,
      accel0to100: 5.6,
      feedSystem: 'Inyección Common-Rail a 2.700 bar con turbocompresor de dos etapas',
      notes: 'Capacidad de vadeo ampliada y modo de balanceo activo para balancear el coche y salir de trampas de arena o barro.'
    }]
  },

  // ==========================================
  // MERCEDES-EQ (100% ELÉCTRICOS DE VANGUARDIA)
  // ==========================================
  {
    id: 'mercedes-eqe-v295',
    series: 'Mercedes-EQ',
    label: 'Mercedes-Benz EQE Berlina (V295)',
    section: 'production',
    status: 'current',
    years: { start: 2022, end: null, display: '2022 – Presente' },
    class: 'Berlina Ejecutiva 100% Eléctrica • Plataforma específica EVA2 • Diseño One-Bow con cabina adelantada',
    chassisCode: 'V295',
    packages: ['Electric Art', 'AMG Line', 'AMG EQE 43 4MATIC', 'AMG EQE 53 4MATIC+'],
    preferredFile: 'File:Mercedes-Benz EQE 350+ (V 295) – Frontansicht, 29. April 2022, Velbert.jpg',
    searchQueries: ['Mercedes EQE V295 front', 'Mercedes-Benz EQE 350 front', 'Mercedes EQE front'],
    engines: [{
      modelBadge: 'AMG EQE 53 4MATIC+',
      engineCode: 'Dual PSM AMG Electric',
      architecture: 'Dos motores síncronos de excitación permanente con bobinados específicos AMG e inversor cerámico',
      cylinders: 0,
      displacementCc: 0,
      displacementL: 0.0,
      fuel: 'Eléctrico',
      powerHp: 687,
      torqueNm: 1000,
      topSpeedKmh: 240,
      accel0to100: 3.3,
      feedSystem: 'Batería de iones de litio de 90.6 kWh con refrigeración líquida inteligente y paquete AMG DYNAMIC PLUS',
      notes: 'Eje trasero direccional con giro de hasta 10 grados y experiencia acústica AMG SOUND EXPERIENCE.'
    }]
  },
  {
    id: 'mercedes-eqs-v297',
    series: 'Mercedes-EQ',
    label: 'Mercedes-Benz EQS Berlina (V297)',
    section: 'production',
    status: 'current',
    years: { start: 2021, end: null, display: '2021 – Presente' },
    class: 'Buque Insignia Eléctrico • Récord mundial de aerodinámica para un turismo de serie (Cx 0.20) • Pantalla MBUX Hyperscreen curva de 141 cm de ancho',
    chassisCode: 'V297',
    packages: ['Electric Art', 'AMG Line', 'AMG EQS 53 4MATIC+'],
    preferredFile: 'File:Mercedes-Benz EQS 450+ (V 297) – Frontansicht, 23. Oktober 2021, Düsseldorf.jpg',
    searchQueries: ['Mercedes EQS V297 front', 'Mercedes-Benz EQS 450 front', 'Mercedes EQS front'],
    engines: [{
      modelBadge: 'EQS 450+ Long Range',
      engineCode: 'PSM Rear Electric',
      architecture: 'Motor eléctrico síncrono permanente en el eje trasero con diseño de bobinado en horquilla (hairpin)',
      cylinders: 0,
      displacementCc: 0,
      displacementL: 0.0,
      fuel: 'Eléctrico',
      powerHp: 333,
      torqueNm: 568,
      topSpeedKmh: 210,
      accel0to100: 6.2,
      feedSystem: 'Batería de alto voltaje de 107.8 kWh utilizable con arquitectura de 400V y carga ultrarrápida a 200 kW',
      notes: 'Autonomía récord homologada de hasta 780 km WLTP con una sola carga.'
    }]
  }
];

async function resolveWikimediaImage(preferredFile?: string, searchQueries: string[] = [], existingUrls = new Set<string>()): Promise<any> {
  // 1. Probar preferredFile si existe
  if (preferredFile) {
    const metaUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(preferredFile)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    try {
      const res = await fetch(metaUrl, { headers: { 'User-Agent': UA } });
      if (res.ok) {
        const data = await res.json();
        const page = Object.values(data.query?.pages || {})[0] as any;
        if (page?.imageinfo?.[0]) {
          const info = page.imageinfo[0];
          const cleanUrl = info.url.split('?')[0].toLowerCase();
          if (!existingUrls.has(cleanUrl)) {
            const headRes = await fetch(info.url, { method: 'HEAD', headers: { 'User-Agent': UA } });
            if (headRes.status === 200) {
              const meta = info.extmetadata || {};
              existingUrls.add(cleanUrl);
              return {
                file: preferredFile,
                url: info.url,
                author: (meta.Artist?.value || 'Wikimedia contributor').replace(/<[^>]+>/g, '').trim(),
                license: meta.LicenseShortName?.value || 'CC BY-SA',
                sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(preferredFile.replace(/\s+/g, '_'))}`,
                width: info.width,
                height: info.height
              };
            }
          }
        }
      }
    } catch {}
  }

  // 2. Fallback a búsqueda con searchQueries
  for (const q of searchQueries) {
    const sUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&srlimit=8&format=json`;
    try {
      const sRes = await fetch(sUrl, { headers: { 'User-Agent': UA } });
      if (!sRes.ok) continue;
      const sData = await sRes.json();
      for (const item of sData.query?.search || []) {
        const title = item.title as string;
        if (/rear|interior|engine|wheel|badge|side|caliper|cockpit|dashboard|tail|svg|pdf|seat|exhaust|speedometer/i.test(title)) continue;
        const metaUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
        const mRes = await fetch(metaUrl, { headers: { 'User-Agent': UA } });
        if (!mRes.ok) continue;
        const mData = await mRes.json();
        const page = Object.values(mData.query?.pages || {})[0] as any;
        if (!page?.imageinfo?.[0]) continue;
        const info = page.imageinfo[0];
        const cleanUrl = info.url.split('?')[0].toLowerCase();
        if (existingUrls.has(cleanUrl)) continue;

        const headRes = await fetch(info.url, { method: 'HEAD', headers: { 'User-Agent': UA } });
        if (headRes.status === 200) {
          const meta = info.extmetadata || {};
          existingUrls.add(cleanUrl);
          return {
            file: title,
            url: info.url,
            author: (meta.Artist?.value || 'Wikimedia contributor').replace(/<[^>]+>/g, '').trim(),
            license: meta.LicenseShortName?.value || 'CC BY-SA',
            sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replace(/\s+/g, '_'))}`,
            width: info.width,
            height: info.height
          };
        }
      }
    } catch {}
    await new Promise(r => setTimeout(r, 150));
  }

  return null;
}

async function main() {
  console.log(`Construyendo catálogo de Mercedes-Benz (${MERCEDES_MODELS.length} modelos)...`);
  const existingUrls = new Set<string>();

  const generations: any[] = [];
  let mPerfCount = 0;
  let protoCount = 0;
  let prodCount = 0;

  for (let i = 0; i < MERCEDES_MODELS.length; i++) {
    const m = MERCEDES_MODELS[i];
    console.log(`[${i + 1}/${MERCEDES_MODELS.length}] Procesando ${m.label}...`);

    if (m.section === 'm-performance') mPerfCount++;
    else if (m.section === 'prototypes') protoCount++;
    else prodCount++;

    const img = await resolveWikimediaImage(m.preferredFile, m.searchQueries, existingUrls);
    if (!img) {
      console.warn(`  ⚠️ Alerta: no se encontró imagen frontal única para ${m.label}`);
    } else {
      console.log(`  ✓ Imagen: ${img.file}`);
    }

    const genObj = {
      id: m.id,
      series: m.series,
      label: m.label,
      section: m.section,
      status: m.status,
      years: m.years,
      class: m.class,
      chassis: [{
        code: m.chassisCode,
        lwb: false,
        parent: null,
        market: null,
        verified: true,
        commonsCategory: `Mercedes-Benz ${m.series}`,
        commonsCandidates: [`Mercedes-Benz ${m.series}`, `Mercedes-Benz ${m.label}`],
        commonsManual: false,
        variants: [m.label],
        packages: m.packages,
        frontImage: img
      }],
      frontImage: img,
      engines: m.engines
    };

    generations.push(genObj);
    await new Promise(r => setTimeout(r, 120));
  }

  const catalog = {
    brand: 'Mercedes-Benz',
    wikidata: 'Q36008',
    generatedAt: new Date().toISOString(),
    stats: {
      generations: generations.length,
      production: prodCount,
      mPerformance: mPerfCount,
      prototypes: protoCount,
      chassis: generations.length,
      totalVariants: generations.length,
      withExactFront: generations.filter(g => g.frontImage).length,
      missingImages: generations.filter(g => !g.frontImage).length,
      verifiedFrontRate: `${Math.round((generations.filter(g => g.frontImage).length / generations.length) * 100)}%`,
      hasPowertrainSpecs: true,
      hasUnifiedEngines: true
    },
    generations
  };

  fs.mkdirSync('data/mercedes', { recursive: true });
  fs.mkdirSync('public/api/v1', { recursive: true });

  fs.writeFileSync('data/mercedes/catalog-clean-front.json', JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync('public/api/v1/mercedes.json', JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n🎉 Catálogo de Mercedes-Benz generado con éxito:`);
  console.log(`   Modelos: ${generations.length}`);
  console.log(`   Imágenes frontales verificadas: ${catalog.stats.withExactFront}/${generations.length} (${catalog.stats.verifiedFrontRate})`);
  console.log(`   Guardado en data/mercedes/catalog-clean-front.json y public/api/v1/mercedes.json`);
}

main();
