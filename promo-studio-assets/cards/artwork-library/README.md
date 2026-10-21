# 01 — Artwork Library

[View source inventory](../../manifest.json) · [Open HTML demo](./preview.html)

## Complete asset pack
- `base.svg` — original, transparent or composite 600×360 SVG layer
- `folder-closed.svg` — original, transparent or composite 600×360 SVG layer
- `folder-open.svg` — original, transparent or composite 600×360 SVG layer
- `art-landscape.svg` — original, transparent or composite 600×360 SVG layer
- `art-portrait.svg` — original, transparent or composite 600×360 SVG layer
- `art-sticker.svg` — original, transparent or composite 600×360 SVG layer
- `art-logo.svg` — original, transparent or composite 600×360 SVG layer
- `upload.svg` — original, transparent or composite 600×360 SVG layer
- `cursor.svg` — original, transparent or composite 600×360 SVG layer
- `sparkles.svg` — original, transparent or composite 600×360 SVG layer
- `motion.css` — 1.55s hover/focus/tap sequence with independent transforms.
- `preview.html` — stand-alone interactive demonstration; no external dependencies.
- `README.md` — usage and ownership.

## Idle state
Bright digital artwork-management screen. A closed orange folder rests in the center of the catalog while navigation and file counter show the space as a usable digital library.

## Animated state
The folder opens; landscape, portrait, sticker and logo files fan into distinct slots. Upload control and cursor appear, sparkles settle. Hover out resets to idle. Keyboard focus displays the animation; tap toggles on touch devices.

## Layout and implementation
SVG sprites each use `viewBox="0 0 600 360"`. They stack via absolutely positioned `<img>` layers in a `5 / 3` container; `object-fit:contain` prevents cropping. In production use the exact layer order shown in `preview.html` and import `motion.css`. All illustrations are authored Promo Studio demo art, not customer files.

## QA
- Expected files: **13**
- All SVGs have a title, accessible label, explicit viewBox and independent visual structure.
- Accessible preview includes button semantics and `prefers-reduced-motion` support.
