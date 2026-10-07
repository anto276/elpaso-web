# Dev-time only. Crops the promo text/price overlay off each client photo
# (baked into the bottom of every WhatsApp image) and exports role-specific WebP sizes.
from PIL import Image
import os

SRC = os.path.join(os.path.dirname(__file__), "..", "assets", "photos", "source")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")
os.makedirs(OUT, exist_ok=True)


def safe_crop_top(path):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    # Per-pixel dark-band text detection was unreliable: dark meat/sauce inside
    # the dish itself kept triggering false positives and slicing through the
    # plate. Every photo in this batch shares the same fixed template instead
    # (verified by eye across the whole set): the plate always sits between
    # ~15-28% and ~73-78% of the frame height, and the promo text band always
    # starts at ~78-88%. A fixed percentage crop is therefore both safer and
    # more consistent than per-image detection.
    TOP, BOTTOM = 0.06, 0.79
    return im.crop((0, int(h * TOP), w, int(h * BOTTOM)))


def to_ratio(im, target_ratio):
    """Crop width or height symmetrically (centered) so the image matches
    target_ratio (width/height) exactly. This makes the CSS box's own
    object-fit:cover a no-op instead of a second, unpredictable crop on
    top of ours -- that mismatch was what kept slicing plates in the
    dish cards, gallery grid and collage."""
    w, h = im.size
    current = w / h
    if current > target_ratio:
        new_w = round(h * target_ratio)
        x0 = (w - new_w) // 2
        return im.crop((x0, 0, x0 + new_w, h))
    elif current < target_ratio:
        new_h = round(w / target_ratio)
        y0 = (h - new_h) // 2
        return im.crop((0, y0, w, y0 + new_h))
    return im


def export(cropped, name, max_w, quality, ratio=None):
    img = cropped
    if ratio:
        img = to_ratio(img, ratio)
    w, h = img.size
    if w > max_w:
        new_h = round(h * (max_w / w))
        img = img.resize((max_w, new_h), Image.LANCZOS)
    outp = os.path.join(OUT, name)
    img.save(outp, "WEBP", quality=quality)
    print(name, img.size, round(os.path.getsize(outp) / 1024), "KB")


CARD_RATIO = 4 / 5  # matches .dish-photo / .gallery-item / collage boxes in styles.css


# role: (source filename, output name, max width, quality, force_ratio)
JOBS = [
    # --- La Carta: 10 platos (fixed to match .dish-photo aspect-ratio:4/5) ---
    ("WhatsApp Image 2026-07-04 at 14.40.57.jpeg", "costilla-cerdo.webp", 1400, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.40.56.jpeg", "lomo-iberico.webp", 1400, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.42.20 (1).jpeg", "tortilla-patatas.webp", 1400, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.03 (1).jpeg", "merluza-escabeche.webp", 1400, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.42.20.jpeg", "ensalada-campera.webp", 1400, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.42.21.jpeg", "gulas-gallega.webp", 1400, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.00 (1).jpeg", "calabacin-relleno.webp", 1400, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.40.44.jpeg", "pimientos-rellenos.webp", 1400, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.05.jpeg", "sardinas-escabeche.webp", 1400, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.40.43.jpeg", "muslo-pollo.webp", 1400, 80, CARD_RATIO),
    # --- Hero (full-bleed background, no fixed box -- object-fit:cover handles any ratio) ---
    ("WhatsApp Image 2026-07-04 at 14.40.57.jpeg", "hero.webp", 2000, 78, None),
    # --- El Local collage (3) -- boxes in styles.css updated to aspect-ratio:4/5 too ---
    ("WhatsApp Image 2026-07-04 at 14.40.58.jpeg", "local-1.webp", 1000, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.20.jpeg", "local-2.webp", 1000, 80, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.42.21 (1).jpeg", "local-3.webp", 1000, 80, CARD_RATIO),
    # --- Grupos y celebraciones bg (full-bleed, no fixed box) ---
    ("WhatsApp Image 2026-07-04 at 14.42.20 (4).jpeg", "grupos-bg.webp", 1800, 78, None),
    # --- Galeria extras (fixed to match .gallery-item aspect-ratio:4/5) ---
    ("WhatsApp Image 2026-07-04 at 14.40.39.jpeg", "gal-coliflor.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.40.51 (1).jpeg", "gal-rollito-mar.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.40.51.jpeg", "gal-crujientes.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.40.55.jpeg", "gal-atun-tomate.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.40.57 (1).jpeg", "gal-sardinillas.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.40.59.jpeg", "gal-almeja-hueva.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.01.jpeg", "gal-pisto.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.02.jpeg", "gal-menestra.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.03.jpeg", "gal-garbanzos.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.05 (1).jpeg", "gal-brocoli.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.06.jpeg", "gal-ensalada-coliflor.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.41.07.jpeg", "gal-caballa.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.42.20 (2).jpeg", "gal-tortilla-espinacas.webp", 700, 76, CARD_RATIO),
    ("WhatsApp Image 2026-07-04 at 14.42.20 (3).jpeg", "gal-sardinas-ahumadas.webp", 700, 76, CARD_RATIO),
]

cache = {}
for src, name, max_w, quality, ratio in JOBS:
    srcp = os.path.join(SRC, src)
    if src not in cache:
        cache[src] = safe_crop_top(srcp)
    export(cache[src], name, max_w, quality, ratio)

print("DONE", len(JOBS), "images exported")
