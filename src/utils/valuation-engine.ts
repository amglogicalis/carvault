/**
 * Carvault Valuation & Depreciation Engine (Mini-IA / Algoritmo Predictivo Paramétrico)
 * 
 * Modela la curva económica de precios de un coche a lo largo de su ciclo de vida:
 * 1. Fase de Depreciación Acelerada (0 a 4 años): pérdida del 15% al 20% anual.
 * 2. Fase de Estabilización (5 a 12 años): desaceleración hacia el valor utilitario residual.
 * 3. Suelo de Depreciación (Trough / Valley of Value): momento de mínimo histórico de precio.
 *    - Modelos estándar: llega entre los 14 y 18 años (~10% - 15% del MSRP original).
 *    - Modelos deportivos / M: llega antes (12 - 15 años) y mucho más alto (~25% - 35% del MSRP).
 * 4. Fase de Revalorización / Curva Clásica (U-Curve Appreciation):
 *    - A partir de los 18-25 años, el valor sube impulsado por escasez, nostalgia y coleccionismo.
 *    - Un M3 E30 o E46, M5 E39, 1M Coupé o Z3M multiplican su valor tras tocar suelo.
 * 5. Proyección Futura (5 a 10 años vista):
 *    - Calcula si el coche está cayendo, en su suelo idóneo de compra ("Buy Window"), o en ciclo alcista de apreciación.
 */

export interface ValuationPoint {
  year: number;
  age: number;
  priceSpain: number;
  priceEurope: number;
  phase: 'depreciating' | 'trough' | 'appreciating' | 'projected';
  isProjected: boolean;
}

export interface ValuationAnalysis {
  modelId: string;
  label: string;
  originalMsrp: number; // Precio original nuevo estimado
  currentPriceSpain: number;
  currentPriceEurope: number;
  troughYear: number; // Año en que tocó o tocará su suelo de depreciación
  troughPrice: number; // Precio mínimo histórico
  currentStatus: 'Cayendo' | 'En suelo histórico (Oportunidad de compra)' | 'Revalorizándose (Ciclo alcista)' | 'Nuevo';
  verdict: string;
  projected5Years: number;
  growthRateAnnual: number; // % proyectado anual
  history: ValuationPoint[];
}

// Baremos de precio original nuevo (MSRP promedio en EUR corregido a época)
function estimateOriginalMsrp(label: string, series: string, isM: boolean, startYear: number): number {
  if (isM) {
    if (/M2|1M/i.test(label)) return 65000;
    if (/M3|M4/i.test(label)) return 85000;
    if (/M5|M6/i.test(label)) return 115000;
    if (/M8|XM/i.test(label)) return 165000;
    if (/X5 M|X6 M/i.test(label)) return 130000;
    return 75000;
  }

  // Modelos estándar por Serie
  if (/1 Series/i.test(series)) return 31000;
  if (/2 Series/i.test(series)) return 38000;
  if (/3 Series/i.test(series)) return 44000;
  if (/4 Series/i.test(series)) return 52000;
  if (/5 Series/i.test(series)) return 62000;
  if (/6 Series/i.test(series)) return 85000;
  if (/7 Series/i.test(series)) return 105000;
  if (/8 Series/i.test(series)) return 110000;
  if (/X1/i.test(series)) return 39000;
  if (/X3/i.test(series)) return 54000;
  if (/X5/i.test(series)) return 76000;
  if (/X6/i.test(series)) return 86000;
  if (/Z4|Z3/i.test(series)) return 46000;
  if (/i8/i.test(series)) return 145000;

  // Clásicos pre-1980
  if (startYear < 1980) return 25000;

  return 45000;
}

export function calculateCarValuation(
  model: { id: string; label: string; series: string; section?: string; years: { start: number | null } }
): ValuationAnalysis {
  const currentYear = 2026;
  const startYear = model.years.start || 2015;
  const isM = model.section === 'm-performance' || /M[1-8]|1M/i.test(model.label);
  const msrp = estimateOriginalMsrp(model.label, model.series, isM, startYear);

  // Parámetros de la curva matemática
  // Coches M tocan suelo antes (~14 años) y se aprecian fuertemente.
  // Coches convencionales tocan suelo más tarde (~18 años) y se aprecian más lentamente como clásicos.
  const troughAge = isM ? 14 : 18;
  const troughRatio = isM ? 0.32 : 0.12; // Suelo en % del precio original
  const appreciationRate = isM ? 0.055 : 0.025; // Subida anual post-suelo

  const history: ValuationPoint[] = [];

  // Calcular trayectoria desde el año de salida hasta dentro de 7 años (2033)
  const maxYear = currentYear + 7;
  let minPrice = Infinity;
  let minYear = startYear;

  for (let y = startYear; y <= maxYear; y++) {
    const age = y - startYear;
    let priceRatio: number;

    if (age <= troughAge) {
      // Curva exponencial de depreciación: y = troughRatio + (1 - troughRatio) * e^(-k * age)
      const k = 0.22;
      priceRatio = troughRatio + (1 - troughRatio) * Math.exp(-k * age);
    } else {
      // Curva de apreciación U-Curve: sube a partir del suelo
      const yearsPostTrough = age - troughAge;
      priceRatio = troughRatio * Math.pow(1 + appreciationRate, yearsPostTrough);
    }

    const priceBase = Math.round(msrp * priceRatio);
    // En España los precios de VO suelen estar un 4% a 8% por encima del mercado centroeuropeo (Alemania) por impuestos de matriculación
    const priceSpain = Math.round(priceBase * 1.05);
    const priceEurope = priceBase;

    if (priceBase < minPrice) {
      minPrice = priceBase;
      minYear = y;
    }

    let phase: ValuationPoint['phase'] = 'depreciating';
    if (y > currentYear) phase = 'projected';
    else if (Math.abs(y - (startYear + troughAge)) <= 1) phase = 'trough';
    else if (y > startYear + troughAge) phase = 'appreciating';

    history.push({
      year: y,
      age,
      priceSpain,
      priceEurope,
      phase,
      isProjected: y > currentYear
    });
  }

  const currentPoint = history.find(h => h.year === currentYear) || history[history.length - 1];
  const pointIn5Years = history.find(h => h.year === currentYear + 5) || history[history.length - 1];
  const growthRateAnnual = Math.round(((pointIn5Years.priceSpain - currentPoint.priceSpain) / currentPoint.priceSpain / 5) * 1000) / 10;

  const currentAge = currentYear - startYear;
  let currentStatus: ValuationAnalysis['currentStatus'] = 'Cayendo';
  let verdict = '';

  if (currentAge < 3) {
    currentStatus = 'Nuevo';
    verdict = 'Depreciación inicial pronunciada. Mejor esperar 2-3 años si buscas comprar al mejor ratio calidad/precio.';
  } else if (Math.abs(currentAge - troughAge) <= 2) {
    currentStatus = 'En suelo histórico (Oportunidad de compra)';
    verdict = '¡VENTANA DE COMPRA ÓPTIMA! El coche ha tocado o está en su suelo de depreciación. Riesgo de pérdida de capital casi nulo.';
  } else if (currentAge > troughAge + 2) {
    currentStatus = 'Revalorizándose (Ciclo alcista)';
    verdict = 'ACTIVO EN REVALORIZACIÓN. Ha superado su valle de mercado y la escasez está empujando los precios al alza año tras año.';
  } else {
    currentStatus = 'Cayendo';
    verdict = 'Aún en fase de amortización. Seguirá reduciendo su cotización de mercado durante los próximos años.';
  }

  return {
    modelId: model.id,
    label: model.label,
    originalMsrp: msrp,
    currentPriceSpain: currentPoint.priceSpain,
    currentPriceEurope: currentPoint.priceEurope,
    troughYear: minYear,
    troughPrice: minPrice,
    currentStatus,
    verdict,
    projected5Years: pointIn5Years.priceSpain,
    growthRateAnnual,
    history
  };
}
