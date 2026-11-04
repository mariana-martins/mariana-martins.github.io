// Runs after both Vite builds (see the build script)
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = path.resolve(import.meta.dirname, '..');
const serverDir = path.join(projectRoot, 'dist-ssr');
const htmlPath = path.join(projectRoot, 'dist', 'index.html');
const ROOT_MARKER = '<div id="root"></div>';

const { render } = await import(
  pathToFileURL(path.join(serverDir, 'entry-server.js')).href
);

const template = await readFile(htmlPath, 'utf8');
if (!template.includes(ROOT_MARKER)) {
  throw new Error(`Prerender: ${ROOT_MARKER} not found in dist/index.html`);
}

const appHtml = render();
await writeFile(
  htmlPath,
  template.replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`),
);

await rm(serverDir, { recursive: true, force: true });

console.log(
  `Prerendered dist/index.html (${(appHtml.length / 1024).toFixed(1)} kB of markup)`,
);
