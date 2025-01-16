import VueDevTools from 'vite-plugin-vue-devtools'

import { integrationFactory } from './_factory'

export default integrationFactory(
  VueDevTools,
  ctx => ctx.options.devtools,
)
