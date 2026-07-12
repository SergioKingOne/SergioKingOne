import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { figure, figHeader, figFooter, label, annot, esc, text, MX } from '../lib/svg.mjs';
import { SERIES, WRITEUPS, FOCUS } from '../data/profile.mjs';

const H = 400;
const NOW_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'now.json');

export function now(s) {
  const dyn = JSON.parse(readFileSync(NOW_PATH, 'utf8'));

  const writeups = WRITEUPS.map((wu, i) => {
    const y = 182 + i * 74;
    return [
      annot(wu.title, { x: MX, y, fs: 23, fill: s.ink }),
      label(wu.sub, { x: MX, y: y + 27, fs: 13, ls: 0.06, fill: s.muted }),
    ].join('\n');
  }).join('\n');

  const focus = FOCUS.map((f, i) => {
    const y = 182 + i * 40;
    return [
      `<rect x="762" y="${y - 11}" width="11" height="11" fill="none" stroke="${s.ink}" stroke-width="1.8"/>`,
      label(f, { x: 792, y, fs: 16, ls: 0.08, fill: s.ink }),
    ].join('\n');
  }).join('\n');

  const activity = dyn.activity
    .map((a) => `${a.name} (${a.lang})`)
    .join('  ·  ');

  const body = [
    figHeader(s, { num: '05', title: 'LAB NOTEBOOK', series: SERIES }),
    label('RECENT WRITE-UPS', { x: MX, y: 140, fs: 15, fill: s.accentDeep }),
    writeups,
    `<line x1="722" y1="118" x2="722" y2="300" stroke="${s.hairline}" stroke-width="1"/>`,
    label('CURRENT FOCUS', { x: 762, y: 140, fs: 15, fill: s.accentDeep }),
    focus,
    text(esc(`RECENTLY TOUCHED: ${activity}`), { x: MX, y: 316, fs: 14, w: 600, ls: 0.04, fill: s.muted }),
    figFooter(s, H, { caption: `OBSERVED ${dyn.stamp} · THIS FIGURE REGENERATES ITSELF` }),
  ].join('\n');

  return figure(s, {
    id: 'now',
    height: H,
    ariaLabel: `Lab notebook. Recent write-ups: ${WRITEUPS.map((wu) => wu.title).join('; ')}. Current focus: geolocation fraud product line, AWS Solutions Architect Associate, systems engineering degree 2026. Observed ${dyn.stamp}.`,
    body,
  });
}
