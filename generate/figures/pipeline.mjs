import { figure, figHeader, figFooter, label, annot, arrow, MX, W } from '../lib/svg.mjs';
import { SERIES, PIPELINE } from '../data/profile.mjs';

const H = 470;
const RAIL_Y = 208;
const X0 = 100;
const X1 = 1064;

export function pipeline(s) {
  const n = PIPELINE.stages.length;
  const step = (X1 - X0) / (n - 1);

  const nodes = PIPELINE.stages.map((name, i) => {
    const x = X0 + i * step;
    const above = i % 2 === 0;
    const isFinal = i === n - 1;
    const tickY2 = above ? RAIL_Y - 34 : RAIL_Y + 34;
    const labelY = above ? RAIL_Y - 46 : RAIL_Y + 58;
    return [
      `<line x1="${x}" y1="${RAIL_Y + (above ? -9 : 9)}" x2="${x}" y2="${tickY2}" stroke="${s.hairline}" stroke-width="1"/>`,
      isFinal
        ? `<circle cx="${x}" cy="${RAIL_Y}" r="9" fill="${s.accentDeep}"/><circle cx="${x}" cy="${RAIL_Y}" r="15" fill="none" stroke="${s.accentDeep}" stroke-width="1.5"/>`
        : `<circle cx="${x}" cy="${RAIL_Y}" r="7" fill="${s.bg}" stroke="${s.ink}" stroke-width="2"/>`,
      label(name, {
        x, y: labelY, fs: 14, ls: 0.1, anchor: 'middle',
        fill: isFinal ? s.accentDeep : s.muted,
      }),
    ].join('\n');
  }).join('\n');

  // travel keyframes: pause briefly at each gate
  const stops = [];
  for (let i = 0; i < n; i++) {
    const arrive = (i * 88) / (n - 1);
    stops.push(`${arrive.toFixed(2)}%{transform:translateX(${(i * step).toFixed(1)}px);opacity:1}`);
    stops.push(`${(arrive + 2.2).toFixed(2)}%{transform:translateX(${(i * step).toFixed(1)}px);opacity:1}`);
  }
  const css = `
.pulse{display:none}
@media (prefers-reduced-motion: no-preference){
  .pulse{display:block;animation:travel 13s linear infinite}
  @keyframes travel{${stops.join('')}94%{transform:translateX(${X1 - X0}px);opacity:0}100%{transform:translateX(0);opacity:0}}
}`;

  const branchX = X1 + 30;
  const body = [
    figHeader(s, { num: '02', title: 'THE PIPELINE', series: SERIES }),
    `<line x1="${X0 - 36}" y1="${RAIL_Y}" x2="${X1}" y2="${RAIL_Y}" stroke="${s.ink}" stroke-width="2"/>`,
    nodes,
    // outcomes: solid branch up to auto approval, dashed drop to manual review
    `<path d="M ${branchX} ${RAIL_Y} L ${branchX + 44} ${RAIL_Y - 34} L ${branchX + 74} ${RAIL_Y - 34}" fill="none" stroke="${s.ink}" stroke-width="2"/>`,
    arrow(s, branchX + 60, RAIL_Y - 34, 30, s.ink),
    `<path d="M ${branchX} ${RAIL_Y} L ${branchX + 44} ${RAIL_Y + 34} L ${branchX + 74} ${RAIL_Y + 34}" fill="none" stroke="${s.muted}" stroke-width="1.5" stroke-dasharray="5 5"/>`,
    label(`${PIPELINE.autoPct} AUTO`, { x: branchX + 104, y: RAIL_Y - 28, fs: 15, ls: 0.08, fill: s.ink }),
    label(`${PIPELINE.reviewPct} REVIEW`, { x: branchX + 104, y: RAIL_Y + 40, fs: 15, ls: 0.08, fill: s.muted }),
    // the session pulse
    `<g class="pulse"><circle cx="${X0}" cy="${RAIL_Y}" r="5.5" fill="${s.accent}"/></g>`,
    annot(PIPELINE.note, { x: MX, y: 330, fs: 27, fill: s.ink }),
    figFooter(s, H, { caption: PIPELINE.caption }),
  ].join('\n');

  return figure(s, {
    id: 'pipeline',
    height: H,
    ariaLabel: 'Schematic of the eleven-stage KYC identity pipeline: phone, OTP, location, details, SSN, document, watchlist, LexisNexis, liveness, face match, final decision. 87 percent of sessions pass straight through with no human review.',
    css,
    body,
  });
}
