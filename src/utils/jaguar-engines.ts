/**
 * Mapeo de motorizaciones icónicas por chasis y modelos de Jaguar
 * Para consultas técnicas directas y el analizador cuantitativo de precios.
 */
export const JAGUAR_ENGINES_MAP: Record<string, string[]> = {
  'X152 Facelift 2': [
    'F-Type P450 V8 Supercharged (450 CV)',
    'F-Type P450 AWD V8 (450 CV)',
    'F-Type R P575 AWD V8 (575 CV)',
    'F-Type 75 Edition (575 CV)',
    'F-Type ZP Edition SV Bespoke (575 CV)'
  ],
  'X152 Facelift 1': [
    'F-Type 2.0 i4 Turbo Ingenium (300 CV)',
    'F-Type 3.0 V6 Supercharged (340 CV)',
    'F-Type 3.0 V6 S (380 CV)',
    'F-Type 400 Sport (400 CV)',
    'F-Type R 5.0 V8 (550 CV)',
    'F-Type SVR 5.0 V8 (575 CV SVO)'
  ],
  'X152': [
    'F-Type 3.0 V6 Supercharged (340 CV)',
    'F-Type S 3.0 V6 Supercharged (380 CV)',
    'F-Type V8 S Convertible (495 CV)',
    'F-Type R 5.0 V8 Supercharged (550 CV)'
  ],
  'X152 Project 7': [
    'Project 7 5.0 V8 Supercharged SVO (575 CV)'
  ],
  'X150 Facelift': [
    'XK 5.0 V8 Atmosférico (385 CV)',
    'XKR 5.0 V8 Supercharged (510 CV)',
    'XKR 75 Special Edition (530 CV)',
    'XKR-S 5.0 V8 Supercharged (550 CV)',
    'XKR-S GT Track Edition (550 CV)'
  ],
  'X150': [
    'XK 3.5 V8 (258 CV)',
    'XK 4.2 V8 (298 CV)',
    'XKR 4.2 V8 Supercharged (416 CV)',
    'XKR-S 4.2 V8 (416 CV)'
  ],
  'X100 Facelift': [
    'XK8 4.2 V8 (298 CV)',
    'XKR 4.2 V8 Supercharged (400 CV)',
    'XKR 4.2-S Final Edition (400 CV)'
  ],
  'X100': [
    'XK8 4.0 V8 AJ26/AJ27 (284 CV)',
    'XKR 4.0 V8 Supercharged (370 CV)',
    'XKR Silverstone Edition (370 CV)'
  ],
  'X351 Facelift': [
    'XJ 3.0 V6 Diesel Bi-Turbo (300 CV)',
    'XJ 3.0 V6 Supercharged (340 CV)',
    'XJ 5.0 V8 Supercharged (510 CV)',
    'XJR575 5.0 V8 Supercharged SVO (575 CV)'
  ],
  'X351': [
    'XJ 3.0 V6 Diesel (275 CV)',
    'XJ 3.0 V6 Supercharged (340 CV)',
    'XJ 5.0 V8 Atmosférico (385 CV)',
    'XJ Supersport 5.0 V8 S/C (510 CV)',
    'XJR 5.0 V8 Supercharged (550 CV)'
  ],
  'X358': [
    'XJ6 2.7d Twin-Turbo (207 CV)',
    'XJ8 3.5 V8 (258 CV)',
    'XJ8 4.2 V8 (298 CV)',
    'XJR 4.2 V8 Supercharged (400 CV)',
    'Daimler Super Eight (400 CV)'
  ],
  'X350': [
    'XJ6 3.0 V6 (238 CV)',
    'XJ6 2.7d Twin-Turbo (207 CV)',
    'XJ8 3.5 V8 (258 CV)',
    'XJ8 4.2 V8 (298 CV)',
    'XJR 4.2 V8 Supercharged (400 CV)'
  ],
  'X308': [
    'XJ8 3.2 V8 (240 CV)',
    'XJ8 4.0 V8 (284 CV)',
    'XJR 4.0 V8 Supercharged (370 CV)',
    'Daimler Super V8 (370 CV)'
  ],
  'X300': [
    'XJ6 3.2 AJ16 (216 CV)',
    'XJ6 4.0 AJ16 (249 CV)',
    'XJR 4.0 Supercharged 6L (326 CV)',
    'XJ12 6.0 V12 (318 CV)'
  ],
  'XJ40': [
    'XJ6 2.9 AJ6 (165 CV)',
    'XJ6 3.2 AJ6 (200 CV)',
    'XJ6 3.6 AJ6 (221 CV)',
    'XJ6 4.0 AJ6 (223 CV)',
    'XJR 4.0 TWR (251 CV)',
    'XJ12 6.0 V12 (318 CV)'
  ],
  'X260 Facelift': [
    'XF P250 RWD Ingenium (250 CV)',
    'XF P300 AWD Ingenium (300 CV)',
    'XF D200 MHEV Ingenium (204 CV)'
  ],
  'X260': [
    'XF 2.0d Ingenium (163 CV)',
    'XF 2.0d Ingenium (180 CV)',
    'XF 2.0d Twin-Turbo (240 CV)',
    'XF 2.0t Ingenium (250 CV)',
    'XF 3.0d V6 Twin-Turbo (300 CV)',
    'XF S 3.0 V6 Supercharged (380 CV)'
  ],
  'X250 Facelift': [
    'XF 2.2d (163 CV)',
    'XF 2.2d (200 CV)',
    'XF 3.0 V6 Diesel S (275 CV)',
    'XF 5.0 V8 Atmosférico (385 CV)',
    'XFR 5.0 V8 Supercharged (510 CV)',
    'XFR-S 5.0 V8 Supercharged (550 CV)'
  ],
  'X250': [
    'XF 2.7d V6 Twin-Turbo (207 CV)',
    'XF 3.0 V6 Gasolina (238 CV)',
    'XF 3.0d V6 Twin-Turbo (240 CV)',
    'XF 4.2 V8 (298 CV)',
    'XF SV8 4.2 V8 Supercharged (416 CV)',
    'XF 5.0 V8 (385 CV)',
    'XFR 5.0 V8 Supercharged (510 CV)'
  ],
  'X760 Facelift': [
    'XE P250 RWD (250 CV)',
    'XE P300 AWD (300 CV)',
    'XE D200 MHEV (204 CV)',
    'XE 300 Sport (300 CV)'
  ],
  'X760': [
    'XE 2.0d Ingenium (163 CV)',
    'XE 2.0d Ingenium (180 CV)',
    'XE 2.0d Twin-Turbo (240 CV)',
    'XE 2.0t Ingenium (200 CV)',
    'XE 2.0t Ingenium (250 CV)',
    'XE S 3.0 V6 Supercharged (340 CV)',
    'XE S 3.0 V6 Supercharged (380 CV)'
  ],
  'X760 SV Project 8': [
    'SV Project 8 5.0 V8 Supercharged SVO (600 CV)'
  ],
  'X761 Facelift': [
    'F-Pace D200 MHEV (204 CV)',
    'F-Pace D300 MHEV 6L (300 CV)',
    'F-Pace P250 AWD (250 CV)',
    'F-Pace P400 MHEV 6L (400 CV)',
    'F-Pace P400e PHEV CERO (404 CV)',
    'F-Pace SVR 575 Edition V8 (575 CV)'
  ],
  'X761': [
    'F-Pace 2.0d Ingenium (180 CV)',
    'F-Pace 2.0d Twin-Turbo (240 CV)',
    'F-Pace 2.0t Ingenium (250 CV)',
    'F-Pace 3.0d V6 Twin-Turbo (300 CV)',
    'F-Pace S 3.0 V6 Supercharged (380 CV)',
    'F-Pace SVR 5.0 V8 Supercharged (550 CV)'
  ],
  'X540 Facelift': [
    'E-Pace D165 MHEV (163 CV)',
    'E-Pace D200 MHEV (204 CV)',
    'E-Pace P160 MHEV (160 CV)',
    'E-Pace P200 / P250 MHEV (249 CV)',
    'E-Pace P300e PHEV CERO (309 CV)',
    'E-Pace 300 Sport (300 CV)'
  ],
  'X540': [
    'E-Pace D150 (150 CV)',
    'E-Pace D180 AWD (180 CV)',
    'E-Pace D240 Twin-Turbo (240 CV)',
    'E-Pace P200 AWD (200 CV)',
    'E-Pace P250 AWD (249 CV)',
    'E-Pace P300 AWD (300 CV)'
  ],
  'X590': [
    'I-Pace EV320 AWD (320 CV)',
    'I-Pace EV400 Dual-Motor AWD 90 kWh (400 CV)'
  ],
  'X202 / X206': [
    'S-Type 2.7d Bi-Turbo (207 CV)',
    'S-Type 3.0 V6 (238 CV)',
    'S-Type 4.2 V8 (298 CV)',
    'S-Type R 4.2 V8 Supercharged (400 CV)'
  ],
  'X200': [
    'S-Type 3.0 V6 24V (238 CV)',
    'S-Type 4.0 V8 (284 CV)',
    'S-Type R 4.2 V8 Supercharged (400 CV)'
  ],
  'X400': [
    'X-Type 2.0 V6 (157 CV)',
    'X-Type 2.5 V6 AWD (196 CV)',
    'X-Type 3.0 V6 AWD (231 CV)',
    'X-Type 2.0d (130 CV)',
    'X-Type 2.2d (155 CV)'
  ],
  'XJ220': [
    'XJ220 3.5 V6 Twin-Turbo JV6 (549 CV)',
    'XJ220 S TWR Le Mans Homologation (680 CV)'
  ],
  'XJS Facelift': [
    'XJS 4.0 AJ16 (241 CV)',
    'XJS 5.3 V12 HE (280 CV)',
    'XJS 6.0 V12 (304 CV)',
    'XJR-S 6.0 V12 TWR (333 CV)'
  ],
  'XJ-S': [
    'XJ-S 3.6 AJ6 (221 CV)',
    'XJ-S 5.3 V12 HE (295 CV)',
    'XJR-S 5.3 / 6.0 TWR (318 CV)'
  ],
  'E-Type Series 1': [
    'E-Type 3.8 XK Inline-6 FHC / OTS (265 CV)',
    'E-Type 4.2 XK Inline-6 FHC / OTS (265 CV)',
    'E-Type 4.2 2+2 Coupé (265 CV)'
  ],
  'E-Type Series 3': [
    'E-Type 5.3 V12 Roadster OTS (272 CV)',
    'E-Type 5.3 V12 2+2 Coupé (272 CV)'
  ],
  'XK120': [
    'XK120 3.4 XK Roadster OTS (160 CV)',
    'XK120 3.4 Fixed Head Coupé FHC (160 CV)',
    'XK120 SE Special Equipment (180 CV)'
  ],
  'D-Type': [
    'D-Type 3.4 XK Le Mans Spec (250 CV)',
    'D-Type 3.8 XK Long Nose (270 CV)',
    'XKSS 3.4 Road Conversion (250 CV)'
  ],
  'C-X75': [
    'C-X75 Micro-Turbine Hybrid (780 CV)',
    'C-X75 1.6 Twincharged Hybrid Williams (850 CV)'
  ],
  'Type 00': [
    'Type 00 100% BEV Architecture JEA (1000 CV)'
  ]
};
