# generate/

This profile page is a build artifact. Everything visual on the README is an SVG
"figure" emitted by the scripts in this directory, in the style of my brand kit
(an engineer's technical notebook, printed: cream paper, ink, one vermilion accent).

## How it works

- **`lib/tokens.mjs`** holds the two brand surfaces. GitHub light mode gets the
  cream/print expression, GitHub dark mode gets the dark/terminal expression of
  the same identity. The README swaps them with `<picture>` +
  `prefers-color-scheme`, so the page follows your theme.
- **`lib/svg.mjs`** is a tiny SVG toolkit: the numbered-figure header and footer
  grammar, the engineering grid, letterspaced mono labels, Fraunces italic
  annotations, stroked arrows, and `@font-face` embedding. Fonts (IBM Plex Mono
  and a pinned static instance of Fraunces italic, both SIL OFL) are subset to
  latin and inlined as base64 data URIs, because GitHub serves README images
  through a proxy that blocks external resources.
- **`figures/*.mjs`** each render one figure from data in `data/profile.mjs`.
  Animations (the blinking cursor, the session pulse traveling the KYC rail)
  are CSS keyframes inside the SVG, wrapped in
  `prefers-reduced-motion: no-preference`.
- **`build.mjs`** writes every figure in both surfaces to `../assets/`.
- **`update-now.mjs`** refreshes `data/now.json` (ISO-week stamp plus recently
  pushed repos from the GitHub API), and a weekly GitHub Action re-renders
  figure 05 from it. The page maintains itself.

## Reproduce

```sh
node generate/update-now.mjs   # refresh dynamic data (optional)
node generate/build.mjs        # render all 10 SVGs
```

No dependencies. Node 20+.
