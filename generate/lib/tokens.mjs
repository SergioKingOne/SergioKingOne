// Design tokens transcribed from sergio-brand-kit/tokens.css.
// Two surfaces, one identity: cream/print (GitHub light) and the
// portfolio site's dark/terminal inverse (GitHub dark).

export const LIGHT = {
  name: 'light',
  bg: '#F4ECD8',
  raised: '#EFE6D3',
  ink: '#1A1A17',
  accent: '#D2452B',
  accentDeep: '#C73E1D',
  accentShadow: '#E04E39',
  muted: '#6B6456',
  hairline: '#8A8172',
  gridLine: 'rgba(138,129,114,0.10)',
  stampWash: 'rgba(210,69,43,0.06)',
};

export const DARK = {
  name: 'dark',
  bg: '#0A0B0E',
  raised: '#111318',
  ink: '#E9E4D6',            // warm paper-toned text, never pure white
  accent: '#FF6A2E',
  accentDeep: '#FF7A42',     // small text needs the brighter cut on dark ground
  accentShadow: '#FF6A2E',
  muted: '#8D8778',
  hairline: '#454138',
  gridLine: 'rgba(141,135,120,0.09)',
  stampWash: 'rgba(255,106,46,0.07)',
};

export const SURFACES = [LIGHT, DARK];

export const TYPE = {
  mono: `'IBM Plex Mono', ui-monospace, monospace`,
  serif: `'Fraunces', Georgia, 'Times New Roman', serif`,
  trackEyebrow: 0.2, // em
};
