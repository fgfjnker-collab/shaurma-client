/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Статическая сборка (`npm run build:static`) работает с любого пути на статическом хостинге,
  // например на GitHub Pages в подпапке репозитория.
  base: mode === 'static' ? './' : '/',
  test: {
    include: ['src/**/*.test.ts'],
  },
}))
