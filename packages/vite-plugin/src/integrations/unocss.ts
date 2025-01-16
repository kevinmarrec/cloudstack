import Unocss from '@unocss/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(
  Unocss,
  ctx => ctx.options.unocss,
)
