import process from 'node:process'

import Vue from '@vitejs/plugin-vue'

import { integrationFactory } from './_factory'

export default integrationFactory(Vue, {
  options: ({ userOptions }) => userOptions.vue,
  defaults: () => ({
    features: {
      // Drop Options API support in production build to optimize bundle size
      // It is required somehow by `vite-plugin-vue-inspector` in dev mode (https://github.com/webfansplz/vite-plugin-vue-inspector/issues/122)
      optionsAPI: process.env.NODE_ENV !== 'production',
    },
  }),
})
