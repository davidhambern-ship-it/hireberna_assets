# Promo Studio — Animated Feature Cards Asset Manifest

**Home:** [Promo Studio asset library](./) · **Machine-readable manifest:** [manifest.json](./manifest.json)  
**Repository:** davidhambern-ship-it/hireberna_assets · **Version:** 1.0.0

The 6 original, illustrated feature cards are **motion-ready layered SVG mini-demos**. Each has a complete idle state and one hover/focus animation. Every card gets its own `base.svg`, independently movable image/UI layers, `motion.css`, accessible interactive `preview.html`, and `README.md`.

### Universal design rules
- Logo-derived palette: electric blue, cyan, violet, orange and crisp white, with soft pastel shading and rounded playful frames.
- Canvas 600 × 360 px SVG viewBox, scalable to any card; do not rasterize early.
- Preserve art with `object-fit:contain`; never crop to force a card layout.
- Animation duration 1.4–1.8s, hover + keyboard focus + optional touch/click support.
- Honor `prefers-reduced-motion`; the preview must remain readable without animation.
- All graphics authored for this project; no externally downloaded stock imagery or hidden font files.
- Card demo previews are **illustrations**, not live claims that AI, video rendering or publishing are operational.

### Six production packages
| # | Card | Hover storytelling | Asset bundle |
|---|---|---|---|
| 1 | [Artwork Library](./cards/artwork-library/) | Cabinet opens and artwork files fan into a visual gallery | 10 SVG layers + HTML + CSS + README |
| 2 | [APD Creative Director](./cards/apd-director/) | Copy, image, script and timing pieces assemble into a finished promo concept | 9 SVG layers + HTML + CSS + README |
| 3 | [Ready-to-Remix Templates](./cards/remix-templates/) | Image, headline, palette and CTA customize the template | 9 SVG layers + HTML + CSS + README |
| 4 | [Typography Playground](./cards/typography-playground/) | Headline cycles through different type treatments and color variations | 9 SVG layers + HTML + CSS + README |
| 5 | [Visual Editor](./cards/visual-editor/) | Artwork, text and sticker move along alignment guides into a polished layout | 9 SVG layers + HTML + CSS + README |
| 6 | [Video Export & Publishing](./cards/export-publishing/) | Render progress fills and video dispatches to four publishing channels | 11 SVG layers + HTML + CSS + README |

### QA required before calling a card complete
1. Every filename in the manifest exists in the repository; links resolve.
2. SVG files are standalone, use accessible titles, render at 600×360 scene coordinates or an appropriately-sized sprite.
3. HTML demo references every required layer; zero broken asset paths.
4. Hover, keyboard and reduced-motion behavior are defined; animation does not overlap the title or body copy when embedded in feature cards.
5. Compare static + hover states at 600×360 and mobile width before production integration.
6. Commit each card only after its bundle is complete and verified.

### Integration
Embed each package's `preview.html` as a design QA reference; the production site can use its `motion.css` and asset layers directly in the feature card art area. Do **not** replace or deploy the live site until the card transitions have been reviewed.

### Authored source / maintenance
The SVGs and animation code are the editable source. Change a sprite or its motion transform independently; don't repaint a flattened screenshot. Update `manifest.json` after each card's QA/commit.
