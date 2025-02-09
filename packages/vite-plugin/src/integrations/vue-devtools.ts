import VueDevTools from 'vite-plugin-vue-devtools'

import { integrationFactory } from './_factory'

export default integrationFactory(VueDevTools, {
  enabled: ctx => ctx.userOptions.vueDevTools !== false,
  options: ctx => ctx.userOptions.vueDevTools,
})
