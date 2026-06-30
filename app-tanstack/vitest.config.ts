/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import viteReact from '@vitejs/plugin-react';
import { resolve } from 'path';

// Vitest runs with a plain React setup — NOT the tanstackStart plugin, which
// transforms route files and pulls in the SSR/server pipeline that unit tests
// don't need.
export default defineConfig({
  // Cast: vitest bundles its own vite types, which clash structurally with the
  // app's vite 8 Plugin type even though they're runtime-compatible.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [viteReact() as any],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src'),
      '@api': resolve(__dirname, '../api-express'),
      '~': resolve(__dirname, 'src'),
    },
  },
  define: {
    __VITE_BUILD_ID__: JSON.stringify('test'),
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
  },
});
