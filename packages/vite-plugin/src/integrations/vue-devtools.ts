import VueDevTools from 'vite-plugin-vue-devtools'

import { integrationFactory } from './_factory'

export default integrationFactory(VueDevTools, {
  enabled: ({ userOptions }) => userOptions.vueDevTools !== false,
  options: ({ userOptions }) => userOptions.vueDevTools,
  defaults: () => ({
    componentInspector: {
      toggleComboKey: 'alt-s',
    },
  }),
})
