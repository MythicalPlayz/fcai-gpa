import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/fcai-gpa/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'FCAI GPA+',
        short_name: 'FCAI GPA+',
        description: 'GPA Calculator for FCAI Students',
        theme_color: '#2b7fff',
        icons: [
          {
            src: 'pwa-192.jpg',
            sizes: '192x192',
            type: 'image/jpg',
          },
          {
            src: 'pwa-512.jpg',
            sizes: '512x512',
            type: 'image/jpg',
          },
        ],
      },
    }),
  ],
});
