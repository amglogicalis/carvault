import fs from 'fs';
import path from 'path';
import { evaluateFrontPerspective } from './image-guard';

/**
 * Script de Unificación Generacional de BMW (Opción A)
 * Estandariza BMW a la arquitectura de Mercedes y Lexus:
 * - Una ficha por Generación + Fase (Pre-LCI vs LCI) + Modelos M Motorsport
 * - Unificación de carrocerías (Sedán, Touring, Coupé, Cabrio, Gran Coupé) en su chasis
 * - Eliminación de duplicados accidentales
 * - Foco en modelos históricos legendarios y conceptos clave
 * - Blindaje de imágenes frontales con Image Guard
 */

interface Generation {
  id: string;
  series: string;
  label: string;
  section: 'production' | 'm-performance' | 'concept' | 'prototypes';
  status: 'past' | 'current' | 'upcoming';
  years: { start: number | null; end: number | null; display: string };
  class: string;
  chassis: any[];
  frontImage: any;
  engines: any[];
  [key: string]: any;
}

function run() {
  const bmwCatalogPath = path.resolve(process.cwd(), 'data/bmw/catalog-clean-front.json');
  const catalog = JSON.parse(fs.readFileSync(bmwCatalogPath, 'utf8'));
  const originalGenerations: Generation[] = catalog.generations;

  console.log(`📊 Generaciones originales en BMW: ${originalGenerations.length}`);

  // 1. Mapa de fusiones específicas por ID
  const mergeTargets: Record<string, string> = {
    // Serie 1
    'bmw-1-series-e82-coupe': 'bmw-1-series-e87-facelift',
    'bmw-1-series-f52': 'bmw-1-series-f20-facelift',

    // Serie 2
    'bmw-2-series-gran-coup-f74-f78': 'bmw-2-series-g42',
    'bmw-2-series-f44': 'bmw-2-series-f22-facelift',

    // Serie 3
    'bmw-3-series-e46-coupe': 'bmw-3-series-e46-sedan-pre-facelift',
    'bmw-3-series-e92-pre-facelift': 'bmw-3-series-e90-pre-facelift',
    'bmw-3-series-e92-facelift': 'bmw-3-series-e90-facelift',

    // Serie 4
    'bmw-4-series-gran-coup-g26': 'bmw-4-series-g22-g23',

    // Serie 5
    'bmw-5-series-g61': 'bmw-5-series-g60-g68',

    // Gama i (Eléctricos unificados con su serie respectiva o versión)
    'bmw-i5-g61': 'bmw-i5-g60-g68',
    'bmw-i3-g28-g28': 'bmw-i3-i01',
    'bmw-i3-na0-na0-na8': 'bmw-i3-i01',
    'bmw-ix3-na5-na6': 'bmw-ix3-g08',

    // Duplicados accidentales en la base de datos previa
    'bmw-m1': 'bmw-m1-e26',
    'bmw-xm-g09-2': 'bmw-xm-g09',
  };

  // 2. Filtro de coches pre-guerra menores (conservamos los iconos: Dixi 3/15, 328, 507, 503, 700, Isetta, 02 Series, New Six)
  const minorPreWar = new Set([
    'bmw-303', 'bmw-309', 'bmw-315', 'bmw-319', 'bmw-320', 'bmw-321', 
    'bmw-325', 'bmw-326', 'bmw-327', 'bmw-329', 'bmw-335', 'bmw-340', 
    'bmw-501', 'bmw-502', 'bmw-3-20-ps'
  ]);

  // 3. Selección de los prototipos y conceptos más legendarios e icónicos
  const legendaryConcepts = new Set([
    'bmw-concept-2800-spicup',
    'bmw-concept-2200-ti-garmisch',
    'bmw-concept-e25-turbo',
    'bmw-concept-z1-prototype',
    'bmw-concept-m8-e31-prototype',
    'bmw-concept-nazca-c2',
    'bmw-concept-nazca-m12',
    'bmw-concept-z9',
    'bmw-concept-cs',
    'bmw-concept-m1-hommage',
    'bmw-concept-vision-efficientdynamics',
    'bmw-concept-3-0-csl-hommage',
    'bmw-concept-vision-m-next'
  ]);

  // Indexar por ID
  const genMap = new Map<string, Generation>();
  originalGenerations.forEach(g => genMap.set(g.id, JSON.parse(JSON.stringify(g))));

  // Procesar fusiones
  for (const [sourceId, targetId] of Object.entries(mergeTargets)) {
    const source = genMap.get(sourceId);
    const target = genMap.get(targetId);
    if (source && target) {
      if (source.chassis && Array.isArray(source.chassis)) {
        source.chassis.forEach((c: any) => {
          if (!target.chassis.some((tc: any) => tc.code === c.code)) {
            target.chassis.push(c);
          }
        });
      }
      if (source.engines && Array.isArray(source.engines)) {
        source.engines.forEach((e: any) => {
          if (!target.engines.some((te: any) => te.engineCode === e.engineCode && te.modelBadge === e.modelBadge)) {
            target.engines.push(e);
          }
        });
      }
      const sourceScore = evaluateFrontPerspective(source.frontImage || {}).score;
      const targetScore = evaluateFrontPerspective(target.frontImage || {}).score;
      if (sourceScore > targetScore) {
        target.frontImage = source.frontImage;
      }
      genMap.delete(sourceId);
    }
  }

  // Filtrar y normalizar
  const unifiedList: Generation[] = [];
  for (const [id, gen] of genMap.entries()) {
    if (minorPreWar.has(id)) {
      continue;
    }

    if (gen.series === 'Concept / Prototype' || gen.section === 'prototypes') {
      if (!legendaryConcepts.has(id)) {
        continue;
      }
      gen.section = 'concept';
    }

    // Normalizaciones específicas de etiquetas y clases
    if (id === 'bmw-3-series-e46-sedan-pre-facelift') {
      gen.id = 'bmw-3-series-e46-pre-facelift';
      gen.label = 'BMW Serie 3 Berlina / Touring / Coupé (E46 Pre-Facelift)';
      gen.class = 'Serie 3 E46 • Berlina, Touring, Coupé y Cabrio • Pre-Facelift';
    } else if (id === 'bmw-3-series-e46-sedan-facelift') {
      gen.id = 'bmw-3-series-e46-facelift';
      gen.label = 'BMW Serie 3 Berlina / Touring / Compact (E46 Facelift)';
      gen.class = 'Serie 3 E46 • Nueva óptica delantera, motores Valvetronic y diésel common rail';
    } else if (id === 'bmw-3-series-e90-pre-facelift') {
      gen.id = 'bmw-3-series-e90-pre-lci';
      gen.label = 'BMW Serie 3 Berlina / Touring / Coupé (E90/E91/E92 Pre-LCI)';
      gen.class = 'Serie 3 E90 Generación • Berlina, Touring, Coupé y Cabrio • Pre-LCI';
    } else if (id === 'bmw-3-series-e90-facelift') {
      gen.id = 'bmw-3-series-e90-lci';
      gen.label = 'BMW Serie 3 Berlina / Touring / Coupé (E90/E91/E92 LCI)';
      gen.class = 'Serie 3 E90 Generación LCI • Capó esculpido, faros bi-xenón corona LED y luces traseras L';
    } else if (id === 'bmw-3-series-f30-pre-facelift') {
      gen.id = 'bmw-3-series-f30-pre-lci';
      gen.label = 'BMW Serie 3 Berlina / Touring (F30/F31 Pre-LCI)';
    } else if (id === 'bmw-3-series-f30-facelift') {
      gen.id = 'bmw-3-series-f30-lci';
      gen.label = 'BMW Serie 3 Berlina / Touring (F30/F31 LCI)';
    } else if (id === 'bmw-3-series-g21') {
      gen.id = 'bmw-3-series-g20-g21';
      gen.label = 'BMW Serie 3 Berlina / Touring (G20/G21)';
      gen.class = 'Serie 3 G20/G21 • Berlina y Touring • Chasis CLAR con tecnología Mild-Hybrid';
    } else if (id === 'bmw-5-series-g60-g68') {
      gen.label = 'BMW Serie 5 Berlina / Touring (G60/G61)';
      gen.class = 'Serie 5 G60 • Berlina y Touring • Motores Mild-Hybrid 48V y PHEV';
    } else if (id === 'bmw-i5-g60-g68') {
      gen.label = 'BMW i5 Sedán / Touring (G60/G61 BEV)';
    } else if (id === 'bmw-2-series-f22-facelift') {
      gen.label = 'BMW Serie 2 Coupé / Gran Coupé (F22/F44 Facelift)';
    }

    // Curación específica de imágenes flagged
    if (id === 'bmw-z1') {
      gen.frontImage = {
        file: 'File:2018-04-28-Z1-seitliche-Front.jpg',
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/2018-04-28-Z1-seitliche-Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original',
        author: 'Alexander-93',
        license: 'CC BY-SA 4.0',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File%3A2018-04-28-Z1-seitliche-Front.jpg',
        width: 3072,
        height: 2048
      };
      if (gen.chassis && gen.chassis[0]) {
        gen.chassis[0].frontImage = gen.frontImage;
      }
    }

    // Normalización de Series para SUV y Z
    if (/^bmw-x5-/i.test(gen.id)) gen.series = 'X5';
    if (/^bmw-x3-/i.test(gen.id)) gen.series = 'X3';
    if (/^bmw-x6-/i.test(gen.id)) gen.series = 'X6';
    if (/^bmw-x1-/i.test(gen.id)) gen.series = 'X1';
    if (/^bmw-x2-/i.test(gen.id)) gen.series = 'X2';
    if (/^bmw-x4-/i.test(gen.id)) gen.series = 'X4';
    if (/^bmw-x7-/i.test(gen.id)) gen.series = 'X7';
    if (/^bmw-z[1348]/i.test(gen.id)) gen.series = 'Z Series';

    unifiedList.push(gen);
  }

  // Ordenar de forma coherente
  unifiedList.sort((a, b) => {
    const aIsM = a.section === 'm-performance';
    const bIsM = b.section === 'm-performance';
    if (aIsM && !bIsM) return -1;
    if (!aIsM && bIsM) return 1;

    const aIsConcept = a.section === 'concept';
    const bIsConcept = b.section === 'concept';
    if (aIsConcept && !bIsConcept) return 1;
    if (!aIsConcept && bIsConcept) return -1;

    const yearA = a.years?.start || 0;
    const yearB = b.years?.start || 0;
    return yearB - yearA;
  });

  const mCount = unifiedList.filter(g => g.section === 'm-performance').length;
  const prodCount = unifiedList.filter(g => g.section === 'production').length;
  const conceptCount = unifiedList.filter(g => g.section === 'concept').length;
  const totalChassis = unifiedList.reduce((acc, g) => acc + (g.chassis?.length || 1), 0);

  console.log(`✅ Catálogo unificado generado con éxito: ${unifiedList.length} modelos.`);
  console.log(`   • BMW M Motorsport & Performance: ${mCount}`);
  console.log(`   • Modelos de Producción & Clásicos: ${prodCount}`);
  console.log(`   • Hitos Conceptuales / Prototipos: ${conceptCount}`);
  console.log(`   • Chasis y variantes englobadas: ${totalChassis}`);

  const updatedCatalog = {
    brand: { id: 'bmw', name: 'BMW' },
    wikidata: catalog.wikidata,
    generatedAt: new Date().toISOString(),
    stats: {
      totalGenerations: unifiedList.length,
      chassis: totalChassis,
      withExactFront: unifiedList.length,
      mPerformanceCount: mCount,
      productionCount: prodCount,
      conceptCount
    },
    generations: unifiedList
  };

  fs.writeFileSync(bmwCatalogPath, JSON.stringify(updatedCatalog, null, 2), 'utf8');
  fs.writeFileSync(path.resolve(process.cwd(), 'public/api/v1/bmw.json'), JSON.stringify(updatedCatalog, null, 2), 'utf8');
  console.log(`💾 Guardado en data/bmw/catalog-clean-front.json y public/api/v1/bmw.json`);
}

run();
