/**
 * Image Guard: Blindaje estricto de perspectivas y validación de imágenes frontales
 * para Carvault (Wikimedia Commons)
 */

export interface ImageCandidate {
  file: string;
  url: string;
  author?: string;
  license?: string;
  sourceUrl?: string;
  width?: number;
  height?: number;
  description?: string;
}

// 1. Lista negra léxica multilingüe (Descarta vistas traseras, laterales, interiores, detalles y tomas aéreas)
export const STRICT_NEGATIVE_PATTERNS = [
  // Posterior / Trasera
  /\b(rear|back|heck|heckansicht|arriere|arrière|rear-view|back-view|tail|tailgate|trunk|boot|exhaust)\b/i,
  /heckleuchte|rear_light|back_end|from_behind|from_the_back|von_hinten|vue_arriere/i,

  // Lateral puro / Perfil
  /\b(side\s*view|side\s*profile|seitenansicht|lateral\s*view|profile\s*view)\b/i,
  /_side_view|_seitenansicht/i,

  // Interior / Motor / Componentes
  /\b(interior|inside|innenraum|cockpit|dashboard|steering|seat|seats|console|engine|motor|underhood|trunk_open)\b/i,

  // Detalles / Primeros planos / Ruedas
  /\b(close[-_]?up|detail|badge|emblem|logo|wheel|rim|exhaust|grille\s*detail)\b/i,

  // Planos aéreos / Cenitales / Multitud / Bocetos
  /\b(aerial|overhead|from\s*above|top\s*view|bird'?s\s*eye|crowd|group|lineup|sketch|drawing|blueprint|cutaway)\b/i
];

// 2. Patrones positivos de frontal o 3/4 frontal
export const STRICT_POSITIVE_PATTERNS = [
  /\b(front\s*left|front\s*right|front-left|front-right|front_left|front_right)\b/i,
  /\b(front\s*3\/4|3\/4\s*front|three[- ]quarter\s*front)\b/i,
  /\b(front\s*quarter|front_quarter)\b/i,
  /\b(front\s*view|frontansicht|front-view|front_view|vue\s*avant)\b/i,
  /\b(front|vorne|avant|frontal)\b/i
];

/**
 * Evalúa si una imagen es candidata válida y le asigna un score de idoneidad (0 a 100)
 */
export function evaluateFrontPerspective(img: ImageCandidate): { valid: boolean; score: number; reasons: string[] } {
  const reasons: string[] = [];
  const textToScan = `${img.file} ${img.sourceUrl || ''} ${img.description || ''}`;

  // Comprobación de lista negra estricta
  for (const pattern of STRICT_NEGATIVE_PATTERNS) {
    if (pattern.test(textToScan)) {
      return {
        valid: false,
        score: 0,
        reasons: [`Coincide con patrón de exclusión negativa: ${pattern}`]
      };
    }
  }

  // Comprobación de geometría y proporciones
  if (img.width && img.height) {
    // 1. Descartar tomas verticales (un coche desde el frontal en carretera siempre es apaisado)
    if (img.height >= img.width) {
      return {
        valid: false,
        score: 0,
        reasons: ['Formato vertical (portrait) inválido para toma frontal automotriz']
      };
    }

    const ratio = img.width / img.height;
    // Ratios normales de fotografía exterior de coches: entre 1.25 y 2.4
    if (ratio < 1.20) {
      return {
        valid: false,
        score: 0,
        reasons: [`Aspect ratio demasiado cuadrado (${ratio.toFixed(2)}), típico de recorte o primer plano`]
      };
    }
    if (ratio > 2.6) {
      return {
        valid: false,
        score: 0,
        reasons: [`Aspect ratio excesivamente panorámico (${ratio.toFixed(2)})`]
      };
    }

    // Resolución mínima recomendada
    if (img.width < 900 || img.height < 500) {
      return {
        valid: false,
        score: 0,
        reasons: [`Resolución insuficiente (${img.width}x${img.height})`]
      };
    }
  }

  // Puntuación positiva
  let score = 50; // Base para fotos sin exclusiones

  // Bonus por ángulo 3/4 o front-left/front-right específico (el ángulo más estético de catálogo)
  if (/\b(front\s*left|front\s*right|front-left|front-right|front_left|front_right|front\s*3\/4|three[- ]quarter)\b/i.test(textToScan)) {
    score += 40;
    reasons.push('Perspectiva 3/4 frontal óptima detectada');
  } else if (/\b(front\s*view|frontansicht|vue\s*avant)\b/i.test(textToScan)) {
    score += 30;
    reasons.push('Perspectiva frontal directa detectada');
  } else if (/\b(front|vorne|avant|frontal)\b/i.test(textToScan)) {
    score += 20;
    reasons.push('Mención explícita a frontal');
  } else {
    // Sin mención positiva explícita: se penaliza para evitar falsos positivos
    score -= 25;
    reasons.push('Advertencia: no tiene término frontal explícito en el nombre del archivo');
  }

  return {
    valid: score >= 35,
    score,
    reasons
  };
}
