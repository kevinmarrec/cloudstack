import Unocss from '@unocss/vite'
import { isPackageExists } from 'local-pkg'
import { globSync } from 'tinyglobby'

import { integrationFactory } from './_factory'

export default integrationFactory(Unocss, {
  enabled: ctx => ctx.userOptions.unocss !== false && isPackageExists('unocss') && globSync(['uno.config.ts']).length > 0,
  options: ctx => ctx.userOptions.unocss,
})
