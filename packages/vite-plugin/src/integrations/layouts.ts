import Layouts from 'vite-plugin-vue-layouts'

import { integrationFactory } from './_factory'

export default integrationFactory({
  key: 'layouts',
  plugin: Layouts,
})
