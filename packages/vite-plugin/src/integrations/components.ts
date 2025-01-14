import Components from 'unplugin-vue-components/vite'

import { integrationFactory } from './_factory'

export default integrationFactory({
  key: 'components',
  plugin: Components,
  defaults: () => ({
    dts: 'src/types/components.d.ts',
  }),
})
