import { figure, figHeader, figFooter, text, label, annot, arrow, esc, monoW, MX } from '../lib/svg.mjs';
import { SERIES, LEDGER } from '../data/profile.mjs';

const H = 502;

// crude greedy wrap for Fraunces italic (avg advance ~0.47em)
function wrap(str, fs, maxPx) {
  const perChar = fs * 0.47;
  const maxChars = Math.floor(maxPx / perChar);
  const words = str.split(' ');
  const lines = [''];
  for (const w of words) {
    const cur = lines[lines.length - 1];
    if ((cur + ' ' + w).trim().length > maxChars) lines.push(w);
    else lines[lines.length - 1] = (cur + ' ' + w).trim();
  }
  return lines;
}

export function ledger(s) {
  const rows = LEDGER.rows.map((r, i) => {
    const y0 = 158 + i * 106;
    const vw = monoW(r.vendor, 22);
    const detail = wrap(r.detail, 20, 620);
    return [
      i > 0 ? `<line x1="${MX}" y1="${y0 - 60}" x2="1040" y2="${y0 - 60}" stroke="${s.hairline}" stroke-width="1"/>` : '',
      text(esc(r.vendor), { x: MX, y: y0, fs: 22, w: 700, fill: s.muted }),
      `<line x1="${MX - 4}" y1="${y0 - 8}" x2="${MX + vw + 4}" y2="${y0 - 8}" stroke="${s.ink}" stroke-width="2.5"/>`,
      arrow(s, 330, y0 - 7, 52, s.muted, 1.5),
      text(esc(r.cap), { x: 412, y: y0, fs: 22, w: 700, fill: s.ink }),
      ...detail.map((line, j) =>
        annot(line, { x: 412, y: y0 + 32 + j * 27, fs: 20, fill: s.ink })),
    ].filter(Boolean).join('\n');
  }).join('\n');

  const stamp = `<g transform="translate(1216 250) rotate(-6)">
<rect x="-108" y="-46" width="216" height="92" rx="4" fill="${s.stampWash}" stroke="${s.accentDeep}" stroke-width="2.5" stroke-dasharray="7 5"/>
${label(LEDGER.stamp[0], { x: 0, y: -8, fs: 20, ls: 0.16, fill: s.accentDeep, anchor: 'middle' })}
${label(LEDGER.stamp[1], { x: 0, y: 24, fs: 20, ls: 0.16, fill: s.accentDeep, anchor: 'middle' })}
</g>`;

  const body = [
    figHeader(s, { num: '04', title: 'THE LEDGER', series: SERIES }),
    label('WAS', { x: MX, y: 122, fs: 13, ls: 0.18, fill: s.muted }),
    label('NOW, IN HOUSE', { x: 412, y: 122, fs: 13, ls: 0.18, fill: s.muted }),
    rows,
    stamp,
    figFooter(s, H, { caption: LEDGER.caption }),
  ].join('\n');

  return figure(s, {
    id: 'ledger',
    height: H,
    ariaLabel: 'Vendor replacement ledger. Verisoul replaced by in-house IP intelligence. Google Maps replaced by in-house geocoding over Overture data. Regula SaaS replaced by a self-hosted deployment. Stamp reads: brought in house.',
    body,
  });
}
