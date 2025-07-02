import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import vercel from 'vite-plugin-vercel';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// Custom plugin to redirect /projects to /projects/ in dev
function trailingSlashRedirect(): Plugin {
  return {
    name: 'vite-plugin-trailing-slash-redirect',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/projects') {
          res.writeHead(301, { Location: '/projects/' });
          res.end();
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: '/projects/',
  plugins: [
    react(),
    tailwindcss(),
    vercel({
      basePath: '/projects',
      includeFiles: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Idan Levian Portfolio',
        short_name: 'Idan Portfolio',
        start_url: '/projects/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#4f46e5',
        description: 'Portfolio of Idan Levian, Full Stack Developer specializing in React, Node.js, and modern web/mobile solutions.',
        icons: [
          { src: '/favicon/16.png', sizes: '16x16', type: 'image/png' },
          { src: '/favicon/32.png', sizes: '32x32', type: 'image/png' },
          { src: '/favicon/48.png', sizes: '48x48', type: 'image/png' },
          { src: '/favicon/64.png', sizes: '64x64', type: 'image/png' },
          { src: '/favicon/120.png', sizes: '120x120', type: 'image/png' },
          { src: '/favicon/152.png', sizes: '152x152', type: 'image/png' },
          { src: '/favicon/180.png', sizes: '180x180', type: 'image/png' },
          { src: '/favicon/192.png', sizes: '192x192', type: 'image/png' },
          { src: '/favicon/512.png', sizes: '512x512', type: 'image/png' },
          { src: '/favicon/1024.png', sizes: '1024x1024', type: 'image/png' },
          { src: '/favicon/1200.png', sizes: '1200x1200', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,jpg,jpeg,webp,ico,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/idanlevian\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'idanlevian-site-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8 MB
      }
    }),
    trailingSlashRedirect(),
  ],
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
