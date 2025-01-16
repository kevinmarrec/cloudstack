import process from 'node:process'

import Vue from '@vitejs/plugin-vue'

import { integrationFactory } from './_factory'

export default integrationFactory(
  Vue,
  ctx => ctx.options.vue,
  _ => ({
    features: {
      // Drop Options API support in production build
      optionsAPI: process.env.NODE_ENV !== 'production',
    },
  }),
)
