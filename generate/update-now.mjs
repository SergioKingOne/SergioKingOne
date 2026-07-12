#!/usr/bin/env node
// Refreshes generate/data/now.json: observation stamp (ISO week, so the
// figure changes at most weekly) + recently pushed repos from the GitHub API.
// Degrades gracefully: on any API failure the previous activity list is kept.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const USER = 'SergioKingOne';
const NOW_PATH = join(dirname(fileURLToPath(import.meta.url)), 'data', 'now.json');

function isoWeek(d) {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return { week, year: date.getUTCFullYear() };
}

let prev = { activity: [] };
try { prev = JSON.parse(readFileSync(NOW_PATH, 'utf8')); } catch {}

let activity = prev.activity;
try {
  const headers = { 'User-Agent': USER };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=30`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const repos = await res.json();
  activity = repos
    .filter((r) => !r.fork && r.name.toLowerCase() !== USER.toLowerCase())
    .slice(0, 3)
    .map((r) => ({ name: r.name, lang: r.language ?? 'misc' }));
} catch (err) {
  console.error(`activity fetch failed, keeping previous: ${err.message}`);
}

const { week, year } = isoWeek(new Date());
const stamp = `WEEK ${String(week).padStart(2, '0')} · ${year}`;

writeFileSync(NOW_PATH, JSON.stringify({ stamp, activity }, null, 2) + '\n');
console.log(stamp, JSON.stringify(activity));
