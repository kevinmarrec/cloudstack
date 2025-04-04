import process from 'node:process'

import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa'

import { integrationFactory } from './_factory'

export default integrationFactory(VitePWA, {
  enabled: ({ userOptions }) => userOptions.pwa !== false,
  options: ({ userOptions }) => userOptions.pwa,
  defaults: ({ env }) => {
    return {
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
      injectRegister: false,
      workbox: {
        globPatterns: ['**/*.{css,js,html,png,svg,ico,txt,woff2}'],
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
