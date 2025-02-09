import Unocss from '@unocss/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(Unocss, {
  enabled: ctx => ctx.found('uno.config.ts'),
  options: ctx => ctx.userOptions.unocss,
})
