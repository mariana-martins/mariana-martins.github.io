import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
