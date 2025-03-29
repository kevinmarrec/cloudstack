import { type Options, VitePWA } from 'vite-plugin-pwa'

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
      } satisfies Options['manifest'],
      pwaAssets: {
        overrideManifestIcons: true,
      },
      injectRegister: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      } satisfies Options['workbox'],
      ...env?.mode === 'development' && {
        selfDestroying: true,
        devOptions: {
          enabled: true,
        },
      },
    } as const
  },
})
