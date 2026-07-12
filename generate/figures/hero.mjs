import { figure, figHeader, figFooter, text, label, annot, esc, monoW, W, MX } from '../lib/svg.mjs';
import { TYPE } from '../lib/tokens.mjs';
import { SERIES, HERO } from '../data/profile.mjs';

const H = 420;

export function hero(s) {
  const nameFS = 118;
  const nameY = 262;
  const nameW = monoW(HERO.name, nameFS);
  const cursorX = MX + nameW + 26;

  const sub = HERO.sub
    .map((p) => (p.accent ? `<tspan fill="${s.accentDeep}">${esc(p.t)}</tspan>` : esc(p.t)))
    .join('');

  const css = `
.cursor{opacity:1}
.rule-draw{stroke-dasharray:none}
@media (prefers-reduced-motion: no-preference){
  .cursor{animation:blink 1.1s steps(1,end) infinite}
  @keyframes blink{0%,55%{opacity:1}56%,100%{opacity:0}}
  .rule-draw{stroke-dasharray:${W - 2 * MX};stroke-dashoffset:${W - 2 * MX};animation:draw 1.4s ease-out forwards}
  @keyframes draw{to{stroke-dashoffset:0}}
}`;

  const body = [
    figHeader(s, { num: '01', title: 'THE ENGINEER', series: SERIES, rule: false }),
    `<line class="rule-draw" x1="${MX}" y1="88" x2="${W - MX}" y2="88" stroke="${s.ink}" stroke-width="1.5"/>`,
    label(HERO.kicker, { x: MX, y: 152, fs: 20, fill: s.accentDeep }),
    // giant numeral treatment: shadow pass then ink pass (portable text-shadow)
    text(esc(HERO.name), { x: MX + 6, y: nameY + 6, fs: nameFS, w: 700, fill: s.accentShadow, ls: -0.01 }),
    text(esc(HERO.name), { x: MX, y: nameY, fs: nameFS, w: 700, fill: s.ink, ls: -0.01 }),
    `<rect class="cursor" x="${cursorX}" y="${nameY - 86}" width="52" height="96" fill="${s.ink}"/>`,
    annot(sub, { x: MX, y: 330, fs: 31, fill: s.ink, raw: true }),
    figFooter(s, H, { caption: HERO.caption }),
  ].join('\n');

  return figure(s, {
    id: 'hero',
    height: H,
    ariaLabel: 'Sergio Robayo. Rust, AWS, distributed systems. Backend engineer. Learns fast, ships faster, and chases hard problems wherever they live.',
    css,
    body,
  });
}
