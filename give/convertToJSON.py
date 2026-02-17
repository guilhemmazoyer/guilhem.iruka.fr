import csv
import json

INPUT_CSV = "Trucs de la maison - ReadyForExtract.csv"
OUTPUT_JSON = "data.json"

items = []

with open(INPUT_CSV, newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        item = {
            "id": f"{int(row['id']):02d}",
            "nomJaponais": row["nomJaponais"].strip(),
            "nomAnglais": row["nomAnglais"].strip(),
            "image": f"images/{row['image'].strip()}",
            "description": row["description"].strip(),
            "extraImages": [
                f"images/{img.strip()}"
                for img in row["extraImages"].split(",")
                if img.strip()
            ]
        }

        items.append(item)

with open(OUTPUT_JSON, "w", encoding="utf-8") as jsonfile:
    json.dump(items, jsonfile, ensure_ascii=False, indent=4)

print(f"✅ Fichier JSON généré : {OUTPUT_JSON}")
