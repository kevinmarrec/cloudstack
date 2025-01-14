import VueRouter from 'unplugin-vue-router/vite'

import { integrationFactory } from './_factory'

export default integrationFactory({
  key: 'router',
  plugin: VueRouter,
  defaults: () => ({
    dts: 'src/types/router.d.ts',
  }),
})
