import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
// <reference types="vitest" />
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      TYPES: fileURLToPath(new URL('./src/types', import.meta.url)),
      UTILS: fileURLToPath(new URL('./src/utils', import.meta.url)),
      STORES: fileURLToPath(new URL('./src/stores', import.meta.url)),
    },
  },
})
