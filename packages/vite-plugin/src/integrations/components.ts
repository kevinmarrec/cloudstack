import Components from 'unplugin-vue-components/vite'

import { integrationFactory } from './_factory'

export default integrationFactory(
  Components,
  ctx => ctx.options.components,
  _ => ({
    dts: 'src/types/components.d.ts',
  }),
)
