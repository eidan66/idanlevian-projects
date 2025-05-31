import path from "path"
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
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
