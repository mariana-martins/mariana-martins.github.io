// Gzipped budget for what a first visit downloads; lazy chunks are excluded
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const distDir = path.resolve(import.meta.dirname, '..', 'dist');

/** Gzipped kB; set ~10% above the current build */
const BUDGETS_KB = {
  html: 14,
  script: 110,
  style: 14,
  font: 85,
};

const html = await readFile(path.join(distDir, 'index.html'));
const htmlText = html.toString();

const references = {
  script: [...htmlText.matchAll(/<script[^>]+src="([^"]+)"/g)],
  style: [
    ...htmlText.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g),
  ],
  font: [...htmlText.matchAll(/<link[^>]+as="font"[^>]+href="([^"]+)"/g)],
};

const gzippedKb = (bytes) => gzipSync(bytes, { level: 9 }).length / 1024;
const totals = { html: gzippedKb(html), script: 0, style: 0, font: 0 };

for (const [kind, matches] of Object.entries(references)) {
  for (const [, url] of matches) {
    const bytes = await readFile(path.join(distDir, url));
    totals[kind] += gzippedKb(bytes);
  }
}

let failed = false;
for (const [kind, budget] of Object.entries(BUDGETS_KB)) {
  const size = totals[kind];
  const over = size > budget;
  failed ||= over;
  console.log(
    `${over ? '✖' : '✔'} ${kind.padEnd(6)} ${size.toFixed(1).padStart(6)} kB / ${budget} kB`,
  );
}

if (failed) {
  console.error(
    '\nInitial download is over budget; see scripts/check-bundle-size.mjs',
  );
  process.exit(1);
}
