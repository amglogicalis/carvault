import urllib.request
import urllib.parse
import json

categories = [
    "Category:Cupra Terramar",
    "Category:Cupra Ateca",
    "Category:Cupra DarkRebel",
    "Category:Cupra UrbanRebel",
    "Category:Cupra Raval",
    "Category:Cupra Tavascan Concept"
]

cat_files = {}

for cat in categories:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle={urllib.parse.quote(cat)}&gcmtype=file&gcmlimit=50&prop=imageinfo&iiprop=url|size|extmetadata&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'CarvaultBot/1.0 (amglogicalis@gmail.com)'})
    try:
        data = json.loads(urllib.request.urlopen(req).read())
        pages = data.get('query', {}).get('pages', {})
        items = []
        for pid, p in pages.items():
            info = p.get('imageinfo', [{}])[0]
            items.append({
                'title': p.get('title'),
                'url': info.get('url'),
                'width': info.get('width'),
                'height': info.get('height'),
                'description': info.get('extmetadata', {}).get('ImageDescription', {}).get('value', '')
            })
        cat_files[cat] = items
        print(f"{cat}: found {len(items)} files")
    except Exception as e:
        print(f"Error {cat}: {e}")

with open('scripts/category_files.json', 'w', encoding='utf-8') as f:
    json.dump(cat_files, f, indent=2)
