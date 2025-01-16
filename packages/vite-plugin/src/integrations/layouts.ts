import { isPackageExists } from 'local-pkg'
import { globSync } from 'tinyglobby'
import Layouts from 'vite-plugin-vue-layouts'

import { integrationFactory } from './_factory'

export default integrationFactory(Layouts, {
  enabled: ctx => ctx.userOptions.layouts !== false && isPackageExists('vue-router') && globSync(['**/*.vue'], { cwd: 'src/layouts' }).length > 0,
  options: ctx => ctx.userOptions.layouts,
})
