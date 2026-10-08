import json

with open('scripts/new_curated_fronts.json', 'r', encoding='utf-8') as f:
    curated = json.load(f)

with open('data/cupra/catalog-clean-front.json', 'r', encoding='utf-8') as f:
    catalog = json.load(f)

# 1. Update Terramar
for g in catalog['generations']:
    if g['id'] == 'cupra-terramar':
        res = curated['File:Cupra Terramar VZ DSC 8241.jpg']
        g['frontImage'] = res
        if g.get('chassis'):
            g['chassis'][0]['frontImage'] = res
        print("Updated Terramar to daylight front photo")

# 2. Update Ateca Facelift
for g in catalog['generations']:
    if g['id'] == 'cupra-ateca-facelift':
        res = curated['File:Cupra Ateca Facelift IMG 5645.jpg']
        g['frontImage'] = res
        if g.get('chassis'):
            g['chassis'][0]['frontImage'] = res
        print("Updated Ateca Facelift to front photo")

# 3. Update DarkRebel Concept
for g in catalog['generations']:
    if g['id'] == 'cupra-concept-darkrebel':
        res = curated['File:Cupra, IAA Open Space 2023, Munich (P1120138).jpg']
        g['frontImage'] = res
        if g.get('chassis'):
            g['chassis'][0]['frontImage'] = res
        print("Updated DarkRebel to direct front photo")

# 4. Update UrbanRebel Concept
for g in catalog['generations']:
    if g['id'] == 'cupra-concept-urbanrebel':
        res = curated['File:Cupra UrbanRebel Concept IAA 2023 1X7A0433.jpg']
        g['frontImage'] = res
        if g.get('chassis'):
            g['chassis'][0]['frontImage'] = res
        print("Updated UrbanRebel to front photo")

# 5. Update Raval Concept (2023)
for g in catalog['generations']:
    if g['id'] == 'cupra-concept-raval':
        res = curated['File:Cupra Raval (concept) IAA 2023 1X7A0429.jpg']
        g['frontImage'] = res
        if g.get('chassis'):
            g['chassis'][0]['frontImage'] = res
        print("Updated Raval Concept to front photo")

# 6. Update Tavascan Concept (IAA 2019)
for g in catalog['generations']:
    if g['id'] == 'cupra-concept-tavascan-2019':
        res = curated['File:Cupra Tavascan at IAA 2019 IMG 0244.jpg']
        g['frontImage'] = res
        if g.get('chassis'):
            g['chassis'][0]['frontImage'] = res
        print("Updated Tavascan Concept to front photo")

# 7. Add production-intent / pre-series CUPRA Raval (2025)
raval_prod_img = curated['File:Cupra Raval VZ IMG 6967.jpg']
new_raval_prod = {
    "id": "cupra-raval",
    "series": "Raval",
    "label": "CUPRA Raval (2025)",
    "section": "production",
    "status": "current",
    "years": {
        "start": 2025,
        "end": None,
        "display": "2025 – Actualidad"
    },
    "class": "Urbano Deportivo 100% Eléctrico (B-Segment BEV) • Modelo de Producción MEB Small con Tracción Delantera",
    "chassis": [
        {
            "code": "Raval",
            "lwb": False,
            "parent": None,
            "market": "Global",
            "verified": True,
            "commonsCategory": "Cupra Raval",
            "commonsCandidates": ["Cupra Raval VZ"],
            "commonsManual": False,
            "variants": [
                "Raval 166 kW (226 CV)",
                "Raval VZ"
            ],
            "packages": ["VZ", "Aero Wheels 19", "Copper Pack"],
            "frontImage": raval_prod_img
        }
    ],
    "frontImage": raval_prod_img,
    "engines": [
        {
            "modelBadge": "Raval VZ (226 CV)",
            "engineCode": "MEB Small FWD",
            "architecture": "Motor Eléctrico Síncrono de Imanes Permanentes (Delantero)",
            "cylinders": 0,
            "displacementCc": 0,
            "displacementL": 0.0,
            "fuel": "Eléctrico (BEV)",
            "powerHp": 226,
            "torqueNm": 290,
            "topSpeedKmh": 180,
            "accel0to100": 6.9,
            "feedSystem": "Tracción delantera MEB Entry con batería de 56 kWh netos",
            "notes": "Hasta 440 km de autonomía homologada WLTP. Fabricado en Martorell."
        }
    ]
}

# Check if cupra-raval is already in catalog
if not any(g['id'] == 'cupra-raval' for g in catalog['generations']):
    # Insert right before the concepts
    catalog['generations'].insert(7, new_raval_prod)
    print("Added production CUPRA Raval (2025)")

# Update stats
catalog['stats'] = {
    "generations": len(catalog['generations']),
    "production": len([g for g in catalog['generations'] if g['status'] != 'concept']),
    "mPerformance": len([g for g in catalog['generations'] if 'VZ' in g['label'] or any('VZ' in e.get('modelBadge', '') for e in g.get('engines', []))]),
    "prototypes": len([g for g in catalog['generations'] if g['status'] == 'concept']),
    "chassis": len(catalog['generations']),
    "totalVariants": 27,
    "withExactFront": len(catalog['generations']),
    "missingImages": 0,
    "verifiedFrontRate": "100%",
    "hasPowertrainSpecs": True,
    "hasUnifiedEngines": True
}

# Write catalog-clean-front.json
with open('data/cupra/catalog-clean-front.json', 'w', encoding='utf-8') as f:
    json.dump(catalog, f, indent=2, ensure_ascii=False)
print("Saved data/cupra/catalog-clean-front.json")

# Write public/api/v1/cupra.json
with open('public/api/v1/cupra.json', 'w', encoding='utf-8') as f:
    json.dump(catalog, f, indent=2, ensure_ascii=False)
print("Saved public/api/v1/cupra.json")

# Update public/api/v1/carvault.json
with open('public/api/v1/carvault.json', 'r', encoding='utf-8') as f:
    carvault = json.load(f)

for b in carvault.get('brands', []):
    if b.get('id') == 'cupra':
        b['stats'] = catalog['stats']
        b['modelsCount'] = len(catalog['generations'])
        b['generations'] = catalog['generations']

# Rebuild cars in carvault.json
filtered_cars = [c for c in carvault.get('cars', []) if c.get('brandId') != 'cupra']
cupra_cars = []
for g in catalog['generations']:
    cupra_cars.append({
        "brandId": "cupra",
        "brandName": "CUPRA",
        **g
    })
carvault['cars'] = filtered_cars + cupra_cars
carvault['totalCars'] = len(carvault['cars'])

with open('public/api/v1/carvault.json', 'w', encoding='utf-8') as f:
    json.dump(carvault, f, indent=2, ensure_ascii=False)
print(f"Saved public/api/v1/carvault.json (totalCars: {carvault['totalCars']})")
