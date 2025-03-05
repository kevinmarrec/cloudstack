import { createI18n } from '@kevinmarrec/cloudstack-vue-i18n'
import { Cloudstack } from 'virtual:cloudstack'

import App from './App.vue'

export const createApp = Cloudstack(App, async ({ app }) => {
  app.use(await createI18n({
    locale: 'fr',
    messages: import.meta.glob('./locales/*.yml'),
  }))
})
