import { figure, figHeader, figFooter, text, label, annot, arrow, esc, monoW, MX } from '../lib/svg.mjs';
import { SERIES, PRIMITIVES } from '../data/profile.mjs';

const H = 520;

export function primitives(s) {
  const rows = PRIMITIVES.rows.map((r, i) => {
    const y0 = 160 + i * 84;
    const tw = monoW(r.typical, 20);
    return [
      i > 0 ? `<line x1="${MX}" y1="${y0 - 34}" x2="1040" y2="${y0 - 34}" stroke="${s.hairline}" stroke-width="1"/>` : '',
      text(esc(r.typical), { x: MX, y: y0, fs: 20, w: 700, fill: s.muted }),
      `<line x1="${MX - 4}" y1="${y0 - 7}" x2="${MX + tw + 4}" y2="${y0 - 7}" stroke="${s.ink}" stroke-width="2.5"/>`,
      arrow(s, 340, y0 - 7, 52, s.muted, 1.5),
      text(esc(r.built), { x: 424, y: y0, fs: 21, w: 700, fill: s.ink }),
      annot(r.note, { x: 424, y: y0 + 30, fs: 20, fill: s.ink }),
    ].filter(Boolean).join('\n');
  }).join('\n');

  const stamp = `<g transform="translate(1216 260) rotate(-6)">
<rect x="-110" y="-46" width="220" height="92" rx="4" fill="${s.stampWash}" stroke="${s.accentDeep}" stroke-width="2.5" stroke-dasharray="7 5"/>
${label(PRIMITIVES.stamp[0], { x: 0, y: -8, fs: 20, ls: 0.16, fill: s.accentDeep, anchor: 'middle' })}
${label(PRIMITIVES.stamp[1], { x: 0, y: 24, fs: 20, ls: 0.16, fill: s.accentDeep, anchor: 'middle' })}
</g>`;

  const body = [
    figHeader(s, { num: '04', title: 'FROM PRIMITIVES', series: SERIES }),
    label('THE TYPICAL MOVE', { x: MX, y: 122, fs: 13, ls: 0.18, fill: s.muted }),
    label('WHAT GOT BUILT', { x: 424, y: 122, fs: 13, ls: 0.18, fill: s.muted }),
    rows,
    stamp,
    figFooter(s, H, { caption: PRIMITIVES.caption }),
  ].join('\n');

  return figure(s, {
    id: 'primitives',
    height: H,
    ariaLabel: 'From primitives, a running ledger of tools built where none fit. Instead of a vendor score: in-house IP intelligence. Instead of a paid API: a geocoding engine over open data. Instead of an SDK: Apple App Attest verification in Rust from raw bytes. Instead of plaintext search: encrypted blind indexes. Stamp reads: built, not bought.',
    body,
  });
}
