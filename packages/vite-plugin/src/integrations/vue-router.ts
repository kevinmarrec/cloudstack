import { isPackageExists } from 'local-pkg'
import { globSync } from 'tinyglobby'
import VueRouter from 'unplugin-vue-router/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(VueRouter, {
  enabled: ctx => ctx.userOptions.router !== false && isPackageExists('vue-router') && globSync(['**/*.vue'], { cwd: 'src/pages' }).length > 0,
  options: ctx => ctx.userOptions.router,
  defaults: () => ({
    dts: 'src/types/router.d.ts',
  }),
})
