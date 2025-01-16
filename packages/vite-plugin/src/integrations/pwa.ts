import { type LaunchHandlerClientMode, VitePWA } from 'vite-plugin-pwa'

import { integrationFactory } from './_factory'

export default integrationFactory(VitePWA, ctx => ctx.options.pwa, _ => ({
  registerType: 'autoUpdate',
  manifest: {
    id: '/',
    scope: '/',
    start_url: '/',
    lang: 'en-US',
    name: 'Vite PWA',
    short_name: 'Vite PWA',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    dir: 'ltr',
    orientation: 'natural',
    handle_links: 'preferred',
    launch_handler: {
      client_mode: [
        'navigate-existing',
        'auto',
      ] as LaunchHandlerClientMode[],
    },
  },
  pwaAssets: {
    overrideManifestIcons: true,
  },
  devOptions: {
    enabled: true,
    suppressWarnings: true,
    type: 'module',
  },
} as const))
