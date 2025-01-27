import Components from 'unplugin-vue-components/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(Components, {
  enabled: ctx => ctx.userOptions.components !== false,
  options: ctx => ctx.userOptions.components,
  defaults: () => ({
    dts: 'src/types/components.d.ts',
    resolvers: [() => {}], // Hack to ignore "no components found" warning
  }),
})
