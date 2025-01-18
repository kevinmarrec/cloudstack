/// <reference types="vite-ssg" />

import { integrationFactory } from '../_factory'

export default integrationFactory(ctx => ({
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
