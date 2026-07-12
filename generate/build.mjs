#!/usr/bin/env node
// Renders every figure in both brand surfaces into ../assets.
// Usage: node generate/build.mjs [--only=now]

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SURFACES } from './lib/tokens.mjs';
import { hero } from './figures/hero.mjs';
import { range } from './figures/range.mjs';
import { metrics } from './figures/metrics.mjs';
import { primitives } from './figures/primitives.mjs';
import { intro, habit } from './figures/interleaf.mjs';

const FIGURES = { hero, intro, range, metrics, habit, primitives };

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets');
mkdirSync(ASSETS, { recursive: true });

const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
const names = only ? [only] : Object.keys(FIGURES);

for (const name of names) {
  const render = FIGURES[name];
  if (!render) {
    console.error(`unknown figure: ${name}`);
    process.exit(1);
  }
  for (const surface of SURFACES) {
    const svg = render(surface);
    const file = join(ASSETS, `${name}-${surface.name}.svg`);
    writeFileSync(file, svg);
    console.log(`${name}-${surface.name}.svg  ${(svg.length / 1024).toFixed(1)}kB`);
  }
}
