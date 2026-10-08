import urllib.request
import urllib.parse
import json

def search_commons(query, limit=15):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrlimit={limit}&prop=imageinfo&iiprop=url|size|extmetadata&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'CarvaultBot/1.0 (amglogicalis@gmail.com)'})
    try:
        data = json.loads(urllib.request.urlopen(req).read())
        pages = data.get('query', {}).get('pages', {})
        results = []
        for pid, pdata in pages.items():
            title = pdata.get('title')
            info = pdata.get('imageinfo', [{}])[0]
            if info.get('url'):
                results.append({
                    'title': title,
                    'url': info.get('url'),
                    'width': info.get('width'),
                    'height': info.get('height')
                })
        return results
    except Exception as e:
        print(f"Error searching for {query}: {e}")
        return []

targets = [
    "Cupra Terramar front",
    "Cupra Terramar",
    "Cupra Ateca facelift front",
    "Cupra Ateca front 2021",
    "Cupra Ateca front 2022",
    "Cupra Ateca front 2023",
    "Cupra DarkRebel front",
    "Cupra Darkrebel IAA",
    "Cupra UrbanRebel front",
    "Cupra UrbanRebel Concept front",
    "Cupra Raval front",
    "Cupra Raval IAA",
    "Cupra Tavascan Concept front",
    "Cupra Tavascan 2019 front"
]

all_res = {}
for t in targets:
    res = search_commons(t, limit=10)
    all_res[t] = res
    print(f"Query '{t}': found {len(res)} results")

with open('scripts/search_results.json', 'w', encoding='utf-8') as f:
    json.dump(all_res, f, indent=2)
