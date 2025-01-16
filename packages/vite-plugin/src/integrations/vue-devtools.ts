import VueDevTools from 'vite-plugin-vue-devtools'

import { integrationFactory } from './_factory'

export default integrationFactory(VueDevTools, {
  enabled: ctx => ctx.userOptions.devtools !== false,
  options: ctx => ctx.userOptions.devtools,
})
