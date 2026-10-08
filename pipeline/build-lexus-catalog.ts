import * as fs from 'fs';
import * as path from 'path';

const UA = 'CarvaultBot/2.0 (https://github.com/amglogicalis/carvault; automotive research)';

interface LexusCarDef {
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

export const LEXUS_MODELS: LexusCarDef[] = [
  // ==========================================
  // SUPERDEPORTIVOS & GAMA F
  // ==========================================
  {
    id: 'lexus-lfa-lfa10',
    series: 'LFA',
    label: 'Lexus LFA (LFA10)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2010, end: 2012, display: '2010 – 2012' },
    class: 'Superdeportivo • Chasis monocasco CFRP • 4.8L V10 1LR-GUE atmosférico',
    chassisCode: 'LFA10',
    packages: ['Base / Estándar', 'Carbon Package'],
    preferredFile: 'File:2012 Lexus LFA 4.8 Front.jpg',
    searchQueries: ['Lexus LFA front', 'Lexus LFA 2011', 'Lexus LFA'],
    engines: [{
      modelBadge: 'LFA V10',
      engineCode: '1LR-GUE',
      architecture: 'V10 Atmosférico a 72º con cárter seco y válvulas de titanio',
      cylinders: 10,
      displacementCc: 4805,
      displacementL: 4.8,
      fuel: 'Gasolina',
      powerHp: 560,
      torqueNm: 480,
      topSpeedKmh: 325,
      accel0to100: 3.7,
      feedSystem: 'Inyección electrónica multipunto de alta velocidad, régimen máximo 9.000 rpm',
      notes: 'Desarrollado conjuntamente con Yamaha Music & Racing. Cuadro digital TFT que acelera más rápido que una aguja analógica.'
    }]
  },
  {
    id: 'lexus-lfa-nurburgring',
    series: 'LFA',
    label: 'Lexus LFA Nürburgring Package',
    section: 'm-performance',
    status: 'past',
    years: { start: 2012, end: 2012, display: '2012' },
    class: 'Superdeportivo Track-Focused • Alerón fijo CFRP & Canards frontales • 570 CV',
    chassisCode: 'LFA10',
    packages: ['Nürburgring Package', 'Track Spec'],
    preferredFile: 'File:Lexus LFA Nürburgring Package (Front).jpg',
    searchQueries: ['Lexus LFA Nurburgring front', 'Lexus LFA Nürburgring Package', 'LFA Nurburgring'],
    engines: [{
      modelBadge: 'LFA Nürburgring Edition',
      engineCode: '1LR-GUE Nürburgring',
      architecture: 'V10 Atmosférico de competición a 9.000 rpm',
      cylinders: 10,
      displacementCc: 4805,
      displacementL: 4.8,
      fuel: 'Gasolina',
      powerHp: 570,
      torqueNm: 480,
      topSpeedKmh: 325,
      accel0to100: 3.6,
      feedSystem: 'Ajuste de ECU de competición y escape aligerado',
      notes: 'Solo 50 unidades producidas. Tiempo oficial de 7:14.64 en el Nürburgring Nordschleife en 2011.'
    }]
  },
  {
    id: 'lexus-lc500-z100',
    series: 'LC',
    label: 'Lexus LC 500 (Z100 Coupé)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2017, end: null, display: '2017 – Actualidad' },
    class: 'Gran Turismo Coupé de Lujo • Plataforma GA-L • 5.0L V8 2UR-GSE Atmosférico',
    chassisCode: 'URZ100',
    packages: ['Luxury', 'Sport+', 'Carbon Pack', 'Bespoke Carbon'],
    preferredFile: 'File:Lexus LC 500 (2017) front.jpg',
    searchQueries: ['Lexus LC 500 front', 'Lexus LC500 coupe front', 'Lexus LC 500'],
    engines: [{
      modelBadge: 'LC 500 Coupé',
      engineCode: '2UR-GSE',
      architecture: 'V8 Atmosférico a 90º DOHC 32V Dual VVT-i',
      cylinders: 8,
      displacementCc: 4969,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 477,
      torqueNm: 540,
      topSpeedKmh: 270,
      accel0to100: 4.7,
      feedSystem: 'Inyección combinada directa e indirecta D-4S',
      notes: 'Transmisión automática Direct Shift de 10 velocidades y diferencial de deslizamiento limitado Torsen.'
    }]
  },
  {
    id: 'lexus-lc500-convertible',
    series: 'LC',
    label: 'Lexus LC 500 Cabriolet (Z100)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2020, end: null, display: '2020 – Actualidad' },
    class: 'Gran Turismo Descapotable • Capota de lona multicapa • 5.0L V8 Atmosférico',
    chassisCode: 'URZ100',
    packages: ['Luxury Convertible', 'Regatta Edition'],
    preferredFile: 'File:2021 Lexus LC 500 Convertible in Structural Blue, front right.jpg',
    searchQueries: ['Lexus LC 500 convertible front', 'Lexus LC convertible front', 'Lexus LC 500 cabrio'],
    engines: [{
      modelBadge: 'LC 500 Cabriolet',
      engineCode: '2UR-GSE',
      architecture: 'V8 Atmosférico DOHC 32V Dual VVT-i',
      cylinders: 8,
      displacementCc: 4969,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 477,
      torqueNm: 540,
      topSpeedKmh: 270,
      accel0to100: 4.8,
      feedSystem: 'Inyección combinada D-4S',
      notes: 'Mecanismo de capota electrohidráulica operable en 15 segundos hasta 50 km/h.'
    }]
  },
  {
    id: 'lexus-lc500h-z100',
    series: 'LC',
    label: 'Lexus LC 500h (Z100 Multi-Stage Hybrid)',
    section: 'production',
    status: 'current',
    years: { start: 2017, end: null, display: '2017 – Actualidad' },
    class: 'Gran Turismo Coupé Híbrido • Sistema Multi-Stage Hybrid de 4 etapas',
    chassisCode: 'GWZ100',
    packages: ['Luxury', 'Sport+'],
    preferredFile: 'File:2018 Lexus LC 500h 3.5 Front.jpg',
    searchQueries: ['Lexus LC 500h front', '2018 Lexus LC 500h', 'Lexus LC 500h'],
    engines: [{
      modelBadge: 'LC 500h Multi-Stage',
      engineCode: '8GR-FXS + Dual Motor',
      architecture: 'V6 3.5L Ciclo Atkinson + Motores eléctricos duales con caja combinada de 10 relaciones virtuales',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Híbrido',
      powerHp: 359,
      torqueNm: 500,
      topSpeedKmh: 250,
      accel0to100: 5.0,
      feedSystem: 'Inyección D-4S con batería compacta de ion-litio',
      notes: 'Combina un engranaje planetario e-CVT con un cambio automático tradicional de 4 marchas físicas para 10 marchas virtuales.'
    }]
  },
  {
    id: 'lexus-is-f-use20',
    series: 'IS',
    label: 'Lexus IS F (USE20)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2007, end: 2014, display: '2007 – 2014' },
    class: 'Lexus F High Performance • Berlina Deportiva • Cuádruple escape vertical apilado',
    chassisCode: 'USE20',
    packages: ['F High Performance', 'Carbon Interior'],
    preferredFile: 'File:2008 Lexus IS-F front.jpg',
    searchQueries: ['Lexus IS F front', 'Lexus IS-F front 2008', 'Lexus IS F'],
    engines: [{
      modelBadge: 'IS F V8',
      engineCode: '2UR-GSE',
      architecture: 'V8 Atmosférico de alto régimen DOHC 32V culatas Yamaha',
      cylinders: 8,
      displacementCc: 4969,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 423,
      torqueNm: 505,
      topSpeedKmh: 270,
      accel0to100: 4.8,
      feedSystem: 'Inyección combinada D-4S directa e indirecta',
      notes: 'Pionero de la submarca F de Lexus, equipado con el primer cambio automático Sport Direct Shift de 8 velocidades del mundo.'
    }]
  },
  {
    id: 'lexus-rc-f-usc10-pre-facelift',
    series: 'RC',
    label: 'Lexus RC F (USC10 Pre-Facelift)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2014, end: 2019, display: '2014 – 2019' },
    class: 'Lexus F High Performance • Coupé Deportivo • Faros divididos tipo flecha & Spindle Grille',
    chassisCode: 'USC10',
    packages: ['F Sport Pack', 'Carbon Package', 'Torque Vectoring Differential (TVD)'],
    preferredFile: 'File:2015 Lexus RC F (USC10R) coupe (2015-06-25) 01.jpg',
    searchQueries: ['Lexus RC F 2015 front', 'Lexus RC F pre-facelift front', 'Lexus RC F coupe 2015'],
    engines: [{
      modelBadge: 'RC F V8',
      engineCode: '2UR-GSE',
      architecture: 'V8 Atmosférico DOHC 32V con bielas de forja y válvulas de titanio',
      cylinders: 8,
      displacementCc: 4969,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 477,
      torqueNm: 530,
      topSpeedKmh: 270,
      accel0to100: 4.5,
      feedSystem: 'Inyección directa e indirecta D-4S',
      notes: 'Diferencial TVD activo opcional con tres modos: Standard, Slalom y Track.'
    }]
  },
  {
    id: 'lexus-rc-f-usc10-facelift',
    series: 'RC',
    label: 'Lexus RC F Facelift & Track Edition (USC10)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2019, end: null, display: '2019 – Actualidad' },
    class: 'Lexus F High Performance • Ópticas monobloque LED integradas & Launch Control',
    chassisCode: 'USC10',
    packages: ['Track Edition', 'Fuji Speedway Edition', 'Carbon Package'],
    preferredFile: 'File:2020 Lexus RC F Track Edition in Matte Nebula Gray, front left.jpg',
    searchQueries: ['Lexus RC F Track Edition front', '2020 Lexus RC F front', 'Lexus RC F facelift front'],
    engines: [{
      modelBadge: 'RC F Track Edition',
      engineCode: '2UR-GSE',
      architecture: 'V8 Atmosférico DOHC 32V con colectores de admisión aligerados',
      cylinders: 8,
      displacementCc: 4969,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 479,
      torqueNm: 535,
      topSpeedKmh: 273,
      accel0to100: 4.3,
      feedSystem: 'Inyección D-4S con Launch Control electrónico',
      notes: 'Alerón de fibra de carbono fijo, frenos carbocerámicos Brembo y ahorro de 80 kg de peso respecto al modelo convencional.'
    }]
  },
  {
    id: 'lexus-gs-f-l10',
    series: 'GS',
    label: 'Lexus GS F (L10)',
    section: 'm-performance',
    status: 'past',
    years: { start: 2015, end: 2020, display: '2015 – 2020' },
    class: 'Lexus F High Performance • Gran Berlina Deportiva • 5.0L V8 Atmosférico',
    chassisCode: 'URL10',
    packages: ['F High Performance', 'Torque Vectoring Differential (TVD)'],
    preferredFile: 'File:2016 Lexus GS F (URL10) sedan (2016-01-04) 01.jpg',
    searchQueries: ['Lexus GS F front', 'Lexus GS F 2016 front', 'Lexus GS F'],
    engines: [{
      modelBadge: 'GS F V8',
      engineCode: '2UR-GSE',
      architecture: 'V8 Atmosférico DOHC 32V culatas deportivas Yamaha',
      cylinders: 8,
      displacementCc: 4969,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 477,
      torqueNm: 530,
      topSpeedKmh: 270,
      accel0to100: 4.6,
      feedSystem: 'Inyección D-4S con refrigerador de aceite de competición',
      notes: 'Berlina deportiva pura con diferencial autoblocante activo TVD de serie y frenos delanteros de 380 mm.'
    }]
  },
  {
    id: 'lexus-is-500-f-sport',
    series: 'IS',
    label: 'Lexus IS 500 F Sport Performance (XE30)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2021, end: null, display: '2021 – Actualidad' },
    class: 'F Sport Performance • Capó abombado +5 cm & Cuádruple escape vertical',
    chassisCode: 'USE30',
    packages: ['F Sport Performance', 'Launch Edition', 'Premium'],
    preferredFile: 'File:2022 Lexus IS 500 F Sport Performance, front 10.22.22.jpg',
    searchQueries: ['Lexus IS 500 F Sport Performance front', 'Lexus IS 500 front', 'Lexus IS 500 F Sport'],
    engines: [{
      modelBadge: 'IS 500 V8',
      engineCode: '2UR-GSE',
      architecture: 'V8 Atmosférico 5.0L de alto giro',
      cylinders: 8,
      displacementCc: 4969,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 479,
      torqueNm: 535,
      topSpeedKmh: 260,
      accel0to100: 4.5,
      feedSystem: 'Inyección combinada D-4S',
      notes: 'El último sedán compacto V8 atmosférico del mercado premium mundial con transmisión Sport Direct Shift de 8 velocidades.'
    }]
  },
  {
    id: 'lexus-lbx-morizo-rr',
    series: 'LBX',
    label: 'Lexus LBX Morizo RR (MAYH10)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2024, end: null, display: '2024 – Actualidad' },
    class: 'Crossover Deportivo de Bolsillo • Motor G16E-GTS GR Yaris/Corolla • Tracción Total GR-FOUR',
    chassisCode: 'GXXH10',
    packages: ['Morizo RR Track', 'Bespoke Build'],
    preferredFile: 'File:Lexus LBX Morizo RR Concept Front.jpg',
    searchQueries: ['Lexus LBX Morizo RR front', 'Lexus LBX Morizo RR', 'LBX Morizo RR'],
    engines: [{
      modelBadge: 'Morizo RR 1.6T',
      engineCode: 'G16E-GTS',
      architecture: '3 en línea Turboalimentado DOHC 12V con intercooler',
      cylinders: 3,
      displacementCc: 1618,
      displacementL: 1.6,
      fuel: 'Gasolina',
      powerHp: 305,
      torqueNm: 400,
      topSpeedKmh: 250,
      accel0to100: 5.2,
      feedSystem: 'Inyección directa D-4ST y turbo de rodamiento de bolas',
      notes: 'Inspirado personalmente por Akio Toyoda (Morizo). Disponible con cambio manual iMT de 6 marchas o Direct Shift-8AT y tracción total deportiva.'
    }]
  },
  {
    id: 'lexus-rx-500h-f-sport',
    series: 'RX',
    label: 'Lexus RX 500h F Sport Performance (ALA10)',
    section: 'm-performance',
    status: 'current',
    years: { start: 2022, end: null, display: '2022 – Actualidad' },
    class: 'SUV de Altas Prestaciones • 2.4L Turbo Híbrido DIRECT4 con eje trasero eAxle',
    chassisCode: 'TALH17',
    packages: ['F Sport Performance', 'DIRECT4 AWD'],
    preferredFile: 'File:Lexus RX 500h F Sport Performance (ALA10) front.jpg',
    searchQueries: ['Lexus RX 500h front', 'Lexus RX 500h F Sport front', 'Lexus RX 500h'],
    engines: [{
      modelBadge: 'RX 500h DIRECT4',
      engineCode: 'T24A-FTS + eAxle',
      architecture: '4 en línea Turbo 2.4L + Motor eléctrico trasero de alta potencia (76 kW)',
      cylinders: 4,
      displacementCc: 2393,
      displacementL: 2.4,
      fuel: 'Híbrido',
      powerHp: 371,
      torqueNm: 550,
      topSpeedKmh: 210,
      accel0to100: 6.2,
      feedSystem: 'Inyección directa D-4ST y tracción total inteligente DIRECT4',
      notes: 'Eje trasero direccional dinámico (DRS) con giro de hasta 4 grados en las ruedas posteriores.'
    }]
  },

  // ==========================================
  // BERLINAS COMPACTAS & MEDIAS (IS, CT)
  // ==========================================
  {
    id: 'lexus-is-xe10-pre-facelift',
    series: 'IS',
    label: 'Lexus IS 200 / IS 300 (XE10 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 1998, end: 2001, display: '1998 – 2001' },
    class: 'Berlina Deportiva Compacta • Cuadro Chronograph • Motor 6 cilindros en línea',
    chassisCode: 'GXE10 / JCE10',
    packages: ['Sport', 'Luxury', 'Elegance'],
    preferredFile: 'File:Lexus IS 200 front 20080303.jpg',
    searchQueries: ['Lexus IS 200 front 2008', 'Lexus IS200 front', 'Lexus IS 200 XE10'],
    engines: [
      {
        modelBadge: 'IS 200',
        engineCode: '1G-FE',
        architecture: '6 en línea DOHC 24V VVT-i Atmosférico',
        cylinders: 6,
        displacementCc: 1988,
        displacementL: 2.0,
        fuel: 'Gasolina',
        powerHp: 155,
        torqueNm: 195,
        topSpeedKmh: 215,
        accel0to100: 9.5,
        feedSystem: 'Inyección electrónica multipunto',
        notes: 'Propulsión trasera con cambio manual de 6 velocidades o automático de 4.'
      },
      {
        modelBadge: 'IS 300',
        engineCode: '2JZ-GE',
        architecture: '6 en línea DOHC 24V VVT-i Atmosférico',
        cylinders: 6,
        displacementCc: 2997,
        displacementL: 3.0,
        fuel: 'Gasolina',
        powerHp: 214,
        torqueNm: 288,
        topSpeedKmh: 230,
        accel0to100: 7.3,
        feedSystem: 'Inyección electrónica multipunto',
        notes: 'Mítico bloque 2JZ atmosférico con distribución variable VVT-i y cambio e-Shift.'
      }
    ]
  },
  {
    id: 'lexus-is-xe10-facelift',
    series: 'IS',
    label: 'Lexus IS 200 / IS 300 (XE10 Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2001, end: 2005, display: '2001 – 2005' },
    class: 'Berlina Deportiva & SportCross Familiar • Rejilla de 3 barras horizontales & Ópticas ahumadas',
    chassisCode: 'GXE10 / JCE10',
    packages: ['SportCross', 'Limited Edition', 'Executive'],
    preferredFile: 'File:2001-2005 Lexus IS 300 sedan (2011-04-28) 01.jpg',
    searchQueries: ['2001-2005 Lexus IS 300 front', 'Lexus IS 300 sedan 2003', 'Lexus IS facelift 2002'],
    engines: [{
      modelBadge: 'IS 300 SportCross',
      engineCode: '2JZ-GE',
      architecture: '6 en línea 3.0L DOHC 24V VVT-i',
      cylinders: 6,
      displacementCc: 2997,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 214,
      torqueNm: 288,
      topSpeedKmh: 230,
      accel0to100: 7.5,
      feedSystem: 'Inyección electrónica multipunto secuencial',
      notes: 'Carrocería SportCross shooting-brake de 5 puertas con reparto de pesos optimizado.'
    }]
  },
  {
    id: 'lexus-is-xe20-pre-facelift',
    series: 'IS',
    label: 'Lexus IS 250 / IS 220d (XE20 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2005, end: 2008, display: '2005 – 2008' },
    class: 'Berlina Premium • Filosofía de diseño L-Finesse original • V6 4GR-FSE',
    chassisCode: 'GSE20 / ALE20',
    packages: ['Luxury', 'Sport', 'President'],
    preferredFile: 'File:Lexus IS250 front 20071216.jpg',
    searchQueries: ['Lexus IS250 front 2007', 'Lexus IS 250 2006 front', 'Lexus IS250 pre-facelift'],
    engines: [
      {
        modelBadge: 'IS 250',
        engineCode: '4GR-FSE',
        architecture: 'V6 2.5L Atmosférico DOHC 24V Dual VVT-i',
        cylinders: 6,
        displacementCc: 2499,
        displacementL: 2.5,
        fuel: 'Gasolina',
        powerHp: 208,
        torqueNm: 252,
        topSpeedKmh: 230,
        accel0to100: 8.1,
        feedSystem: 'Inyección directa de gasolina D-4',
        notes: 'Suavidad de marcha V6 con cambio automático secuencial de 6 relaciones.'
      },
      {
        modelBadge: 'IS 220d',
        engineCode: '2AD-FHV',
        architecture: '4 en línea Turbodiésel D-CAT con inyector piezoeléctrico',
        cylinders: 4,
        displacementCc: 2231,
        displacementL: 2.2,
        fuel: 'Diésel',
        powerHp: 177,
        torqueNm: 400,
        topSpeedKmh: 215,
        accel0to100: 8.9,
        feedSystem: 'Common-Rail D-CAT de 1.800 bares',
        notes: 'El único motor diésel en la historia de Lexus, enfocado al mercado europeo.'
      }
    ]
  },
  {
    id: 'lexus-is-xe20-facelift',
    series: 'IS',
    label: 'Lexus IS 250 / IS 200d (XE20 Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2008, end: 2013, display: '2008 – 2013' },
    class: 'Berlina & Coupé-Cabriolet (IS 250C) • Faros con firma diurna LED en punta de flecha',
    chassisCode: 'GSE20 / GSE21',
    packages: ['F Sport', 'Executive', 'President', 'IS 250C Cabrio'],
    preferredFile: 'File:2010 Lexus IS 250 (GSE20R MY10) sedan (2015-07-03) 01.jpg',
    searchQueries: ['2010 Lexus IS 250 front', 'Lexus IS 250 facelift front', 'Lexus IS250 2011 front'],
    engines: [{
      modelBadge: 'IS 250 Facelift',
      engineCode: '4GR-FSE',
      architecture: 'V6 2.5L DOHC 24V Dual VVT-i',
      cylinders: 6,
      displacementCc: 2499,
      displacementL: 2.5,
      fuel: 'Gasolina',
      powerHp: 208,
      torqueNm: 252,
      topSpeedKmh: 230,
      accel0to100: 8.0,
      feedSystem: 'Inyección directa D-4',
      notes: 'Incorpora ajuste de suspensión F Sport y retrovisores con intermitentes LED integrados.'
    }]
  },
  {
    id: 'lexus-is-xe30-pre-facelift',
    series: 'IS',
    label: 'Lexus IS 300h (XE30 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2013, end: 2016, display: '2013 – 2016' },
    class: 'Berlina Premium Híbrida • Parrilla Spindle Grille & Luces diurnas LED independientes en L',
    chassisCode: 'AVE30',
    packages: ['Eco', 'Corporate', 'Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:Lexus IS 300h (XE30) – Frontansicht, 10. August 2013, Düsseldorf.jpg',
    searchQueries: ['Lexus IS 300h 2013 front', 'Lexus IS 300h pre-facelift front', 'Lexus IS 300h front'],
    engines: [{
      modelBadge: 'IS 300h Hybrid',
      engineCode: '2AR-FSE + Motor Eléctrico',
      architecture: '4 en línea 2.5L Ciclo Atkinson + Motor eléctrico sincrónico de imán permanente',
      cylinders: 4,
      displacementCc: 2494,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 223,
      torqueNm: 300,
      topSpeedKmh: 200,
      accel0to100: 8.3,
      feedSystem: 'Inyección combinada D-4S y sistema híbrido Lexus Hybrid Drive',
      notes: 'Consumo homologado de solo 4.3 l/100 km y etiqueta ambiental ECO de la DGT.'
    }]
  },
  {
    id: 'lexus-is-xe30-facelift',
    series: 'IS',
    label: 'Lexus IS 300h / IS 350 (XE30 Facelift 1)',
    section: 'production',
    status: 'past',
    years: { start: 2016, end: 2020, display: '2016 – 2020' },
    class: 'Berlina Híbrida • Nuevas entradas de aire frontales anguladas & Pantalla de 10.3"',
    chassisCode: 'AVE30 / GSE31',
    packages: ['Business', 'Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:2017 Lexus IS 300h F Sport Automatic 2.5 Front.jpg',
    searchQueries: ['2017 Lexus IS 300h front', 'Lexus IS 300h facelift 2017 front', 'Lexus IS 300h 2018'],
    engines: [{
      modelBadge: 'IS 300h F Sport',
      engineCode: '2AR-FSE + Motor Eléctrico',
      architecture: '4 en línea 2.5L Ciclo Atkinson D-4S',
      cylinders: 4,
      displacementCc: 2494,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 223,
      torqueNm: 300,
      topSpeedKmh: 200,
      accel0to100: 8.3,
      feedSystem: 'Lexus Hybrid Drive con gestión inteligente de par',
      notes: 'Suspensión adaptativa AVS y cuadro de mandos inspirado en el LFA con anillo móvil.'
    }]
  },
  {
    id: 'lexus-is-xe30-facelift-2',
    series: 'IS',
    label: 'Lexus IS 300 / IS 350 (XE30 Rediseño Estético 2020+)',
    section: 'production',
    status: 'current',
    years: { start: 2020, end: null, display: '2020 – Actualidad' },
    class: 'Berlina Deportiva • Carrocería ensanchada +30 mm & Firma luminosa unificada en popa',
    chassisCode: 'GSE31 / ASE30',
    packages: ['Base', 'F Sport Dynamic', 'Special Appearance'],
    preferredFile: 'File:2021 Lexus IS 350 F Sport AWD, front left.jpg',
    searchQueries: ['2021 Lexus IS 350 front', 'Lexus IS 2021 front', 'Lexus IS 350 F Sport 2021'],
    engines: [{
      modelBadge: 'IS 350 F Sport',
      engineCode: '2GR-FKS',
      architecture: 'V6 Atmosférico 3.5L DOHC 24V D-4S',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Gasolina',
      powerHp: 315,
      torqueNm: 380,
      topSpeedKmh: 230,
      accel0to100: 5.6,
      feedSystem: 'Inyección directa e indirecta D-4S',
      notes: 'Puesta a punto dinámica en el nuevo centro técnico de pruebas de Toyota en Shimoyama.'
    }]
  },
  {
    id: 'lexus-ct-200h-pre-facelift',
    series: 'CT',
    label: 'Lexus CT 200h (A10 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2010, end: 2013, display: '2010 – 2013' },
    class: 'Compacto Premium Híbrido • Primer compacto híbrido del segmento C premium',
    chassisCode: 'ZWA10',
    packages: ['Eco', 'Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:Lexus CT 200h front 20110508.jpg',
    searchQueries: ['Lexus CT 200h front 2011', 'Lexus CT 200h pre-facelift', 'Lexus CT200h front'],
    engines: [{
      modelBadge: 'CT 200h',
      engineCode: '2ZR-FXE + Motor Eléctrico',
      architecture: '4 en línea 1.8L Ciclo Atkinson DOHC 16V VVT-i',
      cylinders: 4,
      displacementCc: 1798,
      displacementL: 1.8,
      fuel: 'Híbrido',
      powerHp: 136,
      torqueNm: 207,
      topSpeedKmh: 180,
      accel0to100: 10.3,
      feedSystem: 'Inyección electrónica multipunto con batería Ni-MH',
      notes: 'Coeficiente aerodinámico Cx de solo 0.28 con amortiguadores laterales de rendimiento Yamaha.'
    }]
  },
  {
    id: 'lexus-ct-200h-facelift',
    series: 'CT',
    label: 'Lexus CT 200h (A10 Facelift Spindle Grille)',
    section: 'production',
    status: 'past',
    years: { start: 2013, end: 2022, display: '2013 – 2022' },
    class: 'Compacto Premium • Parrilla Spindle Grille completa de doble punta de flecha',
    chassisCode: 'ZWA10',
    packages: ['Business', 'Executive', 'F Sport', 'Sport Edition'],
    preferredFile: 'File:2018 Lexus CT 200h F Sport 1.8 Front.jpg',
    searchQueries: ['2018 Lexus CT 200h front', 'Lexus CT 200h facelift front', 'Lexus CT 200h 2017 front'],
    engines: [{
      modelBadge: 'CT 200h F Sport',
      engineCode: '2ZR-FXE + Motor Eléctrico',
      architecture: '4 en línea 1.8L Ciclo Atkinson',
      cylinders: 4,
      displacementCc: 1798,
      displacementL: 1.8,
      fuel: 'Híbrido',
      powerHp: 136,
      torqueNm: 207,
      topSpeedKmh: 180,
      accel0to100: 10.3,
      feedSystem: 'Inyección electrónica multipunto secuencial',
      notes: 'Chasis reforzado con soldadura láser y nuevo paragolpes frontal aerodinámico F Sport.'
    }]
  },

  // ==========================================
  // BERLINAS EJECUTIVAS (GS, ES)
  // ==========================================
  {
    id: 'lexus-gs-s160',
    series: 'GS',
    label: 'Lexus GS 300 / GS 400 (S160)',
    section: 'production',
    status: 'past',
    years: { start: 1997, end: 2005, display: '1997 – 2005' },
    class: 'Gran Berlina Ejecutiva • Faros cuádruples independientes • Motores 2JZ-GE / 1UZ-FE',
    chassisCode: 'JZS160 / UZS160',
    packages: ['Sport', 'Luxury', 'Platinum'],
    preferredFile: 'File:Lexus GS300 front 20080127.jpg',
    searchQueries: ['Lexus GS300 front 2008', 'Lexus GS S160 front', 'Lexus GS 300 2000 front'],
    engines: [
      {
        modelBadge: 'GS 300',
        engineCode: '2JZ-GE',
        architecture: '6 en línea 3.0L DOHC 24V VVT-i',
        cylinders: 6,
        displacementCc: 2997,
        displacementL: 3.0,
        fuel: 'Gasolina',
        powerHp: 222,
        torqueNm: 298,
        topSpeedKmh: 230,
        accel0to100: 8.2,
        feedSystem: 'Inyección multipunto EFI',
        notes: 'Sedán deportivo de tracción trasera con suspensión delantera y trasera de doble horquilla.'
      },
      {
        modelBadge: 'GS 430',
        engineCode: '3UZ-FE',
        architecture: 'V8 4.3L DOHC 32V VVT-i Atmosférico',
        cylinders: 8,
        displacementCc: 4293,
        displacementL: 4.3,
        fuel: 'Gasolina',
        powerHp: 283,
        torqueNm: 417,
        topSpeedKmh: 250,
        accel0to100: 6.3,
        feedSystem: 'Inyección multipunto EFI',
        notes: 'Motor V8 de aleación de aluminio ultrarrefinado con bloque indestructible de la serie UZ.'
      }
    ]
  },
  {
    id: 'lexus-gs-s190-pre-facelift',
    series: 'GS',
    label: 'Lexus GS 300 / GS 450h (S190 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2005, end: 2007, display: '2005 – 2007' },
    class: 'Gran Berlina • Primer sedán híbrido de altas prestaciones con propulsión trasera',
    chassisCode: 'GRS190 / GWS191',
    packages: ['Executive', 'President', 'Luxury'],
    preferredFile: 'File:Lexus GS450h front 20080224.jpg',
    searchQueries: ['Lexus GS450h front 2008', 'Lexus GS 450h 2006 front', 'Lexus GS S190 front'],
    engines: [{
      modelBadge: 'GS 450h Hybrid',
      engineCode: '2GR-FSE + Motor Eléctrico',
      architecture: 'V6 3.5L D-4S + Motor eléctrico de 147 kW',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Híbrido',
      powerHp: 345,
      torqueNm: 368,
      topSpeedKmh: 250,
      accel0to100: 5.9,
      feedSystem: 'Inyección combinada directa e indirecta D-4S',
      notes: 'Aceleración equivalente a un motor V8 de 4.5 litros con consumos de un motor de 4 cilindros.'
    }]
  },
  {
    id: 'lexus-gs-s190-facelift',
    series: 'GS',
    label: 'Lexus GS 450h / GS 460 (S190 Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2007, end: 2011, display: '2007 – 2011' },
    class: 'Gran Berlina • Rejilla cromada rediseñada, nuevos retrovisores con LED & V8 1UR-FSE',
    chassisCode: 'GWS191 / URS190',
    packages: ['Executive', 'President', 'Sport'],
    preferredFile: 'File:2010 Lexus GS 450h (GWS191R MY10) sedan (2015-07-03) 01.jpg',
    searchQueries: ['2010 Lexus GS 450h front', 'Lexus GS 450h facelift front', 'Lexus GS450h 2009 front'],
    engines: [{
      modelBadge: 'GS 460 V8',
      engineCode: '1UR-FSE',
      architecture: 'V8 4.6L DOHC 32V D-4S Dual VVT-iE',
      cylinders: 8,
      displacementCc: 4608,
      displacementL: 4.6,
      fuel: 'Gasolina',
      powerHp: 347,
      torqueNm: 460,
      topSpeedKmh: 250,
      accel0to100: 5.8,
      feedSystem: 'Inyección D-4S con transmisión de 8 relaciones',
      notes: 'Distribución por válvulas electrónicas VVT-iE en admisión.'
    }]
  },
  {
    id: 'lexus-gs-l10-pre-facelift',
    series: 'GS',
    label: 'Lexus GS 300h / GS 450h (L10 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2011, end: 2015, display: '2011 – 2015' },
    class: 'Berlina de Representación • Estreno de la parrilla Spindle Grille en producción',
    chassisCode: 'AWL10 / GWL10',
    packages: ['Business', 'Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:Lexus GS 450h (L10) – Frontansicht, 16. Juni 2012, Düsseldorf.jpg',
    searchQueries: ['Lexus GS 450h L10 front 2012', 'Lexus GS 450h L10 front', 'Lexus GS L10 pre-facelift'],
    engines: [{
      modelBadge: 'GS 450h',
      engineCode: '2GR-FXE + Motor Eléctrico',
      architecture: 'V6 3.5L Ciclo Atkinson + Motor eléctrico sincrónico',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Híbrido',
      powerHp: 345,
      torqueNm: 352,
      topSpeedKmh: 250,
      accel0to100: 5.9,
      feedSystem: 'Inyección D-4S con batería de hidruro de níquel',
      notes: 'Disponible con suspensión variable adaptativa AVS y dirección trasera DRS en acabado F Sport.'
    }]
  },
  {
    id: 'lexus-gs-l10-facelift',
    series: 'GS',
    label: 'Lexus GS 300h / GS 450h (L10 Facelift Spindle)',
    section: 'production',
    status: 'past',
    years: { start: 2015, end: 2020, display: '2015 – 2020' },
    class: 'Gran Berlina Híbrida • Ópticas Bi-LED en triple L & Spindle Grille sobredimensionada',
    chassisCode: 'AWL10 / GWL10',
    packages: ['Eco', 'Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:2016 Lexus GS 300h Executive Edition 2.5 Front.jpg',
    searchQueries: ['2016 Lexus GS 300h front', 'Lexus GS 300h facelift front', 'Lexus GS facelift 2016'],
    engines: [{
      modelBadge: 'GS 300h Facelift',
      engineCode: '2AR-FSE + Motor Eléctrico',
      architecture: '4 en línea 2.5L Ciclo Atkinson D-4S',
      cylinders: 4,
      displacementCc: 2494,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 223,
      torqueNm: 300,
      topSpeedKmh: 190,
      accel0to100: 9.0,
      feedSystem: 'Lexus Hybrid Drive de alta eficiencia térmica',
      notes: 'Equipado con el paquete de seguridad activa Lexus Safety System+.'
    }]
  },
  {
    id: 'lexus-es-xv60',
    series: 'ES',
    label: 'Lexus ES 300h (XV60)',
    section: 'production',
    status: 'past',
    years: { start: 2012, end: 2018, display: '2012 – 2018' },
    class: 'Berlina Ejecutiva • Máximo confort de rodadura & Primer ES híbrido',
    chassisCode: 'AVV60',
    packages: ['Comfort', 'Executive', 'Luxury'],
    preferredFile: 'File:2016 Lexus ES 300h (AVV60R) sedan (2018-09-03) 01.jpg',
    searchQueries: ['2016 Lexus ES 300h front', 'Lexus ES 300h 2016 front', 'Lexus ES 300h XV60 front'],
    engines: [{
      modelBadge: 'ES 300h',
      engineCode: '2AR-FXE + Motor Eléctrico',
      architecture: '4 en línea 2.5L Ciclo Atkinson DOHC 16V',
      cylinders: 4,
      displacementCc: 2494,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 205,
      torqueNm: 213,
      topSpeedKmh: 180,
      accel0to100: 8.5,
      feedSystem: 'Lexus Hybrid Drive con e-CVT',
      notes: 'Habitáculo insonorizado con triple capa aislante y cristales acústicos de seguridad.'
    }]
  },
  {
    id: 'lexus-es-xz10-pre-facelift',
    series: 'ES',
    label: 'Lexus ES 300h (XZ10 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2018, end: 2021, display: '2018 – 2021' },
    class: 'Berlina Ejecutiva • Plataforma GA-K • Desembarco oficial del ES en Europa',
    chassisCode: 'AXZH10',
    packages: ['Eco', 'Business', 'Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:2019 Lexus ES 300h (AXZH10R) sedan (2020-07-28) 01.jpg',
    searchQueries: ['2019 Lexus ES 300h front', 'Lexus ES 300h 2019 front', 'Lexus ES 300h XZ10 front'],
    engines: [{
      modelBadge: 'ES 300h GA-K',
      engineCode: 'A25A-FXS + Motor Eléctrico',
      architecture: '4 en línea 2.5L Dynamic Force Ciclo Atkinson (41% eficiencia térmica)',
      cylinders: 4,
      displacementCc: 2487,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 218,
      torqueNm: 221,
      topSpeedKmh: 180,
      accel0to100: 8.9,
      feedSystem: 'Inyección directa e indirecta D-4S',
      notes: 'Amortiguadores Swing Valve pioneros en el mundo para filtrar micro-irregularidades del asfalto.'
    }]
  },
  {
    id: 'lexus-es-xz10-facelift',
    series: 'ES',
    label: 'Lexus ES 300h (XZ10 Facelift)',
    section: 'production',
    status: 'current',
    years: { start: 2021, end: null, display: '2021 – Actualidad' },
    class: 'Berlina Ejecutiva • Parrilla con patrón de malla en L & Retrovisores digitales virtuales',
    chassisCode: 'AXZH10',
    packages: ['Premium', 'Executive', 'F Sport Design', 'Luxury'],
    preferredFile: 'File:2022 Lexus ES 300h F Sport, front 10.22.22.jpg',
    searchQueries: ['2022 Lexus ES 300h front', 'Lexus ES 300h 2022 front', 'Lexus ES facelift 2022 front'],
    engines: [{
      modelBadge: 'ES 300h Facelift',
      engineCode: 'A25A-FXS + Motor Eléctrico',
      architecture: '4 en línea 2.5L Dynamic Force Híbrido de 4ª generación',
      cylinders: 4,
      displacementCc: 2487,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 218,
      torqueNm: 221,
      topSpeedKmh: 180,
      accel0to100: 8.9,
      feedSystem: 'Inyección D-4S con batería compacta de hidruro de níquel bajo asientos',
      notes: 'Rigidez torsional reforzada en la suspensión trasera y sistema multimedia con pantalla táctil adelantada 11 cm.'
    }]
  },

  // ==========================================
  // BUQUE INSIGNIA DE REPRESENTACIÓN (LS)
  // ==========================================
  {
    id: 'lexus-ls-xf10',
    series: 'LS',
    label: 'Lexus LS 400 (XF10)',
    section: 'production',
    status: 'past',
    years: { start: 1989, end: 1994, display: '1989 – 1994' },
    class: 'Buque Insignia Fundacional • Proyecto Circle F • Motor V8 1UZ-FE legendario',
    chassisCode: 'UCF10',
    packages: ['Standard', 'Air Suspension'],
    preferredFile: 'File:1990-1992 Lexus LS 400 (UCF10R) sedan (2011-11-17) 01.jpg',
    searchQueries: ['1990 Lexus LS 400 front', 'Lexus LS 400 UCF10 front', 'Lexus LS 400 1991 front'],
    engines: [{
      modelBadge: 'LS 400 V8',
      engineCode: '1UZ-FE',
      architecture: 'V8 4.0L 32V DOHC con cigüeñal de 5 apoyos equilibrado al micrón',
      cylinders: 8,
      displacementCc: 3968,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 245,
      torqueNm: 353,
      topSpeedKmh: 250,
      accel0to100: 8.4,
      feedSystem: 'Inyección electrónica multipunto secuencial EFI',
      notes: 'Famoso por el anuncio de la torre de copas de champán sobre el capó acelerando a 240 km/h en rodillos sin derramar una gota.'
    }]
  },
  {
    id: 'lexus-ls-xf20',
    series: 'LS',
    label: 'Lexus LS 400 (XF20)',
    section: 'production',
    status: 'past',
    years: { start: 1994, end: 2000, display: '1994 – 2000' },
    class: 'Buque Insignia • Batalla extendida +35 mm, reducción de 95 kg de peso & VVT-i (1997+)',
    chassisCode: 'UCF20',
    packages: ['Luxury', 'Coach Edition', 'Platinum Edition'],
    preferredFile: 'File:1998-2000 Lexus LS 400 (UCF20R II) sedan (2011-11-17) 01.jpg',
    searchQueries: ['1998 Lexus LS 400 front', 'Lexus LS 400 UCF20 front', 'Lexus LS 400 1998 front'],
    engines: [{
      modelBadge: 'LS 400 VVT-i',
      engineCode: '1UZ-FE VVT-i',
      architecture: 'V8 4.0L DOHC 32V con distribución variable VVT-i',
      cylinders: 8,
      displacementCc: 3968,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 284,
      torqueNm: 398,
      topSpeedKmh: 250,
      accel0to100: 6.9,
      feedSystem: 'Inyección multipunto con transmisión automática de 5 velocidades',
      notes: 'Primer automóvil de producción del mundo con faros de xenón HID y navegador con disco duro opcional.'
    }]
  },
  {
    id: 'lexus-ls-xf30-pre-facelift',
    series: 'LS',
    label: 'Lexus LS 430 (XF30 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2000, end: 2003, display: '2000 – 2003' },
    class: 'Buque Insignia • Aerodinámica récord Cx 0.25 (túnel de viento Shinkansen) & V8 3UZ-FE',
    chassisCode: 'UCF30',
    packages: ['Premium Package', 'Ultra Luxury Package', 'Custom Luxury'],
    preferredFile: 'File:2001-2003 Lexus LS 430 (UCF30R) sedan (2011-11-17) 01.jpg',
    searchQueries: ['2001 Lexus LS 430 front', 'Lexus LS 430 pre-facelift front', 'Lexus LS 430 2001 front'],
    engines: [{
      modelBadge: 'LS 430 V8',
      engineCode: '3UZ-FE',
      architecture: 'V8 4.3L DOHC 32V VVT-i Atmosférico',
      cylinders: 8,
      displacementCc: 4293,
      displacementL: 4.3,
      fuel: 'Gasolina',
      powerHp: 281,
      torqueNm: 417,
      topSpeedKmh: 250,
      accel0to100: 6.7,
      feedSystem: 'Inyección multipunto EFI de alta precisión',
      notes: 'Equipado con control de crucero adaptativo por radar dinámico y asientos traseros con masaje shiatsu.'
    }]
  },
  {
    id: 'lexus-ls-xf30-facelift',
    series: 'LS',
    label: 'Lexus LS 430 (XF30 Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2003, end: 2006, display: '2003 – 2006' },
    class: 'Buque Insignia • Faros autodireccionales AFS, caja de 6 velocidades & Pilotos LED',
    chassisCode: 'UCF30',
    packages: ['Modern Luxury', 'Ultra Luxury Package', 'Sport Package'],
    preferredFile: 'File:2003-2006 Lexus LS 430 (UCF30R) sedan (2011-11-17) 01.jpg',
    searchQueries: ['2004 Lexus LS 430 front', 'Lexus LS 430 facelift front', 'Lexus LS 430 2005 front'],
    engines: [{
      modelBadge: 'LS 430 Facelift',
      engineCode: '3UZ-FE',
      architecture: 'V8 4.3L DOHC 32V VVT-i con transmisión de 6 velocidades A761E',
      cylinders: 8,
      displacementCc: 4293,
      displacementL: 4.3,
      fuel: 'Gasolina',
      powerHp: 281,
      torqueNm: 417,
      topSpeedKmh: 250,
      accel0to100: 6.3,
      feedSystem: 'Inyección multipunto EFI',
      notes: 'Considerado por la crítica internacional como el sedán de lujo con mayor índice de fiabilidad mecánica jamás fabricado.'
    }]
  },
  {
    id: 'lexus-ls-xf40-pre-facelift',
    series: 'LS',
    label: 'Lexus LS 460 / LS 600h (XF40 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2006, end: 2009, display: '2006 – 2009' },
    class: 'Buque Insignia • Estreno de la caja de 8 marchas & Primer V8 híbrido del mundo en el LS 600h',
    chassisCode: 'USF40 / UVF45',
    packages: ['Executive', 'President', 'President Plus LWB'],
    preferredFile: 'File:Lexus LS460 front 20080327.jpg',
    searchQueries: ['Lexus LS460 front 2008', 'Lexus LS 460 front 2007', 'Lexus LS 460 pre-facelift'],
    engines: [
      {
        modelBadge: 'LS 460',
        engineCode: '1UR-FSE',
        architecture: 'V8 4.6L DOHC 32V Dual VVT-iE D-4S',
        cylinders: 8,
        displacementCc: 4608,
        displacementL: 4.6,
        fuel: 'Gasolina',
        powerHp: 380,
        torqueNm: 493,
        topSpeedKmh: 250,
        accel0to100: 5.7,
        feedSystem: 'Inyección combinada D-4S',
        notes: 'Primer vehículo de pasajeros del mundo equipado con transmisión automática de 8 velocidades.'
      },
      {
        modelBadge: 'LS 600h L',
        engineCode: '2UR-FSE + Motor Eléctrico',
        architecture: 'V8 5.0L D-4S + Motor eléctrico síncrono con tracción total permanente AWD',
        cylinders: 8,
        displacementCc: 4969,
        displacementL: 5.0,
        fuel: 'Híbrido',
        powerHp: 445,
        torqueNm: 520,
        topSpeedKmh: 250,
        accel0to100: 6.3,
        feedSystem: 'Lexus Hybrid Drive con diferencial central Torsen',
        notes: 'Primer automóvil del mundo con faros delanteros de cruce con tecnología 100% LED.'
      }
    ]
  },
  {
    id: 'lexus-ls-xf40-facelift',
    series: 'LS',
    label: 'Lexus LS 460 / LS 600h (XF40 Facelift Spindle)',
    section: 'production',
    status: 'past',
    years: { start: 2012, end: 2017, display: '2012 – 2017' },
    class: 'Buque Insignia • Adopción integral de la Spindle Grille & Estreno del acabado F Sport',
    chassisCode: 'USF40 / UVF45',
    packages: ['F Sport', 'Executive', 'President', 'President LWB'],
    preferredFile: 'File:2013 Lexus LS 460 F Sport -- 04-24-2013.jpg',
    searchQueries: ['2013 Lexus LS 460 front', 'Lexus LS 460 facelift front', 'Lexus LS 600h 2014 front'],
    engines: [{
      modelBadge: 'LS 600h F Sport',
      engineCode: '2UR-FSE + Motor Eléctrico',
      architecture: 'V8 5.0L Híbrido con tracción integral AWD permanente',
      cylinders: 8,
      displacementCc: 4969,
      displacementL: 5.0,
      fuel: 'Híbrido',
      powerHp: 445,
      torqueNm: 520,
      topSpeedKmh: 250,
      accel0to100: 6.1,
      feedSystem: 'Lexus Hybrid Drive con barras estabilizadoras activas',
      notes: 'Suspensión neumática deportiva rebajada 10 mm y frenos Brembo con pinzas de 6 pistones.'
    }]
  },
  {
    id: 'lexus-ls-xf50-pre-facelift',
    series: 'LS',
    label: 'Lexus LS 500 / LS 500h (XF50 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2017, end: 2020, display: '2017 – 2020' },
    class: 'Buque Insignia • Plataforma GA-L • Cristal Kiriko tallado a mano & Tapicería origami plisada',
    chassisCode: 'VXFA50 / GVF50',
    packages: ['Business', 'Executive', 'F Sport', 'Luxury', 'Kiriko Glass'],
    preferredFile: 'File:2018 Lexus LS 500h Executive 3.5 Front.jpg',
    searchQueries: ['2018 Lexus LS 500h front', 'Lexus LS 500 front 2018', 'Lexus LS XF50 front'],
    engines: [
      {
        modelBadge: 'LS 500 Twin-Turbo',
        engineCode: 'V35A-FTS',
        architecture: 'V6 3.5L Biturbo DOHC 24V D-4ST',
        cylinders: 6,
        displacementCc: 3444,
        displacementL: 3.4,
        fuel: 'Gasolina',
        powerHp: 421,
        torqueNm: 600,
        topSpeedKmh: 250,
        accel0to100: 4.9,
        feedSystem: 'Inyección directa D-4ST con doble turbocompresor',
        notes: 'Transmisión automática Direct Shift de 10 relaciones con convertidor de par ultrarrápido.'
      },
      {
        modelBadge: 'LS 500h Multi-Stage',
        engineCode: '8GR-FXS + Dual Motor',
        architecture: 'V6 3.5L Ciclo Atkinson + Sistema Multi-Stage Hybrid',
        cylinders: 6,
        displacementCc: 3456,
        displacementL: 3.5,
        fuel: 'Híbrido',
        powerHp: 359,
        torqueNm: 500,
        topSpeedKmh: 250,
        accel0to100: 5.4,
        feedSystem: 'Inyección D-4S con cambio planetario + 4 marchas automáticas',
        notes: 'Permite rodar en modo 100% eléctrico hasta 140 km/h con el motor de combustión apagado.'
      }
    ]
  },
  {
    id: 'lexus-ls-xf50-facelift',
    series: 'LS',
    label: 'Lexus LS 500 / LS 500h (XF50 Facelift)',
    section: 'production',
    status: 'current',
    years: { start: 2020, end: null, display: '2020 – Actualidad' },
    class: 'Buque Insignia • Faros BladeScan AHS con espejos giratorios & Suspensión AVS optimizada',
    chassisCode: 'VXFA50 / GVF50',
    packages: ['F Sport', 'Executive', 'Luxury', 'Nishijin & Haku Leaf'],
    preferredFile: 'File:2021 Lexus LS 500, front 10.22.22.jpg',
    searchQueries: ['2021 Lexus LS 500 front', 'Lexus LS 500 facelift front', 'Lexus LS 500h 2022 front'],
    engines: [{
      modelBadge: 'LS 500h AWD Facelift',
      engineCode: '8GR-FXS + Dual Motor',
      architecture: 'V6 3.5L Multi-Stage Hybrid con tracción total permanente',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Híbrido',
      powerHp: 359,
      torqueNm: 500,
      topSpeedKmh: 250,
      accel0to100: 5.5,
      feedSystem: 'Multi-Stage Hybrid con batería de ion-litio de mayor densidad energética',
      notes: 'Incorpora el acabado artesanal Nishijin con pan de plata Haku en los paneles de las puertas.'
    }]
  },

  // ==========================================
  // COUPÉS CLÁSICOS & MODERNOS (SC, RC)
  // ==========================================
  {
    id: 'lexus-sc-z30',
    series: 'SC',
    label: 'Lexus SC 300 / SC 400 (Z30)',
    section: 'production',
    status: 'past',
    years: { start: 1991, end: 2000, display: '1991 – 2000' },
    class: 'Gran Turismo Coupé Clásico • Diseño biomórfico de Calty Design • 1UZ-FE V8 / 2JZ-GE',
    chassisCode: 'UZZ30 / JZZ31',
    packages: ['Standard', 'Luxury Package'],
    preferredFile: 'File:1992-1996 Lexus SC 400 (UZZ30R) coupe 01.jpg',
    searchQueries: ['Lexus SC 400 front', 'Lexus SC 300 front', 'Lexus SC Z30 coupe front'],
    engines: [
      {
        modelBadge: 'SC 400',
        engineCode: '1UZ-FE',
        architecture: 'V8 4.0L DOHC 32V Atmosférico',
        cylinders: 8,
        displacementCc: 3968,
        displacementL: 4.0,
        fuel: 'Gasolina',
        powerHp: 253,
        torqueNm: 353,
        topSpeedKmh: 245,
        accel0to100: 6.9,
        feedSystem: 'Inyección multipunto EFI',
        notes: 'Esculpido en California utilizando técnicas de modelado con moldes de yeso sin líneas rectas.'
      },
      {
        modelBadge: 'SC 300',
        engineCode: '2JZ-GE',
        architecture: '6 en línea 3.0L DOHC 24V VVT-i',
        cylinders: 6,
        displacementCc: 2997,
        displacementL: 3.0,
        fuel: 'Gasolina',
        powerHp: 228,
        torqueNm: 285,
        topSpeedKmh: 235,
        accel0to100: 7.4,
        feedSystem: 'Inyección multipunto EFI',
        notes: 'Comparte plataforma y componentes de suspensión con el legendario Toyota Supra A80.'
      }
    ]
  },
  {
    id: 'lexus-sc-z40',
    series: 'SC',
    label: 'Lexus SC 430 (Z40)',
    section: 'production',
    status: 'past',
    years: { start: 2001, end: 2010, display: '2001 – 2010' },
    class: 'Coupé-Cabriolet de Lujo • Techo duro retráctil de aluminio en 25 segundos • V8 3UZ-FE',
    chassisCode: 'UZZ40',
    packages: ['Luxury', 'Pebble Beach Edition', 'Eternal Jewel'],
    preferredFile: 'File:Lexus SC430 front 20080227.jpg',
    searchQueries: ['Lexus SC430 front 2008', 'Lexus SC 430 front', 'Lexus SC430 cabrio front'],
    engines: [{
      modelBadge: 'SC 430 V8',
      engineCode: '3UZ-FE',
      architecture: 'V8 4.3L DOHC 32V VVT-i Atmosférico',
      cylinders: 8,
      displacementCc: 4293,
      displacementL: 4.3,
      fuel: 'Gasolina',
      powerHp: 286,
      torqueNm: 419,
      topSpeedKmh: 250,
      accel0to100: 6.2,
      feedSystem: 'Inyección multipunto EFI con transmisión de 6 relaciones (2005+)',
      notes: 'Inspirado en los yates de la Costa Azul francesa, con sistema de sonido Mark Levinson de 9 altavoces.'
    }]
  },
  {
    id: 'lexus-rc-xc10-pre-facelift',
    series: 'RC',
    label: 'Lexus RC 300h / RC 350 (XC10 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2014, end: 2018, display: '2014 – 2018' },
    class: 'Coupé Deportivo • Ópticas independientes en flecha & Chasis híbrido ultra-rígido',
    chassisCode: 'AVC10 / GSC10',
    packages: ['Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:2016 Lexus RC 300h F Sport Automatic 2.5 Front.jpg',
    searchQueries: ['2016 Lexus RC 300h front', 'Lexus RC 300h coupe front', 'Lexus RC pre-facelift front'],
    engines: [{
      modelBadge: 'RC 300h',
      engineCode: '2AR-FSE + Motor Eléctrico',
      architecture: '4 en línea 2.5L Ciclo Atkinson D-4S',
      cylinders: 4,
      displacementCc: 2494,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 223,
      torqueNm: 300,
      topSpeedKmh: 190,
      accel0to100: 8.6,
      feedSystem: 'Lexus Hybrid Drive con propulsión trasera',
      notes: 'Estructura construida combinando el frontal del GS, el suelo central del IS C cabrio y la zaga del IS sedán.'
    }]
  },
  {
    id: 'lexus-rc-xc10-facelift',
    series: 'RC',
    label: 'Lexus RC 300h / RC 350 (XC10 Facelift)',
    section: 'production',
    status: 'current',
    years: { start: 2018, end: null, display: '2018 – Actualidad' },
    class: 'Coupé Deportivo • Faros compactos Bi-LED triples inspirados en el LC 500',
    chassisCode: 'AVC10 / GSC10',
    packages: ['Business', 'Executive', 'F Sport', 'Black Line'],
    preferredFile: 'File:2019 Lexus RC 300h F Sport Automatic 2.5 Front.jpg',
    searchQueries: ['2019 Lexus RC 300h front', 'Lexus RC 300h facelift front', 'Lexus RC 2019 front'],
    engines: [{
      modelBadge: 'RC 300h Facelift',
      engineCode: '2AR-FSE + Motor Eléctrico',
      architecture: '4 en línea 2.5L Ciclo Atkinson D-4S',
      cylinders: 4,
      displacementCc: 2494,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 223,
      torqueNm: 300,
      topSpeedKmh: 190,
      accel0to100: 8.6,
      feedSystem: 'Lexus Hybrid Drive optimizado',
      notes: 'Nuevos conductos aerodinámicos en los paragolpes y reloj analógico heredado del buque insignia LC.'
    }]
  },

  // ==========================================
  // SUVS, CROSSOVERS & TODOTERRENOS
  // ==========================================
  {
    id: 'lexus-lbx-mayh10',
    series: 'LBX',
    label: 'Lexus LBX (MAYH10)',
    section: 'production',
    status: 'current',
    years: { start: 2023, end: null, display: '2023 – Actualidad' },
    class: 'Crossover Urbano Premium • Plataforma GA-B • Frontal Resolute Look',
    chassisCode: 'MAYH10',
    packages: ['Elegant', 'Relax', 'Emotion', 'Cool', 'Original Edition'],
    preferredFile: 'File:Lexus LBX front.jpg',
    searchQueries: ['Lexus LBX front', 'Lexus LBX 2024 front', 'Lexus LBX crossover'],
    engines: [{
      modelBadge: 'LBX 1.5 Hybrid',
      engineCode: 'M15A-FXE + Motor Eléctrico',
      architecture: '3 en línea 1.5L Ciclo Atkinson con eje de equilibrado',
      cylinders: 3,
      displacementCc: 1490,
      displacementL: 1.5,
      fuel: 'Híbrido',
      powerHp: 136,
      torqueNm: 185,
      topSpeedKmh: 170,
      accel0to100: 9.2,
      feedSystem: 'Inyección electrónica con batería bipolar de NiMH de alta potencia',
      notes: 'Diseñado específicamente para el mercado europeo, disponible con tracción delantera o total inteligente E-Four.'
    }]
  },
  {
    id: 'lexus-ux-za10',
    series: 'UX',
    label: 'Lexus UX 250h / UX 300e / UX 300h (ZA10)',
    section: 'production',
    status: 'current',
    years: { start: 2018, end: null, display: '2018 – Actualidad' },
    class: 'Crossover Compacto • Plataforma GA-C • Pilotos traseros Aero Stabilizing',
    chassisCode: 'MZAH10 / KMA10',
    packages: ['Eco', 'Business', 'F Sport', 'Executive', 'Luxury'],
    preferredFile: 'File:2019 Lexus UX 250h F Sport 2.0 Front.jpg',
    searchQueries: ['2019 Lexus UX 250h front', 'Lexus UX 250h front', 'Lexus UX front'],
    engines: [
      {
        modelBadge: 'UX 300h Híbrido',
        engineCode: 'M20A-FXS + Sistema Híbrido 5ª Gen',
        architecture: '4 en línea 2.0L Dynamic Force Ciclo Atkinson',
        cylinders: 4,
        displacementCc: 1987,
        displacementL: 2.0,
        fuel: 'Híbrido',
        powerHp: 199,
        torqueNm: 205,
        topSpeedKmh: 177,
        accel0to100: 8.1,
        feedSystem: 'Inyección D-4S con batería compacta de iones de litio',
        notes: 'Actualización mecánica con sistema híbrido de 5ª generación y opción de tracción total E-Four.'
      },
      {
        modelBadge: 'UX 300e Eléctrico',
        engineCode: '4KM Motor Eléctrico',
        architecture: 'Motor eléctrico síncrono delantero con batería de 72.8 kWh',
        cylinders: 0,
        displacementCc: 0,
        displacementL: 0,
        fuel: 'Eléctrico',
        powerHp: 204,
        torqueNm: 300,
        topSpeedKmh: 160,
        accel0to100: 7.5,
        feedSystem: 'Batería de ion-litio de 72.8 kWh con 450 km de autonomía WLTP',
        notes: 'Primer modelo 100% eléctrico de la historia de Lexus con garantía de batería de hasta 10 años o 1.000.000 km.'
      }
    ]
  },
  {
    id: 'lexus-nx-az10-pre-facelift',
    series: 'NX',
    label: 'Lexus NX 300h (AZ10 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2014, end: 2017, display: '2014 – 2017' },
    class: 'SUV Mediano Premium • Diseño anguloso de diamante • Faros triples LED',
    chassisCode: 'AYZ10 / AYZ15',
    packages: ['Eco', 'Corporate', 'Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:2015 Lexus NX 300h (AYZ10R) 2WD wagon (2015-07-09) 01.jpg',
    searchQueries: ['2015 Lexus NX 300h front', 'Lexus NX 300h pre-facelift front', 'Lexus NX 300h front 2015'],
    engines: [{
      modelBadge: 'NX 300h',
      engineCode: '2AR-FXE + Motor Eléctrico',
      architecture: '4 en línea 2.5L Ciclo Atkinson',
      cylinders: 4,
      displacementCc: 2494,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 197,
      torqueNm: 210,
      topSpeedKmh: 180,
      accel0to100: 9.2,
      feedSystem: 'Lexus Hybrid Drive con tracción delantera o integral E-Four',
      notes: 'Uno de los mayores éxitos de ventas internacionales de Lexus en Europa.'
    }]
  },
  {
    id: 'lexus-nx-az10-facelift',
    series: 'NX',
    label: 'Lexus NX 300h / NX 300 (AZ10 Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2017, end: 2021, display: '2017 – 2021' },
    class: 'SUV Mediano • Spindle Grille con nueva textura fluida & Faros adaptativos AHS',
    chassisCode: 'AYZ10 / AGZ10',
    packages: ['Business', 'Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:2018 Lexus NX 300h F Sport 2.5 Front.jpg',
    searchQueries: ['2018 Lexus NX 300h front', 'Lexus NX 300h facelift front', 'Lexus NX 300 2019 front'],
    engines: [{
      modelBadge: 'NX 300h Facelift',
      engineCode: '2AR-FXE + Motor Eléctrico',
      architecture: '4 en línea 2.5L Ciclo Atkinson DOHC 16V',
      cylinders: 4,
      displacementCc: 2494,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 197,
      torqueNm: 210,
      topSpeedKmh: 180,
      accel0to100: 9.2,
      feedSystem: 'Lexus Hybrid Drive optimizado',
      notes: 'Actualización con suspensión adaptativa AVS recalibrada y portón trasero manos libres por sensor de pie.'
    }]
  },
  {
    id: 'lexus-nx-az20',
    series: 'NX',
    label: 'Lexus NX 350h / NX 450h+ (AZ20)',
    section: 'production',
    status: 'current',
    years: { start: 2021, end: null, display: '2021 – Actualidad' },
    class: 'SUV Mediano Premium • Primer híbrido enchufable (PHEV) de Lexus • Plataforma GA-K',
    chassisCode: 'AAZH20 / AAZH26',
    packages: ['Business City', 'Executive', 'F Sport', 'Luxury'],
    preferredFile: 'File:2022 Lexus NX 350h Executive, front 10.22.22.jpg',
    searchQueries: ['2022 Lexus NX 350h front', 'Lexus NX 450h front', 'Lexus NX 2022 front'],
    engines: [
      {
        modelBadge: 'NX 450h+ Plug-in',
        engineCode: 'A25A-FXS + Dual Motor PHEV',
        architecture: '4 en línea 2.5L + Dos motores eléctricos (delantero y trasero E-Four)',
        cylinders: 4,
        displacementCc: 2487,
        displacementL: 2.5,
        fuel: 'Híbrido Enchufable',
        powerHp: 309,
        torqueNm: 227,
        topSpeedKmh: 200,
        accel0to100: 6.3,
        feedSystem: 'Batería de ion-litio de 18.1 kWh con más de 70 km de autonomía cero emisiones',
        notes: 'Conserva el funcionamiento híbrido autorrecargable de máxima eficiencia incluso cuando la batería se agota.'
      },
      {
        modelBadge: 'NX 350h',
        engineCode: 'A25A-FXS + Motor Eléctrico',
        architecture: '4 en línea 2.5L Dynamic Force 4ª Gen Híbrida',
        cylinders: 4,
        displacementCc: 2487,
        displacementL: 2.5,
        fuel: 'Híbrido',
        powerHp: 244,
        torqueNm: 239,
        topSpeedKmh: 200,
        accel0to100: 7.7,
        feedSystem: 'Inyección D-4S de alta presión',
        notes: 'Aumento del 24% de potencia respecto a la generación previa con menor consumo de combustible.'
      }
    ]
  },
  {
    id: 'lexus-rz-eb10',
    series: 'RZ',
    label: 'Lexus RZ 300e / RZ 450e (EB10 Direct4)',
    section: 'production',
    status: 'current',
    years: { start: 2022, end: null, display: '2022 – Actualidad' },
    class: 'SUV Eléctrico Dedicado • Plataforma e-TNGA • Tracción Total DIRECT4 & Volante One Motion Grip',
    chassisCode: 'XEBM15',
    packages: ['Business', 'Executive', 'Luxury One Motion Grip'],
    preferredFile: 'File:Lexus RZ 450e (EB10) front.jpg',
    searchQueries: ['Lexus RZ 450e front', 'Lexus RZ 300e front', 'Lexus RZ front'],
    engines: [{
      modelBadge: 'RZ 450e DIRECT4',
      engineCode: '1XM + 1YM Motores Eléctricos',
      architecture: 'Motores síncronos de imanes permanentes duales con batería de 71.4 kWh',
      cylinders: 0,
      displacementCc: 0,
      displacementL: 0,
      fuel: 'Eléctrico',
      powerHp: 313,
      torqueNm: 435,
      topSpeedKmh: 160,
      accel0to100: 5.3,
      feedSystem: 'Batería de ion-litio refrigerada por agua de 71.4 kWh (autonomía hasta 440 km WLTP)',
      notes: 'Dirección electrónica Steer-by-Wire pionera con volante tipo yugo de aviación sin conexión mecánica.'
    }]
  },
  {
    id: 'lexus-rx-xu10',
    series: 'RX',
    label: 'Lexus RX 300 (XU10)',
    section: 'production',
    status: 'past',
    years: { start: 1998, end: 2003, display: '1998 – 2003' },
    class: 'Pionero Mundial del Crossover de Lujo • Chasis monocasco turismo en lugar de largueros',
    chassisCode: 'MCU10 / MCU15',
    packages: ['Base', 'Silversport', 'Coach Edition'],
    preferredFile: 'File:2000-2003 Lexus RX 300 (MCU15R) wagon (2011-04-22) 01.jpg',
    searchQueries: ['2000-2003 Lexus RX 300 front', 'Lexus RX 300 MCU15 front', 'Lexus RX 300 2001 front'],
    engines: [{
      modelBadge: 'RX 300 V6',
      engineCode: '1MZ-FE',
      architecture: 'V6 3.0L DOHC 24V con distribución variable VVT-i',
      cylinders: 6,
      displacementCc: 2995,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 201,
      torqueNm: 283,
      topSpeedKmh: 180,
      accel0to100: 9.6,
      feedSystem: 'Inyección electrónica multipunto secuencial EFI',
      notes: 'Definió el concepto de SUV moderno combinando la altura de un todoterreno con el confort de marcha de una berlina de lujo.'
    }]
  },
  {
    id: 'lexus-rx-xu30-pre-facelift',
    series: 'RX',
    label: 'Lexus RX 300 / RX 400h (XU30 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2003, end: 2006, display: '2003 – 2006' },
    class: 'Crossover Premium • Primer SUV híbrido comercial de la historia del automóvil en el RX 400h',
    chassisCode: 'MCU35 / MHU38',
    packages: ['Executive', 'President', 'Air Suspension'],
    preferredFile: 'File:Lexus RX400h front 20080303.jpg',
    searchQueries: ['Lexus RX400h front 2008', 'Lexus RX 400h 2005 front', 'Lexus RX400h front'],
    engines: [{
      modelBadge: 'RX 400h Hybrid',
      engineCode: '3MZ-FE + Motores Eléctricos E-Four',
      architecture: 'V6 3.3L + Motores eléctricos delantero y trasero',
      cylinders: 6,
      displacementCc: 3311,
      displacementL: 3.3,
      fuel: 'Híbrido',
      powerHp: 272,
      torqueNm: 288,
      topSpeedKmh: 200,
      accel0to100: 7.6,
      feedSystem: 'Lexus Hybrid Synergy Drive con inversor refrigerado',
      notes: 'Hito histórico en la industria mundial del motor al lanzar en 2005 el primer SUV premium híbrido con tracción total eléctrica E-Four.'
    }]
  },
  {
    id: 'lexus-rx-xu30-facelift',
    series: 'RX',
    label: 'Lexus RX 350 / RX 400h (XU30 Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2006, end: 2009, display: '2006 – 2009' },
    class: 'Crossover de Lujo • Motor 3.5L V6 2GR-FE, nuevos tiradores cromados & Parrilla actualizada',
    chassisCode: 'GSU35 / MHU38',
    packages: ['Executive', 'President', 'Limited Edition'],
    preferredFile: 'File:2006-2009 Lexus RX 350 (GSU35R) Sports Luxury wagon (2011-04-28) 01.jpg',
    searchQueries: ['2006-2009 Lexus RX 350 front', 'Lexus RX 350 GSU35 front', 'Lexus RX 350 2007 front'],
    engines: [{
      modelBadge: 'RX 350 V6',
      engineCode: '2GR-FE',
      architecture: 'V6 3.5L DOHC 24V Dual VVT-i',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Gasolina',
      powerHp: 276,
      torqueNm: 342,
      topSpeedKmh: 200,
      accel0to100: 7.8,
      feedSystem: 'Inyección electrónica multipunto',
      notes: 'Incorpora tracción total permanente y suspensión neumática autonivelante con 5 alturas seleccionables.'
    }]
  },
  {
    id: 'lexus-rx-al10-pre-facelift',
    series: 'RX',
    label: 'Lexus RX 350 / RX 450h (AL10 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2008, end: 2012, display: '2008 – 2012' },
    class: 'Crossover Premium • Suspensión trasera de doble triángulo & Mando Remote Touch háptico',
    chassisCode: 'GYL10 / GYL15',
    packages: ['Premium', 'Executive', 'President'],
    preferredFile: 'File:Lexus RX450h front 20100411.jpg',
    searchQueries: ['Lexus RX450h front 2010', 'Lexus RX 450h AL10 front', 'Lexus RX450h 2009 front'],
    engines: [{
      modelBadge: 'RX 450h',
      engineCode: '2GR-FXE + E-Four',
      architecture: 'V6 3.5L Ciclo Atkinson + Dos motores eléctricos de tracción',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Híbrido',
      powerHp: 299,
      torqueNm: 317,
      topSpeedKmh: 200,
      accel0to100: 7.8,
      feedSystem: 'Lexus Hybrid Drive con recirculación de gases de escape EGR refrigerada',
      notes: 'Estreno del sistema de recuperación de calor de los gases de escape (EHR) para reducir el tiempo de calentamiento del motor.'
    }]
  },
  {
    id: 'lexus-rx-al10-facelift',
    series: 'RX',
    label: 'Lexus RX 350 / RX 450h (AL10 Facelift Spindle)',
    section: 'production',
    status: 'past',
    years: { start: 2012, end: 2015, display: '2012 – 2015' },
    class: 'Crossover de Lujo • Estreno de la calandra Spindle Grille & Acabado deportivo F Sport',
    chassisCode: 'GYL10 / GYL15',
    packages: ['Executive', 'F Sport', 'President'],
    preferredFile: 'File:2012 Lexus RX 450h (GYL15R) wagon (2015-07-03) 01.jpg',
    searchQueries: ['2012 Lexus RX 450h front', 'Lexus RX 450h facelift front', 'Lexus RX 450h 2013 front'],
    engines: [{
      modelBadge: 'RX 450h F Sport',
      engineCode: '2GR-FXE + E-Four',
      architecture: 'V6 3.5L Ciclo Atkinson',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Híbrido',
      powerHp: 299,
      torqueNm: 317,
      topSpeedKmh: 200,
      accel0to100: 7.8,
      feedSystem: 'Lexus Hybrid Drive con amortiguadores laterales de rendimiento Yamaha',
      notes: 'Chasis ajustado con amortiguadores de rendimiento transversal para mitigar balanceos sin comprometer suavidad.'
    }]
  },
  {
    id: 'lexus-rx-al20-pre-facelift',
    series: 'RX',
    label: 'Lexus RX 450h (AL20 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2015, end: 2019, display: '2015 – 2019' },
    class: 'Crossover Premium • Pilar C flotante oscurecido & Intermitentes secuenciales LED',
    chassisCode: 'GYL20 / GYL25',
    packages: ['Executive', 'F Sport', 'Luxury', 'RX L 7 plazas'],
    preferredFile: 'File:2016 Lexus RX 450h F Sport 3.5 Front.jpg',
    searchQueries: ['2016 Lexus RX 450h front', 'Lexus RX 450h 2016 front', 'Lexus RX AL20 front'],
    engines: [{
      modelBadge: 'RX 450h E-Four',
      engineCode: '2GR-FXS + Dual Motor',
      architecture: 'V6 3.5L Ciclo Atkinson con inyección combinada D-4S',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Híbrido',
      powerHp: 313,
      torqueNm: 335,
      topSpeedKmh: 200,
      accel0to100: 7.7,
      feedSystem: 'Inyección D-4S y tracción integral eléctrica inteligente',
      notes: 'Alerón trasero integrado que oculta el limpiaparabrisas posterior bajo la moldura superior.'
    }]
  },
  {
    id: 'lexus-rx-al20-facelift',
    series: 'RX',
    label: 'Lexus RX 450h / RX L (AL20 Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2019, end: 2022, display: '2019 – 2022' },
    class: 'Crossover Premium • Faros BladeScan AHS & Mayor rigidez estructural mediante adhesivos',
    chassisCode: 'GYL20 / GYL25 / GYL26',
    packages: ['Business', 'Executive', 'F Sport', 'Luxury', 'RX L'],
    preferredFile: 'File:2020 Lexus RX 450h F Sport 3.5 Front.jpg',
    searchQueries: ['2020 Lexus RX 450h front', 'Lexus RX 450h facelift 2020 front', 'Lexus RX 2020 front'],
    engines: [{
      modelBadge: 'RX 450h Facelift',
      engineCode: '2GR-FXS + Dual Motor',
      architecture: 'V6 3.5L D-4S Híbrido autorrecargable',
      cylinders: 6,
      displacementCc: 3456,
      displacementL: 3.5,
      fuel: 'Híbrido',
      powerHp: 313,
      torqueNm: 335,
      topSpeedKmh: 200,
      accel0to100: 7.7,
      feedSystem: 'Lexus Hybrid Drive con sistema BladeScan',
      notes: 'Pionero de los faros BladeScan con espejos reflectores giratorios a 12.000 rpm para iluminación selectiva perfecta.'
    }]
  },
  {
    id: 'lexus-rx-ala10',
    series: 'RX',
    label: 'Lexus RX 350h / RX 450h+ (ALA10/ALH10)',
    section: 'production',
    status: 'current',
    years: { start: 2022, end: null, display: '2022 – Actualidad' },
    class: 'Crossover de Lujo • Plataforma GA-K • Frontal Spindle Body sin marco integrado',
    chassisCode: 'AALH16 / AALH17',
    packages: ['Business City', 'Executive', 'Luxury', 'F Sport Design'],
    preferredFile: 'File:Lexus RX 350h (ALH10) front.jpg',
    searchQueries: ['Lexus RX 350h front', '2023 Lexus RX front', 'Lexus RX ALH10 front'],
    engines: [
      {
        modelBadge: 'RX 450h+ PHEV',
        engineCode: 'A25A-FXS + Dual Motor PHEV',
        architecture: '4 en línea 2.5L Dynamic Force Híbrido Enchufable',
        cylinders: 4,
        displacementCc: 2487,
        displacementL: 2.5,
        fuel: 'Híbrido Enchufable',
        powerHp: 309,
        torqueNm: 227,
        topSpeedKmh: 200,
        accel0to100: 6.5,
        feedSystem: 'Batería de ion-litio de 18.1 kWh con 65 km de autonomía eléctrica WLTP',
        notes: 'PHEV de referencia en su categoría que preserva la suavidad y el consumo contenido aun con batería descargada.'
      },
      {
        modelBadge: 'RX 350h',
        engineCode: 'A25A-FXS + Motor Eléctrico',
        architecture: '4 en línea 2.5L Híbrido autorrecargable de 4ª generación',
        cylinders: 4,
        displacementCc: 2487,
        displacementL: 2.5,
        fuel: 'Híbrido',
        powerHp: 250,
        torqueNm: 239,
        topSpeedKmh: 200,
        accel0to100: 7.9,
        feedSystem: 'Inyección D-4S con tracción total inteligente E-Four',
        notes: 'Consumo homologado de solo 6.3 l/100 km para un SUV de casi 5 metros de longitud.'
      }
    ]
  },
  {
    id: 'lexus-gx-j150-pre-facelift',
    series: 'GX',
    label: 'Lexus GX 460 (J150 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2009, end: 2013, display: '2009 – 2013' },
    class: 'Todoterreno Auténtico • Chasis de largueros y travesaños (Body-on-Frame) • V8 1UR-FE',
    chassisCode: 'URJ150',
    packages: ['Base', 'Premium'],
    preferredFile: 'File:2010 Lexus GX 460 -- 07-09-2010.jpg',
    searchQueries: ['2010 Lexus GX 460 front', 'Lexus GX 460 2010 front', 'Lexus GX 460 pre-facelift'],
    engines: [{
      modelBadge: 'GX 460 V8',
      engineCode: '1UR-FE',
      architecture: 'V8 4.6L DOHC 32V Dual VVT-i Atmosférico',
      cylinders: 8,
      displacementCc: 4608,
      displacementL: 4.6,
      fuel: 'Gasolina',
      powerHp: 301,
      torqueNm: 446,
      topSpeedKmh: 180,
      accel0to100: 7.8,
      feedSystem: 'Inyección electrónica multipunto',
      notes: 'Equipado con reductora, tracción total permanente 4WD con diferencial central Torsen y sistema KDSS cinético.'
    }]
  },
  {
    id: 'lexus-gx-j150-facelift',
    series: 'GX',
    label: 'Lexus GX 460 (J150 Facelift Spindle)',
    section: 'production',
    status: 'past',
    years: { start: 2013, end: 2023, display: '2013 – 2023' },
    class: 'Todoterreno de Lujo • Spindle Grille masiva & Faros de triple haz LED',
    chassisCode: 'URJ150',
    packages: ['Premium', 'Luxury', 'Black Line Special Edition'],
    preferredFile: 'File:2020 Lexus GX 460 Luxury in Atomic Silver, Front Left, 05-04-2022.jpg',
    searchQueries: ['2020 Lexus GX 460 front', 'Lexus GX 460 facelift front', 'Lexus GX 460 2021 front'],
    engines: [{
      modelBadge: 'GX 460 Facelift',
      engineCode: '1UR-FE',
      architecture: 'V8 4.6L DOHC 32V Dual VVT-i',
      cylinders: 8,
      displacementCc: 4608,
      displacementL: 4.6,
      fuel: 'Gasolina',
      powerHp: 301,
      torqueNm: 446,
      topSpeedKmh: 180,
      accel0to100: 7.8,
      feedSystem: 'Inyección multipunto con Crawl Control y Multi-Terrain Select',
      notes: 'Capacidad de remolque de hasta 2.950 kg con robustez todoterreno legendaria.'
    }]
  },
  {
    id: 'lexus-gx-j250',
    series: 'GX',
    label: 'Lexus GX 550 (J250 Overtrail)',
    section: 'production',
    status: 'current',
    years: { start: 2023, end: null, display: '2023 – Actualidad' },
    class: 'Todoterreno Radical • Plataforma GA-F • Diseño retro-cuadrado & V6 Twin-Turbo',
    chassisCode: 'VJA250',
    packages: ['Premium', 'Luxury', 'Overtrail', 'Overtrail+'],
    preferredFile: 'File:2024 Lexus GX 550 Overtrail+ in Earth, front left.jpg',
    searchQueries: ['2024 Lexus GX 550 front', 'Lexus GX 550 front', 'Lexus GX 550 Overtrail'],
    engines: [{
      modelBadge: 'GX 550 Twin-Turbo',
      engineCode: 'V35A-FTS',
      architecture: 'V6 3.4L Biturbo DOHC 24V D-4ST',
      cylinders: 6,
      displacementCc: 3444,
      displacementL: 3.4,
      fuel: 'Gasolina',
      powerHp: 354,
      torqueNm: 650,
      topSpeedKmh: 180,
      accel0to100: 6.5,
      feedSystem: 'Inyección directa D-4ST y cambio Direct Shift de 10 marchas',
      notes: 'Versión Overtrail con neumáticos todoterreno de 33", diferencial trasero bloqueable electrónicamente y sistema E-KDSS.'
    }]
  },
  {
    id: 'lexus-lx-j100',
    series: 'LX',
    label: 'Lexus LX 470 (J100)',
    section: 'production',
    status: 'past',
    years: { start: 1998, end: 2007, display: '1998 – 2007' },
    class: 'Buque Insignia Todoterreno • Suspensión AHC hidráulica regulable en altura • V8 2UZ-FE',
    chassisCode: 'UZJ100',
    packages: ['Standard', 'Luxury Edition', 'Night View'],
    preferredFile: 'File:2003-2007 Lexus LX 470 (UZJ100R) wagon (2011-04-22) 01.jpg',
    searchQueries: ['2003-2007 Lexus LX 470 front', 'Lexus LX 470 UZJ100 front', 'Lexus LX 470 front'],
    engines: [{
      modelBadge: 'LX 470 V8',
      engineCode: '2UZ-FE',
      architecture: 'V8 4.7L DOHC 32V VVT-i (2005+)',
      cylinders: 8,
      displacementCc: 4663,
      displacementL: 4.7,
      fuel: 'Gasolina',
      powerHp: 275,
      torqueNm: 447,
      topSpeedKmh: 180,
      accel0to100: 8.9,
      feedSystem: 'Inyección multipunto secuencial con bloque de fundición de hierro indestructible',
      notes: 'Suspensión hidroneumática regulable en altura AHC con amortiguación variable AVS.'
    }]
  },
  {
    id: 'lexus-lx-j200-pre-facelift',
    series: 'LX',
    label: 'Lexus LX 570 (J200 Pre-Facelift)',
    section: 'production',
    status: 'past',
    years: { start: 2007, end: 2015, display: '2007 – 2015' },
    class: 'Buque Insignia Todoterreno • 5.7L V8 3UR-FE de 383 CV & Climatizador de 4 zonas con 28 salidas',
    chassisCode: 'URJ200',
    packages: ['Base', 'Luxury Package'],
    preferredFile: 'File:2010 Lexus LX 570 (URJ201R) wagon (2015-07-16) 01.jpg',
    searchQueries: ['2010 Lexus LX 570 front', 'Lexus LX 570 2008 front', 'Lexus LX 570 pre-facelift'],
    engines: [{
      modelBadge: 'LX 570 V8',
      engineCode: '3UR-FE',
      architecture: 'V8 5.7L DOHC 32V Dual VVT-i Atmosférico',
      cylinders: 8,
      displacementCc: 5663,
      displacementL: 5.7,
      fuel: 'Gasolina',
      powerHp: 383,
      torqueNm: 546,
      topSpeedKmh: 220,
      accel0to100: 7.5,
      feedSystem: 'Inyección electrónica multipunto',
      notes: 'Capacidad de remolque de hasta 3.850 kg con sistema de control de balanceo de remolque.'
    }]
  },
  {
    id: 'lexus-lx-j200-facelift',
    series: 'LX',
    label: 'Lexus LX 570 (J200 Facelift Spindle)',
    section: 'production',
    status: 'past',
    years: { start: 2015, end: 2021, display: '2015 – 2021' },
    class: 'Buque Insignia Todoterreno • Frontal Spindle Grille monolítico & Cambio de 8 marchas',
    chassisCode: 'URJ200',
    packages: ['Luxury', 'Inspiration Series', 'Sport Package'],
    preferredFile: 'File:2016 Lexus LX 570 (URJ201R) wagon (2018-09-17) 01.jpg',
    searchQueries: ['2016 Lexus LX 570 front', 'Lexus LX 570 facelift front', 'Lexus LX 570 2017 front'],
    engines: [{
      modelBadge: 'LX 570 Facelift',
      engineCode: '3UR-FE',
      architecture: 'V8 5.7L Dual VVT-i con transmisión de 8 relaciones',
      cylinders: 8,
      displacementCc: 5663,
      displacementL: 5.7,
      fuel: 'Gasolina',
      powerHp: 383,
      torqueNm: 546,
      topSpeedKmh: 220,
      accel0to100: 7.3,
      feedSystem: 'Inyección multipunto EFI',
      notes: 'Equipado con Lexus Climate Concierge que sincroniza automáticamente asientos calefactados/ventilados y volante con el climatizador.'
    }]
  },
  {
    id: 'lexus-lx-j300',
    series: 'LX',
    label: 'Lexus LX 600 / LX 700h (J300)',
    section: 'production',
    status: 'current',
    years: { start: 2021, end: null, display: '2021 – Actualidad' },
    class: 'Buque Insignia Todoterreno de Ultralujo • Plataforma GA-F • 200 kg más ligero que su predecesor',
    chassisCode: 'VJA310',
    packages: ['Premium', 'F Sport Handling', 'Ultra Luxury 4 plazas', 'Overtrail'],
    preferredFile: 'File:2022 Lexus LX 600 Ultra Luxury in Manganese Luster, front right.jpg',
    searchQueries: ['2022 Lexus LX 600 front', 'Lexus LX 600 front', 'Lexus LX J300 front'],
    engines: [{
      modelBadge: 'LX 600 Twin-Turbo',
      engineCode: 'V35A-FTS',
      architecture: 'V6 3.4L Biturbo DOHC 24V D-4ST',
      cylinders: 6,
      displacementCc: 3444,
      displacementL: 3.4,
      fuel: 'Gasolina',
      powerHp: 415,
      torqueNm: 650,
      topSpeedKmh: 210,
      accel0to100: 6.9,
      feedSystem: 'Inyección directa D-4ST y cambio automático de 10 relaciones',
      notes: 'Versión Ultra Luxury con 4 plazas independientes ejecutivas reclinables hasta 48 grados con reposapiés extensible.'
    }]
  },
  {
    id: 'lexus-tx-tx10',
    series: 'TX',
    label: 'Lexus TX 350 / TX 500h / TX 550h+ (TX10)',
    section: 'production',
    status: 'current',
    years: { start: 2023, end: null, display: '2023 – Actualidad' },
    class: 'Gran SUV Familiar de 3 Filas • Plataforma GA-K alargada • Unified Spindle frontal',
    chassisCode: 'TX10',
    packages: ['Base', 'Premium', 'F Sport Performance', 'Luxury'],
    preferredFile: 'File:2024 Lexus TX 350 Premium in Wind Chill Pearl, front right.jpg',
    searchQueries: ['2024 Lexus TX 350 front', 'Lexus TX 500h front', 'Lexus TX front'],
    engines: [{
      modelBadge: 'TX 500h F Sport',
      engineCode: 'T24A-FTS + DIRECT4',
      architecture: '4 en línea 2.4L Turbo + Motores eléctricos DIRECT4',
      cylinders: 4,
      displacementCc: 2393,
      displacementL: 2.4,
      fuel: 'Híbrido',
      powerHp: 371,
      torqueNm: 550,
      topSpeedKmh: 205,
      accel0to100: 6.1,
      feedSystem: 'Inyección directa D-4ST y tracción total deportiva DIRECT4',
      notes: 'Capacidad para 7 adultos con maletero real de más de 570 litros incluso con las tres filas de asientos desplegadas.'
    }]
  },

  // ==========================================
  // MONOVOLUMEN DE ULTRA-LUJO (LM)
  // ==========================================
  {
    id: 'lexus-lm-aw10',
    series: 'LM',
    label: 'Lexus LM 350h / LM 500h (AW10)',
    section: 'production',
    status: 'current',
    years: { start: 2023, end: null, display: '2023 – Actualidad' },
    class: 'Luxury Mover • Monovolumen de Ultra-Lujo • Salón Emperor de 4 plazas con pantalla de 48"',
    chassisCode: 'AAWH10',
    packages: ['Executive 4 plazas', 'Luxury 7 plazas'],
    preferredFile: 'File:Lexus LM 350h (AW10) front.jpg',
    searchQueries: ['Lexus LM 350h front', 'Lexus LM 2023 front', 'Lexus LM front'],
    engines: [{
      modelBadge: 'LM 350h E-Four',
      engineCode: 'A25A-FXS + Dual Motor',
      architecture: '4 en línea 2.5L Ciclo Atkinson Dynamic Force con tracción total eléctrica E-Four',
      cylinders: 4,
      displacementCc: 2487,
      displacementL: 2.5,
      fuel: 'Híbrido',
      powerHp: 250,
      torqueNm: 239,
      topSpeedKmh: 190,
      accel0to100: 8.7,
      feedSystem: 'Lexus Hybrid Drive de 4ª generación',
      notes: 'Modo de conducción "Rear Comfort" que modula la suspensión y el frenado para evitar cualquier cabeceo de los pasajeros traseros.'
    }]
  },

  // ==========================================
  // CONCEPTOS & PROTOTIPOS HISTÓRICOS
  // ==========================================
  {
    id: 'lexus-concept-lfa',
    series: 'Concept',
    label: 'Lexus LF-A Concept (2005)',
    section: 'prototypes',
    status: 'concept',
    years: { start: 2005, end: 2005, display: '2005' },
    class: 'Concept Car • Prototipo original del superdeportivo LFA presentado en el NAIAS de Detroit',
    chassisCode: 'LF-A 2005',
    packages: ['NAIAS Showcase'],
    preferredFile: 'File:Lexus LF-A concept car (front).jpg',
    searchQueries: ['Lexus LF-A concept front', 'Lexus LF-A 2005 front', 'LF-A concept'],
    engines: [{
      modelBadge: 'LF-A Prototype V10',
      engineCode: '1LR Prototype',
      architecture: 'V10 Atmosférico de alta compresión',
      cylinders: 10,
      displacementCc: 4800,
      displacementL: 4.8,
      fuel: 'Gasolina',
      powerHp: 500,
      torqueNm: 480,
      topSpeedKmh: 320,
      accel0to100: 3.9,
      feedSystem: 'Inyección electrónica secuencial',
      notes: 'El primer vistazo público al legendario superdeportivo con carrocería en aluminio pulido antes de cambiar al CFRP definitivo.'
    }]
  },
  {
    id: 'lexus-concept-lf-lc',
    series: 'Concept',
    label: 'Lexus LF-LC Concept (2012)',
    section: 'prototypes',
    status: 'concept',
    years: { start: 2012, end: 2012, display: '2012' },
    class: 'Concept Car • Precursor del buque insignia LC 500 • Ganador del premio EyesOn Design',
    chassisCode: 'LF-LC',
    packages: ['Detroit Showcase'],
    preferredFile: 'File:Lexus LF-LC (front).JPG',
    searchQueries: ['Lexus LF-LC front', 'Lexus LF-LC concept front', 'Lexus LF LC'],
    engines: [{
      modelBadge: 'Advanced Lexus Hybrid Drive',
      engineCode: 'Hybrid Concept',
      architecture: 'V8 Híbrido de alto rendimiento',
      cylinders: 8,
      displacementCc: 5000,
      displacementL: 5.0,
      fuel: 'Híbrido',
      powerHp: 500,
      torqueNm: 540,
      topSpeedKmh: 280,
      accel0to100: 4.2,
      feedSystem: 'Advanced Lexus Hybrid Drive',
      notes: 'Diseñado por Calty Design Research en Newport Beach, California; inspiró directamente el diseño del LC 500 de producción.'
    }]
  },
  {
    id: 'lexus-concept-lf-z',
    series: 'Concept',
    label: 'Lexus LF-Z Electrified Concept (2021)',
    section: 'prototypes',
    status: 'concept',
    years: { start: 2021, end: 2021, display: '2021' },
    class: 'Concept Car • Manifiesto de la era eléctrica de Lexus • Precursor del RZ 450e',
    chassisCode: 'LF-Z',
    packages: ['Electrified Showcase'],
    preferredFile: 'File:Lexus LF-Z Electrified concept front.jpg',
    searchQueries: ['Lexus LF-Z Electrified front', 'Lexus LF-Z front', 'Lexus LF-Z concept'],
    engines: [{
      modelBadge: 'LF-Z Direct4 EV',
      engineCode: 'Direct4 Concept EV',
      architecture: 'Motores eléctricos duales con tracción total DIRECT4 y batería de 90 kWh',
      cylinders: 0,
      displacementCc: 0,
      displacementL: 0,
      fuel: 'Eléctrico',
      powerHp: 544,
      torqueNm: 700,
      topSpeedKmh: 200,
      accel0to100: 3.0,
      feedSystem: 'Batería de ion-litio de 90 kWh con 600 km de autonomía estimada',
      notes: 'Primer concept en estrenar la filosofía de diseño interior Tazuna (riendas del caballo en japonés).'
    }]
  }
];

async function resolveWikimediaImage(preferredFile: string | undefined, searchQueries: string[], existingUrls: Set<string>): Promise<any | null> {
  // 1. Intentar primero con preferredFile si existe
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
        if (/rear|interior|engine|wheel|badge|side|caliper|cockpit|dashboard|tail|svg|pdf|seat|exhaust/i.test(title)) continue;
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
    await new Promise(r => setTimeout(r, 200));
  }

  return null;
}

async function main() {
  console.log(`Construyendo catálogo de Lexus (${LEXUS_MODELS.length} modelos)...`);
  const existingUrls = new Set<string>();

  const generations: any[] = [];
  let mPerfCount = 0;
  let protoCount = 0;
  let prodCount = 0;

  for (let i = 0; i < LEXUS_MODELS.length; i++) {
    const m = LEXUS_MODELS[i];
    console.log(`[${i + 1}/${LEXUS_MODELS.length}] Procesando ${m.label}...`);

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
        commonsCategory: `Lexus ${m.series}`,
        commonsCandidates: [`Lexus ${m.series}`, `Lexus ${m.label}`],
        commonsManual: false,
        variants: [m.label],
        packages: m.packages,
        frontImage: img
      }],
      frontImage: img,
      engines: m.engines
    };

    generations.push(genObj);
    await new Promise(r => setTimeout(r, 150));
  }

  const catalog = {
    brand: 'Lexus',
    wikidata: 'Q35919',
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

  // Crear directorio si no existe
  fs.mkdirSync('data/lexus', { recursive: true });
  fs.mkdirSync('public/api/v1', { recursive: true });

  fs.writeFileSync('data/lexus/catalog-clean-front.json', JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync('public/api/v1/lexus.json', JSON.stringify(catalog, null, 2), 'utf8');

  console.log(`\n🎉 Catálogo de Lexus generado con éxito:`);
  console.log(`   Modelos: ${generations.length}`);
  console.log(`   Imágenes frontales verificadas: ${catalog.stats.withExactFront}/${generations.length} (${catalog.stats.verifiedFrontRate})`);
  console.log(`   Guardado en data/lexus/catalog-clean-front.json y public/api/v1/lexus.json`);
}

main();
