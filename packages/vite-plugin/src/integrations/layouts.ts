import Layouts from 'vite-plugin-vue-layouts'

import { integrationFactory } from './_factory'

export default integrationFactory(Layouts, {
  enabled: ctx => ctx.userOptions.layouts !== false && ctx.found('layouts'),
  options: ctx => ctx.userOptions.layouts,
})
