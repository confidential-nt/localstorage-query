import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'LocalstorageQuery',
      fileName: 'localstorage-query',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react'],
    },
    emptyOutDir: false,
  },
});
