import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import { URL } from 'node:url';
import path from 'path';
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite';

const CRITICAL_FONTS = [
  /inter-latin-wght-normal-[\w-]+\.woff2$/,
  /fredoka-latin-wght-normal-[\w-]+\.woff2$/,
];

/** Otherwise the browser finds the fonts only after parsing the CSS */
function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml(_html, context) {
      const files = Object.keys(context.bundle ?? {});
      const tags: HtmlTagDescriptor[] = CRITICAL_FONTS.map((pattern) => {
        const file = files.find((name) => pattern.test(name));
        if (!file) {
          throw new Error(`preload-fonts: no emitted file matches ${pattern}`);
        }
        return {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            href: `/${file}`,
            // Fonts load in CORS mode; without this the preload goes unused
            crossorigin: '',
          },
          injectTo: 'head',
        };
      });
      return tags;
    },
  };
}

/** Like GitHub Pages: unknown URLs get 404.html, not the home page */
function previewNotFound(): Plugin {
  return {
    name: 'preview-not-found',
    configurePreviewServer(server) {
      const outDir = path.resolve(
        server.config.root,
        server.config.build.outDir,
      );
      const notFoundPage = path.join(outDir, '404.html');
      server.middlewares.use((request, response, next) => {
        const { pathname } = new URL(request.url ?? '/', 'http://localhost');
        const file = path.join(outDir, decodeURIComponent(pathname));
        if (
          !existsSync(notFoundPage) ||
          existsSync(file) ||
          existsSync(path.join(file, 'index.html'))
        ) {
          next();
          return;
        }
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.end(readFileSync(notFoundPage));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts(), previewNotFound()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@lib': path.resolve(import.meta.dirname, './src/lib'),
      '@types': path.resolve(import.meta.dirname, './src/types'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
    },
  },
  base: '/',
  build: {
    outDir: 'dist',
  },
});
