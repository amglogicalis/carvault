import urllib.request
import urllib.parse
import json

titles = [
    'File:Cupra Shooting Brake DarkRebel Concept Bild 1 2023-09-08.jpg',
    'File:Cupra Shooting Brake DarkRebel Concept Bild 2 2023-09-08.jpg',
    'File:Cupra Shooting Brake DarkRebel Concept Bild 3 2023-09-08.jpg',
    'File:Cupra Shooting Brake DarkRebel Concept Bild 4 2023-09-08.jpg',
    'File:Cupra, IAA Open Space 2023, Munich (P1120138).jpg',
    'File:Cupra, IAA Open Space 2023, Munich (P1120139).jpg',
    'File:Cupra, IAA Open Space 2023, Munich (P1120140).jpg',
    'File:Cupra DarkRebel Concept IAA 2023 1X7A0443.jpg'
]

pipe_str = "|".join(titles)
url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(pipe_str)}&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'CarvaultBot/1.0 (amglogicalis@gmail.com)'})
data = json.loads(urllib.request.urlopen(req).read())

for p in data.get('query', {}).get('pages', {}).values():
    t = p.get('title')
    info = p.get('imageinfo', [{}])[0]
    th = info.get('thumburl')
    if th:
        fn = t.replace('File:', '').replace(' ', '_').replace(',', '')[:30] + '.jpg'
        treq = urllib.request.Request(th, headers={'User-Agent': 'Mozilla/5.0'})
        with open(f'scratch/images/{fn}', 'wb') as f:
            f.write(urllib.request.urlopen(treq).read())
        print(f"{t} -> scratch/images/{fn}")
