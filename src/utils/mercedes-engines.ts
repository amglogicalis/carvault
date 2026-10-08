/**
 * Mapeo de motorizaciones icónicas por chasis y modelos de Mercedes-Benz
 * Para consultas técnicas directas, el comparador de motores y el analizador cuantitativo de precios.
 */
export const MERCEDES_ENGINES_MAP: Record<string, string[]> = {
  'W198 I': [
    '300 SL Gullwing - M198 (215 CV)',
  ],
  'W198 II': [
    '300 SL Roadster - M198 III (225 CV)',
  ],
  'W201': [
    '190 E 2.3-16 Cosworth - M102.983 (185 CV)',
    '190 E 2.5-16 Evolution II - M102.992 (235 CV)',
  ],
  'W297': [
    'CLK GTR Straßenversion - M297 V12 (612 CV)',
  ],
  'C199': [
    'SLR McLaren 5.4 V8 Kompressor - M155 (626 CV)',
    'SLR McLaren 722 Edition - M155 722 (650 CV)',
  ],
  'C197': [
    'SLS AMG 6.2 V8 - M159 (571 CV)',
    'SLS AMG Black Series - M159 BS (631 CV)',
  ],
  'C190': [
    'AMG GT S 4.0 V8 Biturbo - M178 (510 CV)',
  ],
  'C190 MoPf': [
    'AMG GT R 4.0 V8 Biturbo - M178 (585 CV)',
    'AMG GT Black Series - M178 LS2 Flat-Plane (730 CV)',
  ],
  'C192': [
    'AMG GT 63 4MATIC+ - M177 (585 CV)',
    'AMG GT 63 S E-PERFORMANCE - M177 + EDU (816 CV)',
  ],
  'W01': [
    'AMG ONE F1 E-PERFORMANCE - PU106B Hybrid (1063 CV)',
  ],
  'X290': [
    'AMG GT 53 4MATIC+ - M256 (435 CV)',
    'AMG GT 63 S 4MATIC+ - M177 (639 CV)',
  ],
  'X290 MoPf': [
    'AMG GT 63 S E-PERFORMANCE - M177 + EDU (843 CV)',
  ],
  'C209 DTM': [
    'CLK DTM AMG Kompressor - M113.994 (582 CV)',
  ],
  'C209 BS': [
    'CLK 63 AMG Black Series - M156 (507 CV)',
  ],
  'R230 BS': [
    'SL 65 AMG Black Series - M275 AMG V12 Biturbo (670 CV)',
  ],
  'C204 BS': [
    'C 63 AMG Coupé Black Series - M156 (517 CV)',
  ],
  'W168': [
    'A 160 - M166 (102 CV)',
    'A 190 - M166 (125 CV)',
  ],
  'W168 MoPf': [
    'A 140 MoPf - M166 (82 CV)',
    'A 210 Evolution - M166 (140 CV)',
  ],
  'W169': [
    'A 200 Turbo - M266 (193 CV)',
    'A 200 CDI - OM640 (140 CV)',
  ],
  'W169 MoPf': [
    'A 180 CDI BlueEFFICIENCY - OM640 (109 CV)',
  ],
  'W176': [
    'A 250 Sport - M270 (211 CV)',
    'A 45 AMG 4MATIC - M133 (360 CV)',
  ],
  'W176 MoPf': [
    'A 45 AMG 4MATIC MoPf - M133 (381 CV)',
  ],
  'W177': [
    'A 250 4MATIC - M260 (224 CV)',
    'AMG A 35 4MATIC - M260 (306 CV)',
  ],
  'W177 MoPf': [
    'AMG A 45 S 4MATIC+ - M139 (421 CV)',
  ],
  'W245': [
    'B 200 Turbo - M266 (193 CV)',
  ],
  'W245 MoPf': [
    'B 200 CDI MoPf - OM640 (140 CV)',
  ],
  'W246': [
    'B 220 4MATIC - M270 (184 CV)',
  ],
  'W246 MoPf': [
    'B 250 e Electric Drive - EM0004 Tesla (180 CV)',
  ],
  'W247 MoPf': [
    'B 250 e PHEV - M282 + E-Motor (218 CV)',
  ],
  'W202': [
    'C 280 - M104 (193 CV)',
    'C 36 AMG - M104.941 (280 CV)',
  ],
  'W202 MoPf': [
    'C 43 AMG V8 - M113 (306 CV)',
    'C 220 CDI - OM611 (125 CV)',
  ],
  'W203': [
    'C 32 AMG Kompressor - M112.961 (354 CV)',
    'C 270 CDI - OM612 (170 CV)',
  ],
  'W203 MoPf': [
    'C 55 AMG V8 - M113.988 (367 CV)',
    'C 320 CDI - OM642 V6 (224 CV)',
  ],
  'W204': [
    'C 350 V6 - M272 (272 CV)',
    'C 63 AMG 6.2 V8 - M156 (457 CV)',
  ],
  'W204 MoPf': [
    'C 350 BlueEFFICIENCY - M276 (306 CV)',
    'C 63 AMG Performance - M156 (487 CV)',
  ],
  'W205': [
    'C 450 AMG 4MATIC - M276 (367 CV)',
    'AMG C 63 S V8 Biturbo - M177 (510 CV)',
  ],
  'W205 MoPf': [
    'AMG C 43 4MATIC - M276 (390 CV)',
    'AMG C 63 S MoPf - M177 (510 CV)',
  ],
  'W206': [
    'C 300 4MATIC - M254 (258 CV)',
    'AMG C 43 4MATIC - M139l (408 CV)',
    'AMG C 63 S E-PERFORMANCE - M139l + Electric (680 CV)',
  ],
  'W123': [
    '280 E - M110 (185 CV)',
    '300 D Turbodiesel - OM617 (125 CV)',
  ],
  'W124 MoPf 1': [
    '500 E V8 Porsche - M119 (326 CV)',
    '300 E-24 - M104 (220 CV)',
  ],
  'W124 MoPf 2': [
    'E 320 - M104 (220 CV)',
    'E 500 - M119 (320 CV)',
  ],
  'W210': [
    'E 50 AMG - M119 (347 CV)',
    'E 55 AMG - M113 (354 CV)',
  ],
  'W210 MoPf': [
    'E 320 CDI - OM613 (197 CV)',
    'E 55 AMG MoPf - M113 (354 CV)',
  ],
  'W211': [
    'E 500 V8 - M113 (306 CV)',
    'E 55 AMG Kompressor - M113.990 (476 CV)',
  ],
  'W211 MoPf': [
    'E 500 V8 5.5 - M273 (388 CV)',
    'E 63 AMG 6.2 V8 - M156 (514 CV)',
  ],
  'W212': [
    'E 500 V8 Biturbo - M278 (408 CV)',
    'E 63 AMG V8 Biturbo - M157 (525 CV)',
  ],
  'W212 MoPf': [
    'E 63 S AMG 4MATIC - M157 (585 CV)',
  ],
  'W213': [
    'AMG E 43 4MATIC - M276 (401 CV)',
    'AMG E 63 S 4MATIC+ - M177 (612 CV)',
  ],
  'W213 MoPf': [
    'AMG E 53 4MATIC+ - M256 (435 CV)',
  ],
  'W214': [
    'E 400 e 4MATIC PHEV - M254 + E-Motor (381 CV)',
    'E 450 4MATIC - M256M (381 CV)',
  ],
  'W116': [
    '450 SEL 6.9 - M100 (286 CV)',
  ],
  'W126': [
    '500 SEL - M117 (231 CV)',
    '560 SEL - M117.968 (300 CV)',
  ],
  'W140': [
    'S 500 - M119 (320 CV)',
    'S 600 V12 - M120 (408 CV)',
  ],
  'W220': [
    'S 500 - M113 (306 CV)',
    'S 55 AMG - M113 (360 CV)',
  ],
  'W220 MoPf': [
    'S 55 AMG Kompressor - M113.991 (500 CV)',
    'S 65 AMG V12 Biturbo - M275 (612 CV)',
  ],
  'W221': [
    'S 500 - M273 (388 CV)',
    'S 63 AMG 6.2 V8 - M156 (525 CV)',
  ],
  'W221 MoPf': [
    'S 63 AMG 5.5 V8 Biturbo - M157 (544 CV)',
    'S 65 AMG V12 Biturbo - M275 (630 CV)',
  ],
  'W222': [
    'S 500 V8 Biturbo - M278 (455 CV)',
    'S 63 AMG 4MATIC - M157 (585 CV)',
  ],
  'X222 MoPf': [
    'Maybach S 560 4MATIC - M176 (469 CV)',
    'Maybach S 650 V12 - M279 (630 CV)',
  ],
  'W223': [
    'S 580 4MATIC - M176 (503 CV)',
    'AMG S 63 E-PERFORMANCE - M177 + EDU (802 CV)',
    'Maybach S 680 V12 - M279 (612 CV)',
  ],
  'C117': [
    'CLA 250 Sport - M270 (211 CV)',
    'CLA 45 AMG 4MATIC - M133 (360 CV)',
  ],
  'C117 MoPf': [
    'CLA 45 AMG MoPf - M133 (381 CV)',
  ],
  'C118': [
    'AMG CLA 35 4MATIC - M260 (306 CV)',
    'AMG CLA 45 S 4MATIC+ - M139 (421 CV)',
  ],
  'C118 MoPf': [
    'CLA 250 e PHEV - M282 + E-Motor (218 CV)',
  ],
  'C219': [
    'CLS 500 - M113 (306 CV)',
    'CLS 55 AMG Kompressor - M113.990 (476 CV)',
  ],
  'C219 MoPf': [
    'CLS 63 AMG 6.2 V8 - M156 (514 CV)',
  ],
  'C218': [
    'CLS 500 Biturbo - M278 (408 CV)',
    'CLS 63 AMG Biturbo - M157 (525 CV)',
  ],
  'C218 MoPf': [
    'CLS 63 S AMG 4MATIC - M157 (585 CV)',
  ],
  'C257 MoPf': [
    'AMG CLS 53 4MATIC+ - M256 (435 CV)',
  ],
  'C236': [
    'CLE 300 4MATIC - M254 (258 CV)',
    'CLE 450 4MATIC - M256M (381 CV)',
    'AMG CLE 53 4MATIC+ - M256M (449 CV)',
  ],
  'W113': [
    '230 SL - M127 (150 CV)',
    '280 SL Pagoda - M130 (170 CV)',
  ],
  'R107': [
    '380 SL - M116 (218 CV)',
    '500 SL - M117 (245 CV)',
    '560 SL - M117.967 (230 CV)',
  ],
  'R129': [
    '500 SL - M119 (326 CV)',
    '600 SL V12 - M120 (394 CV)',
  ],
  'R129 MoPf': [
    'SL 500 V8 32V - M119 / M113 (306 CV)',
    'SL 73 AMG 7.3 V12 - M120 AMG (525 CV)',
  ],
  'R230': [
    'SL 500 - M113 (306 CV)',
    'SL 55 AMG Kompressor - M113.992 (500 CV)',
    'SL 65 AMG V12 Biturbo - M275 (612 CV)',
  ],
  'R230 MoPf': [
    'SL 63 AMG 6.2 V8 - M156 (525 CV)',
    'SL 65 AMG V12 Biturbo MoPf - M275 (612 CV)',
  ],
  'R231 MoPf': [
    'SL 400 Biturbo - M276 (367 CV)',
    'SL 500 V8 Biturbo - M278 (455 CV)',
    'SL 63 AMG Biturbo - M157 (585 CV)',
  ],
  'R232': [
    'AMG SL 43 - M139l E-Turbo (381 CV)',
    'AMG SL 55 4MATIC+ - M177 (476 CV)',
    'AMG SL 63 4MATIC+ - M177 (585 CV)',
    'AMG SL 63 S E-PERFORMANCE - M177 + EDU (816 CV)',
  ],
  'W460': [
    '280 GE - M110 (156 CV)',
    '300 GD - OM617 (88 CV)',
  ],
  'W463 Clásico': [
    'G 500 V8 - M113 (296 CV)',
    'G 55 AMG Kompressor - M113.993 (507 CV)',
    'G 63 AMG 5.5 Biturbo - M157 (571 CV)',
    'G 65 AMG 6.0 V12 Biturbo - M279 (630 CV)',
  ],
  'W463 Gen2': [
    'G 500 4.0 V8 - M176 (422 CV)',
    'AMG G 63 4.0 V8 Biturbo - M177 (585 CV)',
  ],
  'W465': [
    'G 580 con Tecnología EQ - 4x Electric Motors (587 CV)',
  ],
  'X253': [
    'GLC 300 4MATIC - M274 (245 CV)',
    'AMG GLC 43 4MATIC - M276 (367 CV)',
    'AMG GLC 63 S 4MATIC+ - M177 (510 CV)',
  ],
  'X254': [
    'GLC 300 de 4MATIC PHEV - OM654M + E-Motor (335 CV)',
    'AMG GLC 43 4MATIC - M139l (421 CV)',
    'AMG GLC 63 S E-PERFORMANCE - M139l + Electric (680 CV)',
  ],
  'W163': [
    'ML 320 - M112 (218 CV)',
    'ML 55 AMG V8 - M113 (347 CV)',
  ],
  'V167 MoPf': [
    'GLE 450 d 4MATIC - OM656M (367 CV)',
    'Maybach GLS 600 4MATIC - M177 (557 CV)',
  ],
  'V295': [
    'EQE 350+ - PSM Electric (292 CV)',
    'AMG EQE 53 4MATIC+ - Dual PSM AMG (687 CV)',
  ],
  'V297': [
    'EQS 450+ Long Range - PSM Electric (333 CV)',
    'AMG EQS 53 4MATIC+ - Dual PSM AMG (761 CV)',
  ],
};
