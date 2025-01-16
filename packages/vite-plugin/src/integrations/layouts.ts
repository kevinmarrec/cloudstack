import Layouts from 'vite-plugin-vue-layouts'

import { integrationFactory } from './_factory'

export default integrationFactory(
  Layouts,
  ctx => ctx.options.layouts,
)
