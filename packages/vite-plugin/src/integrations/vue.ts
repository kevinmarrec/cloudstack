import process from 'node:process'

import Vue from '@vitejs/plugin-vue'

import { integrationFactory } from './_factory'

export default integrationFactory(Vue, {
  enabled: () => true,
  options: ctx => ctx.userOptions.vue,
  defaults: () => ({
    features: {
      // Drop Options API support in production build to optimize bundle size
      optionsAPI: process.env.NODE_ENV !== 'production',
    },
  }),
})
