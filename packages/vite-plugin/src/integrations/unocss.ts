import Unocss from '@unocss/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(Unocss, {
  enabled: ctx => ctx.userOptions.unocss !== false && ctx.found('uno.config'),
  options: ctx => ctx.userOptions.unocss,
})
