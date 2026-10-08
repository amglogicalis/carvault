import json

with open('public/api/v1/carvault.json', 'r', encoding='utf-8') as f:
    carvault = json.load(f)

with open('data/cupra/catalog-clean-front.json', 'r', encoding='utf-8') as f:
    cupra_cat = json.load(f)

# Update endpoints
if 'endpoints' not in carvault:
    carvault['endpoints'] = {'central': '/api/v1/carvault.json', 'brands': {}}
carvault['endpoints']['brands']['cupra'] = '/api/v1/cupra.json'

# Brand entry for CUPRA
cupra_brand = {
    "id": "cupra",
    "name": "CUPRA",
    "fullName": "SEAT Cupra, S.A.U.",
    "country": "España",
    "logo": "/images/brands/cupra.svg",
    "catalogUrl": "/cupra",
    "apiUrl": "/api/v1/cupra.json",
    "stats": cupra_cat["stats"],
    "modelsCount": len(cupra_cat["generations"]),
    "generations": cupra_cat["generations"]
}

# Update or insert into brands list
existing_brand_ids = [b['id'] for b in carvault.get('brands', [])]
if 'cupra' in existing_brand_ids:
    idx = existing_brand_ids.index('cupra')
    carvault['brands'][idx] = cupra_brand
else:
    carvault['brands'].append(cupra_brand)

# Build cupra car items for global 'cars' list
cupra_cars = []
for g in cupra_cat["generations"]:
    car_item = {
        "brandId": "cupra",
        "brandName": "CUPRA",
        **g
    }
    cupra_cars.append(car_item)

# Rebuild cars list: retain non-cupra cars and append cupra_cars
filtered_cars = [c for c in carvault.get('cars', []) if c.get('brandId') != 'cupra']
carvault['cars'] = filtered_cars + cupra_cars
carvault['totalCars'] = len(carvault['cars'])

with open('public/api/v1/carvault.json', 'w', encoding='utf-8') as f:
    json.dump(carvault, f, indent=2, ensure_ascii=False)

print(f"Updated carvault.json successfully. Total cars: {carvault['totalCars']}. Brands: {[b['id'] for b in carvault['brands']]}")
