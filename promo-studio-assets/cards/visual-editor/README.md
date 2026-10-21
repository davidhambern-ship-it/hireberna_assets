# Visual Editor — Complete motion-ready asset kit

[Asset manifest](../../manifest.json) · [Hover preview](./preview.html)

A messy mini layout is arranged with snap guides; a confirmation chip appears when the composition locks in.

## Asset inventory
- `base.svg` — individually editable visual layer
- `artwork.svg` — individually editable visual layer
- `headline.svg` — individually editable visual layer
- `sticker.svg` — individually editable visual layer
- `guides.svg` — individually editable visual layer
- `handles.svg` — individually editable visual layer
- `cursor.svg` — individually editable visual layer
- `finish.svg` — individually editable visual layer
- `sparkles.svg` — individually editable visual layer
- `motion.css` — staggered 1.55s transitions + reduced-motion support.
- `preview.html` — accessible hover/focus/tap test harness.
- `README.md` — complete source notes.

**Technical contract:** every SVG 600×360 pixels in a shared coordinate system, CSS overlays use `object-fit:contain` (never crop), preview works without external dependencies. 
