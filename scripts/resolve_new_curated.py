import urllib.request
import urllib.parse
import json

files = [
    'File:Cupra Terramar VZ DSC 8241.jpg',
    'File:Cupra, IAA Open Space 2023, Munich (P1120138).jpg',
    'File:Cupra Raval (concept) IAA 2023 1X7A0429.jpg',
    'File:Cupra Raval VZ IMG 6967.jpg',
    'File:Cupra UrbanRebel Concept IAA 2023 1X7A0433.jpg',
    'File:Cupra Ateca Facelift IMG 5645.jpg',
    'File:Cupra Tavascan at IAA 2019 IMG 0244.jpg'
]

pipe_str = "|".join(files)
url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(pipe_str)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'CarvaultBot/1.0 (amglogicalis@gmail.com)'})
data = json.loads(urllib.request.urlopen(req).read())

curated = {}
for pid, p in data.get('query', {}).get('pages', {}).items():
    title = p.get('title')
    info = p.get('imageinfo', [{}])[0]
    meta = info.get('extmetadata', {})
    curated[title] = {
        'file': title,
        'url': info.get('url'),
        'width': info.get('width'),
        'height': info.get('height'),
        'author': meta.get('Artist', {}).get('value', 'Alexander-93'),
        'license': meta.get('LicenseShortName', {}).get('value', 'CC BY-SA 4.0'),
        'sourceUrl': f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(title)}"
    }
    print(f"{title}: {info.get('url')} ({info.get('width')}x{info.get('height')})")

with open('scripts/new_curated_fronts.json', 'w', encoding='utf-8') as f:
    json.dump(curated, f, indent=2)
