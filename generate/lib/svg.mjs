import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { TYPE } from './tokens.mjs';

const FONT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'fonts');

const b64 = (file) => readFileSync(join(FONT_DIR, file)).toString('base64');

const FONT_FACES = [
  { family: 'IBM Plex Mono', weight: 600, style: 'normal', file: 'plexmono-600-latin.woff2' },
  { family: 'IBM Plex Mono', weight: 700, style: 'normal', file: 'plexmono-700-latin.woff2' },
  { family: 'Fraunces', weight: 400, style: 'italic', file: 'fraunces-italic-subset.woff2' },
];

let fontCSSCache;
export function fontCSS() {
  fontCSSCache ??= FONT_FACES.map(
    (f) => `@font-face{font-family:'${f.family}';font-style:${f.style};font-weight:${f.weight};` +
      `src:url(data:font/woff2;base64,${b64(f.file)}) format('woff2');}`
  ).join('\n');
  return fontCSSCache;
}

export const esc = (s) =>
  String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// IBM Plex Mono advance width is exactly 0.6em.
export const monoW = (text, fs, lsEm = 0) => text.length * fs * (0.6 + lsEm);

// ---------------------------------------------------------------------------
// shared layout constants (1400-wide figures, hero.html-derived)
// ---------------------------------------------------------------------------
export const W = 1400;
export const MX = 64; // horizontal margin
export const MT = 54; // top margin

/** <text> shorthand. attrs: x,y,fill,fs,w(weight),ls(em),font,anchor,extra */
export function text(t, a) {
  const font = a.font ?? TYPE.mono;
  const parts = [
    `x="${a.x}" y="${a.y}"`,
    `fill="${a.fill}"`,
    `font-family="${font}"`,
    `font-size="${a.fs}"`,
    a.w ? `font-weight="${a.w}"` : '',
    a.ls ? `letter-spacing="${a.ls}em"` : '',
    a.style ? `font-style="${a.style}"` : '',
    a.anchor ? `text-anchor="${a.anchor}"` : '',
    a.cls ? `class="${a.cls}"` : '',
    a.extra ?? '',
  ].filter(Boolean).join(' ');
  return `<text ${parts}>${t}</text>`;
}

/** Letterspaced mono-caps label (the "stamp" voice). */
export const label = (t, a) => text(esc(String(t).toUpperCase()), { w: 600, ls: TYPE.trackEyebrow, ...a });

/** Fraunces italic annotation (the "margin note" voice). Pass tspans pre-escaped via `raw`. */
export const annot = (t, a) => text(a.raw ? t : esc(t), { font: TYPE.serif, style: 'italic', ...a });

/** Faint engineering grid + paper ground. */
export function ground(s, height, id) {
  return `<rect width="${W}" height="${height}" fill="${s.bg}"/>
<pattern id="grid-${id}" width="48" height="48" patternUnits="userSpaceOnUse">
  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="${s.gridLine}" stroke-width="1"/>
</pattern>
<rect width="${W}" height="${height}" fill="url(#grid-${id})"/>`;
}

/** Numbered-figure header: "¶ FIG. 0N · TITLE" left, series right, ink hairline under. */
export function figHeader(s, { num, title, series, rule = true }) {
  const y = MT + 15;
  const ruleY = MT + 34;
  return [
    label(`¶  FIG. ${num}  ·  `, { x: MX, y, fs: 19, fill: s.accentDeep }),
    label(title, { x: MX + monoW(`¶  FIG. ${num}  ·  `, 19, TYPE.trackEyebrow), y, fs: 19, fill: s.ink }),
    label(series, { x: W - MX, y, fs: 19, fill: s.muted, anchor: 'end' }),
    rule ? `<line x1="${MX}" y1="${ruleY}" x2="${W - MX}" y2="${ruleY}" stroke="${s.ink}" stroke-width="1.5"/>` : '',
  ].filter(Boolean).join('\n');
}

/** Figure footer: hairline rule, mono-caps caption left, Fraunces signature right. */
export function figFooter(s, height, { caption, sig = 'Sergio, 2026' }) {
  const ruleY = height - 62;
  const y = height - 34;
  return [
    `<line x1="${MX}" y1="${ruleY}" x2="${W - MX}" y2="${ruleY}" stroke="${s.hairline}" stroke-width="1"/>`,
    label(caption, { x: MX, y, fs: 15, fill: s.muted, ls: 0.12 }),
    annot(sig, { x: W - MX, y, fs: 20, fill: s.ink, anchor: 'end' }),
  ].join('\n');
}

/** A stroked arrow (glyph U+2192 is not in the latin subset; line-art is more on-brand anyway). */
export function arrow(s, x, y, len, color, sw = 2) {
  const c = color ?? s.ink;
  return `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<line x1="${x}" y1="${y}" x2="${x + len}" y2="${y}"/>
<path d="M ${x + len - 9} ${y - 6} L ${x + len} ${y} L ${x + len - 9} ${y + 6}"/></g>`;
}

/** Wrap a complete figure. Animations must live inside prefers-reduced-motion media. */
export function figure(s, { id, height, ariaLabel, css = '', body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" width="${W}" height="${height}" role="img" aria-label="${esc(ariaLabel)}">
<title>${esc(ariaLabel)}</title>
<style>
${fontCSS()}
text{white-space:pre}
${css}
</style>
${ground(s, height, id)}
${body}
</svg>`;
}
