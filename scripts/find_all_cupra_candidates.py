import urllib.request
import urllib.parse
import json

def search(term, limit=20):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(term)}&gsrnamespace=6&gsrlimit={limit}&prop=imageinfo&iiprop=url|size|extmetadata&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'CarvaultBot/1.0 (amglogicalis@gmail.com)'})
    try:
        data = json.loads(urllib.request.urlopen(req).read())
        pages = data.get('query', {}).get('pages', {})
        results = []
        for pid, p in pages.items():
            info = p.get('imageinfo', [{}])[0]
            results.append({
                'title': p.get('title'),
                'url': info.get('url'),
                'width': info.get('width'),
                'height': info.get('height'),
                'desc': info.get('extmetadata', {}).get('ImageDescription', {}).get('value', '')
            })
        return results
    except Exception as e:
        print(f"Error {term}: {e}")
        return []

searches = {
    'darkrebel': search('DarkRebel', 15),
    'urbanrebel': search('UrbanRebel', 15),
    'raval': search('Cupra Raval', 15),
    'ateca_facelift': search('"Cupra Ateca" facelift OR 2021 OR 2022 OR 2023 OR 2024', 20),
    'terramar': search('Cupra Terramar', 20),
    'tavascan_concept': search('"Cupra Tavascan" 2019 OR concept', 20)
}

with open('scripts/detailed_search.json', 'w', encoding='utf-8') as f:
    json.dump(searches, f, indent=2)

for k, v in searches.items():
    print(f"=== {k} ({len(v)} results) ===")
    for item in v:
        print(f"  {item['title']}")
