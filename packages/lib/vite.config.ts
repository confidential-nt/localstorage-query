/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'LocalstorageQuery',
      fileName: 'localstorage-query',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', /test/],
    },
    emptyOutDir: false,
  },
});
