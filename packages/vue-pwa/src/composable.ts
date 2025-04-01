import { registerSW } from 'virtual:pwa-register'
import { ref } from 'vue'

const needRefresh = ref(false)
const offlineReady = ref(false)
const registrationError = ref(false)
let updateServiceWorker: ReturnType<typeof registerSW>

export function usePWA() {
  if (import.meta.env.SSR) {
    return { register: () => {} } as never
  }

  return {
    needRefresh,
    offlineReady,
    register: () => {
      updateServiceWorker = registerSW({
        immediate: true,
        onNeedRefresh() {
          needRefresh.value = true
        },
        onOfflineReady() {
          offlineReady.value = true
        },
        onRegisterError() {
          registrationError.value = true
        },
      })
    },
    updateServiceWorker,
  }
}
