import { figure, figHeader, figFooter, text, label, annot, esc, MX, W } from '../lib/svg.mjs';
import { SERIES, METRICS } from '../data/profile.mjs';

const H = 380;

export function metrics(s) {
  const usable = W - 2 * MX;
  const colW = usable / METRICS.items.length;

  const panels = METRICS.items.map((it, i) => {
    const cx = MX + colW * i + colW / 2;
    const fill = it.accent ? s.accent : s.ink;
    const unit = it.unit ? `<tspan font-size="34" dx="2">${esc(it.unit)}</tspan>` : '';
    const sep = i > 0
      ? `<line x1="${MX + colW * i}" y1="132" x2="${MX + colW * i}" y2="252" stroke="${s.hairline}" stroke-width="1"/>`
      : '';
    return [
      sep,
      text(`${esc(it.n)}${unit}`, { x: cx, y: 200, fs: 64, w: 700, fill, anchor: 'middle', ls: -0.01 }),
      label(it.l1, { x: cx, y: 232, fs: 14, ls: 0.16, fill: s.muted, anchor: 'middle' }),
      label(it.l2, { x: cx, y: 254, fs: 14, ls: 0.16, fill: s.muted, anchor: 'middle' }),
    ].join('\n');
  }).join('\n');

  const body = [
    figHeader(s, { num: '03', title: 'THE READOUT', series: SERIES }),
    panels,
    annot(METRICS.note, { x: MX, y: 296, fs: 24, fill: s.ink }),
    figFooter(s, H, { caption: METRICS.caption }),
  ].join('\n');

  return figure(s, {
    id: 'metrics',
    height: H,
    ariaLabel: 'Career readout, 2023 to present: about 810 thousand sessions decisioned, 99.96 percent stage success, about 475 thousand lines of Rust, 14 times inference speedup, 2 production backends built from zero.',
    body,
  });
}
