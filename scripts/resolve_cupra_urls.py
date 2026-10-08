import urllib.request
import urllib.parse
import json

files = [
    'File:Cupra Formentor Facelift IMG 0435.jpg',
    'File:Cupra Formentor VZ5 1X7A7000.jpg',
    'File:Cupra Leon Mk4 Facelift DSC 8487.jpg',
    'File:Cupra Leon Mk4 IMG 0036.jpg',
    'File:Cupra Ateca 2.0 TSI (2022) (53365499902).jpg',
    'File:2019 SEAT Ateca Cupra 300 C&S 4Drive 2.0 Front.jpg',
    'File:Cupra Born IAA 2021 1X7A0212.jpg',
    'File:Cupra Tavascan front.jpg',
    'File:Cupra Terramar, Auto 2024, Zurich (PANA0481).jpg',
    'File:Cupra DarkRebel Concept IAA 2023 1X7A0438.jpg',
    'File:Cupra UrbanRebel Concept IAA 2021 1X7A0103.jpg',
    'File:Cupra Raval (concept) IAA 2023 1X7A0431.jpg',
    'File:Cupra Tavascan Concept (48770944691).jpg'
]

pipe_titles = '|'.join(files)
url = f'https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(pipe_titles)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json'
req = urllib.request.Request(url, headers={'User-Agent': 'CarvaultBot/1.0 (amglogicalis@gmail.com)'})
data = json.loads(urllib.request.urlopen(req).read())

resolved = {}
for pid, pdata in data['query']['pages'].items():
    title = pdata.get('title')
    info = pdata.get('imageinfo', [{}])[0]
    resolved[title] = {
        'url': info.get('url'),
        'width': info.get('width'),
        'height': info.get('height')
    }
    print(f"{title} -> {info.get('url')} ({info.get('width')}x{info.get('height')})")

with open('scripts/resolved_urls.json', 'w', encoding='utf-8') as f:
    json.dump(resolved, f, indent=2)
