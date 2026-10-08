import urllib.request
import urllib.parse
import json

files_to_inspect = [
    # Terramar
    "File:Cupra Terramar 2.0 TSI 4Drive (2025) (54857879207).jpg",
    "File:Cupra Terramar 1.5 eTSI – f 25012026.jpg",
    "File:Cupra Terramar DSC 7870.jpg",
    "File:Cupra Terramar VZ DSC 8241.jpg",
    "File:Cupra Terramar VZ IMG 2330.jpg",
    "File:Cupra Terramar no Milladoiro.jpg",
    # Ateca Facelift
    "File:Cupra Ateca (Facelift) – f 24052025.jpg",
    "File:Cupra Ateca Facelift IMG 3666.jpg",
    "File:Cupra Ateca Facelift IMG 3667.jpg",
    "File:Cupra Ateca Facelift IMG 5645.jpg",
    "File:2021 Cupra Ateca 1.jpg",
    "File:2022 Cupra Ateca VZ1 TSi 4Drive.jpg",
    # DarkRebel
    "File:Cupra DarkRebel Concept IAA 2023 1X7A0437.jpg",
    "File:Cupra DarkRebel Concept IAA 2023 1X7A0439.jpg",
    "File:Cupra DarkRebel Concept IAA 2023 1X7A0440.jpg",
    "File:Cupra DarkRebel Concept IAA 2023 1X7A0441.jpg",
    "File:Cupra DarkRebel Concept, IAA, München, Alemania, 2023-09-10, DD 02.jpg",
    "File:Cupra DarkRebel Concept, IAA, München, Alemania, 2023-09-10, DD 03.jpg",
    "File:Cupra Shooting Brake DarkRebel Concept Bild 2 2023-09-08.jpg",
    # UrbanRebel
    "File:Cupra UrbanRebel Concept IAA 2021 1X7A0099.jpg",
    "File:Cupra UrbanRebel Concept IAA 2021 1X7A0101.jpg",
    "File:Cupra UrbanRebel Concept IAA 2021 1X7A0105.jpg",
    "File:Cupra Urban Rebel IAA 2021.jpg",
    "File:Cupra UrbanRebel Concept IAA 2023 1X7A0433.jpg",
    # Raval
    "File:Cupra Raval (concept) IAA 2023 1X7A0429.jpg",
    "File:Cupra Raval VZ IMG 6967.jpg",
    "File:Cupra Raval VZ IMG 7705.jpg",
    "File:Cupra Raval VZ IMG 7711.jpg",
    "File:Cupra Raval, IAA Open Space 2023, Munich (P1120136).jpg",
    # Tavascan Concept
    "File:Cupra Tavascan at IAA 2019 IMG 0244.jpg",
    "File:Cupra Tavascan at IAA 2019 IMG 0245.jpg",
    "File:Cupra Tavascan at IAA 2019 IMG 0790.jpg",
    "File:Cupra Tavascan at IAA 2019 IMG 0791.jpg",
    "File:Cupra Tavascan Concept (48771145432).jpg"
]

pipe_titles = '|'.join(files_to_inspect)
url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(pipe_titles)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'CarvaultBot/1.0 (amglogicalis@gmail.com)'})
data = json.loads(urllib.request.urlopen(req).read())

details = {}
for pid, p in data.get('query', {}).get('pages', {}).items():
    title = p.get('title')
    info = p.get('imageinfo', [{}])[0]
    meta = info.get('extmetadata', {})
    desc = meta.get('ImageDescription', {}).get('value', '')
    cat = meta.get('Categories', {}).get('value', '')
    details[title] = {
        'url': info.get('url'),
        'width': info.get('width'),
        'height': info.get('height'),
        'desc': desc[:200] if desc else '',
        'categories': cat
    }

with open('scripts/candidate_details.json', 'w', encoding='utf-8') as f:
    json.dump(details, f, indent=2)

for t, d in details.items():
    print(f"{t}: {d['width']}x{d['height']} | {d['desc']}")
