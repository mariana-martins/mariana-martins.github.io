import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite';

/** Matched against emitted (hashed) file names */
const CRITICAL_FONTS = [
  /inter-latin-wght-normal-[\w-]+\.woff2$/,
  /fredoka-latin-wght-normal-[\w-]+\.woff2$/,
];

/** Preloads the critical fonts, which the browser would otherwise find late in the CSS */
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
            // Fonts are fetched in CORS mode; without this the preload is wasted
            crossorigin: '',
          },
          injectTo: 'head',
        };
      });
      return tags;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
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
