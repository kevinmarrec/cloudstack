import { globSync } from 'tinyglobby'
import Components from 'unplugin-vue-components/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(Components, {
  enabled: ctx => ctx.userOptions.components !== false && globSync(['**/*.vue'], { cwd: 'src/components' }).length > 0,
  options: ctx => ctx.userOptions.components,
  defaults: () => ({
    dts: 'src/types/components.d.ts',
  }),
})
