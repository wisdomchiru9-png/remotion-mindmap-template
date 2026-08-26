import cv2
import easyocr
import json

THUMBNAIL = r"C:\Users\agney\Documents\Projects\yt2map\website\yt2mindmap-2\blogs\Marketing Strategy\Videos\my-video\thumbnail.png"

reader = easyocr.Reader(["en"], gpu=False)

results = reader.readtext(
    THUMBNAIL,
    paragraph=False,
)

SEARCH = [
    ("Section 1", "1791"),
    ("Section 2", "2011"),
    ("Section 3", "1999"),
    ("Section 4", "20z0"),
    ("Section 5", "2006"),
    ("Section 6", "2016"),
]

targets = []

img = cv2.imread(THUMBNAIL)
height, width = img.shape[:2]

# Overview
targets.append({
    "label": "Overview",
    "x": 0,
    "y": 0,
    "scale": 1,
    "holdSeconds": 5,
})

for label, phrase in SEARCH:

    best = None

    for bbox, text, confidence in results:

        

        if phrase.lower() in text.lower():

            xs = [p[0] for p in bbox]
            ys = [p[1] for p in bbox]

            cx = int(sum(xs) / 4)
            cy = int(sum(ys) / 4)

            best = (cx, cy, confidence)
            break

    if best is None:
        print(f"Couldn't find '{phrase}'")
        continue

    cx, cy, conf = best

    print(label, phrase, conf)

    targets.append({
        "label": label,
        "x": cx - width // 2,
        "y": cy - height // 2,
        "scale": 4.4,
        "holdSeconds": 0.5,
    })

targets.append({
    "label": "Overview",
    "x": 0,
    "y": 0,
    "scale": 1,
    "holdSeconds": 0.5,
})

print("\nconst targets =")
print(json.dumps(targets, indent=2))