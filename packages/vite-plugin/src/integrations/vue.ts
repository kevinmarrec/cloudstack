import Vue from '@vitejs/plugin-vue'

import { integrationFactory } from './_factory'

export default integrationFactory(Vue, {
  options: ctx => ctx.userOptions.vue,
  defaults: () => ({
    features: {
      optionsAPI: false,
    },
  }),
})
