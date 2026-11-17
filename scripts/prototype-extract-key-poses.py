"""PROTOTYPE (throwaway, branch prototype/key-pose-crossfade only).

Pulls the key poses out of each vendored ExerciseDB GIF: the frames the GIF holds for
500 ms or more. Writes them as WebP to public/prototype-key-poses/<id>-<n>.webp and a
manifest public/prototype-key-poses/poses.json: { "<id>": { "count": n, "holds": [ms, ...] } }.

Run: python3 -I scripts/prototype-extract-key-poses.py   (needs Pillow)
"""

import json
import pathlib
import sys

from PIL import Image, ImageSequence

root = pathlib.Path(sys.argv[0]).resolve().parent.parent
src = root / "public" / "exercisedb"
out = root / "public" / "prototype-key-poses"
out.mkdir(exist_ok=True)

manifest = {}
for gif in sorted(src.glob("*.gif")):
    im = Image.open(gif)
    poses = []
    for frame in ImageSequence.Iterator(im):
        hold = frame.info.get("duration", 100)
        if hold >= 500:
            poses.append((frame.convert("RGB"), hold))
    if not poses:  # no long hold: fall back to the first frame
        im.seek(0)
        poses = [(im.convert("RGB"), 1000)]
    for n, (frame, _) in enumerate(poses):
        frame.save(out / f"{gif.stem}-{n}.webp", "WEBP", quality=85, method=6)
    manifest[gif.stem] = {"count": len(poses), "holds": [h for _, h in poses]}

(out / "poses.json").write_text(json.dumps(manifest, indent=1) + "\n")
counts = {}
for v in manifest.values():
    counts[v["count"]] = counts.get(v["count"], 0) + 1
print(len(manifest), "GIFs; poses per GIF:", dict(sorted(counts.items())))
