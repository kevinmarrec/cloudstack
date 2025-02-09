import Unocss from '@unocss/vite'
import { globSync } from 'tinyglobby'

import { integrationFactory } from './_factory'

export default integrationFactory(Unocss, {
  enabled: () => globSync('uno.config.ts').length > 0,
  options: ({ userOptions }) => userOptions.unocss,
})
