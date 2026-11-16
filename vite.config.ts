import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { configDefaults } from 'vitest/config'

// The app's dark colour, --primary oklch(0.205 0 0) in src/index.css, as on the icon:
// the browser's bars and the splash screen of the installed app.
const DARK = '#171717'

const pwa = VitePWA({
  // 'prompt' keeps Workbox's skipWaiting and clientsClaim off, so a new service
  // worker waits until every window of the app is closed and takes over on the
  // next open. Nothing imports virtual:pwa-register, so the plugin only injects
  // a plain registerSW.js: no onNeedRefresh prompt and no reload mid-Workout.
  registerType: 'prompt',
  injectRegister: 'script-defer',
  // The icons are precached by workbox.globPatterns below; listing them again would duplicate them.
  includeManifestIcons: false,
  manifest: {
    // One name in every Language.
    name: 'Home Workout',
    short_name: 'Workout',
    description: 'Generate a home workout and follow along.',
    display: 'standalone',
    start_url: '/',
    scope: '/',
    theme_color: DARK,
    background_color: DARK,
    icons: [
      { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
      { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
  workbox: {
    // The app shell: HTML, scripts (the Exercise data is bundled into them),
    // styles, fonts and icons. GIFs are left out on purpose.
    globPatterns: ['**/*.{html,js,css,woff2,ico,png,svg}'],
    skipWaiting: false,
    clientsClaim: false,
    cleanupOutdatedCaches: true,
    // SPA routes offline get index.html, as the Vercel rewrite does online.
    navigateFallback: '/index.html',
    navigateFallbackDenylist: [/^\/exercisedb\//, /\.[a-z0-9]+$/i],
    runtimeCaching: [
      {
        // An Exercise's GIF works offline once it has been shown.
        urlPattern: ({ url, sameOrigin }) =>
          sameOrigin && url.pathname.startsWith('/exercisedb/') && url.pathname.endsWith('.gif'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'exercise-gifs',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  },
})

export default defineConfig({
  // Tests never need the service worker; leaving the plugin out keeps them fast.
  plugins: [react(), tailwindcss(), ...(process.env.VITEST ? [] : [pwa])],
  build: {
    rollupOptions: {
      output: {
        // Three chunks that change at different paces, so an update of the installed
        // app downloads only what changed: the libraries, the Exercise data, our code.
        manualChunks(id) {
          if (id.includes('/node_modules/')) return 'vendor'
          if (/\/src\/library\/(exercisedb\/|curation\.ts|polish\.ts)/.test(id)) return 'exercises'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // Agent worktrees live under .claude/; their tests belong to their own branches.
    exclude: [...configDefaults.exclude, '.claude/**'],
  },
})
