import { createI18n } from '@kevinmarrec/cloudstack-vue-i18n'
import { Cloudstack } from 'virtual:cloudstack'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { watchEffect } from 'vue'

import App from './App.vue'

export const createApp = Cloudstack(App, async ({ app }) => {
  app.use(await createI18n({
    messages: import.meta.glob('./locales/*.yml'),
  }))

  const { updateServiceWorker, needRefresh } = useRegisterSW()

  watchEffect(() => {
    if (needRefresh.value) {
      // eslint-disable-next-line no-alert
      confirm('New content available, refresh?') && updateServiceWorker()
    }
  })
})
