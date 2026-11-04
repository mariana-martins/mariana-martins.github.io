/**
 * Renders public/og-image.jpg and public/apple-touch-icon.png. The output is
 * committed; re-run when the name, title or artwork change.
 */
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(projectRoot, 'public');

async function dataUri(relativePath, mimeType) {
  const bytes = await readFile(path.join(projectRoot, relativePath));
  return `data:${mimeType};base64,${bytes.toString('base64')}`;
}

// Same values as the design tokens in src/styles/index.css
const NAVY = 'hsl(223 33% 26%)';
const PINK = 'hsl(356 75% 78%)';
const WARM = 'hsl(47 64% 96%)';
const LIGHT_GRADIENT = `
  radial-gradient(circle at 30% 20%, hsl(195 56% 79% / 0.8) 0%, transparent 50%),
  radial-gradient(circle at 70% 40%, hsl(352 100% 86% / 0.6) 0%, transparent 50%),
  radial-gradient(circle at 20% 80%, hsl(60 100% 94% / 0.7) 0%, transparent 50%),
  radial-gradient(circle at 80% 80%, hsl(300 47% 75% / 0.6) 0%, transparent 50%),
  linear-gradient(135deg, hsl(195 56% 79% / 0.3) 0%, hsl(352 100% 86% / 0.4) 25%,
    hsl(352 100% 86% / 0.5) 50%, hsl(60 100% 94% / 0.4) 75%, hsl(300 47% 75% / 0.5) 100%),
  white`;

function ogImageHtml({ avatar, logo, inter, fredoka }) {
  return `<!doctype html>
<html>
<head>
<style>
  @font-face { font-family: Inter; font-weight: 100 900; src: url(${inter}) format('woff2'); }
  @font-face { font-family: Fredoka; font-weight: 300 700; src: url(${fredoka}) format('woff2'); }
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; padding: 48px;
    background: ${LIGHT_GRADIENT};
    font-family: Inter, sans-serif; color: ${NAVY};
  }
  .panel {
    height: 100%; border-radius: 32px; padding: 56px 64px;
    background: rgb(255 255 255 / 0.45);
    box-shadow: 0 0 0 1px rgb(15 23 42 / 0.08), 0 20px 50px rgb(44 57 88 / 0.12);
    display: flex; align-items: center; justify-content: space-between; gap: 48px;
  }
  .text { display: flex; flex-direction: column; gap: 22px; max-width: 640px; }
  .logo {
    width: 84px; padding: 10px 4px; border-radius: 10px;
    background: hsl(37 100% 94%); border: 4px solid ${PINK};
  }
  .logo img { width: 100%; display: block; }
  h1 {
    font-family: Fredoka, sans-serif; font-weight: 500;
    font-size: 54px; line-height: 1.1; letter-spacing: 0.14em; text-transform: uppercase;
  }
  .title { font-size: 34px; letter-spacing: 0.08em; }
  .skills { font-size: 25px; line-height: 1.45; opacity: 0.85; }
  .skills span { white-space: nowrap; }
  .meta {
    display: flex; gap: 14px; align-items: center;
    font-size: 22px; font-weight: 500; opacity: 0.8;
  }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: ${PINK}; }
  .avatar {
    width: 330px; height: 330px; flex-shrink: 0; object-fit: cover;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    background: linear-gradient(to top right, hsl(35 100% 88%), hsl(6 100% 92%), ${PINK});
  }
</style>
</head>
<body>
  <div class="panel">
    <div class="text">
      <div class="logo"><img src="${logo}" alt="" /></div>
      <h1>Mariana Martins Menezes</h1>
      <p class="title">Frontend Engineer</p>
      <p class="skills">
        <span>React &amp; TypeScript ·</span> <span>accessible interfaces ·</span>
        <span>design systems</span>
      </p>
      <p class="meta">
        <span>Melbourne, Australia</span><span class="dot"></span><span>mariana-martins.github.io</span>
      </p>
    </div>
    <img class="avatar" src="${avatar}" alt="" />
  </div>
</body>
</html>`;
}

function touchIconHtml({ favicon }) {
  // iOS turns transparency black, so fill the square
  return `<!doctype html>
<html>
<head>
<style>
  * { margin: 0; }
  body {
    width: 180px; height: 180px; background: ${WARM};
    display: grid; place-items: center;
  }
  img { width: 160px; height: 160px; }
</style>
</head>
<body><img src="${favicon}" alt="" /></body>
</html>`;
}

const [avatar, logo, favicon, inter, fredoka] = await Promise.all([
  dataUri('public/avatar.webp', 'image/webp'),
  dataUri('src/assets/logo.webp', 'image/webp'),
  dataUri('public/favicon.svg', 'image/svg+xml'),
  dataUri(
    'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
    'font/woff2',
  ),
  dataUri(
    'node_modules/@fontsource-variable/fredoka/files/fredoka-latin-wght-normal.woff2',
    'font/woff2',
  ),
]);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(ogImageHtml({ avatar, logo, inter, fredoka }), {
    waitUntil: 'load',
  });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: path.join(publicDir, 'og-image.jpg'),
    type: 'jpeg',
    quality: 88,
  });

  await page.setViewportSize({ width: 180, height: 180 });
  await page.setContent(touchIconHtml({ favicon }), { waitUntil: 'load' });
  await page.screenshot({ path: path.join(publicDir, 'apple-touch-icon.png') });

  console.log('Wrote public/og-image.jpg and public/apple-touch-icon.png');
} finally {
  await browser.close();
}
