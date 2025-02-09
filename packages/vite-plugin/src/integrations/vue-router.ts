import { globSync } from 'tinyglobby'
import VueRouter from 'unplugin-vue-router/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(VueRouter, {
  enabled: () => globSync('src/pages/**/*.vue').length > 0,
  options: ctx => ctx.userOptions.vueRouter,
  defaults: () => ({
    dts: 'src/types/router.d.ts',
  }),
})
