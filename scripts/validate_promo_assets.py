#!/usr/bin/env python3
"""Verify every Promo Studio card is a full, independently animated SVG asset kit."""
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "promo-studio-assets"
manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
cards = manifest["cards"]
errors = []
total_files = 0
total_layers = 0

for card in cards:
    folder = ROOT / "cards" / card["slug"]
    expected = list(card["visual_layers"]) + list(card["shared_files"])
    actual = {f.name for f in folder.iterdir() if f.is_file()} if folder.is_dir() else set()
    total_files += len(actual)
    total_layers += len(card["visual_layers"])

    missing = set(expected) - actual
    extras = actual - set(expected)
    if missing:
        errors.append(f"{card['slug']}: missing {sorted(missing)}")
    if extras:
        errors.append(f"{card['slug']}: undeclared files {sorted(extras)}")
    if not folder.is_dir():
        continue

    html = (folder / "preview.html").read_text(encoding="utf-8") if "preview.html" in actual else ""
    css = (folder / "motion.css").read_text(encoding="utf-8") if "motion.css" in actual else ""
    if 'prefers-reduced-motion:reduce' not in css:
        errors.append(f"{card['slug']}: reduced motion support missing")
    if 'object-fit:contain' not in css or 'object-fit:cover' in css:
        errors.append(f"{card['slug']}: noncropping image fit missing")
    if ':hover' not in css or ':focus-visible' not in css or '.is-active' not in css:
        errors.append(f"{card['slug']}: hover/focus/touch controls missing")
    if 'aria-pressed' not in html:
        errors.append(f"{card['slug']}: accessible toggle missing")
    for filename in card["visual_layers"]:
        if filename not in actual:
            continue
        if f'./{filename}' not in html:
            errors.append(f"{card['slug']}: preview missing reference to {filename}")
        try:
            root = ET.parse(folder / filename).getroot()
            if not root.tag.endswith("svg"):
                errors.append(f"{card['slug']}/{filename}: not an SVG root")
            if root.attrib.get("viewBox") != "0 0 600 360":
                errors.append(f"{card['slug']}/{filename}: wrong viewBox")
            if not any(node.tag.endswith("title") for node in root):
                errors.append(f"{card['slug']}/{filename}: accessible title missing")
        except ET.ParseError as exc:
            errors.append(f"{card['slug']}/{filename}: XML error {exc}")

print(f"Promo Studio asset QA: {len(cards)} cards, {total_layers} SVG layers, {total_files} total card files")
if errors:
    for err in errors:
        print("ERROR:", err)
    sys.exit(1)
if len(cards) != 6 or total_layers != 57 or total_files != 75:
    print("ERROR: unexpected inventory counts")
    sys.exit(1)
print("PASS: 75/75 asset files, SVG markup, linked previews, interaction and no-crop rules")
