import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import dayjs from 'dayjs';

const buildId = JSON.stringify(`${dayjs().format('DD-MM-YYYY')} vers ${dayjs().format('HH')}:00`);

// https://tanstack.com/start
export default defineConfig({
  plugins: [
    tailwindcss(),
    // tanstackStart must come before the React plugin.
    tanstackStart(),
    viteReact(),
  ],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src'),
      '@api': resolve(__dirname, '../api-express'),
      '~': resolve(__dirname, 'src'),
    },
  },
  define: {
    __VITE_BUILD_ID__: buildId,
  },
});
