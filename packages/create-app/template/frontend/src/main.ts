import { createI18n } from '@kevinmarrec/cloudstack-vue-i18n'
import { useHead } from '@unhead/vue'
import { Cloudstack } from 'virtual:cloudstack'

import App from './App.vue'

export const createApp = Cloudstack(App, async ({ app, head }) => {
  const i18n = createI18n({
    locale: 'fr',
    messages: import.meta.glob('./locales/*.yml'),
  })

  app.use(i18n)

  if (import.meta.env.SSR) {
    await i18n.isReady()
    useHead({
      htmlAttrs: {
        lang: 'fr',
      },
    })
  }
})
