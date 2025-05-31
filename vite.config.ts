import { fileURLToPath, URL } from 'url';
import tailwindcss from "@tailwindcss/vite"

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vercel from 'vite-plugin-vercel';


export default defineConfig({
  base: '/idanlevian-projects/',
  plugins: [react(), tailwindcss(),vercel({
    basePath: '/idanlevian-projects',
    includeFiles: true,
  }),
],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
