import path from "path"
import tailwindcss from "@tailwindcss/vite"

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vercel from 'vite-plugin-vercel';


export default defineConfig({
  plugins: [react(), tailwindcss(),vercel({
    basePath: '/wedding-album',
    includeFiles: true,
  }),
],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
