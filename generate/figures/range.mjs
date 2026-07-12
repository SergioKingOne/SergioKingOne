import { figure, figHeader, figFooter, text, label, annot, esc, MX } from '../lib/svg.mjs';
import { SERIES, RANGE } from '../data/profile.mjs';

const H = 520;

export function range(s) {
  const rows = RANGE.rows.map((r, i) => {
    const y = 156 + i * 56;
    return [
      i > 0 ? `<line x1="${MX}" y1="${y - 36}" x2="${1400 - MX}" y2="${y - 36}" stroke="${s.hairline}" stroke-width="1"/>` : '',
      text(esc(r.domain), { x: MX, y, fs: 20, w: 700, fill: s.ink, ls: 0.04 }),
      annot(r.note, { x: 470, y, fs: 21, fill: s.ink }),
    ].filter(Boolean).join('\n');
  }).join('\n');

  const body = [
    figHeader(s, { num: '02', title: 'THE RANGE', series: SERIES }),
    rows,
    annot(RANGE.closing, { x: MX, y: 428, fs: 26, fill: s.accentDeep }),
    figFooter(s, H, { caption: RANGE.caption }),
  ].join('\n');

  return figure(s, {
    id: 'range',
    height: H,
    ariaLabel: 'The range: five domains shipped to production since 2023. Fraud and identity. Geo and IP intelligence. Privacy engineering. AI systems. Real-time systems. Every row here was unfamiliar once; learning it is the job.',
    body,
  });
}
