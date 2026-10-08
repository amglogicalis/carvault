const fs = require('fs');
const path = require('path');

// Mapeo detallado de motores mecánicos por modelo / chasis de BMW
const ENGINES_DATABASE = {
  'E92': [
    {
      modelBadge: '320i',
      engineCode: 'N43B20',
      architecture: '4 en línea (L4 atmosférico)',
      cylinders: 4,
      displacementCc: 1995,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 170,
      torqueNm: 210,
      topSpeedKmh: 230,
      accel0to100: 8.1,
      phase: 'Ambas fases',
      yearsActive: '2007 – 2013',
      feedSystem: 'Inyección directa piezoeléctrica con combustión pobre',
      notes: 'Motor multiválvula de alta compresión y consumo reducido.'
    },
    {
      modelBadge: '325i',
      engineCode: 'N52B25',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2497,
      displacementL: 2.5,
      fuel: 'Gasolina',
      powerHp: 218,
      torqueNm: 250,
      topSpeedKmh: 247,
      accel0to100: 6.9,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2006 – 2007',
      feedSystem: 'Inyección indirecta multipunto Valvetronic y doble VANOS',
      notes: 'Bloque de aleación ultraligera magnesio-aluminio. Respuesta elástica y suave sin inyección directa.'
    },
    {
      modelBadge: '325i',
      engineCode: 'N53B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 218,
      torqueNm: 270,
      topSpeedKmh: 250,
      accel0to100: 6.7,
      phase: 'Facelift (LCI)',
      yearsActive: '2007 – 2013',
      feedSystem: 'Inyección directa High Precision Injection (HPI) con mezcla pobre',
      notes: 'Cilindrada aumentada a 3.0 litros, entregando 20 Nm más de par motor y aceleración 0.2s más rápida.'
    },
    {
      modelBadge: '330i',
      engineCode: 'N52B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 272,
      torqueNm: 315,
      topSpeedKmh: 250,
      accel0to100: 6.1,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2006 – 2007',
      feedSystem: 'Inyección indirecta multipunto Valvetronic',
      notes: 'Admisión resonante de tres etapas.'
    },
    {
      modelBadge: '330i',
      engineCode: 'N53B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 272,
      torqueNm: 320,
      topSpeedKmh: 250,
      accel0to100: 6.0,
      phase: 'Facelift (LCI)',
      yearsActive: '2007 – 2013',
      feedSystem: 'Inyección directa HPI piezoeléctrica',
      notes: '320 Nm a 2.750 rpm con consumos homologados inferiores a 7.2 l/100 km.'
    },
    {
      modelBadge: '335i',
      engineCode: 'N54B30',
      architecture: '6 en línea Biturbo (Twin Turbo)',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 306,
      torqueNm: 400,
      topSpeedKmh: 250,
      accel0to100: 5.5,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2006 – 2010',
      feedSystem: 'Inyección directa y dos turbocompresores paralelos Mitsubishi TD03',
      notes: 'Cárter de aluminio con camisas de fundición. Célebre por su inmenso potencial de potenciación.'
    },
    {
      modelBadge: '335i',
      engineCode: 'N55B30',
      architecture: '6 en línea TwinPower Turbo (Mono-turbo Twin-Scroll)',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 306,
      torqueNm: 400,
      topSpeedKmh: 250,
      accel0to100: 5.3,
      phase: 'Facelift (LCI)',
      yearsActive: '2010 – 2013',
      feedSystem: 'Turbocompresor Twin-Scroll único con sistema Valvetronic III e inyección directa',
      notes: 'Respuesta inmediata a bajo régimen y menor retardo de sobrealimentación (turbo lag).'
    },
    {
      modelBadge: '335is',
      engineCode: 'N54B30',
      architecture: '6 en línea Biturbo High Output',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 326,
      torqueNm: 450,
      topSpeedKmh: 250,
      accel0to100: 5.1,
      phase: 'Facelift (LCI)',
      yearsActive: '2011 – 2013',
      feedSystem: 'Twin-Turbo con radiador auxiliar adicional y función overboost temporal a 500 Nm',
      notes: 'Disponible con cambio de doble embrague DKG de 7 velocidades.'
    },
    {
      modelBadge: '320d',
      engineCode: 'N47D20',
      architecture: '4 en línea Turbodiésel',
      cylinders: 4,
      displacementCc: 1995,
      displacementL: 2.0,
      fuel: 'Diésel',
      powerHp: 177,
      torqueNm: 350,
      topSpeedKmh: 237,
      accel0to100: 7.9,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2007 – 2010',
      feedSystem: 'Common-rail 1800 bar con turbo de geometría variable',
      notes: 'Actualizado a 184 CV y 380 Nm en el facelift LCI.'
    },
    {
      modelBadge: '330d',
      engineCode: 'N57D30',
      architecture: '6 en línea Turbodiésel',
      cylinders: 6,
      displacementCc: 2993,
      displacementL: 3.0,
      fuel: 'Diésel',
      powerHp: 245,
      torqueNm: 520,
      topSpeedKmh: 250,
      accel0to100: 6.0,
      phase: 'Facelift (LCI)',
      yearsActive: '2008 – 2013',
      feedSystem: 'Common-rail piezoeléctrico de 1800 bar y turbo VGT',
      notes: 'Bloque completo de aluminio con 520 Nm de par motor.'
    },
    {
      modelBadge: '335d',
      engineCode: 'M57D30TU2',
      architecture: '6 en línea Biturbodiésel Secuencial',
      cylinders: 6,
      displacementCc: 2993,
      displacementL: 3.0,
      fuel: 'Diésel',
      powerHp: 286,
      torqueNm: 580,
      topSpeedKmh: 250,
      accel0to100: 5.9,
      phase: 'Ambas fases',
      yearsActive: '2006 – 2013',
      feedSystem: 'Biturbo secuencial de dos etapas (pequeño y grande)',
      notes: '580 Nm disponibles desde 1.750 rpm con una elasticidad formidable.'
    },
    {
      modelBadge: 'M3 Coupé',
      engineCode: 'S65B40',
      architecture: 'V8 atmosférico a 90° (Giro a 8.400 rpm)',
      cylinders: 8,
      displacementCc: 3999,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 420,
      torqueNm: 400,
      topSpeedKmh: 250,
      accel0to100: 4.6,
      phase: 'Ambas fases',
      yearsActive: '2007 – 2013',
      feedSystem: '8 mariposas de admisión individuales MSS60',
      notes: 'Derivado del bloque S85 V10 de F1. Con cambio DKG hace 0-100 en 4.4s.'
    }
  ],
  'E90': [
    {
      modelBadge: '320si',
      engineCode: 'N45B20S',
      architecture: '4 en línea atmosférico especial WTCC',
      cylinders: 4,
      displacementCc: 1997,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 173,
      torqueNm: 200,
      topSpeedKmh: 225,
      accel0to100: 8.1,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2006 (Serie limitada 2.600 uds.)',
      feedSystem: 'Inyección multipunto tradicional sin Valvetronic fabricado a mano en Landshut',
      notes: 'Modelo de homologación FIA para el Mundial de Turismos WTCC con culata de carbono.'
    },
    {
      modelBadge: '325i',
      engineCode: 'N52B25',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2497,
      displacementL: 2.5,
      fuel: 'Gasolina',
      powerHp: 218,
      torqueNm: 250,
      topSpeedKmh: 245,
      accel0to100: 7.0,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2005 – 2007',
      feedSystem: 'Valvetronic con doble VANOS y bloque de magnesio',
      notes: 'Primer motor con bloque compuesto magnesio-aluminio de la industria.'
    },
    {
      modelBadge: '325i',
      engineCode: 'N53B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 218,
      torqueNm: 270,
      topSpeedKmh: 250,
      accel0to100: 6.7,
      phase: 'Facelift (LCI)',
      yearsActive: '2007 – 2011',
      feedSystem: 'Inyección directa High Precision Injection (HPI)',
      notes: 'Motor 3 litros con 270 Nm de par motor.'
    },
    {
      modelBadge: '330i',
      engineCode: 'N52B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 258,
      torqueNm: 300,
      topSpeedKmh: 250,
      accel0to100: 6.3,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2005 – 2007',
      feedSystem: 'Valvetronic magnesio-aluminio',
      notes: '258 CV y respuesta lineal.'
    },
    {
      modelBadge: '330i',
      engineCode: 'N53B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 272,
      torqueNm: 320,
      topSpeedKmh: 250,
      accel0to100: 6.1,
      phase: 'Facelift (LCI)',
      yearsActive: '2007 – 2011',
      feedSystem: 'Inyección directa HPI piezoeléctrica',
      notes: 'Potencia cumbre para el 6 en línea atmosférico de 3 litros no-M.'
    },
    {
      modelBadge: '335i',
      engineCode: 'N54B30',
      architecture: '6 en línea Biturbo',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 306,
      torqueNm: 400,
      topSpeedKmh: 250,
      accel0to100: 5.6,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2006 – 2008',
      feedSystem: 'Inyección directa y doble turbocompresor paralelo',
      notes: '0 a 100 km/h en 5.6s.'
    },
    {
      modelBadge: '335i',
      engineCode: 'N55B30',
      architecture: '6 en línea TwinPower Turbo',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 306,
      torqueNm: 400,
      topSpeedKmh: 250,
      accel0to100: 5.4,
      phase: 'Facelift (LCI)',
      yearsActive: '2008 – 2011',
      feedSystem: 'Mono-turbo Twin-Scroll con Valvetronic',
      notes: 'Curva de par plana desde 1.200 rpm.'
    },
    {
      modelBadge: '320d',
      engineCode: 'M47TU2',
      architecture: '4 en línea Turbodiésel',
      cylinders: 4,
      displacementCc: 1995,
      displacementL: 2.0,
      fuel: 'Diésel',
      powerHp: 163,
      torqueNm: 340,
      topSpeedKmh: 225,
      accel0to100: 8.3,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2005 – 2007',
      feedSystem: 'Common Rail 1600 bar con turbo Garrett',
      notes: 'Conocido por su gran durabilidad y fiabilidad mecánica.'
    },
    {
      modelBadge: '320d',
      engineCode: 'N47D20',
      architecture: '4 en línea Turbodiésel',
      cylinders: 4,
      displacementCc: 1995,
      displacementL: 2.0,
      fuel: 'Diésel',
      powerHp: 177,
      torqueNm: 350,
      topSpeedKmh: 230,
      accel0to100: 7.9,
      phase: 'Facelift (LCI)',
      yearsActive: '2007 – 2011',
      feedSystem: 'Common Rail 1800 bar con turbo VGT',
      notes: 'Consumo homologado de 4.8 l/100 km combinado.'
    },
    {
      modelBadge: 'M3 Berlina',
      engineCode: 'S65B40',
      architecture: 'V8 atmosférico a 90°',
      cylinders: 8,
      displacementCc: 3999,
      displacementL: 4.0,
      fuel: 'Gasolina',
      powerHp: 420,
      torqueNm: 400,
      topSpeedKmh: 250,
      accel0to100: 4.7,
      phase: 'Ambas fases',
      yearsActive: '2007 – 2011',
      feedSystem: '8 mariposas independientes a 8.400 rpm',
      notes: 'Carrocería 4 puertas con el frontal y faros tomados del Coupé E92.'
    }
  ],
  'E46': [
    {
      modelBadge: '320i',
      engineCode: 'M54B22',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2171,
      displacementL: 2.2,
      fuel: 'Gasolina',
      powerHp: 170,
      torqueNm: 210,
      topSpeedKmh: 226,
      accel0to100: 8.2,
      phase: 'Ambas fases',
      yearsActive: '2000 – 2006',
      feedSystem: 'Siemens MS43 con Doble-VANOS continuo',
      notes: 'Clásico sonido sedoso del 6L de 24 válvulas.'
    },
    {
      modelBadge: '325i',
      engineCode: 'M54B25',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2494,
      displacementL: 2.5,
      fuel: 'Gasolina',
      powerHp: 192,
      torqueNm: 245,
      topSpeedKmh: 240,
      accel0to100: 7.2,
      phase: 'Ambas fases',
      yearsActive: '2000 – 2006',
      feedSystem: 'Doble VANOS y colector de admisión de 2 etapas',
      notes: 'Uno de los motores atmosféricos más robustos de BMW.'
    },
    {
      modelBadge: '328i',
      engineCode: 'M52TUB28',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2793,
      displacementL: 2.8,
      fuel: 'Gasolina',
      powerHp: 193,
      torqueNm: 280,
      topSpeedKmh: 242,
      accel0to100: 7.0,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '1998 – 2000',
      feedSystem: 'Doble VANOS con bloque de aluminio y camisas de fundición',
      notes: '280 Nm a solo 3.500 rpm con gran empuje en medios.'
    },
    {
      modelBadge: '330i',
      engineCode: 'M54B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 231,
      torqueNm: 300,
      topSpeedKmh: 250,
      accel0to100: 6.5,
      phase: 'Ambas fases',
      yearsActive: '2000 – 2006',
      feedSystem: 'Doble VANOS continuo y válvula DISA',
      notes: 'El motor no-M de referencia en el E46. 250 km/h y 6.5s.'
    },
    {
      modelBadge: '320d',
      engineCode: 'M47D20',
      architecture: '4 en línea Turbodiésel',
      cylinders: 4,
      displacementCc: 1951,
      displacementL: 2.0,
      fuel: 'Diésel',
      powerHp: 136,
      torqueNm: 280,
      topSpeedKmh: 207,
      accel0to100: 9.9,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '1998 – 2001',
      feedSystem: 'Bomba inyectora rotativa Bosch VP44 y turbo Garrett',
      notes: 'Pionero en la masificación diésel deportiva en la Serie 3.'
    },
    {
      modelBadge: '320d',
      engineCode: 'M47TUD20',
      architecture: '4 en línea Turbodiésel Common Rail',
      cylinders: 4,
      displacementCc: 1995,
      displacementL: 2.0,
      fuel: 'Diésel',
      powerHp: 150,
      torqueNm: 330,
      topSpeedKmh: 216,
      accel0to100: 8.8,
      phase: 'Facelift (LCI)',
      yearsActive: '2001 – 2005',
      feedSystem: 'Common-Rail 1600 bar con turbo de geometría variable',
      notes: 'Caja manual de 6 velocidades desde 2003.'
    },
    {
      modelBadge: '330d',
      engineCode: 'M57D30TU',
      architecture: '6 en línea Turbodiésel',
      cylinders: 6,
      displacementCc: 2993,
      displacementL: 3.0,
      fuel: 'Diésel',
      powerHp: 204,
      torqueNm: 410,
      topSpeedKmh: 242,
      accel0to100: 7.2,
      phase: 'Facelift (LCI)',
      yearsActive: '2003 – 2006',
      feedSystem: 'Common-Rail 1600 bar y turbo Garrett GT2260V',
      notes: '410 Nm y 0-100 en 7.2s.'
    },
    {
      modelBadge: 'M3 Coupé',
      engineCode: 'S54B32',
      architecture: '6 en línea atmosférico (Giro a 7.900 rpm)',
      cylinders: 6,
      displacementCc: 3246,
      displacementL: 3.2,
      fuel: 'Gasolina',
      powerHp: 343,
      torqueNm: 365,
      topSpeedKmh: 250,
      accel0to100: 5.2,
      phase: 'Ambas fases',
      yearsActive: '2000 – 2006',
      feedSystem: '6 mariposas individuales con gestión electrónica MSS54',
      notes: '105.7 CV/litro atmosférico. Obra maestra mecánica de BMW M.'
    },
    {
      modelBadge: 'M3 CSL',
      engineCode: 'S54B32HP',
      architecture: '6 en línea atmosférico aligerado con admisión en carbono',
      cylinders: 6,
      displacementCc: 3246,
      displacementL: 3.2,
      fuel: 'Gasolina',
      powerHp: 360,
      torqueNm: 370,
      topSpeedKmh: 250,
      accel0to100: 4.9,
      phase: 'Facelift (LCI)',
      yearsActive: '2003 – 2004 (1.383 uds.)',
      feedSystem: 'Admisión dinámica de carbono sin caudalímetro por sensor MAP',
      notes: '1.385 kg de peso. Vuelta en Nürburgring en 7:50 min.'
    }
  ],
  'F30': [
    {
      modelBadge: '320i',
      engineCode: 'B48B20',
      architecture: '4 en línea TwinPower Turbo Modular',
      cylinders: 4,
      displacementCc: 1998,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 184,
      torqueNm: 290,
      topSpeedKmh: 235,
      accel0to100: 7.2,
      phase: 'Facelift (LCI)',
      yearsActive: '2015 – 2019',
      feedSystem: 'Turbo Twin-Scroll con inyección directa de alta presión',
      notes: 'Familia modular B-series con mayor resistencia térmica que el N20.'
    },
    {
      modelBadge: '328i',
      engineCode: 'N20B20',
      architecture: '4 en línea TwinPower Turbo',
      cylinders: 4,
      displacementCc: 1997,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 245,
      torqueNm: 350,
      topSpeedKmh: 250,
      accel0to100: 5.9,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2012 – 2015',
      feedSystem: 'Twin-Scroll turbo, inyección directa HPI y Valvetronic',
      notes: '350 Nm desde 1.250 rpm.'
    },
    {
      modelBadge: '330i',
      engineCode: 'B48B20',
      architecture: '4 en línea TwinPower Turbo Modular',
      cylinders: 4,
      displacementCc: 1998,
      displacementL: 2.0,
      fuel: 'Gasolina',
      powerHp: 252,
      torqueNm: 350,
      topSpeedKmh: 250,
      accel0to100: 5.8,
      phase: 'Facelift (LCI)',
      yearsActive: '2015 – 2019',
      feedSystem: 'Twin-Scroll turbo con cambio Steptronic 8v',
      notes: '0-100 en 5.8s.'
    },
    {
      modelBadge: '335i',
      engineCode: 'N55B30',
      architecture: '6 en línea TwinPower Turbo',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 306,
      torqueNm: 400,
      topSpeedKmh: 250,
      accel0to100: 5.1,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2012 – 2015',
      feedSystem: 'Turbo Twin-Scroll con Valvetronic e inyección directa',
      notes: 'Doble escape trasero y sonido clásico L6.'
    },
    {
      modelBadge: '340i',
      engineCode: 'B58B30M0',
      architecture: '6 en línea TwinPower Turbo Bloque Closed-Deck',
      cylinders: 6,
      displacementCc: 2998,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 326,
      torqueNm: 450,
      topSpeedKmh: 250,
      accel0to100: 4.8,
      phase: 'Facelift (LCI)',
      yearsActive: '2015 – 2019',
      feedSystem: 'Turbo Twin-Scroll e intercooler agua-aire integrado',
      notes: 'Legendario bloque B58 compartido con el Toyota Supra.'
    },
    {
      modelBadge: '320d',
      engineCode: 'B47D20',
      architecture: '4 en línea Turbodiésel Modular',
      cylinders: 4,
      displacementCc: 1995,
      displacementL: 2.0,
      fuel: 'Diésel',
      powerHp: 190,
      torqueNm: 400,
      topSpeedKmh: 235,
      accel0to100: 7.2,
      phase: 'Facelift (LCI)',
      yearsActive: '2015 – 2019',
      feedSystem: 'Common-Rail 2000 bar y turbo VGT',
      notes: 'Sustituyó al N47 solventando el desgaste de cadena de distribución.'
    },
    {
      modelBadge: '335d xDrive',
      engineCode: 'N57D30T1',
      architecture: '6 en línea Biturbodiésel xDrive',
      cylinders: 6,
      displacementCc: 2993,
      displacementL: 3.0,
      fuel: 'Diésel',
      powerHp: 313,
      torqueNm: 630,
      topSpeedKmh: 250,
      accel0to100: 4.8,
      phase: 'Ambas fases',
      yearsActive: '2013 – 2019',
      feedSystem: 'Biturbo secuencial con Common Rail a 2000 bar',
      notes: '630 Nm de par motor con tracción a las 4 ruedas.'
    },
    {
      modelBadge: 'M3 (F80)',
      engineCode: 'S55B30',
      architecture: '6 en línea Biturbo M de bloque Closed-Deck',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 431,
      torqueNm: 550,
      topSpeedKmh: 250,
      accel0to100: 4.1,
      phase: 'Ambas fases',
      yearsActive: '2014 – 2018',
      feedSystem: 'Biturbo paralelo con refrigerador de carga superior',
      notes: '4.1s con cambio DKG de 7 velocidades.'
    }
  ],
  'E60': [
    {
      modelBadge: '520i',
      engineCode: 'M54B22',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2171,
      displacementL: 2.2,
      fuel: 'Gasolina',
      powerHp: 170,
      torqueNm: 210,
      topSpeedKmh: 230,
      accel0to100: 9.0,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2003 – 2005',
      feedSystem: 'Doble VANOS continuo',
      notes: 'Versión de acceso al E60 con 6 cilindros en línea.'
    },
    {
      modelBadge: '530i',
      engineCode: 'N52B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 258,
      torqueNm: 300,
      topSpeedKmh: 250,
      accel0to100: 6.5,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2005 – 2007',
      feedSystem: 'Inyección indirecta con bloque magnesio-aluminio',
      notes: 'Bomba de agua eléctrica y doble VANOS continuo.'
    },
    {
      modelBadge: '530i',
      engineCode: 'N53B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2996,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 272,
      torqueNm: 320,
      topSpeedKmh: 250,
      accel0to100: 6.3,
      phase: 'Facelift (LCI)',
      yearsActive: '2007 – 2010',
      feedSystem: 'Inyección directa HPI piezoeléctrica',
      notes: '320 Nm a 2.750 rpm con consumos reducidos en ciclo LCI.'
    },
    {
      modelBadge: '550i',
      engineCode: 'N62B48',
      architecture: 'V8 atmosférico a 90° con Valvetronic',
      cylinders: 8,
      displacementCc: 4799,
      displacementL: 4.8,
      fuel: 'Gasolina',
      powerHp: 367,
      torqueNm: 490,
      topSpeedKmh: 250,
      accel0to100: 5.2,
      phase: 'Facelift (LCI)',
      yearsActive: '2005 – 2010',
      feedSystem: 'Inyección multipunto y colector de admisión de longitud variable continua',
      notes: '0 a 100 km/h en 5.2 segundos con sonido V8 puro.'
    },
    {
      modelBadge: '535d',
      engineCode: 'M57D30TOP',
      architecture: '6 en línea Biturbodiésel Secuencial',
      cylinders: 6,
      displacementCc: 2993,
      displacementL: 3.0,
      fuel: 'Diésel',
      powerHp: 286,
      torqueNm: 580,
      topSpeedKmh: 250,
      accel0to100: 6.4,
      phase: 'Facelift (LCI)',
      yearsActive: '2007 – 2010',
      feedSystem: 'Biturbo secuencial BorgWarner y Common Rail a 1600 bar',
      notes: 'El devorador de autopistas por excelencia con consumos bajo 7 l/100 km.'
    },
    {
      modelBadge: 'M5 (E60)',
      engineCode: 'S85B50',
      architecture: 'V10 atmosférico a 90° derivado de F1 (Williams-BMW)',
      cylinders: 10,
      displacementCc: 4999,
      displacementL: 5.0,
      fuel: 'Gasolina',
      powerHp: 507,
      torqueNm: 520,
      topSpeedKmh: 250,
      accel0to100: 4.7,
      phase: 'Ambas fases',
      yearsActive: '2005 – 2010',
      feedSystem: '10 mariposas individuales con control iónico de picado en bujías',
      notes: 'Gira hasta 8.250 rpm y alcanza 305 km/h con paquete M Driver.'
    }
  ],
  'E39': [
    {
      modelBadge: '528i',
      engineCode: 'M52B28',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2793,
      displacementL: 2.8,
      fuel: 'Gasolina',
      powerHp: 193,
      torqueNm: 280,
      topSpeedKmh: 236,
      accel0to100: 7.5,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '1995 – 2000',
      feedSystem: 'Inyección Siemens y distribución simple/doble VANOS',
      notes: 'Piedra angular del confort y respuesta dinámica en el lanzamiento del E39.'
    },
    {
      modelBadge: '530i',
      engineCode: 'M54B30',
      architecture: '6 en línea (L6 atmosférico)',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 231,
      torqueNm: 300,
      topSpeedKmh: 250,
      accel0to100: 7.1,
      phase: 'Facelift (LCI)',
      yearsActive: '2000 – 2003',
      feedSystem: 'Inyección multipunto y doble VANOS continuo con válvula DISA',
      notes: 'Considerada la mejor berlina ejecutiva de su época.'
    },
    {
      modelBadge: '540i',
      engineCode: 'M62B44',
      architecture: 'V8 atmosférico a 90°',
      cylinders: 8,
      displacementCc: 4398,
      displacementL: 4.4,
      fuel: 'Gasolina',
      powerHp: 286,
      torqueNm: 440,
      topSpeedKmh: 250,
      accel0to100: 6.2,
      phase: 'Ambas fases',
      yearsActive: '1996 – 2003',
      feedSystem: 'Bosch Motronic y VANOS simple en fase técnica TU',
      notes: '440 Nm de par motor con caja manual de 6 velocidades Getrag.'
    },
    {
      modelBadge: 'M5 (E39)',
      engineCode: 'S62B50',
      architecture: 'V8 atmosférico de altas prestaciones a 7.000 rpm',
      cylinders: 8,
      displacementCc: 4941,
      displacementL: 4.9,
      fuel: 'Gasolina',
      powerHp: 400,
      torqueNm: 500,
      topSpeedKmh: 250,
      accel0to100: 5.3,
      phase: 'Ambas fases',
      yearsActive: '1998 – 2003',
      feedSystem: '8 mariposas independientes gestionadas por servomotor con doble VANOS de alta presión',
      notes: 'La berlina deportiva definitiva. 400 CV atmosféricos gestionados exclusivamente con caja manual de 6 velocidades.'
    }
  ],
  'F20': [
    {
      modelBadge: '118i',
      engineCode: 'N13B16',
      architecture: '4 en línea TwinPower Turbo',
      cylinders: 4,
      displacementCc: 1598,
      displacementL: 1.6,
      fuel: 'Gasolina',
      powerHp: 170,
      torqueNm: 250,
      topSpeedKmh: 225,
      accel0to100: 7.4,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2011 – 2015',
      feedSystem: 'Twin-Scroll turbo desarrollado con PSA',
      notes: 'Gran empuje elástico en bajas vueltas.'
    },
    {
      modelBadge: '120d',
      engineCode: 'B47D20',
      architecture: '4 en línea Turbodiésel',
      cylinders: 4,
      displacementCc: 1995,
      displacementL: 2.0,
      fuel: 'Diésel',
      powerHp: 190,
      torqueNm: 400,
      topSpeedKmh: 228,
      accel0to100: 7.0,
      phase: 'Facelift (LCI)',
      yearsActive: '2015 – 2019',
      feedSystem: 'Common Rail 2000 bar y turbo VGT',
      notes: '400 Nm de par en chasis de propulsión trasera.'
    },
    {
      modelBadge: 'M135i',
      engineCode: 'N55B30',
      architecture: '6 en línea TwinPower Turbo',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 320,
      torqueNm: 450,
      topSpeedKmh: 250,
      accel0to100: 4.9,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2012 – 2015',
      feedSystem: 'Twin-Scroll con Valvetronic',
      notes: 'Único compacto del segmento C con propulsión trasera y motor 6 en línea longitudinal.'
    },
    {
      modelBadge: 'M140i',
      engineCode: 'B58B30M0',
      architecture: '6 en línea TwinPower Turbo Modular',
      cylinders: 6,
      displacementCc: 2998,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 340,
      torqueNm: 500,
      topSpeedKmh: 250,
      accel0to100: 4.6,
      phase: 'Facelift (LCI)',
      yearsActive: '2016 – 2019',
      feedSystem: 'Twin-Scroll turbo cerrado closed-deck e intercooler líquido',
      notes: '500 Nm y 0 a 100 en 4.6s (4.4s con tracción xDrive). El último Serie 1 de tracción trasera.'
    }
  ],
  'F87': [
    {
      modelBadge: 'M2',
      engineCode: 'N55B30T0',
      architecture: '6 en línea TwinPower Turbo M',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 370,
      torqueNm: 465,
      topSpeedKmh: 250,
      accel0to100: 4.3,
      phase: 'Pre-Facelift (Pre-LCI)',
      yearsActive: '2015 – 2018',
      feedSystem: 'Twin-Scroll turbo con función overboost a 500 Nm',
      notes: '4.3s con cambio DKG (4.5s manual).'
    },
    {
      modelBadge: 'M2 Competition',
      engineCode: 'S55B30',
      architecture: '6 en línea Biturbo M Motorsport',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 410,
      torqueNm: 550,
      topSpeedKmh: 280,
      accel0to100: 4.2,
      phase: 'Facelift (LCI)',
      yearsActive: '2018 – 2021',
      feedSystem: 'Biturbo real del M3/M4 con barra de torretas de carbono CFRP',
      notes: '550 Nm entre 2.350 y 5.200 rpm con refrigeración de circuito.'
    },
    {
      modelBadge: 'M2 CS',
      engineCode: 'S55B30',
      architecture: '6 en línea Biturbo Club Sport',
      cylinders: 6,
      displacementCc: 2979,
      displacementL: 3.0,
      fuel: 'Gasolina',
      powerHp: 450,
      torqueNm: 550,
      topSpeedKmh: 280,
      accel0to100: 4.0,
      phase: 'Facelift (LCI)',
      yearsActive: '2020 – 2021 (2.200 uds.)',
      feedSystem: 'S55 máxima potencia con techo y capó de carbono',
      notes: '0 a 100 en 4.0s.'
    }
  ]
};

// Cargar catálogo limpio
const catPath = path.join(__dirname, '../data/bmw/catalog-clean-front.json');
const cat = JSON.parse(fs.readFileSync(catPath, 'utf8'));

// Mapa de sustitución/desglose para generaciones que deben figurar con nombres explícitos de fase
const replacements = [];

for (const g of cat.generations) {
  // 1. Desglose E90 / E92
  if (g.id === 'bmw-3-series-e90-e91-e92-e93') {
    // A) BMW Serie 3 Berlina (E90) Pre-Facelift (2005–2008)
    replacements.push({
      id: 'bmw-3-series-e90-pre-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 Berlina (E90) Pre-Facelift (2005–2008)',
      section: 'production',
      status: 'production',
      years: { start: 2005, end: 2008, display: '2005 – 2008' },
      class: 'Berlina / Sedán • Pre-LCI con bigote cromado en capó',
      chassis: [{
        code: 'E90',
        lwb: false,
        parent: null,
        market: null,
        verified: true,
        frontImage: {
          file: 'File:2005-2008_BMW_320i_(E90)_sedan_(2011-07-17)_01.jpg',
          url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/2005-2008_BMW_320i_%28E90%29_sedan_%282011-07-17%29_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
          author: 'OSX',
          license: 'Public domain'
        }
      }],
      frontImage: {
        file: 'File:2005-2008_BMW_320i_(E90)_sedan_(2011-07-17)_01.jpg',
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/2005-2008_BMW_320i_%28E90%29_sedan_%282011-07-17%29_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
        author: 'OSX',
        license: 'Public domain'
      },
      phase: 'Pre-Facelift (Pre-LCI)',
      engines: ENGINES_DATABASE['E90'].filter(e => e.phase.includes('Pre') || e.phase.includes('Ambas'))
    });

    // B) BMW Serie 3 Berlina (E90) Facelift (2008–2011)
    replacements.push({
      id: 'bmw-3-series-e90-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 Berlina (E90) Facelift (2008–2011)',
      section: 'production',
      status: 'production',
      years: { start: 2008, end: 2011, display: '2008 – 2011' },
      class: 'Berlina / Sedán • Facelift LCI con nervios de capó en V e intermitentes LED',
      chassis: [{
        code: 'E90',
        lwb: false,
        parent: null,
        market: null,
        verified: true,
        frontImage: {
          file: 'File:BMW_E90_LCI_3_Series_Space_Grey_Metallic_(1).jpg',
          url: 'https://upload.wikimedia.org/wikipedia/commons/4/46/BMW_E90_LCI_3_Series_Space_Grey_Metallic_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
          author: 'Euro-spec',
          license: 'CC BY-SA 3.0'
        }
      }],
      frontImage: {
        file: 'File:BMW_E90_LCI_3_Series_Space_Grey_Metallic_(1).jpg',
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/46/BMW_E90_LCI_3_Series_Space_Grey_Metallic_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
        author: 'Euro-spec',
        license: 'CC BY-SA 3.0'
      },
      phase: 'Facelift (LCI)',
      engines: ENGINES_DATABASE['E90'].filter(e => e.phase.includes('Facelift') || e.phase.includes('Ambas'))
    });

    // C) BMW Serie 3 Coupé (E92) Pre-Facelift (2006–2010)
    replacements.push({
      id: 'bmw-3-series-e92-pre-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 Coupé (E92) Pre-Facelift (2006–2010)',
      section: 'production',
      status: 'production',
      years: { start: 2006, end: 2010, display: '2006 – 2010' },
      class: 'Coupé Deportivo • Pre-Facelift con Angel Eyes clásicos y calandra original',
      chassis: [{
        code: 'E92',
        lwb: false,
        parent: null,
        market: null,
        verified: true,
        frontImage: {
          file: 'File:BMW_E92_front_20080118.jpg',
          url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/BMW_E92_front_20080118.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
          author: 'Rudolf Stricker',
          license: 'CC BY-SA 3.0'
        }
      }],
      frontImage: {
        file: 'File:BMW_E92_front_20080118.jpg',
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/BMW_E92_front_20080118.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
        author: 'Rudolf Stricker',
        license: 'CC BY-SA 3.0'
      },
      phase: 'Pre-Facelift (Pre-LCI)',
      engines: ENGINES_DATABASE['E92'].filter(e => e.phase.includes('Pre') || e.phase.includes('Ambas'))
    });

    // D) BMW Serie 3 Coupé (E92) Facelift (2010–2013)
    replacements.push({
      id: 'bmw-3-series-e92-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 Coupé (E92) Facelift (2010–2013)',
      section: 'production',
      status: 'production',
      years: { start: 2010, end: 2013, display: '2010 – 2013' },
      class: 'Coupé Deportivo • Facelift LCI con ópticas LED onduladas y calandra ensanchada',
      chassis: [{
        code: 'E92',
        lwb: false,
        parent: null,
        market: null,
        verified: true,
        frontImage: {
          file: 'File:2011_BMW_328xi_Coupe_(E92)_Facelift.jpg',
          url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/2011_BMW_328xi_Coupe_%28E92%29_Facelift.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
          author: 'Bull-Doser',
          license: 'Public domain'
        }
      }],
      frontImage: {
        file: 'File:2011_BMW_328xi_Coupe_(E92)_Facelift.jpg',
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/2011_BMW_328xi_Coupe_%28E92%29_Facelift.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
        author: 'Bull-Doser',
        license: 'Public domain'
      },
      phase: 'Facelift (LCI)',
      engines: ENGINES_DATABASE['E92'].filter(e => e.phase.includes('Facelift') || e.phase.includes('Ambas'))
    });
    continue;
  }

  // 2. Desglose E46
  if (g.id === 'bmw-3-series-e46') {
    // Berlina Pre-Facelift
    replacements.push({
      id: 'bmw-3-series-e46-sedan-pre-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 Berlina (E46) Pre-Facelift (1998–2001)',
      section: 'production',
      status: 'production',
      years: { start: 1998, end: 2001, display: '1998 – 2001' },
      class: 'Berlina Clásica • Pre-Facelift con intermitentes curvados hacia abajo',
      chassis: [{ code: 'E46', frontImage: { file: 'File:BMW_E46_front_20080328.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/BMW_E46_front_20080328.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW_E46_front_20080328.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/BMW_E46_front_20080328.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      phase: 'Pre-Facelift (Pre-LCI)',
      engines: ENGINES_DATABASE['E46'].filter(e => e.phase.includes('Pre') || e.phase.includes('Ambas'))
    });
    // Berlina Facelift
    replacements.push({
      id: 'bmw-3-series-e46-sedan-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 Berlina (E46) Facelift (2001–2005)',
      section: 'production',
      status: 'production',
      years: { start: 2001, end: 2005, display: '2001 – 2005' },
      class: 'Berlina Clásica • Facelift con faros ascendentes y riñones envolventes',
      chassis: [{ code: 'E46', frontImage: { file: 'File:BMW_E46_front_20080822.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/BMW_E46_front_20080822.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW_E46_front_20080822.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/BMW_E46_front_20080822.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      phase: 'Facelift (LCI)',
      engines: ENGINES_DATABASE['E46'].filter(e => e.phase.includes('Facelift') || e.phase.includes('Ambas'))
    });
    // Coupé E46
    replacements.push({
      id: 'bmw-3-series-e46-coupe',
      series: '3 Series',
      label: 'BMW Serie 3 Coupé (E46) (1999–2006)',
      section: 'production',
      status: 'production',
      years: { start: 1999, end: 2006, display: '1999 – 2006' },
      class: 'Coupé Deportivo • Puertas sin marco y faldones deportivos',
      chassis: [{ code: 'E46', frontImage: { file: 'File:BMW_E46_Coupe_farngrün_front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/BMW_E46_Coupe_farngr%C3%BCn_front.jpg', author: 'Alexander-93', license: 'CC BY-SA 4.0' } }],
      frontImage: { file: 'File:BMW_E46_Coupe_farngrün_front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/BMW_E46_Coupe_farngr%C3%BCn_front.jpg', author: 'Alexander-93', license: 'CC BY-SA 4.0' },
      phase: 'Producción Serie',
      engines: ENGINES_DATABASE['E46'].filter(e => e.modelBadge.includes('i') || e.modelBadge.includes('ci'))
    });
    continue;
  }

  // 3. Desglose F30
  if (g.id === 'bmw-3-series-f30-f31-f34') {
    replacements.push({
      id: 'bmw-3-series-f30-pre-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 Berlina (F30) Pre-Facelift (2012–2015)',
      section: 'production',
      status: 'production',
      years: { start: 2012, end: 2015, display: '2012 – 2015' },
      class: 'Berlina Moderna • Faros unidos a calandra con xenón bixenón clásico',
      chassis: [{ code: 'F30', frontImage: { file: 'File:2012_BMW_318d_Sport_Automatic_2.0.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/2012_BMW_318d_Sport_Automatic_2.0.jpg', author: 'Vauxford', license: 'CC BY-SA 4.0' } }],
      frontImage: { file: 'File:2012_BMW_318d_Sport_Automatic_2.0.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/2012_BMW_318d_Sport_Automatic_2.0.jpg', author: 'Vauxford', license: 'CC BY-SA 4.0' },
      phase: 'Pre-Facelift (Pre-LCI)',
      engines: ENGINES_DATABASE['F30'].filter(e => e.phase.includes('Pre') || e.phase.includes('Ambas'))
    });
    replacements.push({
      id: 'bmw-3-series-f30-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 Berlina (F30) Facelift (2015–2019)',
      section: 'production',
      status: 'production',
      years: { start: 2015, end: 2019, display: '2015 – 2019' },
      class: 'Berlina Moderna • Facelift LCI con ópticas Full LED y nuevos motores modulares B-Series',
      chassis: [{ code: 'F30', frontImage: { file: 'File:2016_BMW_320i_(F30_LCI_Indonesia)_looking_from_front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2016_BMW_320i_%28F30_LCI_Indonesia%29_looking_from_front.jpg', author: 'Alexandre Prevot', license: 'CC BY-SA 2.0' } }],
      frontImage: { file: 'File:2016_BMW_320i_(F30_LCI_Indonesia)_looking_from_front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2016_BMW_320i_%28F30_LCI_Indonesia%29_looking_from_front.jpg', author: 'Alexandre Prevot', license: 'CC BY-SA 2.0' },
      phase: 'Facelift (LCI)',
      engines: ENGINES_DATABASE['F30'].filter(e => e.phase.includes('Facelift') || e.phase.includes('Ambas'))
    });
    continue;
  }

  // 4. Desglose E60
  if (g.id === 'bmw-5-series-e60-e61') {
    replacements.push({
      id: 'bmw-5-series-e60-pre-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (E60) Pre-Facelift (2003–2007)',
      section: 'production',
      status: 'production',
      years: { start: 2003, end: 2007, display: '2003 – 2007' },
      class: 'Berlina Ejecutiva • Diseño de Chris Bangle con frontal en aluminio',
      chassis: [{ code: 'E60', frontImage: { file: 'File:2003_BMW_520i_SE_2.2_Front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/BMW_E60_front_20071104.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:2003_BMW_520i_SE_2.2_Front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/BMW_E60_front_20071104.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      phase: 'Pre-Facelift (Pre-LCI)',
      engines: ENGINES_DATABASE['E60'].filter(e => e.phase.includes('Pre') || e.phase.includes('Ambas'))
    });
    replacements.push({
      id: 'bmw-5-series-e60-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (E60) Facelift (2007–2010)',
      section: 'production',
      status: 'production',
      years: { start: 2007, end: 2010, display: '2007 – 2010' },
      class: 'Berlina Ejecutiva • Facelift LCI con ópticas pulidas y motores de inyección directa',
      chassis: [{ code: 'E60', frontImage: { file: 'File:BMW_E60_front_20071104.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/BMW_E60_front_20071104.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW_E60_front_20071104.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/BMW_E60_front_20071104.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      phase: 'Facelift (LCI)',
      engines: ENGINES_DATABASE['E60'].filter(e => e.phase.includes('Facelift') || e.phase.includes('Ambas'))
    });
    continue;
  }

  // 5. Desglose E39
  if (g.id === 'bmw-5-series-e39') {
    replacements.push({
      id: 'bmw-5-series-e39-pre-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (E39) Pre-Facelift (1995–2000)',
      section: 'production',
      status: 'production',
      years: { start: 1995, end: 2000, display: '1995 – 2000' },
      class: 'Berlina Ejecutiva Clásica • Pre-Facelift con ópticas estándar',
      chassis: [{ code: 'E39', frontImage: { file: 'File:BMW_E39_front_20081125.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/BMW_E39_front_20081125.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW_E39_front_20081125.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/BMW_E39_front_20081125.jpg', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      phase: 'Pre-Facelift (Pre-LCI)',
      engines: ENGINES_DATABASE['E39'].filter(e => e.phase.includes('Pre') || e.phase.includes('Ambas'))
    });
    replacements.push({
      id: 'bmw-5-series-e39-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (E39) Facelift (2000–2003)',
      section: 'production',
      status: 'production',
      years: { start: 2000, end: 2003, display: '2000 – 2003' },
      class: 'Berlina Ejecutiva Clásica • Facelift que estrenó los legendarios Angel Eyes circulares',
      chassis: [{ code: 'E39', frontImage: { file: 'File:2000-2003_BMW_525i_(E39)_Executive_sedan_(2010-10-02)_01.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/BMW_E39_front_20081125.jpg', author: 'OSX', license: 'Public domain' } }],
      frontImage: { file: 'File:2000-2003_BMW_525i_(E39)_Executive_sedan_(2010-10-02)_01.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/BMW_E39_front_20081125.jpg', author: 'OSX', license: 'Public domain' },
      phase: 'Facelift (LCI)',
      engines: ENGINES_DATABASE['E39'].filter(e => e.phase.includes('Facelift') || e.phase.includes('Ambas'))
    });
    continue;
  }

  // 6. Si es un modelo normal, enriquecer con sus motores si los tiene mapeados
  const chassisCode = g.chassis?.[0]?.code || '';
  if (ENGINES_DATABASE[chassisCode]) {
    g.engines = ENGINES_DATABASE[chassisCode];
  } else {
    // Si no está en la base personalizada, generar lista base por defecto
    g.engines = [];
  }

  replacements.push(g);
}

// Actualizar catálogo
cat.generations = replacements;
cat.stats.generations = cat.generations.length;
cat.stats.production = cat.generations.filter(g => g.section === 'production').length;
cat.stats.mPerformance = cat.generations.filter(g => g.section === 'm-performance').length;
cat.stats.hasUnifiedEngines = true;

fs.writeFileSync(catPath, JSON.stringify(cat, null, 2));
fs.writeFileSync(path.join(__dirname, '../public/api/v1/bmw.json'), JSON.stringify(cat, null, 2));

// Actualizar carvault.json también
const carvaultPath = path.join(__dirname, '../public/api/v1/carvault.json');
const carvault = JSON.parse(fs.readFileSync(carvaultPath, 'utf8'));
const bmwB = carvault.brands.find(b => b.id === 'bmw');
if (bmwB) {
  bmwB.generations = cat.generations;
  bmwB.stats = cat.stats;
}
fs.writeFileSync(carvaultPath, JSON.stringify(carvault, null, 2));

console.log('UNIFICATION COMPLETE: Total generations in catalog now:', cat.generations.length);
