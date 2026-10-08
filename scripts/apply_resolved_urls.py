import json

with open('scripts/resolved_urls.json', 'r', encoding='utf-8') as f:
    resolved = json.load(f)

with open('data/cupra/catalog-clean-front.json', 'r', encoding='utf-8') as f:
    cupra_cat = json.load(f)

for g in cupra_cat['generations']:
    img_file = g['frontImage']['file']
    if img_file in resolved:
        res = resolved[img_file]
        g['frontImage']['url'] = res['url']
        g['frontImage']['width'] = res['width']
        g['frontImage']['height'] = res['height']
        if g.get('chassis'):
            for ch in g['chassis']:
                if ch.get('frontImage'):
                    ch['frontImage']['url'] = res['url']
                    ch['frontImage']['width'] = res['width']
                    ch['frontImage']['height'] = res['height']

with open('data/cupra/catalog-clean-front.json', 'w', encoding='utf-8') as f:
    json.dump(cupra_cat, f, indent=2, ensure_ascii=False)
print("Updated data/cupra/catalog-clean-front.json with real Wikimedia URLs")

with open('public/api/v1/cupra.json', 'w', encoding='utf-8') as f:
    json.dump(cupra_cat, f, indent=2, ensure_ascii=False)
print("Updated public/api/v1/cupra.json with real Wikimedia URLs")

# Now update public/api/v1/carvault.json
with open('public/api/v1/carvault.json', 'r', encoding='utf-8') as f:
    carvault = json.load(f)

for b in carvault.get('brands', []):
    if b.get('id') == 'cupra':
        b['generations'] = cupra_cat['generations']

for car in carvault.get('cars', []):
    if car.get('brandId') == 'cupra':
        img_file = car.get('frontImage', {}).get('file')
        if img_file in resolved:
            res = resolved[img_file]
            car['frontImage']['url'] = res['url']
            car['frontImage']['width'] = res['width']
            car['frontImage']['height'] = res['height']
            if car.get('chassis'):
                for ch in car['chassis']:
                    if ch.get('frontImage'):
                        ch['frontImage']['url'] = res['url']
                        ch['frontImage']['width'] = res['width']
                        ch['frontImage']['height'] = res['height']

with open('public/api/v1/carvault.json', 'w', encoding='utf-8') as f:
    json.dump(carvault, f, indent=2, ensure_ascii=False)
print("Updated public/api/v1/carvault.json with real Wikimedia URLs")
