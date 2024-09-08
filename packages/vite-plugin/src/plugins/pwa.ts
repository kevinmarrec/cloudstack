import defu from 'defu'
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa'

import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function PWAPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.pwa) {
    return
  }

  const defaults: Partial<VitePWAOptions> = {
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
        ],
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
  }

  return VitePWA(defu(options.pwa, defaults))
}
