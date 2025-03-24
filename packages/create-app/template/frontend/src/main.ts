import { Cloudstack } from 'virtual:cloudstack'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { watchEffect } from 'vue'

import App from './App.vue'

export const createApp = Cloudstack(App, () => {
  const { updateServiceWorker, needRefresh } = useRegisterSW()

  watchEffect(() => {
    if (needRefresh.value) {
      // eslint-disable-next-line no-alert
      confirm('New content available, refresh?') && updateServiceWorker()
    }
  })
})
