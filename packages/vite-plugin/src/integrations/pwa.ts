import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import process from 'node:process'

import { join } from 'pathe'
import { type DisplayOverride, type LaunchHandlerClientMode, VitePWA } from 'vite-plugin-pwa'

import type { CloudstackPluginOptions } from '../options'
import { integrationFactory } from './_factory'

function getRevision(options: CloudstackPluginOptions['pwa']): string | null {
  const image = (typeof options === 'object' && options.pwaAssets?.image) || 'public/favicon.svg'

  try {
    return createHash('md5')
      .update(readFileSync(join(process.cwd(), image), 'utf-8'))
      .digest('hex')
  }
  catch {
    return null
  }
}

export default integrationFactory(VitePWA, {
  enabled: ({ userOptions }) => userOptions.pwa !== false,
  options: ({ userOptions }) => userOptions.pwa,
  defaults: ({ env, userOptions }) => {
    const revision = getRevision(userOptions.pwa)

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
        ] as DisplayOverride[],
        handle_links: 'preferred',
        launch_handler: {
          client_mode: [
            'navigate-existing',
            'auto',
          ] as LaunchHandlerClientMode[],
        },
      },
      pwaAssets: {
        disabled: !revision,
        overrideManifestIcons: true,
      },
      injectRegister: false,
      workbox: {
        additionalManifestEntries: [
          'favicon.ico',
          'favicon.svg',
          'apple-touch-icon-180x180.png',
          'pwa-64x64.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'maskable-icon-512x512.png',
        ].map(url => ({ url, revision })),
      },
      ...env?.mode === 'development' && {
        selfDestroying: true,
        devOptions: {
          enabled: true,
        },
      },
    } as const
  },
})
