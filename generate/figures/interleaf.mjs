import { figure, annot, MX } from '../lib/svg.mjs';

// Prose plates between figures: same ground and margins as the figures so
// every text column on the page starts on the same rule. No header, no footer.

const FS = 27;
const LEAD = 44;

function wrap(str, maxPx) {
  const perChar = FS * 0.47; // Fraunces italic average advance
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

function interleaf(id, copy) {
  return (s) => {
    const lines = wrap(copy, 1258);
    const height = 76 + lines.length * LEAD + 30;
    const body = lines
      .map((line, i) => annot(line, { x: MX, y: 76 + i * LEAD, fs: FS, fill: s.ink }))
      .join('\n');
    return figure(s, { id, height, ariaLabel: copy, body });
  };
}

export const intro = interleaf(
  'intro',
  'I build production backend systems from scratch. Rust is my main language, AWS is home ground, and the domain rotates: fraud prevention and identity at Surt today, AI and computer vision at Vertex Studio before that. The pattern: join early, learn the domain deeply, build the core, ship it.'
);

export const habit = interleaf(
  'habit',
  'The habit that ties it together: when the right tool does not exist, build it from primitives.'
);
