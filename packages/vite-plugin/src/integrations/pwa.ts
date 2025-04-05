import process from 'node:process'

import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa'

import { integrationFactory } from './_factory'

const DEFAULT_GLOB_PATTERNS = ['**/*.{css,js,html,png,svg,ico,txt,woff2}']

export default integrationFactory(VitePWA, {
  enabled: ({ userOptions }) => Boolean(userOptions.pwa),
  options: ({ userOptions }) => userOptions.pwa,
  defaults: ({ env, userOptions }) => {
    return {
      injectRegister: false,
      manifest: {
        id: '/',
        scope: '/',
        start_url: '/',
        lang: 'en',
        name: 'Cloudstack',
        short_name: 'Cloudstack',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        dir: 'ltr',
        orientation: 'natural',
        display: 'standalone',
        display_override: [
          'window-controls-overlay',
        ],
        handle_links: 'preferred',
        launch_handler: {
          client_mode: [
            'navigate-existing',
            'auto',
          ],
        },
      },
      pwaAssets: {
        disabled: process.env.NODE_ENV === 'test',
        overrideManifestIcons: true,
      },
      workbox: {
        globPatterns: DEFAULT_GLOB_PATTERNS,
      },
      ...typeof userOptions.pwa === 'object' && userOptions.pwa.strategies === 'injectManifest' && {
        srcDir: 'src',
        filename: 'sw.ts',
        injectManifest: {
          globPatterns: DEFAULT_GLOB_PATTERNS,
        },
      },
      ...env?.mode === 'development' && {
        selfDestroying: true,
        devOptions: {
          enabled: true,
        },
      },
    } satisfies Partial<VitePWAOptions>
  },
})
