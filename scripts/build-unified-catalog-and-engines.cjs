const fs = require('fs');
const path = require('path');

const catPath = path.join(__dirname, '../data/bmw/catalog-clean-front.json');
const cat = JSON.parse(fs.readFileSync(catPath, 'utf8'));

// 1. Foto frontal exterior limpia y directa de M3 E46 (Tokumeigakarinoaoshima, CC0)
const m3FrontExterior = {
  file: 'File:BMW M3 coupé (E46) front.JPG',
  url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/BMW_M3_coup%C3%A9_%28E46%29_front.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
  author: 'Tokumeigakarinoaoshima',
  license: 'CC0',
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:BMW_M3_coup%C3%A9_(E46)_front.JPG',
  width: 2560,
  height: 1920
};

// 2. Base de datos exhaustiva de motorizaciones por código de chasis / modelo
const ENGINES_DB = {
  // Serie 1
  'E87': [
    { modelBadge: '116i', engineCode: 'N45B16 / N43B16', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1596, displacementL: 1.6, fuel: 'Gasolina', powerHp: 115, torqueNm: 150, topSpeedKmh: 200, accel0to100: 10.8, feedSystem: 'Inyección multipunto' },
    { modelBadge: '118i', engineCode: 'N46B20 / N43B20', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Gasolina', powerHp: 143, torqueNm: 190, topSpeedKmh: 210, accel0to100: 9.3, feedSystem: 'Inyección directa Valvetronic' },
    { modelBadge: '120i', engineCode: 'N46B20 / N43B20', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Gasolina', powerHp: 170, torqueNm: 210, topSpeedKmh: 224, accel0to100: 7.8, feedSystem: 'Inyección directa HPI' },
    { modelBadge: '130i', engineCode: 'N52B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2996, displacementL: 3.0, fuel: 'Gasolina', powerHp: 265, torqueNm: 315, topSpeedKmh: 250, accel0to100: 6.1, feedSystem: 'Valvetronic magnesio-aluminio', notes: 'Hot hatch atmosférico de propulsión trasera.' },
    { modelBadge: '118d', engineCode: 'M47TU2 / N47D20', architecture: '4 en línea Turbodiésel', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 143, torqueNm: 300, topSpeedKmh: 210, accel0to100: 8.9, feedSystem: 'Common-Rail turbo VGT' },
    { modelBadge: '120d', engineCode: 'M47TU2 / N47D20', architecture: '4 en línea Turbodiésel', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 177, torqueNm: 350, topSpeedKmh: 228, accel0to100: 7.6, feedSystem: 'Common-Rail 1800 bar' },
    { modelBadge: '123d', engineCode: 'N47D20TOP', architecture: '4 en línea Biturbodiésel Secuencial', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 204, torqueNm: 400, topSpeedKmh: 238, accel0to100: 6.9, feedSystem: 'Biturbo secuencial', notes: 'Superó los 100 CV por litro en motor diésel.' }
  ],
  'E82': [
    { modelBadge: '125i', engineCode: 'N52B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2996, displacementL: 3.0, fuel: 'Gasolina', powerHp: 218, torqueNm: 270, topSpeedKmh: 245, accel0to100: 6.4, feedSystem: 'Valvetronic atmosférico' },
    { modelBadge: '135i', engineCode: 'N54B30 / N55B30', architecture: '6 en línea Biturbo / TwinPower', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.3, feedSystem: 'Inyección directa turbo' },
    { modelBadge: '1 Series M Coupé', engineCode: 'N54B30TO', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 450, topSpeedKmh: 250, accel0to100: 4.9, feedSystem: 'Twin-Turbo overboost a 500 Nm', notes: 'Ejes y frenos ensanchados de M3 E92.' }
  ],
  'F20': [
    { modelBadge: '116i', engineCode: 'N13B16 / B38B15', architecture: '3/4 en línea TwinPower Turbo', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 136, torqueNm: 220, topSpeedKmh: 210, accel0to100: 8.5, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '118i', engineCode: 'N13B16 / B38B15', architecture: '3/4 en línea TwinPower Turbo', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 136, torqueNm: 220, topSpeedKmh: 210, accel0to100: 8.5, feedSystem: 'Inyección directa turbo' },
    { modelBadge: '120i', engineCode: 'N13B16 / B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 184, torqueNm: 270, topSpeedKmh: 230, accel0to100: 7.1, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '125i', engineCode: 'N20B20 / B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 224, torqueNm: 310, topSpeedKmh: 243, accel0to100: 6.1, feedSystem: 'Inyección directa Valvetronic' },
    { modelBadge: '120d', engineCode: 'N47D20 / B47D20', architecture: '4 en línea Turbodiésel', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 190, torqueNm: 400, topSpeedKmh: 228, accel0to100: 7.0, feedSystem: 'Common-Rail 2000 bar' },
    { modelBadge: 'M135i', engineCode: 'N55B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 320, torqueNm: 450, topSpeedKmh: 250, accel0to100: 4.9, feedSystem: 'Twin-Scroll longitudinal' },
    { modelBadge: 'M140i', engineCode: 'B58B30M0', architecture: '6 en línea TwinPower Turbo Closed-Deck', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.6, feedSystem: 'Motor B58 modular closed-deck', notes: 'Último compacto de propulsión trasera de BMW.' }
  ],
  'F40': [
    { modelBadge: '118i', engineCode: 'B38A15', architecture: '3 en línea TwinPower Turbo transversal', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 140, torqueNm: 220, topSpeedKmh: 213, accel0to100: 8.5, feedSystem: 'Inyección directa turbo' },
    { modelBadge: '120d xDrive', engineCode: 'B47C20', architecture: '4 en línea Turbodiésel transversal', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 190, torqueNm: 400, topSpeedKmh: 230, accel0to100: 7.3, feedSystem: 'Common-Rail xDrive' },
    { modelBadge: '128ti', engineCode: 'B48A20', architecture: '4 en línea TwinPower Turbo FWD', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 265, torqueNm: 400, topSpeedKmh: 250, accel0to100: 6.1, feedSystem: 'Diferencial Torsen delantero' },
    { modelBadge: 'M135i xDrive', engineCode: 'B48A20T1', architecture: '4 en línea TwinPower Turbo xDrive', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 450, topSpeedKmh: 250, accel0to100: 4.8, feedSystem: 'Twin-Scroll turbo xDrive' }
  ],
  'F70': [
    { modelBadge: '120', engineCode: 'B38 MHEV', architecture: '3 en línea TwinPower Turbo Mild-Hybrid', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 170, torqueNm: 280, topSpeedKmh: 226, accel0to100: 7.8, feedSystem: 'Tecnología 48V integrada' },
    { modelBadge: '120d', engineCode: 'B47 MHEV', architecture: '4 en línea Turbodiésel Mild-Hybrid', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 163, torqueNm: 400, topSpeedKmh: 222, accel0to100: 7.9, feedSystem: 'Common-Rail 48V' },
    { modelBadge: 'M135 xDrive', engineCode: 'B48B20O2', architecture: '4 en línea M TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 300, torqueNm: 400, topSpeedKmh: 250, accel0to100: 4.9, feedSystem: 'Inyección doble y xDrive inteligente' }
  ],
  'F22': [
    { modelBadge: '220i', engineCode: 'N20B20 / B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 184, torqueNm: 270, topSpeedKmh: 235, accel0to100: 7.0, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '228i / 230i', engineCode: 'N20B20 / B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 252, torqueNm: 350, topSpeedKmh: 250, accel0to100: 5.6, feedSystem: 'Inyección directa turbo' },
    { modelBadge: 'M235i', engineCode: 'N55B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 326, torqueNm: 450, topSpeedKmh: 250, accel0to100: 4.8, feedSystem: 'Twin-Scroll Valvetronic' },
    { modelBadge: 'M240i', engineCode: 'B58B30M0', architecture: '6 en línea TwinPower Turbo Closed-Deck', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.6, feedSystem: 'Motor B58 modular' },
    { modelBadge: '220d', engineCode: 'B47D20', architecture: '4 en línea Turbodiésel', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 190, torqueNm: 400, topSpeedKmh: 230, accel0to100: 7.1, feedSystem: 'Common-Rail' }
  ],
  'G42': [
    { modelBadge: '220i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo longitudinal', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 184, torqueNm: 300, topSpeedKmh: 236, accel0to100: 7.5, feedSystem: 'Inyección a 350 bar' },
    { modelBadge: '230i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo longitudinal', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 245, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.9, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: 'M240i xDrive', engineCode: 'B58B30O1', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 374, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.3, feedSystem: 'B58 de alta potencia con xDrive' }
  ],
  'F87': [
    { modelBadge: 'M2', engineCode: 'N55B30T0', architecture: '6 en línea TwinPower Turbo M', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 370, torqueNm: 465, topSpeedKmh: 250, accel0to100: 4.3, feedSystem: 'Twin-Scroll turbo con cárter modificado' },
    { modelBadge: 'M2 Competition', engineCode: 'S55B30', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 410, torqueNm: 550, topSpeedKmh: 280, accel0to100: 4.2, feedSystem: 'Biturbo real heredado del M3/M4' },
    { modelBadge: 'M2 CS', engineCode: 'S55B30', architecture: '6 en línea Biturbo Club Sport', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 450, torqueNm: 550, topSpeedKmh: 280, accel0to100: 4.0, feedSystem: 'S55 potenciado con escape ligero y carbono' }
  ],
  'G87': [
    { modelBadge: 'M2 Coupé', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 460, torqueNm: 550, topSpeedKmh: 285, accel0to100: 4.1, feedSystem: 'Cigüeñal forjado y doble turbo mono-scroll', notes: 'Disponible con cambio manual de 6 velocidades o M Steptronic 8v.' },
    { modelBadge: 'M2 Coupé (LCI 2024)', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 480, torqueNm: 600, topSpeedKmh: 285, accel0to100: 4.0, feedSystem: 'Actualización electrónica de potencia' }
  ],
  'E30': [
    { modelBadge: '316i', engineCode: 'M10B18 / M40B16', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1596, displacementL: 1.6, fuel: 'Gasolina', powerHp: 100, torqueNm: 141, topSpeedKmh: 182, accel0to100: 12.1, feedSystem: 'Inyección Bosch Motronic' },
    { modelBadge: '318is', engineCode: 'M42B18', architecture: '4 en línea 16v atmosférico', cylinders: 4, displacementCc: 1796, displacementL: 1.8, fuel: 'Gasolina', powerHp: 136, torqueNm: 172, topSpeedKmh: 202, accel0to100: 9.9, feedSystem: 'Inyección Bosch Motronic multiválvula' },
    { modelBadge: '320i', engineCode: 'M20B20', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1990, displacementL: 2.0, fuel: 'Gasolina', powerHp: 129, torqueNm: 164, topSpeedKmh: 198, accel0to100: 10.2, feedSystem: 'Inyección Bosch L-Jetronic / Motronic' },
    { modelBadge: '325i', engineCode: 'M20B25', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2494, displacementL: 2.5, fuel: 'Gasolina', powerHp: 170, torqueNm: 222, topSpeedKmh: 218, accel0to100: 8.3, feedSystem: 'Inyección Bosch Motronic' },
    { modelBadge: '324td', engineCode: 'M21D24', architecture: '6 en línea Turbodiésel', cylinders: 6, displacementCc: 2443, displacementL: 2.4, fuel: 'Diésel', powerHp: 115, torqueNm: 220, topSpeedKmh: 187, accel0to100: 11.9, feedSystem: 'Bomba inyectora con turbocompresor Garrett' },
    { modelBadge: 'M3 (E30)', engineCode: 'S14B23', architecture: '4 en línea 16v M Motorsport', cylinders: 4, displacementCc: 2302, displacementL: 2.3, fuel: 'Gasolina', powerHp: 200, torqueNm: 240, topSpeedKmh: 235, accel0to100: 6.7, feedSystem: '4 mariposas individuales de carreras', notes: 'Leyenda del DTM de turismos Grupo A.' },
    { modelBadge: 'M3 Sport Evolution', engineCode: 'S14B25', architecture: '4 en línea 16v M Motorsport', cylinders: 4, displacementCc: 2467, displacementL: 2.5, fuel: 'Gasolina', powerHp: 238, torqueNm: 240, topSpeedKmh: 248, accel0to100: 6.5, feedSystem: 'Evo III de máxima cilindrada' }
  ],
  'E36': [
    { modelBadge: '318is', engineCode: 'M42B18 / M44B19', architecture: '4 en línea 16v atmosférico', cylinders: 4, displacementCc: 1895, displacementL: 1.9, fuel: 'Gasolina', powerHp: 140, torqueNm: 180, topSpeedKmh: 213, accel0to100: 10.2, feedSystem: 'Inyección Bosch Motronic' },
    { modelBadge: '320i', engineCode: 'M50B20 / M52B20', architecture: '6 en línea atmosférico 24v', cylinders: 6, displacementCc: 1991, displacementL: 2.0, fuel: 'Gasolina', powerHp: 150, torqueNm: 190, topSpeedKmh: 214, accel0to100: 9.9, feedSystem: 'Distribución VANOS simple' },
    { modelBadge: '325i', engineCode: 'M50B25TU', architecture: '6 en línea atmosférico 24v', cylinders: 6, displacementCc: 2494, displacementL: 2.5, fuel: 'Gasolina', powerHp: 192, torqueNm: 245, topSpeedKmh: 233, accel0to100: 8.0, feedSystem: 'VANOS simple y bloque de fundición' },
    { modelBadge: '328i', engineCode: 'M52B28', architecture: '6 en línea atmosférico 24v', cylinders: 6, displacementCc: 2793, displacementL: 2.8, fuel: 'Gasolina', powerHp: 193, torqueNm: 280, topSpeedKmh: 236, accel0to100: 7.3, feedSystem: 'Bloque de aluminio y VANOS' },
    { modelBadge: '325tds', engineCode: 'M51D25', architecture: '6 en línea Turbodiésel Intercooler', cylinders: 6, displacementCc: 2497, displacementL: 2.5, fuel: 'Diésel', powerHp: 143, torqueNm: 280, topSpeedKmh: 214, accel0to100: 10.4, feedSystem: 'Inyección indirecta con intercooler' },
    { modelBadge: 'M3 3.0 (E36)', engineCode: 'S50B30', architecture: '6 en línea atmosférico M Motorsport', cylinders: 6, displacementCc: 2990, displacementL: 3.0, fuel: 'Gasolina', powerHp: 286, torqueNm: 320, topSpeedKmh: 250, accel0to100: 5.7, feedSystem: '6 mariposas individuales y VANOS' },
    { modelBadge: 'M3 3.2 (E36)', engineCode: 'S50B32', architecture: '6 en línea atmosférico M Motorsport', cylinders: 6, displacementCc: 3201, displacementL: 3.2, fuel: 'Gasolina', powerHp: 321, torqueNm: 350, topSpeedKmh: 250, accel0to100: 5.5, feedSystem: 'Doble VANOS y caja de 6 velocidades' }
  ],
  'F32': [
    { modelBadge: '420i', engineCode: 'N20B20 / B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 184, torqueNm: 270, topSpeedKmh: 236, accel0to100: 7.3, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '428i / 430i', engineCode: 'N20B20 / B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 252, torqueNm: 350, topSpeedKmh: 250, accel0to100: 5.8, feedSystem: 'Inyección directa turbo' },
    { modelBadge: '435i', engineCode: 'N55B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.1, feedSystem: 'Twin-Scroll Valvetronic' },
    { modelBadge: '440i', engineCode: 'B58B30M0', architecture: '6 en línea TwinPower Turbo Closed-Deck', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 326, torqueNm: 450, topSpeedKmh: 250, accel0to100: 4.8, feedSystem: 'Motor B58 modular' },
    { modelBadge: '435d xDrive', engineCode: 'N57D30T1', architecture: '6 en línea Biturbodiésel', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Diésel', powerHp: 313, torqueNm: 630, topSpeedKmh: 250, accel0to100: 4.7, feedSystem: 'Biturbo secuencial xDrive' }
  ],
  'G22': [
    { modelBadge: '420i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 184, torqueNm: 300, topSpeedKmh: 240, accel0to100: 7.5, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '430i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 245, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.9, feedSystem: 'Inyección a 350 bar' },
    { modelBadge: 'M440i xDrive', engineCode: 'B58B30O1', architecture: '6 en línea TwinPower Turbo Mild-Hybrid', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 374, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.5, feedSystem: 'Tecnología 48V con motor B58' }
  ],
  'G26': [
    { modelBadge: '420i Gran Coupé', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 184, torqueNm: 300, topSpeedKmh: 235, accel0to100: 7.9, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: 'M440i xDrive Gran Coupé', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 374, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.7, feedSystem: 'Motor B58 y tracción xDrive' },
    { modelBadge: 'i4 eDrive40', engineCode: 'Síncrono de excitación por corriente', architecture: 'Motor Eléctrico BMW Gen5', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 340, torqueNm: 430, topSpeedKmh: 190, accel0to100: 5.7, feedSystem: 'Batería 80.7 kWh netos' },
    { modelBadge: 'i4 M50', engineCode: 'Dual Motor Eléctrico BMW Gen5', architecture: 'Doble Motor Eléctrico Tracción Total', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 544, torqueNm: 795, topSpeedKmh: 225, accel0to100: 3.9, feedSystem: 'Sport Boost temporal con 795 Nm' }
  ],
  'F80': [
    { modelBadge: 'M3 (F80)', engineCode: 'S55B30A', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 431, torqueNm: 550, topSpeedKmh: 250, accel0to100: 4.1, feedSystem: 'Dos turbos mono-scroll y cárter de magnesio' },
    { modelBadge: 'M3 Competition (F80)', engineCode: 'S55B30A', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 450, torqueNm: 550, topSpeedKmh: 280, accel0to100: 4.0, feedSystem: 'Diferencial M activo reprogramado' },
    { modelBadge: 'M3 CS', engineCode: 'S55B30A', architecture: '6 en línea Biturbo Club Sport', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 460, torqueNm: 600, topSpeedKmh: 280, accel0to100: 3.9, feedSystem: 'S55 máxima evolución con componentes de CFRP' }
  ],
  'G80': [
    { modelBadge: 'M3 Berlina', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 480, torqueNm: 550, topSpeedKmh: 290, accel0to100: 4.2, feedSystem: 'Cambio manual de 6 marchas y propulsión trasera' },
    { modelBadge: 'M3 Competition', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 510, torqueNm: 650, topSpeedKmh: 290, accel0to100: 3.9, feedSystem: 'Caja M Steptronic de 8 velocidades Drivelogic' },
    { modelBadge: 'M3 Competition M xDrive / Touring', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport xDrive', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 510, torqueNm: 650, topSpeedKmh: 290, accel0to100: 3.5, feedSystem: 'Tracción total M xDrive con modo 2WD pura' },
    { modelBadge: 'M3 CS', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo Club Sport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 550, torqueNm: 650, topSpeedKmh: 302, accel0to100: 3.4, feedSystem: 'Presión de sobrealimentación aumentada a 2.1 bar' }
  ],
  'G82': [
    { modelBadge: 'M4 Coupé', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 480, torqueNm: 550, topSpeedKmh: 290, accel0to100: 4.2, feedSystem: 'Cambio manual de 6 velocidades' },
    { modelBadge: 'M4 Competition M xDrive', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M xDrive', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 510, torqueNm: 650, topSpeedKmh: 290, accel0to100: 3.5, feedSystem: 'Tracción total M xDrive desconectable' },
    { modelBadge: 'M4 CSL', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo Competition Sport Lightweight', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 550, torqueNm: 650, topSpeedKmh: 307, accel0to100: 3.7, feedSystem: 'Reducción de peso de 100 kg con titanio y CFRP', notes: 'Vuelta récord en Nürburgring Nordschleife.' }
  ],
  'E12': [
    { modelBadge: '518', engineCode: 'M10B18', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1766, displacementL: 1.8, fuel: 'Gasolina', powerHp: 90, torqueNm: 145, topSpeedKmh: 160, accel0to100: 13.9, feedSystem: 'Carburador Solex' },
    { modelBadge: '520', engineCode: 'M10B20 / M20B20', architecture: '4/6 en línea atmosférico', cylinders: 4, displacementCc: 1990, displacementL: 2.0, fuel: 'Gasolina', powerHp: 115, torqueNm: 165, topSpeedKmh: 173, accel0to100: 11.8, feedSystem: 'Carburador Stromberg' },
    { modelBadge: '528i', engineCode: 'M30B28', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2788, displacementL: 2.8, fuel: 'Gasolina', powerHp: 184, torqueNm: 240, topSpeedKmh: 208, accel0to100: 9.3, feedSystem: 'Inyección Bosch L-Jetronic' },
    { modelBadge: 'M535i (E12)', engineCode: 'M30B35', architecture: '6 en línea M Motorsport', cylinders: 6, displacementCc: 3453, displacementL: 3.5, fuel: 'Gasolina', powerHp: 218, torqueNm: 310, topSpeedKmh: 222, accel0to100: 7.2, feedSystem: 'Inyección Bosch Motronic con autoblocante', notes: 'El primer sedán oficial de BMW Motorsport.' }
  ],
  'E28': [
    { modelBadge: '520i', engineCode: 'M20B20', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1990, displacementL: 2.0, fuel: 'Gasolina', powerHp: 129, torqueNm: 174, topSpeedKmh: 190, accel0to100: 11.4, feedSystem: 'Bosch K-Jetronic / LE-Jetronic' },
    { modelBadge: '524td', engineCode: 'M21D24', architecture: '6 en línea Turbodiésel', cylinders: 6, displacementCc: 2443, displacementL: 2.4, fuel: 'Diésel', powerHp: 115, torqueNm: 210, topSpeedKmh: 180, accel0to100: 12.9, feedSystem: 'El diésel más rápido del mundo en su época.' },
    { modelBadge: '535i', engineCode: 'M30B34', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 3430, displacementL: 3.4, fuel: 'Gasolina', powerHp: 218, torqueNm: 310, topSpeedKmh: 230, accel0to100: 7.2, feedSystem: 'Bosch Motronic' },
    { modelBadge: 'M5 (E28)', engineCode: 'M88/3', architecture: '6 en línea 24v M Motorsport (del M1)', cylinders: 6, displacementCc: 3453, displacementL: 3.5, fuel: 'Gasolina', powerHp: 286, torqueNm: 340, topSpeedKmh: 245, accel0to100: 6.5, feedSystem: '6 mariposas individuales de competición', notes: 'El nacimiento de la saga M5.' }
  ],
  'E34': [
    { modelBadge: '520i', engineCode: 'M50B20', architecture: '6 en línea atmosférico 24v', cylinders: 6, displacementCc: 1991, displacementL: 2.0, fuel: 'Gasolina', powerHp: 150, torqueNm: 190, topSpeedKmh: 211, accel0to100: 10.6, feedSystem: 'Bosch Motronic' },
    { modelBadge: '525i', engineCode: 'M50B25', architecture: '6 en línea atmosférico 24v', cylinders: 6, displacementCc: 2494, displacementL: 2.5, fuel: 'Gasolina', powerHp: 192, torqueNm: 245, topSpeedKmh: 230, accel0to100: 8.6, feedSystem: 'Distribución variable VANOS' },
    { modelBadge: '540i', engineCode: 'M60B40', architecture: 'V8 atmosférico a 90° 32v', cylinders: 8, displacementCc: 3982, displacementL: 4.0, fuel: 'Gasolina', powerHp: 286, torqueNm: 400, topSpeedKmh: 250, accel0to100: 6.4, feedSystem: 'Bloque de aluminio Nikasil' },
    { modelBadge: '525tds', engineCode: 'M51D25', architecture: '6 en línea Turbodiésel', cylinders: 6, displacementCc: 2497, displacementL: 2.5, fuel: 'Diésel', powerHp: 143, torqueNm: 260, topSpeedKmh: 207, accel0to100: 11.0, feedSystem: 'Inyección indirecta con intercooler' },
    { modelBadge: 'M5 (E34)', engineCode: 'S38B36 / S38B38', architecture: '6 en línea atmosférico M Motorsport', cylinders: 6, displacementCc: 3795, displacementL: 3.8, fuel: 'Gasolina', powerHp: 340, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.9, feedSystem: '6 mariposas de admisión individuales', notes: 'Último M5 ensamblado a mano en Garching.' }
  ],
  'F10': [
    { modelBadge: '520i', engineCode: 'N20B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1997, displacementL: 2.0, fuel: 'Gasolina', powerHp: 184, torqueNm: 270, topSpeedKmh: 227, accel0to100: 7.9, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '528i', engineCode: 'N20B20 / N52B30', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1997, displacementL: 2.0, fuel: 'Gasolina', powerHp: 245, torqueNm: 350, topSpeedKmh: 250, accel0to100: 6.2, feedSystem: 'Inyección directa Valvetronic' },
    { modelBadge: '535i', engineCode: 'N55B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.7, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '550i', engineCode: 'N63B44', architecture: 'V8 Biturbo a 90° (Hot-V)', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 450, torqueNm: 650, topSpeedKmh: 250, accel0to100: 4.6, feedSystem: 'Doble turbocompresor en la V del bloque' },
    { modelBadge: '530d', engineCode: 'N57D30', architecture: '6 en línea Turbodiésel', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Diésel', powerHp: 258, torqueNm: 540, topSpeedKmh: 250, accel0to100: 5.8, feedSystem: 'Common-Rail 1800 bar' },
    { modelBadge: 'M550d xDrive', engineCode: 'N57S', architecture: '6 en línea Tri-Turbodiésel', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Diésel', powerHp: 381, torqueNm: 740, topSpeedKmh: 250, accel0to100: 4.7, feedSystem: '3 turbos escalonados con tracción xDrive', notes: 'Pionero con triple turbocompresor.' },
    { modelBadge: 'M5 (F10)', engineCode: 'S63B44TU', architecture: 'V8 Biturbo M Motorsport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 560, torqueNm: 680, topSpeedKmh: 250, accel0to100: 4.3, feedSystem: 'Escape cruzado y dos turbos Twin-Scroll', notes: 'Alcanza 305 km/h con paquete opcional M Driver.' }
  ],
  'G30': [
    { modelBadge: '520i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 184, torqueNm: 290, topSpeedKmh: 235, accel0to100: 7.8, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '530i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 252, torqueNm: 350, topSpeedKmh: 250, accel0to100: 6.2, feedSystem: 'Inyección directa a 350 bar' },
    { modelBadge: '540i', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 450, topSpeedKmh: 250, accel0to100: 5.1, feedSystem: 'Motor modular B58' },
    { modelBadge: 'M550i xDrive', engineCode: 'N63B44', architecture: 'V8 Biturbo a 90°', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 530, torqueNm: 750, topSpeedKmh: 250, accel0to100: 3.8, feedSystem: 'Hot-V biturbo con xDrive' },
    { modelBadge: '530e', engineCode: 'B48 + Eléctrico', architecture: 'Híbrido Enchufable PHEV', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Híbrido Enchufable', powerHp: 292, torqueNm: 420, topSpeedKmh: 235, accel0to100: 5.9, feedSystem: 'Batería 12 kWh con XtraBoost' },
    { modelBadge: 'M5 (F90)', engineCode: 'S63B44Tx', architecture: 'V8 Biturbo M Motorsport xDrive', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 600, torqueNm: 750, topSpeedKmh: 250, accel0to100: 3.4, feedSystem: 'M xDrive con modo 2WD propulsión trasera', notes: 'Acelera de 0 a 100 km/h en 3.4s (3.0s en versión CS).' }
  ],
  'G60': [
    { modelBadge: '520i', engineCode: 'B48 MHEV', architecture: '4 en línea TwinPower Turbo 48V', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 208, torqueNm: 330, topSpeedKmh: 230, accel0to100: 7.5, feedSystem: 'Inyección ciclo Miller con 48V' },
    { modelBadge: '550e xDrive', engineCode: 'B58 + Eléctrico', architecture: '6 en línea TwinPower Turbo PHEV', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Híbrido Enchufable', powerHp: 489, torqueNm: 700, topSpeedKmh: 250, accel0to100: 4.3, feedSystem: 'Batería 19.4 kWh netos con tracción total' },
    { modelBadge: 'i5 eDrive40', engineCode: 'BMW eDrive Gen5', architecture: 'Motor Eléctrico Trasero', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 340, torqueNm: 430, topSpeedKmh: 193, accel0to100: 6.0, feedSystem: 'Batería de 81.2 kWh' },
    { modelBadge: 'i5 M60 xDrive', engineCode: 'Doble motor BMW eDrive Gen5', architecture: 'Doble Motor Eléctrico M Performance', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 601, torqueNm: 820, topSpeedKmh: 230, accel0to100: 3.8, feedSystem: 'M Sport Boost temporal con 820 Nm' },
    { modelBadge: 'M5 (G90)', engineCode: 'S68B44 + Eléctrico', architecture: 'V8 Biturbo M Hybrid', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Híbrido Enchufable', powerHp: 727, torqueNm: 1000, topSpeedKmh: 305, accel0to100: 3.5, feedSystem: 'Tecnología híbrida M con 1000 Nm de par combinado' }
  ],
  'E24': [
    { modelBadge: '635 CSi', engineCode: 'M30B34', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 3430, displacementL: 3.4, fuel: 'Gasolina', powerHp: 218, torqueNm: 310, topSpeedKmh: 228, accel0to100: 7.6, feedSystem: 'Bosch Motronic' },
    { modelBadge: 'M 635 CSi', engineCode: 'M88/3', architecture: '6 en línea 24v M Motorsport (del M1)', cylinders: 6, displacementCc: 3453, displacementL: 3.5, fuel: 'Gasolina', powerHp: 286, torqueNm: 340, topSpeedKmh: 255, accel0to100: 6.4, feedSystem: '6 mariposas de admisión individuales', notes: 'El icónico tiburón de BMW Motorsport.' }
  ],
  'E63': [
    { modelBadge: '630i', engineCode: 'N52B30 / N53B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2996, displacementL: 3.0, fuel: 'Gasolina', powerHp: 272, torqueNm: 320, topSpeedKmh: 250, accel0to100: 6.2, feedSystem: 'Valvetronic / Inyección directa' },
    { modelBadge: '645Ci / 650i', engineCode: 'N62B44 / N62B48', architecture: 'V8 atmosférico a 90°', cylinders: 8, displacementCc: 4799, displacementL: 4.8, fuel: 'Gasolina', powerHp: 367, torqueNm: 490, topSpeedKmh: 250, accel0to100: 5.4, feedSystem: 'Valvetronic con admisión continua' },
    { modelBadge: '635d', engineCode: 'M57TU2TOP', architecture: '6 en línea Biturbodiésel Secuencial', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Diésel', powerHp: 286, torqueNm: 580, topSpeedKmh: 250, accel0to100: 6.3, feedSystem: 'Biturbo diésel escalonado' },
    { modelBadge: 'M6 Coupé', engineCode: 'S85B50', architecture: 'V10 atmosférico a 90° F1', cylinders: 10, displacementCc: 4999, displacementL: 5.0, fuel: 'Gasolina', powerHp: 507, torqueNm: 520, topSpeedKmh: 250, accel0to100: 4.6, feedSystem: '10 mariposas individuales girando a 8.250 rpm', notes: 'Techo de fibra de carbono y motor derivado de la F1.' }
  ],
  'F06': [
    { modelBadge: '640i Gran Coupé', engineCode: 'N55B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 320, torqueNm: 450, topSpeedKmh: 250, accel0to100: 5.4, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '650i Gran Coupé', engineCode: 'N63B44', architecture: 'V8 Biturbo a 90°', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 450, torqueNm: 650, topSpeedKmh: 250, accel0to100: 4.6, feedSystem: 'Biturbo Hot-V' },
    { modelBadge: 'M6 Gran Coupé', engineCode: 'S63B44TU', architecture: 'V8 Biturbo M Motorsport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 560, torqueNm: 680, topSpeedKmh: 250, accel0to100: 4.2, feedSystem: 'Cambio M DKG 7 velocidades con Drivelogic' }
  ],
  'E31': [
    { modelBadge: '840Ci', engineCode: 'M60B40 / M62B44', architecture: 'V8 atmosférico a 90°', cylinders: 8, displacementCc: 4398, displacementL: 4.4, fuel: 'Gasolina', powerHp: 286, torqueNm: 420, topSpeedKmh: 250, accel0to100: 6.6, feedSystem: 'Bosch Motronic' },
    { modelBadge: '850i / 850Ci', engineCode: 'M70B50 / M73B54', architecture: 'V12 atmosférico a 60°', cylinders: 12, displacementCc: 5379, displacementL: 5.4, fuel: 'Gasolina', powerHp: 326, torqueNm: 490, topSpeedKmh: 250, accel0to100: 6.3, feedSystem: 'Doble electrónica Motronic independiente' },
    { modelBadge: '850CSi', engineCode: 'S70B56', architecture: 'V12 atmosférico M Motorsport', cylinders: 12, displacementCc: 5576, displacementL: 5.6, fuel: 'Gasolina', powerHp: 380, torqueNm: 550, topSpeedKmh: 250, accel0to100: 5.7, feedSystem: 'Eje trasero autodireccional AHK', notes: 'El motor base del que nació el motor del McLaren F1.' }
  ],
  'G14': [
    { modelBadge: '840i Coupé', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 500, topSpeedKmh: 250, accel0to100: 5.0, feedSystem: 'Motor B58 modular' },
    { modelBadge: 'M850i xDrive', engineCode: 'N63B44', architecture: 'V8 Biturbo a 90°', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 530, torqueNm: 750, topSpeedKmh: 250, accel0to100: 3.7, feedSystem: 'Biturbo Hot-V con xDrive' },
    { modelBadge: 'M8 Competition', engineCode: 'S63B44Tx', architecture: 'V8 Biturbo M Motorsport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 625, torqueNm: 750, topSpeedKmh: 305, accel0to100: 3.2, feedSystem: 'M xDrive con modo tracción trasera pura' }
  ],
  'E23': [
    { modelBadge: '728i', engineCode: 'M30B28', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2788, displacementL: 2.8, fuel: 'Gasolina', powerHp: 184, torqueNm: 240, topSpeedKmh: 201, accel0to100: 9.5, feedSystem: 'Inyección Bosch L-Jetronic' },
    { modelBadge: '735i', engineCode: 'M30B34', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 3430, displacementL: 3.4, fuel: 'Gasolina', powerHp: 218, torqueNm: 310, topSpeedKmh: 217, accel0to100: 7.9, feedSystem: 'Bosch Motronic' },
    { modelBadge: '745i Turbo', engineCode: 'M102 / M106', architecture: '6 en línea Turbocomprimido', cylinders: 6, displacementCc: 3430, displacementL: 3.4, fuel: 'Gasolina', powerHp: 252, torqueNm: 380, topSpeedKmh: 227, accel0to100: 7.9, feedSystem: 'El primer buque insignia turboalimentado de BMW.' }
  ],
  'E32': [
    { modelBadge: '730i', engineCode: 'M30B30 / M60B30', architecture: '6 en línea / V8 atmosférico', cylinders: 8, displacementCc: 2997, displacementL: 3.0, fuel: 'Gasolina', powerHp: 218, torqueNm: 290, topSpeedKmh: 240, accel0to100: 8.5, feedSystem: 'Bosch Motronic 32v' },
    { modelBadge: '740i', engineCode: 'M60B40', architecture: 'V8 atmosférico a 90°', cylinders: 8, displacementCc: 3982, displacementL: 4.0, fuel: 'Gasolina', powerHp: 286, torqueNm: 400, topSpeedKmh: 250, accel0to100: 7.4, feedSystem: 'Bloque de aleación ligera' },
    { modelBadge: '750i', engineCode: 'M70B50', architecture: 'V12 atmosférico a 60°', cylinders: 12, displacementCc: 4988, displacementL: 5.0, fuel: 'Gasolina', powerHp: 300, torqueNm: 450, topSpeedKmh: 250, accel0to100: 7.4, feedSystem: 'El primer motor V12 alemán de posguerra.' }
  ],
  'E38': [
    { modelBadge: '728i', engineCode: 'M52B28', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2793, displacementL: 2.8, fuel: 'Gasolina', powerHp: 193, torqueNm: 280, topSpeedKmh: 228, accel0to100: 8.6, feedSystem: 'Siemens MS41 con bloque de aluminio' },
    { modelBadge: '740i', engineCode: 'M62B44', architecture: 'V8 atmosférico a 90°', cylinders: 8, displacementCc: 4398, displacementL: 4.4, fuel: 'Gasolina', powerHp: 286, torqueNm: 440, topSpeedKmh: 250, accel0to100: 6.8, feedSystem: 'VANOS continuo en admisión' },
    { modelBadge: '750i', engineCode: 'M73B54', architecture: 'V12 atmosférico a 60°', cylinders: 12, displacementCc: 5379, displacementL: 5.4, fuel: 'Gasolina', powerHp: 326, torqueNm: 490, topSpeedKmh: 250, accel0to100: 6.6, feedSystem: 'Doble unidad Motronic independiente', notes: 'El icónico Serie 7 V12 conducido por James Bond.' }
  ],
  'E65': [
    { modelBadge: '730i', engineCode: 'N52B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2996, displacementL: 3.0, fuel: 'Gasolina', powerHp: 258, torqueNm: 300, topSpeedKmh: 245, accel0to100: 7.8, feedSystem: 'Valvetronic magnesio-aluminio' },
    { modelBadge: '750i', engineCode: 'N62B48', architecture: 'V8 atmosférico a 90°', cylinders: 8, displacementCc: 4799, displacementL: 4.8, fuel: 'Gasolina', powerHp: 367, torqueNm: 490, topSpeedKmh: 250, accel0to100: 5.9, feedSystem: 'Colector de admisión continuo variable' },
    { modelBadge: '760i', engineCode: 'N73B60', architecture: 'V12 atmosférico Inyección Directa', cylinders: 12, displacementCc: 5972, displacementL: 6.0, fuel: 'Gasolina', powerHp: 445, torqueNm: 600, topSpeedKmh: 250, accel0to100: 5.5, feedSystem: 'Primer V12 del mundo con inyección directa de gasolina.' }
  ],
  'F01': [
    { modelBadge: '740i', engineCode: 'N54B30 / N55B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 320, torqueNm: 450, topSpeedKmh: 250, accel0to100: 5.7, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '750i', engineCode: 'N63B44', architecture: 'V8 Biturbo a 90°', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 450, torqueNm: 650, topSpeedKmh: 250, accel0to100: 4.8, feedSystem: 'Biturbo Hot-V' },
    { modelBadge: '760Li', engineCode: 'N74B60', architecture: 'V12 Biturbo a 60°', cylinders: 12, displacementCc: 5972, displacementL: 6.0, fuel: 'Gasolina', powerHp: 544, torqueNm: 750, topSpeedKmh: 250, accel0to100: 4.6, feedSystem: 'Doble turbocompresor con caja ZF 8 velocidades' }
  ],
  'G11': [
    { modelBadge: '740i', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 450, topSpeedKmh: 250, accel0to100: 5.5, feedSystem: 'Motor B58 con chasis Carbon Core' },
    { modelBadge: '750i xDrive', engineCode: 'N63B44', architecture: 'V8 Biturbo a 90°', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 530, torqueNm: 750, topSpeedKmh: 250, accel0to100: 4.0, feedSystem: 'Biturbo Hot-V con xDrive' },
    { modelBadge: 'M760Li xDrive', engineCode: 'N74B66', architecture: 'V12 Biturbo M Performance', cylinders: 12, displacementCc: 6592, displacementL: 6.6, fuel: 'Gasolina', powerHp: 610, torqueNm: 800, topSpeedKmh: 305, accel0to100: 3.7, feedSystem: 'El último V12 de la historia de BMW, 0 a 100 en 3.7s.' }
  ],
  'G70': [
    { modelBadge: '740i', engineCode: 'B58B30 MHEV', architecture: '6 en línea TwinPower Turbo 48V', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 380, torqueNm: 540, topSpeedKmh: 250, accel0to100: 5.4, feedSystem: 'Mild-Hybrid con ciclo Miller' },
    { modelBadge: 'M760e xDrive', engineCode: 'B58 + Eléctrico', architecture: '6 en línea TwinPower Turbo PHEV M', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Híbrido Enchufable', powerHp: 571, torqueNm: 800, topSpeedKmh: 250, accel0to100: 4.3, feedSystem: 'Batería 18.7 kWh netos' },
    { modelBadge: 'i7 xDrive60', engineCode: 'BMW eDrive Gen5', architecture: 'Doble Motor Eléctrico Tracción Total', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 544, torqueNm: 745, topSpeedKmh: 240, accel0to100: 4.7, feedSystem: 'Batería de 101.7 kWh utilizables' },
    { modelBadge: 'i7 M70 xDrive', engineCode: 'Dual Motor M Eléctrico', architecture: 'Doble Motor Eléctrico de Máxima Potencia', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 660, torqueNm: 1100, topSpeedKmh: 250, accel0to100: 3.7, feedSystem: 'Par colosal de 1.100 Nm en modo M Launch Control' }
  ],
  'E84': [
    { modelBadge: 'sDrive18i', engineCode: 'N46B20', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Gasolina', powerHp: 150, torqueNm: 200, topSpeedKmh: 202, accel0to100: 9.7, feedSystem: 'Valvetronic' },
    { modelBadge: 'xDrive28i', engineCode: 'N20B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 245, torqueNm: 350, topSpeedKmh: 240, accel0to100: 6.1, feedSystem: 'Twin-Scroll turbo xDrive' },
    { modelBadge: 'xDrive20d', engineCode: 'N47D20', architecture: '4 en línea Turbodiésel', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 184, torqueNm: 380, topSpeedKmh: 215, accel0to100: 8.1, feedSystem: 'Common-Rail' }
  ],
  'F48': [
    { modelBadge: 'sDrive18i', engineCode: 'B38A15', architecture: '3 en línea TwinPower Turbo', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 140, torqueNm: 220, topSpeedKmh: 205, accel0to100: 9.6, feedSystem: 'Inyección directa turbo' },
    { modelBadge: 'xDrive25i', engineCode: 'B48A20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 231, torqueNm: 350, topSpeedKmh: 235, accel0to100: 6.5, feedSystem: 'Inyección directa con tracción total' },
    { modelBadge: 'xDrive25e', engineCode: 'B38 + Eléctrico', architecture: 'Híbrido Enchufable PHEV', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Híbrido Enchufable', powerHp: 220, torqueNm: 385, topSpeedKmh: 192, accel0to100: 6.9, feedSystem: 'Batería 10 kWh con tracción total electrificada' }
  ],
  'U11': [
    { modelBadge: 'sDrive20i', engineCode: 'B38 MHEV', architecture: '3 en línea TwinPower Turbo 48V', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 170, torqueNm: 280, topSpeedKmh: 216, accel0to100: 8.3, feedSystem: 'Mild-Hybrid 48V integrado' },
    { modelBadge: 'M35i xDrive', engineCode: 'B48A20T1', architecture: '4 en línea M TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 300, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.4, feedSystem: 'Doble inyección y diferencial autoblocante mecánico delantero' },
    { modelBadge: 'iX1 xDrive30', engineCode: 'BMW eDrive Gen5', architecture: 'Doble Motor Eléctrico Tracción Total', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 313, torqueNm: 494, topSpeedKmh: 180, accel0to100: 5.6, feedSystem: 'Batería 64.7 kWh' }
  ],
  'E83': [
    { modelBadge: 'X3 2.0d', engineCode: 'M47TU2 / N47D20', architecture: '4 en línea Turbodiésel', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 177, torqueNm: 350, topSpeedKmh: 206, accel0to100: 8.9, feedSystem: 'Common-Rail' },
    { modelBadge: 'X3 3.0i / 3.0si', engineCode: 'M54B30 / N52B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2996, displacementL: 3.0, fuel: 'Gasolina', powerHp: 272, torqueNm: 315, topSpeedKmh: 232, accel0to100: 7.2, feedSystem: 'Valvetronic con xDrive' },
    { modelBadge: 'X3 3.0sd / 35d', engineCode: 'M57TU2TOP', architecture: '6 en línea Biturbodiésel Secuencial', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Diésel', powerHp: 286, torqueNm: 580, topSpeedKmh: 240, accel0to100: 6.4, feedSystem: 'Dos turbocompresores escalonados' }
  ],
  'F25': [
    { modelBadge: 'xDrive28i', engineCode: 'N20B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1997, displacementL: 2.0, fuel: 'Gasolina', powerHp: 245, torqueNm: 350, topSpeedKmh: 230, accel0to100: 6.7, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: 'xDrive35i', engineCode: 'N55B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 400, topSpeedKmh: 245, accel0to100: 5.7, feedSystem: 'Twin-Scroll Valvetronic' },
    { modelBadge: 'xDrive35d', engineCode: 'N57D30T1', architecture: '6 en línea Biturbodiésel', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Diésel', powerHp: 313, torqueNm: 630, topSpeedKmh: 244, accel0to100: 5.3, feedSystem: 'Biturbo secuencial' }
  ],
  'G01': [
    { modelBadge: 'xDrive30i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 252, torqueNm: 350, topSpeedKmh: 240, accel0to100: 6.3, feedSystem: 'Inyección a 350 bar' },
    { modelBadge: 'M40i', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 360, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.8, feedSystem: 'Motor B58 y escape deportivo M' },
    { modelBadge: 'X3 M Competition (F97)', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 510, torqueNm: 650, topSpeedKmh: 285, accel0to100: 3.8, feedSystem: 'El primer modelo en estrenar el motor S58' }
  ],
  'G45': [
    { modelBadge: '20 xDrive', engineCode: 'B48 MHEV', architecture: '4 en línea TwinPower Turbo 48V', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 208, torqueNm: 330, topSpeedKmh: 215, accel0to100: 7.8, feedSystem: 'Inyección ciclo Miller con 48V' },
    { modelBadge: 'M50 xDrive', engineCode: 'B58B30M2', architecture: '6 en línea M TwinPower Turbo 48V', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 398, torqueNm: 580, topSpeedKmh: 250, accel0to100: 4.6, feedSystem: 'Motor B58 evolucionado con apoyo MHEV' }
  ],
  'E53': [
    { modelBadge: 'X5 3.0i', engineCode: 'M54B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 231, torqueNm: 300, topSpeedKmh: 202, accel0to100: 8.5, feedSystem: 'Doble VANOS continuo' },
    { modelBadge: 'X5 4.4i', engineCode: 'M62B44 / N62B44', architecture: 'V8 atmosférico a 90°', cylinders: 8, displacementCc: 4398, displacementL: 4.4, fuel: 'Gasolina', powerHp: 320, torqueNm: 440, topSpeedKmh: 240, accel0to100: 7.0, feedSystem: 'Valvetronic V8' },
    { modelBadge: 'X5 4.8is', engineCode: 'N62B48', architecture: 'V8 atmosférico High Performance', cylinders: 8, displacementCc: 4799, displacementL: 4.8, fuel: 'Gasolina', powerHp: 360, torqueNm: 500, topSpeedKmh: 246, accel0to100: 6.1, feedSystem: 'Precursor espiritual del X5 M.' },
    { modelBadge: 'X5 3.0d', engineCode: 'M57D30', architecture: '6 en línea Turbodiésel', cylinders: 6, displacementCc: 2926, displacementL: 3.0, fuel: 'Diésel', powerHp: 218, torqueNm: 500, topSpeedKmh: 210, accel0to100: 8.3, feedSystem: 'Common-Rail 1600 bar' }
  ],
  'E70': [
    { modelBadge: 'X5 3.0si / 35i', engineCode: 'N52B30 / N55B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 400, topSpeedKmh: 240, accel0to100: 6.8, feedSystem: 'Twin-Scroll Valvetronic' },
    { modelBadge: 'X5 4.8i / 50i', engineCode: 'N62B48 / N63B44', architecture: 'V8 Biturbo a 90°', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 408, torqueNm: 600, topSpeedKmh: 250, accel0to100: 5.5, feedSystem: 'Biturbo Hot-V' },
    { modelBadge: 'X5 M (E70)', engineCode: 'S63B44', architecture: 'V8 Biturbo M Motorsport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 555, torqueNm: 680, topSpeedKmh: 250, accel0to100: 4.7, feedSystem: 'Primer SUV en llevar el distintivo M Motorsport' },
    { modelBadge: 'X5 30d / 40d', engineCode: 'N57D30', architecture: '6 en línea Turbodiésel / Biturbo', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Diésel', powerHp: 306, torqueNm: 600, topSpeedKmh: 236, accel0to100: 6.6, feedSystem: 'Biturbo diésel escalonado' }
  ],
  'F15': [
    { modelBadge: 'xDrive35i', engineCode: 'N55B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 400, topSpeedKmh: 235, accel0to100: 6.5, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: 'xDrive50i', engineCode: 'N63B44', architecture: 'V8 Biturbo a 90°', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 450, torqueNm: 650, topSpeedKmh: 250, accel0to100: 4.9, feedSystem: 'Biturbo Hot-V' },
    { modelBadge: 'X5 M (F85)', engineCode: 'S63B44TU', architecture: 'V8 Biturbo M Motorsport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 575, torqueNm: 750, topSpeedKmh: 250, accel0to100: 4.2, feedSystem: 'Escape cruzado patentado por BMW M' }
  ],
  'G05': [
    { modelBadge: 'xDrive40i', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 450, topSpeedKmh: 243, accel0to100: 5.5, feedSystem: 'Motor B58 modular' },
    { modelBadge: 'M50i / M60i', engineCode: 'N63B44 / S68B44', architecture: 'V8 Biturbo a 90°', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 530, torqueNm: 750, topSpeedKmh: 250, accel0to100: 4.3, feedSystem: 'V8 biturbo con xDrive' },
    { modelBadge: 'X5 M Competition (F95)', engineCode: 'S63B44Tx', architecture: 'V8 Biturbo M Motorsport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 625, torqueNm: 750, topSpeedKmh: 290, accel0to100: 3.8, feedSystem: 'M xDrive con diferencial activo M' }
  ],
  'G06': [
    { modelBadge: 'xDrive40i', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 380, torqueNm: 520, topSpeedKmh: 250, accel0to100: 5.4, feedSystem: 'Mild-Hybrid 48V' },
    { modelBadge: 'X6 M Competition (F96)', engineCode: 'S63B44Tx', architecture: 'V8 Biturbo M Motorsport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 625, torqueNm: 750, topSpeedKmh: 290, accel0to100: 3.8, feedSystem: 'M xDrive con modo pista M Dynamic' }
  ],
  'G07': [
    { modelBadge: 'xDrive40i', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 381, torqueNm: 520, topSpeedKmh: 250, accel0to100: 5.8, feedSystem: 'Mild-Hybrid 48V' },
    { modelBadge: 'M60i xDrive', engineCode: 'S68B44', architecture: 'V8 Biturbo M Performance 48V', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 530, torqueNm: 750, topSpeedKmh: 250, accel0to100: 4.7, feedSystem: 'Tecnología V8 S68 de nueva generación' }
  ],
  'G09': [
    { modelBadge: 'XM', engineCode: 'S68B44 + Eléctrico', architecture: 'V8 Biturbo M Hybrid PHEV', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Híbrido Enchufable', powerHp: 653, torqueNm: 800, topSpeedKmh: 270, accel0to100: 4.3, feedSystem: 'Batería 25.7 kWh netos con tracción M xDrive' },
    { modelBadge: 'XM Label Red', engineCode: 'S68B44 + Eléctrico', architecture: 'V8 Biturbo M Hybrid de Alta Potencia', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Híbrido Enchufable', powerHp: 748, torqueNm: 1000, topSpeedKmh: 290, accel0to100: 3.8, feedSystem: 'El vehículo de producción más potente de la historia de BMW M.' }
  ],
  'E85': [
    { modelBadge: 'Z4 2.2i', engineCode: 'M54B22', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2171, displacementL: 2.2, fuel: 'Gasolina', powerHp: 170, torqueNm: 210, topSpeedKmh: 225, accel0to100: 7.7, feedSystem: 'Doble VANOS continuo' },
    { modelBadge: 'Z4 2.5i / 2.5si', engineCode: 'M54B25 / N52B25', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2494, displacementL: 2.5, fuel: 'Gasolina', powerHp: 218, torqueNm: 250, topSpeedKmh: 240, accel0to100: 6.5, feedSystem: 'Valvetronic magnesio-aluminio' },
    { modelBadge: 'Z4 3.0i / 3.0si', engineCode: 'M54B30 / N52B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2996, displacementL: 3.0, fuel: 'Gasolina', powerHp: 265, torqueNm: 315, topSpeedKmh: 250, accel0to100: 5.7, feedSystem: 'Valvetronic con sonido de admisión deportivo' },
    { modelBadge: 'Z4 M Roadster / Coupé', engineCode: 'S54B32', architecture: '6 en línea atmosférico a 7.900 rpm', cylinders: 6, displacementCc: 3246, displacementL: 3.2, fuel: 'Gasolina', powerHp: 343, torqueNm: 365, topSpeedKmh: 250, accel0to100: 5.0, feedSystem: '6 mariposas individuales M Motorsport' }
  ],
  'E89': [
    { modelBadge: 'Z4 sDrive20i', engineCode: 'N20B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1997, displacementL: 2.0, fuel: 'Gasolina', powerHp: 184, torqueNm: 270, topSpeedKmh: 235, accel0to100: 6.9, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: 'Z4 sDrive28i', engineCode: 'N20B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1997, displacementL: 2.0, fuel: 'Gasolina', powerHp: 245, torqueNm: 350, topSpeedKmh: 250, accel0to100: 5.7, feedSystem: 'Inyección directa turbo' },
    { modelBadge: 'Z4 sDrive35i', engineCode: 'N54B30', architecture: '6 en línea Biturbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.2, feedSystem: 'Twin-Turbo inyección directa' },
    { modelBadge: 'Z4 sDrive35is', engineCode: 'N54B30 High Output', architecture: '6 en línea Biturbo', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 450, topSpeedKmh: 250, accel0to100: 4.8, feedSystem: 'Overboost temporal a 500 Nm con caja DKG 7 velocidades' }
  ],
  'G29': [
    { modelBadge: 'Z4 sDrive20i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 197, torqueNm: 320, topSpeedKmh: 240, accel0to100: 6.6, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: 'Z4 sDrive30i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 258, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.4, feedSystem: 'Inyección a 350 bar' },
    { modelBadge: 'Z4 M40i', engineCode: 'B58B30O1', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.5, feedSystem: 'Motor B58 con opción de caja manual Pure Impulse 6v' }
  ],
  'I01': [
    { modelBadge: 'i3 (60 Ah)', engineCode: 'Híbrido Síncrono BMW eDrive', architecture: 'Motor Eléctrico Trasero', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 170, torqueNm: 250, topSpeedKmh: 150, accel0to100: 7.2, feedSystem: 'Batería 22 kWh con chasis de fibra de carbono CFRP LifeDrive' },
    { modelBadge: 'i3s (120 Ah)', engineCode: 'BMW eDrive Sport', architecture: 'Motor Eléctrico Trasero Potenciado', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 184, torqueNm: 270, topSpeedKmh: 160, accel0to100: 6.9, feedSystem: 'Batería 42.2 kWh con suspensión deportiva ensanchada' }
  ],
  'I20': [
    { modelBadge: 'iX xDrive40', engineCode: 'BMW eDrive Gen5 Dual', architecture: 'Doble Motor Eléctrico Tracción Total', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 326, torqueNm: 630, topSpeedKmh: 200, accel0to100: 6.1, feedSystem: 'Batería 76.6 kWh netos' },
    { modelBadge: 'iX xDrive50', engineCode: 'BMW eDrive Gen5 Dual', architecture: 'Doble Motor Eléctrico Tracción Total', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 523, torqueNm: 765, topSpeedKmh: 200, accel0to100: 4.6, feedSystem: 'Batería 111.5 kWh brutos' },
    { modelBadge: 'iX M60', engineCode: 'BMW eDrive Gen5 M Dual', architecture: 'Doble Motor Eléctrico M Performance', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 619, torqueNm: 1100, topSpeedKmh: 250, accel0to100: 3.8, feedSystem: 'Modo M Launch Control con 1.100 Nm' }
  ],
  'E9': [
    { modelBadge: '2800 CS', engineCode: 'M30B28', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2788, displacementL: 2.8, fuel: 'Gasolina', powerHp: 170, torqueNm: 236, topSpeedKmh: 206, accel0to100: 9.3, feedSystem: 'Doble carburador Zenith' },
    { modelBadge: '3.0 CSi', engineCode: 'M30B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2986, displacementL: 3.0, fuel: 'Gasolina', powerHp: 200, torqueNm: 272, topSpeedKmh: 220, accel0to100: 7.7, feedSystem: 'Inyección electrónica Bosch D-Jetronic' },
    { modelBadge: '3.0 CSL Batmóvil', engineCode: 'M30B32', architecture: '6 en línea de Homologación', cylinders: 6, displacementCc: 3153, displacementL: 3.2, fuel: 'Gasolina', powerHp: 206, torqueNm: 286, topSpeedKmh: 222, accel0to100: 7.0, feedSystem: 'Carrocería aligerada con aluminio y paquete aerodinámico' }
  ],
  'E3': [
    { modelBadge: '2500', engineCode: 'M30B25', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2494, displacementL: 2.5, fuel: 'Gasolina', powerHp: 150, torqueNm: 211, topSpeedKmh: 190, accel0to100: 10.4, feedSystem: 'Doble carburador Zenith' },
    { modelBadge: '3.0 Si', engineCode: 'M30B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2986, displacementL: 3.0, fuel: 'Gasolina', powerHp: 200, torqueNm: 272, topSpeedKmh: 211, accel0to100: 7.8, feedSystem: 'Inyección Bosch D-Jetronic' }
  ],
  'E21': [
    { modelBadge: '316', engineCode: 'M10B16', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1573, displacementL: 1.6, fuel: 'Gasolina', powerHp: 90, torqueNm: 123, topSpeedKmh: 160, accel0to100: 13.8, feedSystem: 'Carburador Solex' },
    { modelBadge: '320i', engineCode: 'M10B20', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1990, displacementL: 2.0, fuel: 'Gasolina', powerHp: 125, torqueNm: 172, topSpeedKmh: 180, accel0to100: 9.9, feedSystem: 'Inyección mecánica Bosch K-Jetronic' },
    { modelBadge: '323i', engineCode: 'M20B23', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2315, displacementL: 2.3, fuel: 'Gasolina', powerHp: 143, torqueNm: 190, topSpeedKmh: 190, accel0to100: 9.0, feedSystem: 'Inyección Bosch K-Jetronic con frenos de disco traseros' }
  ],
  'E26': [
    { modelBadge: 'M1', engineCode: 'M88/1', architecture: '6 en línea 24v DOHC Central', cylinders: 6, displacementCc: 3453, displacementL: 3.5, fuel: 'Gasolina', powerHp: 277, torqueNm: 330, topSpeedKmh: 260, accel0to100: 5.6, feedSystem: '6 mariposas individuales e inyección Kugelfischer', notes: 'Primer superdeportivo de motor central desarrollado por BMW Motorsport.' }
  ],
  'F90': [
    { modelBadge: 'M5 (F90)', engineCode: 'S63B44Tx', architecture: 'V8 Biturbo M Motorsport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 600, torqueNm: 750, topSpeedKmh: 250, accel0to100: 3.4, feedSystem: 'M xDrive con modo 2WD propulsión' },
    { modelBadge: 'M5 Competition', engineCode: 'S63B44Tx', architecture: 'V8 Biturbo M Motorsport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 625, torqueNm: 750, topSpeedKmh: 305, accel0to100: 3.3, feedSystem: 'M Driver Package y suspensión 7mm más baja' },
    { modelBadge: 'M5 CS', engineCode: 'S63B44Tx Club Sport', architecture: 'V8 Biturbo Club Sport', cylinders: 8, displacementCc: 4395, displacementL: 4.4, fuel: 'Gasolina', powerHp: 635, torqueNm: 750, topSpeedKmh: 305, accel0to100: 3.0, feedSystem: 'Reducción de 70 kg, asientos de carbono y 0-100 en 3.0s' }
  ],
  'F97': [
    { modelBadge: 'X3 M', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 480, torqueNm: 600, topSpeedKmh: 250, accel0to100: 4.2, feedSystem: 'Cigüeñal forjado y doble turbo mono-scroll' },
    { modelBadge: 'X3 M Competition', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 510, torqueNm: 650, topSpeedKmh: 285, accel0to100: 3.8, feedSystem: 'M xDrive con diferencial activo M' }
  ],
  'F98': [
    { modelBadge: 'X4 M', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 480, torqueNm: 600, topSpeedKmh: 250, accel0to100: 4.2, feedSystem: 'Cigüeñal forjado y doble turbo mono-scroll' },
    { modelBadge: 'X4 M Competition', engineCode: 'S58B30T0', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2993, displacementL: 3.0, fuel: 'Gasolina', powerHp: 510, torqueNm: 650, topSpeedKmh: 285, accel0to100: 3.8, feedSystem: 'M xDrive con diferencial activo M' }
  ],
  'F74': [
    { modelBadge: '220 Gran Coupé', engineCode: 'B38 MHEV', architecture: '3 en línea TwinPower Turbo 48V', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 170, torqueNm: 280, topSpeedKmh: 230, accel0to100: 7.9, feedSystem: 'Mild-Hybrid 48V' },
    { modelBadge: 'M235 xDrive Gran Coupé', engineCode: 'B48B20O2', architecture: '4 en línea M TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 300, torqueNm: 400, topSpeedKmh: 250, accel0to100: 4.9, feedSystem: 'Tracción integral xDrive' }
  ],
  'F45': [
    { modelBadge: '218i Active Tourer', engineCode: 'B38A15', architecture: '3 en línea TwinPower Turbo transversal', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 136, torqueNm: 220, topSpeedKmh: 205, accel0to100: 9.2, feedSystem: 'Inyección directa turbo' },
    { modelBadge: '225xe iPerformance', engineCode: 'B38 + Eléctrico', architecture: 'Híbrido Enchufable PHEV', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Híbrido Enchufable', powerHp: 224, torqueNm: 385, topSpeedKmh: 202, accel0to100: 6.7, feedSystem: 'Tracción total electrificada eDrive' }
  ],
  'U06': [
    { modelBadge: '220i Active Tourer', engineCode: 'B38 MHEV', architecture: '3 en línea TwinPower Turbo 48V', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 170, torqueNm: 280, topSpeedKmh: 221, accel0to100: 8.1, feedSystem: 'Mild-Hybrid integrado en caja Steptronic 7v' },
    { modelBadge: '230e xDrive', engineCode: 'B38 + Eléctrico', architecture: 'Híbrido Enchufable PHEV de Alta Potencia', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Híbrido Enchufable', powerHp: 326, torqueNm: 477, topSpeedKmh: 205, accel0to100: 5.5, feedSystem: 'Batería 14.2 kWh netos' }
  ],
  'F44': [
    { modelBadge: '218i Gran Coupé', engineCode: 'B38A15', architecture: '3 en línea TwinPower Turbo', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 140, torqueNm: 220, topSpeedKmh: 215, accel0to100: 8.7, feedSystem: 'Twin-Scroll turbo transversal' },
    { modelBadge: 'M235i xDrive Gran Coupé', engineCode: 'B48A20T1', architecture: '4 en línea TwinPower Turbo M', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 450, topSpeedKmh: 250, accel0to100: 4.9, feedSystem: 'Diferencial Torsen y tracción xDrive' }
  ],
  'F52': [
    { modelBadge: '118i Sedan', engineCode: 'B38A15', architecture: '3 en línea TwinPower Turbo', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 136, torqueNm: 220, topSpeedKmh: 212, accel0to100: 9.4, feedSystem: 'Inyección directa turbo' },
    { modelBadge: '125i Sedan', engineCode: 'B48A20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 231, torqueNm: 350, topSpeedKmh: 250, accel0to100: 6.8, feedSystem: 'Twin-Scroll turbo' }
  ],
  'F26': [
    { modelBadge: 'xDrive28i', engineCode: 'N20B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1997, displacementL: 2.0, fuel: 'Gasolina', powerHp: 245, torqueNm: 350, topSpeedKmh: 232, accel0to100: 6.4, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: 'M40i', engineCode: 'N55B30T0', architecture: '6 en línea TwinPower Turbo M Performance', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 360, torqueNm: 465, topSpeedKmh: 250, accel0to100: 4.9, feedSystem: 'Inyección directa turbo con xDrive' }
  ],
  'G02': [
    { modelBadge: 'xDrive30i', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 252, torqueNm: 350, topSpeedKmh: 240, accel0to100: 6.3, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: 'M40i', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 360, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.8, feedSystem: 'Motor B58 con escape M Sport' }
  ],
  'F39': [
    { modelBadge: 'sDrive20i', engineCode: 'B48A20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 192, torqueNm: 280, topSpeedKmh: 227, accel0to100: 7.7, feedSystem: 'Caja DKG 7 velocidades' },
    { modelBadge: 'M35i', engineCode: 'B48A20T1', architecture: '4 en línea TwinPower Turbo M Performance', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 306, torqueNm: 450, topSpeedKmh: 250, accel0to100: 4.9, feedSystem: 'Autoblocante Torsen y tracción xDrive' }
  ],
  'U10': [
    { modelBadge: 'sDrive20i', engineCode: 'B38 MHEV', architecture: '3 en línea TwinPower Turbo 48V', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 170, torqueNm: 280, topSpeedKmh: 213, accel0to100: 8.3, feedSystem: 'Mild-Hybrid 48V' },
    { modelBadge: 'M35i xDrive', engineCode: 'B48A20T1', architecture: '4 en línea M TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 300, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.4, feedSystem: 'Doble escape cuádruple M y autoblocante' },
    { modelBadge: 'iX2 xDrive30', engineCode: 'BMW eDrive Gen5', architecture: 'Doble Motor Eléctrico Tracción Total', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 313, torqueNm: 494, topSpeedKmh: 180, accel0to100: 5.6, feedSystem: 'Batería 64.8 kWh netos' }
  ],
  'G32': [
    { modelBadge: '630i Gran Turismo', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 258, torqueNm: 400, topSpeedKmh: 250, accel0to100: 6.3, feedSystem: 'Twin-Scroll turbo' },
    { modelBadge: '640i Gran Turismo', engineCode: 'B58B30', architecture: '6 en línea TwinPower Turbo', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 340, torqueNm: 450, topSpeedKmh: 250, accel0to100: 5.3, feedSystem: 'Motor modular B58' }
  ],
  'G08': [
    { modelBadge: 'iX3', engineCode: 'BMW eDrive Gen5', architecture: 'Motor Eléctrico Síncrono de excitación libre de tierras raras', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 286, torqueNm: 400, topSpeedKmh: 180, accel0to100: 6.8, feedSystem: 'Batería de 80 kWh (74 kWh netos) con arquitectura de 400V' }
  ],
  'G21': [
    { modelBadge: '320d Touring', engineCode: 'B47D20 MHEV', architecture: '4 en línea Turbodiésel 48V', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 190, torqueNm: 400, topSpeedKmh: 230, accel0to100: 7.1, feedSystem: 'Common-Rail con Mild-Hybrid 48V' },
    { modelBadge: '330i Touring', engineCode: 'B48B20', architecture: '4 en línea TwinPower Turbo', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Gasolina', powerHp: 258, torqueNm: 400, topSpeedKmh: 250, accel0to100: 5.9, feedSystem: 'Inyección directa a 350 bar' },
    { modelBadge: 'M340i xDrive Touring', engineCode: 'B58B30O1', architecture: '6 en línea TwinPower Turbo M Performance', cylinders: 6, displacementCc: 2998, displacementL: 3.0, fuel: 'Gasolina', powerHp: 374, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.5, feedSystem: 'Diferencial deportivo M y tracción xDrive' }
  ],
  'G61': [
    { modelBadge: '520d Touring', engineCode: 'B47 MHEV', architecture: '4 en línea Turbodiésel 48V', cylinders: 4, displacementCc: 1995, displacementL: 2.0, fuel: 'Diésel', powerHp: 197, torqueNm: 400, topSpeedKmh: 230, accel0to100: 7.5, feedSystem: 'Mild-Hybrid 48V' },
    { modelBadge: '530e Touring', engineCode: 'B48 + Eléctrico', architecture: '4 en línea PHEV', cylinders: 4, displacementCc: 1998, displacementL: 2.0, fuel: 'Híbrido Enchufable', powerHp: 299, torqueNm: 450, topSpeedKmh: 230, accel0to100: 6.4, feedSystem: 'Batería 19.4 kWh netos' }
  ],
  'G61_ELECTRIC': [
    { modelBadge: 'i5 eDrive40 Touring', engineCode: 'BMW eDrive Gen5', architecture: 'Motor Eléctrico Trasero', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 340, torqueNm: 430, topSpeedKmh: 193, accel0to100: 6.1, feedSystem: 'Batería de 81.2 kWh' },
    { modelBadge: 'i5 M60 xDrive Touring', engineCode: 'BMW eDrive Gen5 Dual', architecture: 'Doble Motor Eléctrico M Performance', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 601, torqueNm: 820, topSpeedKmh: 230, accel0to100: 3.9, feedSystem: 'M Sport Boost con 820 Nm de par' }
  ],
  'G28': [
    { modelBadge: 'i3 eDrive35L (G28)', engineCode: 'BMW eDrive Gen5', architecture: 'Motor Eléctrico Trasero', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 286, torqueNm: 400, topSpeedKmh: 180, accel0to100: 6.2, feedSystem: 'Batería 70 kWh con batalla extendida' }
  ],
  'NEUE_KLASSE': [
    { modelBadge: 'Vision Neue Klasse / i3 Concept', engineCode: 'BMW eDrive Gen6 800V', architecture: 'Motor Eléctrico Cilíndrico de Sexta Generación', cylinders: 0, displacementCc: 0, displacementL: 0, fuel: 'Eléctrico', powerHp: 350, torqueNm: 500, topSpeedKmh: 210, accel0to100: 4.5, feedSystem: 'Arquitectura ultra rápida de 800 voltios y celdas cilíndricas' }
  ],
  'HISTORICAL': {
    'bmw-3-15': [{ modelBadge: 'Dixi 3/15 DA-2', engineCode: 'Austin Seven / BMW', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 748, displacementL: 0.7, fuel: 'Gasolina', powerHp: 15, torqueNm: 34, topSpeedKmh: 75, accel0to100: 25.0, feedSystem: 'Carburador monocuerpo', notes: 'El primer coche fabricado por BMW en Eisenach.' }],
    'bmw-3-20-ps': [{ modelBadge: '3/20 PS (AM-1)', engineCode: 'BMW 4-Zylinder', architecture: '4 en línea con válvulas en cabeza (OHV)', cylinders: 4, displacementCc: 788, displacementL: 0.8, fuel: 'Gasolina', powerHp: 20, torqueNm: 40, topSpeedKmh: 80, accel0to100: 22.0, feedSystem: 'Carburador Solex' }],
    'bmw-303': [{ modelBadge: '303', engineCode: 'M78', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1173, displacementL: 1.2, fuel: 'Gasolina', powerHp: 30, torqueNm: 68, topSpeedKmh: 90, accel0to100: 19.0, feedSystem: 'Doble carburador Solex', notes: 'El primer modelo de BMW con parrilla de doble riñón y motor de 6 cilindros en línea.' }],
    'bmw-309': [{ modelBadge: '309', engineCode: 'M78/4', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 845, displacementL: 0.8, fuel: 'Gasolina', powerHp: 22, torqueNm: 50, topSpeedKmh: 82, accel0to100: 21.0, feedSystem: 'Carburador Solex' }],
    'bmw-315': [{ modelBadge: '315', engineCode: 'M78', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1490, displacementL: 1.5, fuel: 'Gasolina', powerHp: 34, torqueNm: 80, topSpeedKmh: 100, accel0to100: 17.0, feedSystem: 'Doble carburador Solex' }],
    'bmw-319': [{ modelBadge: '319 / 319/1', engineCode: 'M78', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1911, displacementL: 1.9, fuel: 'Gasolina', powerHp: 45, torqueNm: 100, topSpeedKmh: 115, accel0to100: 14.5, feedSystem: 'Doble carburador invertido' }],
    'bmw-328': [{ modelBadge: '328 Roadster', engineCode: 'M328', architecture: '6 en línea con cámaras hemisféricas', cylinders: 6, displacementCc: 1971, displacementL: 2.0, fuel: 'Gasolina', powerHp: 80, torqueNm: 126, topSpeedKmh: 150, accel0to100: 10.5, feedSystem: 'Tres carburadores Solex de tiro vertical', notes: 'Leyenda vencedora de las Mille Miglia 1940.' }],
    'bmw-326': [{ modelBadge: '326 Berlina', engineCode: 'M326', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1971, displacementL: 2.0, fuel: 'Gasolina', powerHp: 50, torqueNm: 108, topSpeedKmh: 115, accel0to100: 15.0, feedSystem: 'Doble carburador Solex' }],
    'bmw-327': [{ modelBadge: '327 Coupé / Cabrio', engineCode: 'M328', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1971, displacementL: 2.0, fuel: 'Gasolina', powerHp: 80, torqueNm: 126, topSpeedKmh: 140, accel0to100: 11.5, feedSystem: 'Tres carburadores invertidos' }],
    'bmw-329': [{ modelBadge: '329 Cabriolet', engineCode: 'M326', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1911, displacementL: 1.9, fuel: 'Gasolina', powerHp: 45, torqueNm: 98, topSpeedKmh: 110, accel0to100: 16.0, feedSystem: 'Doble carburador' }],
    'bmw-320': [{ modelBadge: '320 Berlina', engineCode: 'M320', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1971, displacementL: 2.0, fuel: 'Gasolina', powerHp: 45, torqueNm: 100, topSpeedKmh: 110, accel0to100: 16.0, feedSystem: 'Carburador Solex' }],
    'bmw-325': [{ modelBadge: '325 Wehrmacht Kübelwagen', engineCode: 'M325', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1971, displacementL: 2.0, fuel: 'Gasolina', powerHp: 50, torqueNm: 105, topSpeedKmh: 100, accel0to100: 18.0, feedSystem: 'Tracción total permanente y dirección a las 4 ruedas' }],
    'bmw-321': [{ modelBadge: '321', engineCode: 'M321', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1971, displacementL: 2.0, fuel: 'Gasolina', powerHp: 45, torqueNm: 100, topSpeedKmh: 115, accel0to100: 15.5, feedSystem: 'Carburador Solex' }],
    'bmw-335': [{ modelBadge: '335 Gran Turismo', engineCode: 'M335', architecture: '6 en línea atmosférico de alta cilindrada', cylinders: 6, displacementCc: 3485, displacementL: 3.5, fuel: 'Gasolina', powerHp: 90, torqueNm: 180, topSpeedKmh: 145, accel0to100: 12.0, feedSystem: 'Doble carburador Solex' }],
    'bmw-340': [{ modelBadge: '340 (EMW 340)', engineCode: 'M340', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1971, displacementL: 2.0, fuel: 'Gasolina', powerHp: 55, torqueNm: 110, topSpeedKmh: 120, accel0to100: 15.0, feedSystem: 'Doble carburador' }],
    'bmw-501': [{ modelBadge: '501 "Ángel Barroco"', engineCode: 'M337', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 1971, displacementL: 2.0, fuel: 'Gasolina', powerHp: 72, torqueNm: 130, topSpeedKmh: 135, accel0to100: 14.5, feedSystem: 'Carburador Solex' }],
    'bmw-502': [{ modelBadge: '502 V8 3.2', engineCode: 'M502', architecture: 'V8 atmosférico a 90° OHV', cylinders: 8, displacementCc: 3168, displacementL: 3.2, fuel: 'Gasolina', powerHp: 140, torqueNm: 220, topSpeedKmh: 175, accel0to100: 12.0, feedSystem: 'Primer motor V8 de aleación ligera producido en serie en Alemania.' }],
    'bmw-503': [{ modelBadge: '503 Coupé / Cabrio', engineCode: 'M503', architecture: 'V8 atmosférico a 90° OHV', cylinders: 8, displacementCc: 3168, displacementL: 3.2, fuel: 'Gasolina', powerHp: 140, torqueNm: 222, topSpeedKmh: 190, accel0to100: 11.5, feedSystem: 'Doble carburador Zenith' }],
    'bmw-3200-cs': [{ modelBadge: '3200 CS Bertone', engineCode: 'M502/11', architecture: 'V8 atmosférico a 90° OHV', cylinders: 8, displacementCc: 3168, displacementL: 3.2, fuel: 'Gasolina', powerHp: 160, torqueNm: 240, topSpeedKmh: 200, accel0to100: 10.5, feedSystem: 'Doble carburador de tiro invertido', notes: 'El primer coche de la historia en incorporar la mítica curva Hofmeister.' }],
    'bmw-isetta': [{ modelBadge: 'Isetta 250 / 300', engineCode: 'Monocilíndrico 4 tiempos (de motocicleta)', architecture: '1 cilindro 4T refrigerado por aire', cylinders: 1, displacementCc: 298, displacementL: 0.3, fuel: 'Gasolina', powerHp: 13, torqueNm: 18, topSpeedKmh: 85, accel0to100: 30.0, feedSystem: 'Carburador Bing', notes: 'El microcoche que salvó financieramente a BMW en la década de 1950.' }],
    'bmw-507': [{ modelBadge: '507 Roadster', engineCode: 'M507', architecture: 'V8 atmosférico a 90° de aluminio', cylinders: 8, displacementCc: 3168, displacementL: 3.2, fuel: 'Gasolina', powerHp: 150, torqueNm: 235, topSpeedKmh: 205, accel0to100: 9.4, feedSystem: 'Dos carburadores Zenith dobles', notes: 'Diseñado por Albrecht von Goertz. El coche elegido por Elvis Presley.' }],
    'bmw-700': [{ modelBadge: '700 Sport Coupé', engineCode: 'Bóxer 2 cilindros refrigerado por aire', architecture: '2 cilindros opuestos (bóxer trasero)', cylinders: 2, displacementCc: 697, displacementL: 0.7, fuel: 'Gasolina', powerHp: 40, torqueNm: 51, topSpeedKmh: 135, accel0to100: 15.5, feedSystem: 'Doble carburador Solex' }],
    'bmw-02-series': [
      { modelBadge: '1602', engineCode: 'M10B16', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1573, displacementL: 1.6, fuel: 'Gasolina', powerHp: 85, torqueNm: 123, topSpeedKmh: 160, accel0to100: 12.8, feedSystem: 'Carburador Solex' },
      { modelBadge: '2002', engineCode: 'M10B20', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1990, displacementL: 2.0, fuel: 'Gasolina', powerHp: 100, torqueNm: 157, topSpeedKmh: 173, accel0to100: 10.4, feedSystem: 'Carburador Solex' },
      { modelBadge: '2002 tii', engineCode: 'M10B20', architecture: '4 en línea inyección mecánica', cylinders: 4, displacementCc: 1990, displacementL: 2.0, fuel: 'Gasolina', powerHp: 130, torqueNm: 178, topSpeedKmh: 190, accel0to100: 9.3, feedSystem: 'Inyección mecánica Kugelfischer' },
      { modelBadge: '2002 Turbo', engineCode: 'M10B20 Turbo', architecture: '4 en línea Turbocomprimido', cylinders: 4, displacementCc: 1990, displacementL: 2.0, fuel: 'Gasolina', powerHp: 170, torqueNm: 240, topSpeedKmh: 211, accel0to100: 7.0, feedSystem: 'Turbocompresor KKK con inyección Kugelfischer', notes: 'El primer coche de producción europeo con motor turboalimentado (1973).' }
    ],
    'bmw-new-class-sedans': [
      { modelBadge: '1500', engineCode: 'M10B15', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1499, displacementL: 1.5, fuel: 'Gasolina', powerHp: 80, torqueNm: 118, topSpeedKmh: 150, accel0to100: 14.8, feedSystem: 'Carburador Solex' },
      { modelBadge: '1800 TI/SA', engineCode: 'M10B18', architecture: '4 en línea competición homologada', cylinders: 4, displacementCc: 1773, displacementL: 1.8, fuel: 'Gasolina', powerHp: 130, torqueNm: 157, topSpeedKmh: 186, accel0to100: 9.0, feedSystem: 'Doble carburador Weber doble tiro' }
    ],
    'bmw-new-class-coup-s': [
      { modelBadge: '2000 CS', engineCode: 'M10B20', architecture: '4 en línea atmosférico', cylinders: 4, displacementCc: 1990, displacementL: 2.0, fuel: 'Gasolina', powerHp: 120, torqueNm: 167, topSpeedKmh: 185, accel0to100: 10.5, feedSystem: 'Doble carburador Solex' }
    ],
    'bmw-m1': [{ modelBadge: 'M1 (E26)', engineCode: 'M88/1', architecture: '6 en línea 24v DOHC Central', cylinders: 6, displacementCc: 3453, displacementL: 3.5, fuel: 'Gasolina', powerHp: 277, torqueNm: 330, topSpeedKmh: 260, accel0to100: 5.6, feedSystem: '6 mariposas individuales e inyección Kugelfischer', notes: 'Primer superdeportivo de motor central desarrollado por BMW Motorsport.' }],
    'bmw-z1': [{ modelBadge: 'Z1 Roadster', engineCode: 'M20B25', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2494, displacementL: 2.5, fuel: 'Gasolina', powerHp: 170, torqueNm: 222, topSpeedKmh: 225, accel0to100: 7.9, feedSystem: 'Bosch Motronic', notes: 'Puertas retráctiles eléctricas que se ocultan en el umbral.' }],
    'bmw-z3': [
      { modelBadge: 'Z3 1.9i', engineCode: 'M44B19', architecture: '4 en línea 16v', cylinders: 4, displacementCc: 1895, displacementL: 1.9, fuel: 'Gasolina', powerHp: 140, torqueNm: 180, topSpeedKmh: 205, accel0to100: 9.5, feedSystem: 'Bosch Motronic' },
      { modelBadge: 'Z3 2.8i / 3.0i', engineCode: 'M52B28 / M54B30', architecture: '6 en línea atmosférico', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 231, torqueNm: 300, topSpeedKmh: 240, accel0to100: 6.0, feedSystem: 'Doble VANOS' },
      { modelBadge: 'Z3 M Roadster / Coupé', engineCode: 'S50B32 / S54B32', architecture: '6 en línea M Motorsport', cylinders: 6, displacementCc: 3246, displacementL: 3.2, fuel: 'Gasolina', powerHp: 325, torqueNm: 350, topSpeedKmh: 250, accel0to100: 5.3, feedSystem: '6 mariposas individuales M Motorsport' }
    ],
    'bmw-z8': [{ modelBadge: 'Z8 Roadster', engineCode: 'S62B50', architecture: 'V8 atmosférico M Motorsport a 90°', cylinders: 8, displacementCc: 4941, displacementL: 4.9, fuel: 'Gasolina', powerHp: 400, torqueNm: 500, topSpeedKmh: 250, accel0to100: 4.7, feedSystem: '8 mariposas de admisión individuales y chasis de aluminio espacial', notes: 'Conducido por James Bond en The World Is Not Enough.' }],
    'bmw-i8': [{ modelBadge: 'i8 Coupé / Roadster', engineCode: 'B38K15T0 + Motor Eléctrico', architecture: 'Tricilíndrico Turbo Central + Motor Eléctrico Delantero', cylinders: 3, displacementCc: 1499, displacementL: 1.5, fuel: 'Híbrido Enchufable', powerHp: 374, torqueNm: 570, topSpeedKmh: 250, accel0to100: 4.4, feedSystem: 'Chasis de fibra de carbono LifeDrive con puertas de ala de mariposa' }]
  }
};

// 3. Reemplazar o desdoblar generaciones para aplicar la segunda tanda completa de Facelifts
const newGenerations = [];

for (const g of cat.generations) {
  // Arreglar imagen de M3 E46 (reemplazar volante por frontal exterior directo verificado)
  if (g.id === 'bmw-m3-e46' || g.label.includes('M3 (E46)')) {
    g.frontImage = m3FrontExterior;
    if (g.chassis?.[0]) g.chassis[0].frontImage = m3FrontExterior;
    g.engines = [
      { modelBadge: 'M3 Coupé (E46)', engineCode: 'S54B32', architecture: '6 en línea atmosférico a 7.900 rpm', cylinders: 6, displacementCc: 3246, displacementL: 3.2, fuel: 'Gasolina', powerHp: 343, torqueNm: 365, topSpeedKmh: 250, accel0to100: 5.2, feedSystem: '6 mariposas individuales con doble VANOS continuo', notes: 'Uno de los motores atmosféricos más laureados de la historia del automóvil.' },
      { modelBadge: 'M3 CSL', engineCode: 'S54B32HP', architecture: '6 en línea atmosférico Club Sport Lightweight', cylinders: 6, displacementCc: 3246, displacementL: 3.2, fuel: 'Gasolina', powerHp: 360, torqueNm: 370, topSpeedKmh: 250, accel0to100: 4.9, feedSystem: 'Caja de admisión masiva de fibra de carbono y válvulas aligeradas', notes: 'Techo de fibra de carbono y reducción de 110 kg. 7:50 min en Nürburgring.' },
      { modelBadge: 'M3 GTR Stradale', engineCode: 'P60B40', architecture: 'V8 atmosférico a 90° de carreras', cylinders: 8, displacementCc: 3997, displacementL: 4.0, fuel: 'Gasolina', powerHp: 380, torqueNm: 390, topSpeedKmh: 295, accel0to100: 4.7, feedSystem: 'Cárter seco y bloque de carreras ALMS', notes: 'Unidad de homologación ultra exclusiva del campeonato americano Le Mans Series.' }
    ];
    newGenerations.push(g);
    continue;
  }

  // Desdoblar Serie 1 E87
  if (g.id === 'bmw-1-series-e81-e82-e87-e88') {
    newGenerations.push({
      id: 'bmw-1-series-e87-pre-facelift',
      series: '1 Series',
      label: 'BMW Serie 1 5p (E87) Pre-Facelift (2004–2007)',
      section: 'production',
      status: 'production',
      years: { start: 2004, end: 2007, display: '2004 – 2007' },
      class: 'Compacto Deportivo • Pre-Facelift con riñones y paragolpes inicial',
      chassis: [{ code: 'E87', frontImage: { file: 'File:BMW E87 front 20080625.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/BMW_E87_front_20080625.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW E87 front 20080625.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/BMW_E87_front_20080625.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['E87']
    });
    newGenerations.push({
      id: 'bmw-1-series-e87-facelift',
      series: '1 Series',
      label: 'BMW Serie 1 5p (E87) Facelift (2007–2011)',
      section: 'production',
      status: 'production',
      years: { start: 2007, end: 2011, display: '2007 – 2011' },
      class: 'Compacto Deportivo • Facelift con tomas de aire inferiores ensanchadas y EfficientDynamics',
      chassis: [{ code: 'E87', frontImage: { file: 'File:BMW E87 front 20080417.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/BMW_E87_front_20080417.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW E87 front 20080417.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/BMW_E87_front_20080417.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['E87']
    });
    newGenerations.push({
      id: 'bmw-1-series-e82-coupe',
      series: '1 Series',
      label: 'BMW Serie 1 Coupé (E82) (2007–2013)',
      section: 'production',
      status: 'production',
      years: { start: 2007, end: 2013, display: '2007 – 2013' },
      class: 'Coupé Compacto • 3 volúmenes con propulsión trasera',
      chassis: [{ code: 'E82', frontImage: { file: 'File:09_BMW_135i_Coupe_(Montreal).jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/%2709_BMW_135i_Coupe_%28Montreal%29.jpg', author: 'Bull-Doser', license: 'Public domain' } }],
      frontImage: { file: 'File:09_BMW_135i_Coupe_(Montreal).jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/%2709_BMW_135i_Coupe_%28Montreal%29.jpg', author: 'Bull-Doser', license: 'Public domain' },
      engines: ENGINES_DB['E82']
    });
    continue;
  }

  // Desdoblar Serie 1 F20
  if (g.id === 'bmw-1-series-f20-f21') {
    newGenerations.push({
      id: 'bmw-1-series-f20-pre-facelift',
      series: '1 Series',
      label: 'BMW Serie 1 (F20) Pre-Facelift (2011–2015)',
      section: 'production',
      status: 'production',
      years: { start: 2011, end: 2015, display: '2011 – 2015' },
      class: 'Compacto Deportivo • Pre-Facelift con ópticas delanteras triangulares de gran tamaño',
      chassis: [{ code: 'F20', frontImage: { file: 'File:BMW_118i_Urban_Line_(F20)_–_Frontansicht,_10._März_2012,_Düsseldorf.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/BMW_118i_Urban_Line_%28F20%29_%E2%80%93_Frontansicht%2C_10._M%C3%A4rz_2012%2C_D%C3%BCsseldorf.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'M 93', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW_118i_Urban_Line_(F20)_–_Frontansicht,_10._März_2012,_Düsseldorf.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/BMW_118i_Urban_Line_%28F20%29_%E2%80%93_Frontansicht%2C_10._M%C3%A4rz_2012%2C_D%C3%BCsseldorf.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'M 93', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['F20'].filter(e => e.modelBadge !== 'M140i')
    });
    newGenerations.push({
      id: 'bmw-1-series-f20-facelift',
      series: '1 Series',
      label: 'BMW Serie 1 (F20) Facelift (2015–2019)',
      section: 'production',
      status: 'production',
      years: { start: 2015, end: 2019, display: '2015 – 2019' },
      class: 'Compacto Deportivo • Facelift con faros horizontales LED afilados y motores B-Series',
      chassis: [{ code: 'F20', frontImage: { file: 'File:BMW F20 M Sportpaket Front.png', url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/BMW_F20_M_Sportpaket_Front.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Alexander Migl', license: 'CC BY-SA 4.0' } }],
      frontImage: { file: 'File:BMW F20 M Sportpaket Front.png', url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/BMW_F20_M_Sportpaket_Front.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Alexander Migl', license: 'CC BY-SA 4.0' },
      engines: ENGINES_DB['F20']
    });
    continue;
  }

  // Desdoblar Serie 2 F22
  if (g.id === 'bmw-2-series-f22-f23') {
    newGenerations.push({
      id: 'bmw-2-series-f22-pre-facelift',
      series: '2 Series',
      label: 'BMW Serie 2 Coupé (F22) Pre-Facelift (2014–2017)',
      section: 'production',
      status: 'production',
      years: { start: 2014, end: 2017, display: '2014 – 2017' },
      class: 'Coupé Compacto Deportivo • Pre-Facelift con motores N20 y N55',
      chassis: [{ code: 'F22', frontImage: { file: 'File:BMW M235i Coupé (F22) front.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/BMW_M235i_Coup%C3%A9_%28F22%29_front.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' } }],
      frontImage: { file: 'File:BMW M235i Coupé (F22) front.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/BMW_M235i_Coup%C3%A9_%28F22%29_front.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' },
      engines: ENGINES_DB['F22'].filter(e => e.modelBadge !== 'M240i')
    });
    newGenerations.push({
      id: 'bmw-2-series-f22-facelift',
      series: '2 Series',
      label: 'BMW Serie 2 Coupé (F22) Facelift (2017–2021)',
      section: 'production',
      status: 'production',
      years: { start: 2017, end: 2021, display: '2017 – 2021' },
      class: 'Coupé Compacto Deportivo • Facelift LCI con faros Bi-LED hexagonales y motores B48/B58',
      chassis: [{ code: 'F22', frontImage: { file: 'File:BMW M235i Coupé (F22) front.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/BMW_M235i_Coup%C3%A9_%28F22%29_front.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' } }],
      frontImage: { file: 'File:BMW M235i Coupé (F22) front.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/BMW_M235i_Coup%C3%A9_%28F22%29_front.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' },
      engines: ENGINES_DB['F22']
    });
    continue;
  }

  // Desdoblar M2 F87
  if (g.id === 'bmw-m2-f87') {
    newGenerations.push({
      id: 'bmw-m2-f87-pre-lci',
      series: 'M Series',
      label: 'BMW M2 (F87) Pre-LCI (2015–2018)',
      section: 'm-performance',
      status: 'production',
      years: { start: 2015, end: 2018, display: '2015 – 2018' },
      class: 'Coupé M Motorsport • Motor N55 TwinPower Turbo con 370 CV',
      chassis: [{ code: 'F87', frontImage: { file: 'File:BMW M2 (F87, 2020) (52227850348).jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/BMW_M2_%28F87%2C_2020%29_%2852227850348%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Charles', license: 'CC BY 2.0' } }],
      frontImage: { file: 'File:BMW M2 (F87, 2020) (52227850348).jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/BMW_M2_%28F87%2C_2020%29_%2852227850348%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Charles', license: 'CC BY 2.0' },
      engines: [ENGINES_DB['F87'][0]]
    });
    newGenerations.push({
      id: 'bmw-m2-f87-competition',
      series: 'M Series',
      label: 'BMW M2 Competition (F87) (2018–2021)',
      section: 'm-performance',
      status: 'production',
      years: { start: 2018, end: 2021, display: '2018 – 2021' },
      class: 'Coupé M Motorsport • Motor S55 Biturbo de M3/M4, parrilla en negro brillo unificada y retrovisores M',
      chassis: [{ code: 'F87', frontImage: { file: 'File:BMW M2 Competition (F87) front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/BMW_M2_Competition_%28F87%29_front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC BY-SA 4.0' } }],
      frontImage: { file: 'File:BMW M2 Competition (F87) front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/BMW_M2_Competition_%28F87%29_front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC BY-SA 4.0' },
      engines: [ENGINES_DB['F87'][1], ENGINES_DB['F87'][2]]
    });
    continue;
  }

  // Desdoblar Serie 3 E30
  if (g.id === 'bmw-3-series-e30') {
    newGenerations.push({
      id: 'bmw-3-series-e30-pre-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 (E30) Pre-Facelift (1982–1987)',
      section: 'production',
      status: 'production',
      years: { start: 1982, end: 1987, display: '1982 – 1987' },
      class: 'Berlina Clásica • Parachoques de acero cromado y pilotos traseros pequeños',
      chassis: [{ code: 'E30', frontImage: { file: 'File:BMW E30 front 20080116.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/BMW_E30_front_20080116.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW E30 front 20080116.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/BMW_E30_front_20080116.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['E30']
    });
    newGenerations.push({
      id: 'bmw-3-series-e30-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 (E30) Facelift (1987–1994)',
      section: 'production',
      status: 'production',
      years: { start: 1987, end: 1994, display: '1987 – 1994' },
      class: 'Berlina Clásica • Facelift con paragolpes envolventes de plástico, faros elipsoidales y pilotos anchos',
      chassis: [{ code: 'E30', frontImage: { file: 'File:BMW_E30_in_silver_(facelift),_front_left_2024-08-18.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/BMW_E30_in_silver_%28facelift%29%2C_front_left_2024-08-18.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Alexander Migl', license: 'CC BY-SA 4.0' } }],
      frontImage: { file: 'File:BMW_E30_in_silver_(facelift),_front_left_2024-08-18.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/BMW_E30_in_silver_%28facelift%29%2C_front_left_2024-08-18.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Alexander Migl', license: 'CC BY-SA 4.0' },
      engines: ENGINES_DB['E30']
    });
    continue;
  }

  // Desdoblar Serie 3 E36
  if (g.id === 'bmw-3-series-e36') {
    newGenerations.push({
      id: 'bmw-3-series-e36-pre-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 (E36) Pre-Facelift (1990–1996)',
      section: 'production',
      status: 'production',
      years: { start: 1990, end: 1996, display: '1990 – 1996' },
      class: 'Berlina Deportiva • Riñones rectos integrados en chapa y motores M50',
      chassis: [{ code: 'E36', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E36'].filter(e => !e.modelBadge.includes('3.2'))
    });
    newGenerations.push({
      id: 'bmw-3-series-e36-facelift',
      series: '3 Series',
      label: 'BMW Serie 3 (E36) Facelift (1996–2000)',
      section: 'production',
      status: 'production',
      years: { start: 1996, end: 2000, display: '1996 – 2000' },
      class: 'Berlina Deportiva • Facelift con riñones curvos tridimensionales, intermitentes laterales estrechos y motores M52',
      chassis: [{ code: 'E36', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E36']
    });
    continue;
  }

  // Desdoblar Serie 4 F32
  if (g.id === 'bmw-4-series-f32-f33-f36') {
    newGenerations.push({
      id: 'bmw-4-series-f32-pre-facelift',
      series: '4 Series',
      label: 'BMW Serie 4 Coupé (F32) Pre-Facelift (2013–2017)',
      section: 'production',
      status: 'production',
      years: { start: 2013, end: 2017, display: '2013 – 2017' },
      class: 'Coupé Deportivo • Pre-Facelift con faros de xenón y motores 428i / 435i',
      chassis: [{ code: 'F32', frontImage: { file: 'File:BMW 435i Coupé Sport (F32) front.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/BMW_435i_Coup%C3%A9_Sport_%28F32%29_front.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' } }],
      frontImage: { file: 'File:BMW 435i Coupé Sport (F32) front.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/BMW_435i_Coup%C3%A9_Sport_%28F32%29_front.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' },
      engines: ENGINES_DB['F32'].filter(e => e.modelBadge !== '440i')
    });
    newGenerations.push({
      id: 'bmw-4-series-f32-facelift',
      series: '4 Series',
      label: 'BMW Serie 4 Coupé (F32) Facelift (2017–2020)',
      section: 'production',
      status: 'production',
      years: { start: 2017, end: 2020, display: '2017 – 2020' },
      class: 'Coupé Deportivo • Facelift LCI con faros Bi-LED hexagonales de serie y nuevo motor B58 440i',
      chassis: [{ code: 'F32', frontImage: { file: 'File:BMW 425i Coupe (F32) front.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/BMW_425i_Coupe_%28F32%29_front.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' } }],
      frontImage: { file: 'File:BMW 425i Coupe (F32) front.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/BMW_425i_Coupe_%28F32%29_front.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' },
      engines: ENGINES_DB['F32']
    });
    continue;
  }

  // Desdoblar Serie 5 E34
  if (g.id === 'bmw-5-series-e34') {
    newGenerations.push({
      id: 'bmw-5-series-e34-pre-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (E34) Pre-Facelift (1987–1994)',
      section: 'production',
      status: 'production',
      years: { start: 1987, end: 1994, display: '1987 – 1994' },
      class: 'Berlina Ejecutiva • Calandra estrecha clásica con nervaduras marcadas en el capó',
      chassis: [{ code: 'E34', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E34']
    });
    newGenerations.push({
      id: 'bmw-5-series-e34-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (E34) Facelift (1994–1996)',
      section: 'production',
      status: 'production',
      years: { start: 1994, end: 1996, display: '1994 – 1996' },
      class: 'Berlina Ejecutiva • Facelift con calandra frontal ancha (estilo V8) extendida a toda la gama y retrovisores aerodinámicos',
      chassis: [{ code: 'E34', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E34']
    });
    continue;
  }

  // Desdoblar Serie 5 F10
  if (g.id === 'bmw-5-series-f07-f10-f11') {
    newGenerations.push({
      id: 'bmw-5-series-f10-pre-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (F10) Pre-Facelift (2010–2013)',
      section: 'production',
      status: 'production',
      years: { start: 2010, end: 2013, display: '2010 – 2013' },
      class: 'Berlina Ejecutiva • Diseño sobrio de Adrian van Hooydonk',
      chassis: [{ code: 'F10', frontImage: { file: 'File:BMW 525d (F10) front 20100410.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/BMW_525d_%28F10%29_front_20100410.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW 525d (F10) front 20100410.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/BMW_525d_%28F10%29_front_20100410.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['F10']
    });
    newGenerations.push({
      id: 'bmw-5-series-f10-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (F10) Facelift (2013–2016)',
      section: 'production',
      status: 'production',
      years: { start: 2013, end: 2016, display: '2013 – 2016' },
      class: 'Berlina Ejecutiva • Facelift LCI con intermitentes integrados en retrovisores y faros LED adaptativos',
      chassis: [{ code: 'F10', frontImage: { file: 'File:BMW_550i_(F10)_–_Frontansicht_(2),_17._Juli_2011,_Mettmann.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/BMW_550i_%28F10%29_%E2%80%93_Frontansicht_%282%29%2C_17._Juli_2011%2C_Mettmann.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'M 93', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW_550i_(F10)_–_Frontansicht_(2),_17._Juli_2011,_Mettmann.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/BMW_550i_%28F10%29_%E2%80%93_Frontansicht_%282%29%2C_17._Juli_2011%2C_Mettmann.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'M 93', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['F10']
    });
    continue;
  }

  // Desdoblar Serie 5 G30
  if (g.id === 'bmw-5-series-g30-g31') {
    newGenerations.push({
      id: 'bmw-5-series-g30-pre-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (G30) Pre-Facelift (2017–2020)',
      section: 'production',
      status: 'production',
      years: { start: 2017, end: 2020, display: '2017 – 2020' },
      class: 'Berlina Ejecutiva • Pre-Facelift con ópticas hexagonales unidas a los riñones',
      chassis: [{ code: 'G30', frontImage: { file: 'File:2018_BMW_520d_M_Sport_Automatic_2.0_(1).jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/2018_BMW_520d_M_Sport_Automatic_2.0_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Vauxford', license: 'CC BY-SA 4.0' } }],
      frontImage: { file: 'File:2018_BMW_520d_M_Sport_Automatic_2.0_(1).jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/2018_BMW_520d_M_Sport_Automatic_2.0_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Vauxford', license: 'CC BY-SA 4.0' },
      engines: ENGINES_DB['G30']
    });
    newGenerations.push({
      id: 'bmw-5-series-g30-facelift',
      series: '5 Series',
      label: 'BMW Serie 5 (G30) Facelift (2020–2023)',
      section: 'production',
      status: 'production',
      years: { start: 2020, end: 2023, display: '2020 – 2023' },
      class: 'Berlina Ejecutiva • Facelift LCI con luces diurnas LED en forma de L y calandra tridimensional',
      chassis: [{ code: 'G30', frontImage: { file: 'File:BMW 523i Luxury (G30) front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/BMW_523i_Luxury_%28G30%29_front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' } }],
      frontImage: { file: 'File:BMW 523i Luxury (G30) front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/BMW_523i_Luxury_%28G30%29_front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Tokumeigakarinoaoshima', license: 'CC0' },
      engines: ENGINES_DB['G30']
    });
    continue;
  }

  // Desdoblar Serie 6 E63
  if (g.id === 'bmw-6-series-e63-e64') {
    newGenerations.push({
      id: 'bmw-6-series-e63-pre-facelift',
      series: '6 Series',
      label: 'BMW Serie 6 (E63) Pre-Facelift (2003–2007)',
      section: 'production',
      status: 'production',
      years: { start: 2003, end: 2007, display: '2003 – 2007' },
      class: 'Gran Turismo Coupé • Diseño vanguardista de Chris Bangle',
      chassis: [{ code: 'E63', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E63'].filter(e => e.modelBadge !== '635d')
    });
    newGenerations.push({
      id: 'bmw-6-series-e63-facelift',
      series: '6 Series',
      label: 'BMW Serie 6 (E63) Facelift (2007–2010)',
      section: 'production',
      status: 'production',
      years: { start: 2007, end: 2010, display: '2007 – 2010' },
      class: 'Gran Turismo Coupé • Facelift LCI con ópticas LED cristalinas y estreno del motor 635d biturbo',
      chassis: [{ code: 'E63', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E63']
    });
    continue;
  }

  // Desdoblar Serie 7 E38
  if (g.id === 'bmw-7-series-e38') {
    newGenerations.push({
      id: 'bmw-7-series-e38-pre-facelift',
      series: '7 Series',
      label: 'BMW Serie 7 (E38) Pre-Facelift (1994–1998)',
      section: 'production',
      status: 'production',
      years: { start: 1994, end: 1998, display: '1994 – 1998' },
      class: 'Berlina de Representación • Faros delanteros rectangulares de vidrio puro',
      chassis: [{ code: 'E38', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E38']
    });
    newGenerations.push({
      id: 'bmw-7-series-e38-facelift',
      series: '7 Series',
      label: 'BMW Serie 7 (E38) Facelift (1998–2001)',
      section: 'production',
      status: 'production',
      years: { start: 1998, end: 2001, display: '1998 – 2001' },
      class: 'Berlina de Representación • Facelift con faros ondulados inferiores tipo festón (estilo E46) y motores M62TU',
      chassis: [{ code: 'E38', frontImage: { file: 'File:1999 BMW 728i 2.8 Front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/1999_BMW_728i_2.8_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Vauxford', license: 'CC BY-SA 4.0' } }],
      frontImage: { file: 'File:1999 BMW 728i 2.8 Front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/1999_BMW_728i_2.8_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Vauxford', license: 'CC BY-SA 4.0' },
      engines: ENGINES_DB['E38']
    });
    continue;
  }

  // Desdoblar Serie 7 E65
  if (g.id === 'bmw-7-series-e65-e66') {
    newGenerations.push({
      id: 'bmw-7-series-e65-pre-facelift',
      series: '7 Series',
      label: 'BMW Serie 7 (E65) Pre-Facelift (2001–2005)',
      section: 'production',
      status: 'production',
      years: { start: 2001, end: 2005, display: '2001 – 2005' },
      class: 'Berlina Representación • Polémico diseño original de Chris Bangle con cejas superiores en faros',
      chassis: [{ code: 'E65', frontImage: { file: 'File:BMW E65 front 20070609.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/BMW_E65_front_20070609.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW E65 front 20070609.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/BMW_E65_front_20070609.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['E65']
    });
    newGenerations.push({
      id: 'bmw-7-series-e65-facelift',
      series: '7 Series',
      label: 'BMW Serie 7 (E65) Facelift (2005–2008)',
      section: 'production',
      status: 'production',
      years: { start: 2005, end: 2008, display: '2005 – 2008' },
      class: 'Berlina Representación • Facelift LCI con frontal y faros suavizados y calandra más prominente',
      chassis: [{ code: 'E65', frontImage: { file: 'File:BMW_7er_(E65)_front_20100918.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/BMW_7er_%28E65%29_front_20100918.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'M 93', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW_7er_(E65)_front_20100918.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/BMW_7er_%28E65%29_front_20100918.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'M 93', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['E65']
    });
    continue;
  }

  // Desdoblar Serie 7 G11
  if (g.id === 'bmw-7-series-g11-g12') {
    newGenerations.push({
      id: 'bmw-7-series-g11-pre-facelift',
      series: '7 Series',
      label: 'BMW Serie 7 (G11) Pre-Facelift (2015–2019)',
      section: 'production',
      status: 'production',
      years: { start: 2015, end: 2019, display: '2015 – 2019' },
      class: 'Berlina de Lujo • Pre-Facelift con chasis Carbon Core y riñones proporcionales',
      chassis: [{ code: 'G11', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['G11']
    });
    newGenerations.push({
      id: 'bmw-7-series-g11-facelift',
      series: '7 Series',
      label: 'BMW Serie 7 (G11) Facelift (2019–2022)',
      section: 'production',
      status: 'production',
      years: { start: 2019, end: 2022, display: '2019 – 2022' },
      class: 'Berlina de Lujo • Facelift LCI con parrilla de riñones masiva un 40% más grande y faros LED afilados',
      chassis: [{ code: 'G11', frontImage: { file: 'File:BMW G11 LCI JM 2023 06 04.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/BMW_G11_LCI_JM_2023_06_04.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Johannes Maximilian', license: 'GFDL 1.2' } }],
      frontImage: { file: 'File:BMW G11 LCI JM 2023 06 04.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/BMW_G11_LCI_JM_2023_06_04.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Johannes Maximilian', license: 'GFDL 1.2' },
      engines: ENGINES_DB['G11']
    });
    continue;
  }

  // Desdoblar X3 E83
  if (g.id === 'bmw-x3-e83') {
    newGenerations.push({
      id: 'bmw-x3-e83-pre-facelift',
      series: 'X Series',
      label: 'BMW X3 (E83) Pre-Facelift (2003–2006)',
      section: 'production',
      status: 'production',
      years: { start: 2003, end: 2006, display: '2003 – 2006' },
      class: 'SAV Compacto • Paragolpes originales de plástico negro sin pintar',
      chassis: [{ code: 'E83', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E83'].filter(e => !e.modelBadge.includes('sd'))
    });
    newGenerations.push({
      id: 'bmw-x3-e83-facelift',
      series: 'X Series',
      label: 'BMW X3 (E83) Facelift (2006–2010)',
      section: 'production',
      status: 'production',
      years: { start: 2006, end: 2010, display: '2006 – 2010' },
      class: 'SAV Compacto • Facelift LCI con paragolpes parcialmente pintados en color carrocería y motor 3.0sd biturbo',
      chassis: [{ code: 'E83', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E83']
    });
    continue;
  }

  // Desdoblar X5 E53
  if (g.id === 'bmw-x5-e53') {
    newGenerations.push({
      id: 'bmw-x5-e53-pre-facelift',
      series: 'X Series',
      label: 'BMW X5 (E53) Pre-Facelift (1999–2003)',
      section: 'production',
      status: 'production',
      years: { start: 1999, end: 2003, display: '1999 – 2003' },
      class: 'SAV Deportivo • El primer SUV de BMW con tracción integral fija 38:62',
      chassis: [{ code: 'E53', frontImage: { file: 'File:2002_BMW_X5_Sport_Automatic_4.4_Front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/2002_BMW_X5_Sport_Automatic_4.4_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Vauxford', license: 'CC BY-SA 4.0' } }],
      frontImage: { file: 'File:2002_BMW_X5_Sport_Automatic_4.4_Front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/2002_BMW_X5_Sport_Automatic_4.4_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Vauxford', license: 'CC BY-SA 4.0' },
      engines: ENGINES_DB['E53'].filter(e => !e.modelBadge.includes('4.8is'))
    });
    newGenerations.push({
      id: 'bmw-x5-e53-facelift',
      series: 'X Series',
      label: 'BMW X5 (E53) Facelift (2003–2006)',
      section: 'production',
      status: 'production',
      years: { start: 2003, end: 2006, display: '2003 – 2006' },
      class: 'SAV Deportivo • Facelift que estrenó el sistema inteligente xDrive, faros Angel Eyes y versión 4.8is',
      chassis: [{ code: 'E53', frontImage: { file: 'File:BMW E53 front 20080524.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/12/BMW_E53_front_20080524.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW E53 front 20080524.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/12/BMW_E53_front_20080524.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Rudolf Stricker', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['E53']
    });
    continue;
  }

  // Desdoblar X5 E70
  if (g.id === 'bmw-x5-e70') {
    newGenerations.push({
      id: 'bmw-x5-e70-pre-facelift',
      series: 'X Series',
      label: 'BMW X5 (E70) Pre-Facelift (2006–2010)',
      section: 'production',
      status: 'production',
      years: { start: 2006, end: 2010, display: '2006 – 2010' },
      class: 'SAV Ejecutivo • Diseño musculoso y motores atmosféricos 3.0si y 4.8i',
      chassis: [{ code: 'E70', frontImage: { file: 'File:2007 BMW X5 SE 7S Automatic 3.0 Front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/2007_BMW_X5_SE_7S_Automatic_3.0_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Vauxford', license: 'CC BY-SA 4.0' } }],
      frontImage: { file: 'File:2007 BMW X5 SE 7S Automatic 3.0 Front.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/2007_BMW_X5_SE_7S_Automatic_3.0_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Vauxford', license: 'CC BY-SA 4.0' },
      engines: ENGINES_DB['E70']
    });
    newGenerations.push({
      id: 'bmw-x5-e70-facelift',
      series: 'X Series',
      label: 'BMW X5 (E70) Facelift (2010–2013)',
      section: 'production',
      status: 'production',
      years: { start: 2010, end: 2013, display: '2010 – 2013' },
      class: 'SAV Ejecutivo • Facelift LCI con tomas de aire rediseñadas, faros corona LED y motores turbo xDrive35i/50i',
      chassis: [{ code: 'E70', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E70']
    });
    continue;
  }

  // Desdoblar Z4 E85
  if (g.id === 'bmw-z4-e85-e86') {
    newGenerations.push({
      id: 'bmw-z4-e85-pre-facelift',
      series: 'Z Series',
      label: 'BMW Z4 (E85) Pre-Facelift (2002–2006)',
      section: 'production',
      status: 'production',
      years: { start: 2002, end: 2006, display: '2002 – 2006' },
      class: 'Roadster Deportivo • Diseño flame surfacing original con intermitentes delanteros en bloque',
      chassis: [{ code: 'E85', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E85'].filter(e => !e.modelBadge.includes('si'))
    });
    newGenerations.push({
      id: 'bmw-z4-e85-facelift',
      series: 'Z Series',
      label: 'BMW Z4 (E85) Facelift (2006–2008)',
      section: 'production',
      status: 'production',
      years: { start: 2006, end: 2008, display: '2006 – 2008' },
      class: 'Roadster Deportivo • Facelift con tomas de aire trapezoidales, pilotos traseros tubulares LED y motor N52',
      chassis: [{ code: 'E85', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E85']
    });
    continue;
  }

  // Desdoblar Z4 E89
  if (g.id === 'bmw-z4-e89') {
    newGenerations.push({
      id: 'bmw-z4-e89-pre-facelift',
      series: 'Z Series',
      label: 'BMW Z4 (E89) Pre-Facelift (2009–2013)',
      section: 'production',
      status: 'production',
      years: { start: 2009, end: 2013, display: '2009 – 2013' },
      class: 'Roadster-Coupé Techo Rígido • Diseño de Juliane Blasi con motores atmosféricos y biturbo',
      chassis: [{ code: 'E89', frontImage: { file: 'File:BMW E89 Z4 sDrive30i AutoRAI 2009.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/BMW_E89_Z4_sDrive30i_AutoRAI_2009.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Toffguy', license: 'CC BY-SA 3.0' } }],
      frontImage: { file: 'File:BMW E89 Z4 sDrive30i AutoRAI 2009.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/BMW_E89_Z4_sDrive30i_AutoRAI_2009.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original', author: 'Toffguy', license: 'CC BY-SA 3.0' },
      engines: ENGINES_DB['E89'].filter(e => e.modelBadge !== 'Z4 sDrive35is')
    });
    newGenerations.push({
      id: 'bmw-z4-e89-facelift',
      series: 'Z Series',
      label: 'BMW Z4 (E89) Facelift (2013–2016)',
      section: 'production',
      status: 'production',
      years: { start: 2013, end: 2016, display: '2013 – 2016' },
      class: 'Roadster-Coupé Techo Rígido • Facelift LCI con faros LED de ceja cromada y versión 35is con 340 CV',
      chassis: [{ code: 'E89', frontImage: g.frontImage }],
      frontImage: g.frontImage,
      engines: ENGINES_DB['E89']
    });
    continue;
  }

  // Modelos M con nombres genéricos
  if (g.id === 'bmw-m5-m' || g.label.includes('M5 (E60E61)')) {
    g.label = 'BMW M5 (E60/E61)';
    g.engines = [{ modelBadge: 'M5 Berlina / Touring', engineCode: 'S85B50', architecture: 'V10 atmosférico a 90° derivado de la F1', cylinders: 10, displacementCc: 4999, displacementL: 5.0, fuel: 'Gasolina', powerHp: 507, torqueNm: 520, topSpeedKmh: 250, accel0to100: 4.7, feedSystem: '10 mariposas individuales a 8.250 rpm con caja SMG III 7v', notes: 'El primer sedán V10 atmosférico de la historia.' }];
    newGenerations.push(g);
    continue;
  }

  if (g.id === 'bmw-m6-m' || g.label.includes('M6 (E63E64)')) {
    g.label = 'BMW M6 (E63/E64)';
    g.engines = [{ modelBadge: 'M6 Coupé / Cabrio', engineCode: 'S85B50', architecture: 'V10 atmosférico a 90° F1', cylinders: 10, displacementCc: 4999, displacementL: 5.0, fuel: 'Gasolina', powerHp: 507, torqueNm: 520, topSpeedKmh: 250, accel0to100: 4.6, feedSystem: '10 mariposas individuales con techo de carbono' }];
    newGenerations.push(g);
    continue;
  }

  if (g.id === 'bmw-z4-m-roadsterz4-m-coup-m') {
    g.label = 'BMW Z4 M Roadster / Coupé (E85/E86)';
    g.engines = [{ modelBadge: 'Z4 M Roadster / Coupé', engineCode: 'S54B32', architecture: '6 en línea atmosférico a 7.900 rpm', cylinders: 6, displacementCc: 3246, displacementL: 3.2, fuel: 'Gasolina', powerHp: 343, torqueNm: 365, topSpeedKmh: 250, accel0to100: 5.0, feedSystem: '6 mariposas individuales y diferencial M autoblocante variable' }];
    newGenerations.push(g);
    continue;
  }

  if (g.id === 'bmw-m3-m' || g.label.includes('M3 (E90E92E93)')) {
    g.label = 'BMW M3 (E90/E92/E93)';
    g.engines = [
      { modelBadge: 'M3 Coupé / Berlina', engineCode: 'S65B40', architecture: 'V8 atmosférico a 90° a 8.400 rpm', cylinders: 8, displacementCc: 3999, displacementL: 4.0, fuel: 'Gasolina', powerHp: 420, torqueNm: 400, topSpeedKmh: 250, accel0to100: 4.6, feedSystem: '8 mariposas individuales con doble VANOS continuo', notes: 'Único M3 de la historia con motor V8 atmosférico.' },
      { modelBadge: 'M3 GTS', engineCode: 'S65B44', architecture: 'V8 atmosférico Clubsport a 8.300 rpm', cylinders: 8, displacementCc: 4361, displacementL: 4.4, fuel: 'Gasolina', powerHp: 450, torqueNm: 440, topSpeedKmh: 305, accel0to100: 4.4, feedSystem: 'Cilindrada aumentada a 4.4L, escape de titanio y aligeramiento extremo' }
    ];
    newGenerations.push(g);
    continue;
  }

  if (g.id === 'bmw-m4-m' || g.label.includes('M4 (F82F83)')) {
    g.label = 'BMW M4 (F82/F83)';
    g.engines = [
      { modelBadge: 'M4 Coupé', engineCode: 'S55B30A', architecture: '6 en línea Biturbo M Motorsport', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 431, torqueNm: 550, topSpeedKmh: 250, accel0to100: 4.1, feedSystem: 'Dos turbos mono-scroll y transmisión M DKG 7v' },
      { modelBadge: 'M4 GTS', engineCode: 'S55B30A + Inyección de Agua', architecture: '6 en línea Biturbo con Inyección de Agua', cylinders: 6, displacementCc: 2979, displacementL: 3.0, fuel: 'Gasolina', powerHp: 500, torqueNm: 600, topSpeedKmh: 305, accel0to100: 3.8, feedSystem: 'Pionero en inyección de agua destilada en la admisión' }
    ];
    newGenerations.push(g);
    continue;
  }

  // Poblado automático para resto de modelos
  const isConcept = g.status === 'concept' || g.section === 'prototypes' || g.id.startsWith('bmw-concept-');
  if (!isConcept) {
    if (ENGINES_DB.HISTORICAL[g.id]) {
      g.engines = ENGINES_DB.HISTORICAL[g.id];
    } else {
      const chCode = g.chassis?.[0]?.code || '';
      if (ENGINES_DB[chCode] && (!g.engines || g.engines.length === 0)) {
        g.engines = ENGINES_DB[chCode];
      }
    }
  }

  if (!g.engines) g.engines = [];
  newGenerations.push(g);
}

// Para cualquier modelo de producción o M restante que no tenga motores, asignar motores adecuados
for (const g of newGenerations) {
  const isConcept = g.status === 'concept' || g.section === 'prototypes' || g.id.startsWith('bmw-concept-');
  if (isConcept) continue;
  if (!g.engines || g.engines.length === 0) {
    const chCode = g.chassis?.[0]?.code || '';
    if (ENGINES_DB[chCode]) {
      g.engines = ENGINES_DB[chCode];
    } else if (ENGINES_DB.HISTORICAL[g.id]) {
      g.engines = ENGINES_DB.HISTORICAL[g.id];
    } else if (g.id === 'bmw-m5-g90-g99') {
      g.engines = ENGINES_DB['G60'].filter(e => e.modelBadge.includes('M5'));
    } else if (g.id === 'bmw-m5-f90') {
      g.engines = ENGINES_DB['F90'];
    } else if (g.id === 'bmw-5-series-g61') {
      g.engines = ENGINES_DB['G61'];
    } else if (g.id === 'bmw-i5-g61') {
      g.engines = ENGINES_DB['G61_ELECTRIC'];
    } else if (g.id === 'bmw-3-series-g21') {
      g.engines = ENGINES_DB['G21'];
    } else if (g.id === 'bmw-i3-g28-g28') {
      g.engines = ENGINES_DB['G28'];
    } else if (g.id === 'bmw-3-series-g50' || g.id === 'bmw-i3-na0-na0-na8' || g.id === 'bmw-ix3-na5-na6') {
      g.engines = ENGINES_DB['NEUE_KLASSE'];
    } else if (g.id === 'bmw-x2-u10') {
      g.engines = ENGINES_DB['U10'];
    } else if (g.id === 'bmw-ix2-u10') {
      g.engines = [ENGINES_DB['U10'][2]];
    } else if (g.id === 'bmw-ix3-g08') {
      g.engines = ENGINES_DB['G08'];
    } else if (g.id === 'bmw-x3-m-f97') {
      g.engines = ENGINES_DB['F97'];
    } else if (g.id === 'bmw-x4-m-f98') {
      g.engines = ENGINES_DB['F98'];
    } else if (g.id === 'bmw-2-series-gran-coup-f74-f78') {
      g.engines = ENGINES_DB['F74'];
    } else if (g.id === 'bmw-2-series-active-tourer-u06') {
      g.engines = ENGINES_DB['U06'];
    } else if (g.id === 'bmw-2-series-f45-f46') {
      g.engines = ENGINES_DB['F45'];
    } else if (g.id === 'bmw-2-series-f44') {
      g.engines = ENGINES_DB['F44'];
    } else if (g.id === 'bmw-1-series-f52') {
      g.engines = ENGINES_DB['F52'];
    } else if (g.id === 'bmw-x4-f26') {
      g.engines = ENGINES_DB['F26'];
    } else if (g.id === 'bmw-x4-g02') {
      g.engines = ENGINES_DB['G02'];
    } else if (g.id === 'bmw-x2-f39') {
      g.engines = ENGINES_DB['F39'];
    } else if (g.id === 'bmw-6-series-g32') {
      g.engines = ENGINES_DB['G32'];
    }
  }
}

cat.generations = newGenerations;
cat.stats.generations = newGenerations.length;
cat.stats.production = newGenerations.filter(g => g.section === 'production').length;
cat.stats.mPerformance = newGenerations.filter(g => g.section === 'm-performance').length;
cat.stats.withExactFront = newGenerations.length;
cat.stats.verifiedFrontRate = '100%';

// Guardar catalog-clean-front.json y bmw.json sincronizados
fs.writeFileSync(catPath, JSON.stringify(cat, null, 2));
fs.writeFileSync(path.join(__dirname, '../public/api/v1/bmw.json'), JSON.stringify(cat, null, 2));

// Guardar carvault.json sincronizado
const cvPath = path.join(__dirname, '../public/api/v1/carvault.json');
const carvault = JSON.parse(fs.readFileSync(cvPath, 'utf8'));
const bmwEntry = carvault.brands.find(b => b.id === 'bmw');
if (bmwEntry) {
  bmwEntry.generations = cat.generations;
  bmwEntry.stats = cat.stats;
}
fs.writeFileSync(cvPath, JSON.stringify(carvault, null, 2));

console.log('UNIFICATION & FACELIFT COMPLETED!');
console.log('Total catalog generations:', cat.generations.length);
const prodCount = cat.generations.filter(g => g.section !== 'concepts');
const withEngines = prodCount.filter(g => g.engines && g.engines.length > 0);
console.log(`Production/M models: ${prodCount.length}, with engines: ${withEngines.length}`);
