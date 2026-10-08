import urllib.request
import urllib.parse
import os
import json

os.makedirs('scratch/images', exist_ok=True)

test_files = [
    # Terramar
    ("terramar_dsc7870", "File:Cupra Terramar DSC 7870.jpg"),
    ("terramar_vz_dsc8241", "File:Cupra Terramar VZ DSC 8241.jpg"),
    ("terramar_2025_54857879207", "File:Cupra Terramar 2.0 TSI 4Drive (2025) (54857879207).jpg"),
    ("terramar_vz_img2330", "File:Cupra Terramar VZ IMG 2330.jpg"),
    # Ateca Facelift
    ("ateca_facelift_3666", "File:Cupra Ateca Facelift IMG 3666.jpg"),
    ("ateca_facelift_3667", "File:Cupra Ateca Facelift IMG 3667.jpg"),
    ("ateca_facelift_5645", "File:Cupra Ateca Facelift IMG 5645.jpg"),
    # DarkRebel
    ("darkrebel_0437", "File:Cupra DarkRebel Concept IAA 2023 1X7A0437.jpg"),
    ("darkrebel_0439", "File:Cupra DarkRebel Concept IAA 2023 1X7A0439.jpg"),
    ("darkrebel_0440", "File:Cupra DarkRebel Concept IAA 2023 1X7A0440.jpg"),
    ("darkrebel_0441", "File:Cupra DarkRebel Concept IAA 2023 1X7A0441.jpg"),
    # UrbanRebel
    ("urbanrebel_0099", "File:Cupra UrbanRebel Concept IAA 2021 1X7A0099.jpg"),
    ("urbanrebel_0101", "File:Cupra UrbanRebel Concept IAA 2021 1X7A0101.jpg"),
    ("urbanrebel_0105", "File:Cupra UrbanRebel Concept IAA 2021 1X7A0105.jpg"),
    ("urbanrebel_2023_0433", "File:Cupra UrbanRebel Concept IAA 2023 1X7A0433.jpg"),
    # Raval
    ("raval_0429", "File:Cupra Raval (concept) IAA 2023 1X7A0429.jpg"),
    ("raval_vz_6967", "File:Cupra Raval VZ IMG 6967.jpg"),
    ("raval_vz_8744", "File:Cupra Raval VZ Leonberg 2026 IMG 8744.jpg"),
    ("raval_vz_7711", "File:Cupra Raval VZ IMG 7711.jpg"),
    # Tavascan Concept
    ("tavascan_c_0244", "File:Cupra Tavascan at IAA 2019 IMG 0244.jpg"),
    ("tavascan_c_0245", "File:Cupra Tavascan at IAA 2019 IMG 0245.jpg"),
    ("tavascan_c_0791", "File:Cupra Tavascan at IAA 2019 IMG 0791.jpg")
]

# Fetch 500px thumbnail URLs via MediaWiki API
titles = [f[1] for f in test_files]
url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote('|'.join(titles))}&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'CarvaultBot/1.0 (amglogicalis@gmail.com)'})
data = json.loads(urllib.request.urlopen(req).read())

pages_by_title = {p.get('title'): p for p in data.get('query', {}).get('pages', {}).values()}

mapping = {}
for short_name, title in test_files:
    p = pages_by_title.get(title)
    if p and p.get('imageinfo'):
        thumb_url = p['imageinfo'][0].get('thumburl')
        full_url = p['imageinfo'][0].get('url')
        local_path = f"scratch/images/{short_name}.jpg"
        try:
            treq = urllib.request.Request(thumb_url, headers={'User-Agent': 'Mozilla/5.0'})
            with open(local_path, 'wb') as out:
                out.write(urllib.request.urlopen(treq).read())
            print(f"Downloaded {short_name}: {thumb_url}")
            mapping[short_name] = {
                'title': title,
                'full_url': full_url,
                'thumb_url': thumb_url,
                'local_path': local_path
            }
        except Exception as e:
            print(f"Error downloading {short_name}: {e}")

with open('scratch/images/mapping.json', 'w', encoding='utf-8') as f:
    json.dump(mapping, f, indent=2)
