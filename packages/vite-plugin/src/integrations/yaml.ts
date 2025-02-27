import yaml from '@modyfi/vite-plugin-yaml'

import { integrationFactory } from './_factory'

export default integrationFactory(yaml, {
  options: ({ userOptions }) => userOptions.yaml,
})
