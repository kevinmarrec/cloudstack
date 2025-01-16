import Components from 'unplugin-vue-components/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(Components, {
  enabled: ctx => ctx.userOptions.components !== false && ctx.found('components'),
  options: ctx => ctx.userOptions.components,
  defaults: () => ({
    dts: 'src/types/components.d.ts',
  }),
})
