/**
 * Mapeo de motorizaciones icónicas por chasis y modelos de Lexus
 * Para consultas técnicas directas y el analizador cuantitativo de precios.
 */
export const LEXUS_ENGINES_MAP: Record<string, string[]> = {
  'LFA10': [
    'LFA V10 - 1LR-GUE (560 CV)',
    'LFA Nürburgring Edition - 1LR-GUE Nürburgring (570 CV)',
  ],
  'URZ100': [
    'LC 500 Coupé - 2UR-GSE (477 CV)',
    'LC 500 Cabriolet - 2UR-GSE (477 CV)',
  ],
  'GWZ100': [
    'LC 500h Multi-Stage - 8GR-FXS + Dual Motor (359 CV)',
  ],
  'USE20': [
    'IS F V8 - 2UR-GSE (423 CV)',
  ],
  'USC10': [
    'RC F V8 - 2UR-GSE (477 CV)',
    'RC F Track Edition - 2UR-GSE (479 CV)',
  ],
  'URL10': [
    'GS F V8 - 2UR-GSE (477 CV)',
  ],
  'USE30': [
    'IS 500 V8 - 2UR-GSE (479 CV)',
  ],
  'GXXH10': [
    'Morizo RR 1.6T - G16E-GTS (305 CV)',
  ],
  'TALH17': [
    'RX 500h DIRECT4 - T24A-FTS + eAxle (371 CV)',
  ],
  'GXE10 / JCE10': [
    'IS 200 - 1G-FE (155 CV)',
    'IS 300 - 2JZ-GE (214 CV)',
    'IS 300 SportCross - 2JZ-GE (214 CV)',
  ],
  'GSE20 / ALE20': [
    'IS 250 - 4GR-FSE (208 CV)',
    'IS 220d - 2AD-FHV (177 CV)',
  ],
  'GSE20 / GSE21': [
    'IS 250 Facelift - 4GR-FSE (208 CV)',
  ],
  'AVE30': [
    'IS 300h Hybrid - 2AR-FSE + Motor Eléctrico (223 CV)',
  ],
  'AVE30 / GSE31': [
    'IS 300h F Sport - 2AR-FSE + Motor Eléctrico (223 CV)',
  ],
  'GSE31 / ASE30': [
    'IS 350 F Sport - 2GR-FKS (315 CV)',
  ],
  'ZWA10': [
    'CT 200h - 2ZR-FXE + Motor Eléctrico (136 CV)',
    'CT 200h F Sport - 2ZR-FXE + Motor Eléctrico (136 CV)',
  ],
  'JZS160 / UZS160': [
    'GS 300 - 2JZ-GE (222 CV)',
    'GS 430 - 3UZ-FE (283 CV)',
  ],
  'GRS190 / GWS191': [
    'GS 450h Hybrid - 2GR-FSE + Motor Eléctrico (345 CV)',
  ],
  'GWS191 / URS190': [
    'GS 460 V8 - 1UR-FSE (347 CV)',
  ],
  'AWL10 / GWL10': [
    'GS 450h - 2GR-FXE + Motor Eléctrico (345 CV)',
    'GS 300h Facelift - 2AR-FSE + Motor Eléctrico (223 CV)',
  ],
  'AVV60': [
    'ES 300h - 2AR-FXE + Motor Eléctrico (205 CV)',
  ],
  'AXZH10': [
    'ES 300h GA-K - A25A-FXS + Motor Eléctrico (218 CV)',
    'ES 300h Facelift - A25A-FXS + Motor Eléctrico (218 CV)',
  ],
  'UCF10': [
    'LS 400 V8 - 1UZ-FE (245 CV)',
  ],
  'UCF20': [
    'LS 400 VVT-i - 1UZ-FE VVT-i (284 CV)',
  ],
  'UCF30': [
    'LS 430 V8 - 3UZ-FE (281 CV)',
    'LS 430 Facelift - 3UZ-FE (281 CV)',
  ],
  'USF40 / UVF45': [
    'LS 460 - 1UR-FSE (380 CV)',
    'LS 600h L - 2UR-FSE + Motor Eléctrico (445 CV)',
    'LS 600h F Sport - 2UR-FSE + Motor Eléctrico (445 CV)',
  ],
  'VXFA50 / GVF50': [
    'LS 500 Twin-Turbo - V35A-FTS (421 CV)',
    'LS 500h Multi-Stage - 8GR-FXS + Dual Motor (359 CV)',
    'LS 500h AWD Facelift - 8GR-FXS + Dual Motor (359 CV)',
  ],
  'UZZ30 / JZZ31': [
    'SC 400 - 1UZ-FE (253 CV)',
    'SC 300 - 2JZ-GE (228 CV)',
  ],
  'UZZ40': [
    'SC 430 V8 - 3UZ-FE (286 CV)',
  ],
  'AVC10 / GSC10': [
    'RC 300h - 2AR-FSE + Motor Eléctrico (223 CV)',
    'RC 300h Facelift - 2AR-FSE + Motor Eléctrico (223 CV)',
  ],
  'MAYH10': [
    'LBX 1.5 Hybrid - M15A-FXE + Motor Eléctrico (136 CV)',
  ],
  'MZAH10 / KMA10': [
    'UX 300h Híbrido - M20A-FXS + Sistema Híbrido 5ª Gen (199 CV)',
    'UX 300e Eléctrico - 4KM Motor Eléctrico (204 CV)',
  ],
  'AYZ10 / AYZ15': [
    'NX 300h - 2AR-FXE + Motor Eléctrico (197 CV)',
  ],
  'AYZ10 / AGZ10': [
    'NX 300h Facelift - 2AR-FXE + Motor Eléctrico (197 CV)',
  ],
  'AAZH20 / AAZH26': [
    'NX 450h+ Plug-in - A25A-FXS + Dual Motor PHEV (309 CV)',
    'NX 350h - A25A-FXS + Motor Eléctrico (244 CV)',
  ],
  'XEBM15': [
    'RZ 450e DIRECT4 - 1XM + 1YM Motores Eléctricos (313 CV)',
  ],
  'MCU10 / MCU15': [
    'RX 300 V6 - 1MZ-FE (201 CV)',
  ],
  'MCU35 / MHU38': [
    'RX 400h Hybrid - 3MZ-FE + Motores Eléctricos E-Four (272 CV)',
  ],
  'GSU35 / MHU38': [
    'RX 350 V6 - 2GR-FE (276 CV)',
  ],
  'GYL10 / GYL15': [
    'RX 450h - 2GR-FXE + E-Four (299 CV)',
    'RX 450h F Sport - 2GR-FXE + E-Four (299 CV)',
  ],
  'GYL20 / GYL25': [
    'RX 450h E-Four - 2GR-FXS + Dual Motor (313 CV)',
  ],
  'GYL20 / GYL25 / GYL26': [
    'RX 450h Facelift - 2GR-FXS + Dual Motor (313 CV)',
  ],
  'AALH16 / AALH17': [
    'RX 450h+ PHEV - A25A-FXS + Dual Motor PHEV (309 CV)',
    'RX 350h - A25A-FXS + Motor Eléctrico (250 CV)',
  ],
  'URJ150': [
    'GX 460 V8 - 1UR-FE (301 CV)',
    'GX 460 Facelift - 1UR-FE (301 CV)',
  ],
  'VJA250': [
    'GX 550 Twin-Turbo - V35A-FTS (354 CV)',
  ],
  'UZJ100': [
    'LX 470 V8 - 2UZ-FE (275 CV)',
  ],
  'URJ200': [
    'LX 570 V8 - 3UR-FE (383 CV)',
    'LX 570 Facelift - 3UR-FE (383 CV)',
  ],
  'VJA310': [
    'LX 600 Twin-Turbo - V35A-FTS (415 CV)',
  ],
  'TX10': [
    'TX 500h F Sport - T24A-FTS + DIRECT4 (371 CV)',
  ],
  'AAWH10': [
    'LM 350h E-Four - A25A-FXS + Dual Motor (250 CV)',
  ],
  'LF-A 2005': [
    'LF-A Prototype V10 - 1LR Prototype (500 CV)',
  ],
  'LF-LC': [
    'Advanced Lexus Hybrid Drive - Hybrid Concept (500 CV)',
  ],
  'LF-Z': [
    'LF-Z Direct4 EV - Direct4 Concept EV (544 CV)',
  ],
};
