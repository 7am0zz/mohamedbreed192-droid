# Portfolio

Mohamed Said’s public portfolio is served by GitHub Pages from this directory.

- `index.html`: project content and semantic page structure.
- `styles.css`: responsive layout, restrained motion, and locally hosted variable fonts.
- `portfolio.js`: projected 3D geometry, shape selection, pause/rotation controls, section reveals, category filters, scroll progress, and an accessible screenshot dialog.
- `assets/fonts`: Latin subsets of DM Sans and Space Grotesk with their SIL Open Font Licenses.

The geometry uses a small Canvas renderer with projected vertices and depth-sorted faces: a subdivided icosahedron, a torus, and a hexagonal bipyramid. It has no third-party JavaScript runtime or remote asset dependency. Rendering pauses when the scene is offscreen or the document is hidden. Reduced-motion preferences disable automatic rotation and reveal animations while preserving shape selection.

The graduation project remains first, followed by SENTINEL AI. Project screenshots stay compact and open at full size in a keyboard-dismissable dialog. Project scope labels distinguish synthetic demonstrations from the NASA simulated sensor baseline.

## Local preview

```bash
python -m http.server 3199 --directory docs
```

Open `http://localhost:3199`. There is no build step.

## Verification

Verified on 2026-11-16 using the system Chromium through Playwright:

- Desktop 1440 × 1050: 3D selection and pause controls, category filters, screenshot dialog, Escape dismissal, returned keyboard focus, section navigation, and no page JavaScript errors.
- Mobile 390 × 844: compact layout, screenshot dialog, and no horizontal overflow.
- Narrow phone 320 × 740: no horizontal overflow.
- Reduced motion: static scene, disabled automatic-animation toggle, usable shape selection, and visible content.

All four browser checks passed. JavaScript syntax, local asset paths, unique anchors, project order, and Git whitespace checks also passed. Desktop and mobile captures were inspected. This is Chromium verification, not a claim of exhaustive browser or assistive-technology certification.
