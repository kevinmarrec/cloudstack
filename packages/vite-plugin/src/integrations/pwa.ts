import { type LaunchHandlerClientMode, VitePWA } from 'vite-plugin-pwa'

import { integrationFactory } from './_factory'

export default integrationFactory(VitePWA, {
  enabled: ({ userOptions }) => userOptions.pwa !== false,
  options: ({ userOptions }) => userOptions.pwa,
  defaults: ({ env }) => ({
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
        ] as LaunchHandlerClientMode[],
      },
    },
    injectRegister: 'script-defer',
    registerType: 'autoUpdate',
    pwaAssets: {
      overrideManifestIcons: true,
    },
    workbox: {
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
    },
    ...env?.mode === 'development' && {
      selfDestroying: true,
      devOptions: {
        enabled: true,
      },
    },
  } satisfies Partial<Parameters<typeof VitePWA>[0]>),
})
