/**
 * Mapeo de motorizaciones icónicas por chasis y modelos de CUPRA
 * Para búsquedas directas en el analizador de precios y cotizaciones.
 */
export const CUPRA_ENGINES_MAP: Record<string, string[]> = {
  'KM7 Facelift': [
    'Formentor 1.5 eTSI (150 CV)',
    'Formentor 2.0 TDI (150 CV)',
    'Formentor e-HYBRID (204 CV)',
    'Formentor VZ e-HYBRID (272 CV)',
    'Formentor VZ 2.0 TSI (333 CV)'
  ],
  'KM7': [
    'Formentor 1.5 TSI (150 CV)',
    'Formentor 2.0 TDI (150 CV)',
    'Formentor 1.4 e-HYBRID (204 CV)',
    'Formentor VZ 1.4 e-HYBRID (245 CV)',
    'Formentor VZ 2.0 TSI (310 CV)',
    'Formentor VZ5 2.5 TSI (390 CV)'
  ],
  'KL1/KL8 Facelift': [
    'León 1.5 eTSI (150 CV)',
    'León 1.5 e-HYBRID (204 CV)',
    'León VZ 1.5 e-HYBRID (272 CV)',
    'León VZ 2.0 TSI (300 CV)',
    'León VZ Sportstourer 4Drive (333 CV)'
  ],
  'KL1/KL8': [
    'León 1.5 eTSI (150 CV)',
    'León 2.0 TSI (190 CV)',
    'León 1.4 e-HYBRID (204 CV)',
    'León VZ 1.4 e-HYBRID (245 CV)',
    'León VZ 2.0 TSI (300 CV)',
    'León VZ Sportstourer 4Drive (310 CV)'
  ],
  'KH7 Facelift': [
    'Ateca 1.5 TSI (150 CV)',
    'Ateca 2.0 TSI (190 CV)',
    'Ateca 2.0 TSI 4Drive (300 CV)',
    'Ateca VZ Limited Edition (300 CV)'
  ],
  'KH7': [
    'Ateca 2.0 TSI 4Drive (300 CV)',
    'Ateca Special Edition (300 CV)'
  ],
  'K11': [
    'Born 58 kWh (204 CV)',
    'Born e-Boost (231 CV)',
    'Born VZ 79 kWh (326 CV)'
  ],
  'Raval': [
    'Raval 166 kW (226 CV)',
    'Raval VZ (226 CV)'
  ],
  'Tavascan': [
    'Tavascan Endurance RWD (286 CV)',
    'Tavascan VZ AWD (340 CV)'
  ],
  'Terramar': [
    'Terramar 1.5 eTSI (150 CV)',
    'Terramar 2.0 TSI 4Drive (204 CV)',
    'Terramar VZ 1.5 e-HYBRID (272 CV)',
    'Terramar VZ 2.0 TSI 4Drive (265 CV)'
  ],
  'DarkRebel': [
    'DarkRebel Concept (Showcar IAA)'
  ],
  'UrbanRebel': [
    'UrbanRebel Racing Concept (435 CV)'
  ],
  'Raval Concept': [
    'Raval Pre-Production Concept'
  ],
  'Tavascan Concept': [
    'Tavascan Concept 2019 (306 CV)'
  ]
};
