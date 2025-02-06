/// <reference types="vite-ssg" />

import type { Plugin } from 'vite'

import { integrationFactory } from '../_factory'

import type { CloudstackPluginContext } from '../../context'

export default integrationFactory((ctx: CloudstackPluginContext): Plugin => ({
  name: 'vite:cloudstack:config',
  config() {
    return {
      build: {
        modulePreload: {
          polyfill: false,
        },
      },
      optimizeDeps: {
        include: [
          'vite-ssg',
          'vite-ssg/single-page',
          'vue',
          'vue-router',
          ...ctx.userOptions.pwa ? ['workbox-window'] : [],
        ],
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
