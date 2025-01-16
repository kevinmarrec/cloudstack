import VueRouter from 'unplugin-vue-router/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(
  VueRouter,
  ctx => ctx.options.router,
  _ => ({
    dts: 'src/types/router.d.ts',
  }),
)
