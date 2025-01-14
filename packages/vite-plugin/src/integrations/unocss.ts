import Unocss from '@unocss/vite'

import { integrationFactory } from './_factory'

export default integrationFactory({
  key: 'unocss',
  plugin: Unocss,
})
