// Runs after both Vite builds (see the build script)
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = path.resolve(import.meta.dirname, '..');
const serverDir = path.join(projectRoot, 'dist-ssr');
const distDir = path.join(projectRoot, 'dist');
const SITE_URL = 'https://mariana-martins.github.io';
const ROOT_MARKER = '<div id="root"></div>';

const { render, routes } = await import(
  pathToFileURL(path.join(serverDir, 'entry-server.js')).href
);

const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
if (!template.includes(ROOT_MARKER)) {
  throw new Error(`Prerender: ${ROOT_MARKER} not found in dist/index.html`);
}

const escapeHtml = (text) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');

/** Swaps one tag's content; throws if the template no longer has the tag */
function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Prerender: ${pattern} not found in the template`);
  }
  return html.replace(pattern, replacement);
}

function withMeta(html, route) {
  const url = `${SITE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const meta = (attribute, name, value) => [
    new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*/>`),
    `<meta ${attribute}="${name}" content="${value}" />`,
  ];

  let result = replaceTag(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`,
  );
  result = replaceTag(result, ...meta('name', 'description', description));
  result = replaceTag(result, ...meta('property', 'og:title', title));
  result = replaceTag(
    result,
    ...meta('property', 'og:description', description),
  );
  result = replaceTag(result, ...meta('property', 'og:url', url));
  result = replaceTag(
    result,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`,
  );
  return result;
}

for (const route of routes) {
  const appHtml = await render(route.path);
  const html = withMeta(template, route).replace(
    ROOT_MARKER,
    `<div id="root">${appHtml}</div>`,
  );
  const outDir = path.join(distDir, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  console.log(`Prerendered ${route.path}`);
}

await rm(serverDir, { recursive: true, force: true });
