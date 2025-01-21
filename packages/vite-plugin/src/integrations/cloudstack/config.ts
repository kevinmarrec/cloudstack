/// <reference types="vite-ssg" />

import { integrationFactory } from '../_factory'

import type { CloudstackPluginContext } from '../../context'

export default integrationFactory((ctx: CloudstackPluginContext) => ({
  name: 'vite:cloudstack:config',
  config() {
    return {
      optimizeDeps: {
        include: ctx.userOptions.pwa
          ? ['vite-ssg', 'workbox-window']
          : ['vite-ssg'],
      },
      ssgOptions: {
        script: 'async',
        formatting: 'minify',
        beastiesOptions: {
          reduceInlineStyles: false,
        },
      },
    }
  },
}), { options: ctx => ctx })
