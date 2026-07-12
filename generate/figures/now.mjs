import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { figure, figHeader, figFooter, label, annot, esc, text, MX } from '../lib/svg.mjs';
import { SERIES, WRITEUPS } from '../data/profile.mjs';

const H = 380;
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

  const activity = dyn.activity.slice(0, 3).map((a, i) => {
    const y = 182 + i * 40;
    return [
      text(esc(a.name), { x: 792, y, fs: 16, w: 600, ls: 0.02, fill: s.ink }),
      text(esc(`(${a.lang})`), { x: 792 + (a.name.length * 16 * 0.62) + 14, y, fs: 14, w: 600, fill: s.muted }),
      `<line x1="762" y1="${y - 5}" x2="774" y2="${y - 5}" stroke="${s.hairline}" stroke-width="2"/>`,
    ].join('\n');
  }).join('\n');

  const body = [
    figHeader(s, { num: '05', title: 'LAB NOTEBOOK', series: SERIES }),
    label('RECENT WRITE-UPS', { x: MX, y: 140, fs: 15, fill: s.accentDeep }),
    writeups,
    `<line x1="722" y1="118" x2="722" y2="286" stroke="${s.hairline}" stroke-width="1"/>`,
    label('RECENTLY TOUCHED', { x: 762, y: 140, fs: 15, fill: s.accentDeep }),
    activity,
    figFooter(s, H, { caption: `OBSERVED ${dyn.stamp} · THIS FIGURE REGENERATES ITSELF` }),
  ].join('\n');

  return figure(s, {
    id: 'now',
    height: H,
    ariaLabel: `Lab notebook. Recent write-ups: ${WRITEUPS.map((wu) => wu.title).join('; ')}. Recently touched repositories, refreshed weekly by CI. Observed ${dyn.stamp}.`,
    body,
  });
}
