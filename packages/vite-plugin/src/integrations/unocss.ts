import Unocss from '@unocss/vite'
import { isPackageExists } from 'local-pkg'
import { globSync } from 'tinyglobby'

import { integrationFactory } from './_factory'

export default integrationFactory(Unocss, {
  enabled: () => isPackageExists('unocss') && globSync('uno.config.ts').length > 0,
  options: ({ userOptions }) => userOptions.unocss,
})
