import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // relative paths so it works when served from a subdirectory (e.g. GitHub Pages)
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
