import VueRouter from 'unplugin-vue-router/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(VueRouter, {
  enabled: ctx => ctx.found('routes'),
  options: ctx => ctx.userOptions.vueRouter,
  defaults: () => ({
    dts: 'src/types/router.d.ts',
  }),
})
