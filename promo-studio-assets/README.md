# Promo Studio — Six Animated Feature-Card Asset Packs

**[Machine-readable, versioned manifest](./manifest.json)** · **[QA validator](../scripts/validate_promo_assets.py)** · **[All files in GitHub](./cards/)**

These are the *complete editable visual source kits* for the Welcome page's six feature cards. Every card contains its own illustrated background, independently movable SVG sprites, accessible hover/focus/tap preview, a CSS motion sequence, and source notes.

| Card | Source folder | Files | Story on hover |
|---|---|---:|---|
| 1. Artwork Library | [Open asset kit](./cards/artwork-library/) | 13 | Cabinet opens and artwork files fan into a visual gallery |
| 2. APD Creative Director | [Open asset kit](./cards/apd-director/) | 12 | Copy, image, script and timing pieces assemble into a finished promo concept |
| 3. Ready-to-Remix Templates | [Open asset kit](./cards/remix-templates/) | 12 | Image, headline, palette and CTA customize the template |
| 4. Typography Playground | [Open asset kit](./cards/typography-playground/) | 12 | Headline cycles through different type treatments and color variations |
| 5. Visual Editor | [Open asset kit](./cards/visual-editor/) | 12 | Artwork, text and sticker move along alignment guides into a polished layout |
| 6. Video Export & Publishing | [Open asset kit](./cards/export-publishing/) | 14 | Render progress fills and video dispatches to four publishing channels |

### Total source inventory
**6 complete card kits · 57 original SVG layers · 6 CSS motion files · 6 playable HTML previews · 6 READMEs = 75 files.**

### Art direction
Promo Studio logo-inspired visual language: white/lilac canvas, navy outlines, electric blue/cyan, vivid purple, coral and sunny orange. Self-contained scalable vector assets with no licensed stock image dependence and no distributed font files. All layers use the same 600 × 360 coordinate system; noncropping `object-fit:contain` is mandatory.

### QA and behavior
Each `preview.html` is a self-contained local demo. Hover or focus shows the full 1.55-second animation; tap toggles the active state. The project includes an automated [GitHub Actions verification](https://github.com/davidhambern-ship-it/hireberna_assets/actions/workflows/validate-promo-studio-assets.yml) that parses all SVG XML files, checks every referenced layer, checks reduced-motion handling and asserts the exact inventory count. **Browser visual acceptance and integration on the live Promo Studio landing page are still separate steps.**

### Integration approach
Do not publish a flattened screenshot as a replacement for these assets. Each feature card should embed its SVG layers and `motion.css`, with the title/description below the animated art so motion doesn't obscure text. Copy assets into the site build or publish them through an asset host; the current Cloudflare website is unchanged by adding this library.
