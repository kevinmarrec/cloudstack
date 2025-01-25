import VueRouter from 'unplugin-vue-router/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(VueRouter, {
  enabled: ctx => ctx.userOptions.router !== false && ctx.found('pages'),
  options: ctx => ctx.userOptions.router,
  defaults: () => ({
    dts: 'src/types/router.d.ts',
  }),
})
