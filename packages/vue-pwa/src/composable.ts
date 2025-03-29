import { registerSW, type RegisterSWOptions } from 'virtual:pwa-register'
import { ref } from 'vue'

const needRefresh = ref(false)
const offlineReady = ref(false)
let updateServiceWorker: ReturnType<typeof registerSW>

export function usePWA(options: RegisterSWOptions = {}) {
  if (import.meta.env.SSR) {
    return { register: () => {} } as never
  }

  const {
    immediate = true,
    onNeedRefresh,
    onOfflineReady,
    onRegistered,
    onRegisteredSW,
    onRegisterError,
  } = options

  return {
    needRefresh,
    offlineReady,
    register: () => {
      updateServiceWorker = registerSW({
        immediate,
        onNeedRefresh() {
          needRefresh.value = true
          onNeedRefresh?.()
        },
        onOfflineReady() {
          offlineReady.value = true
          onOfflineReady?.()
        },
        onRegistered,
        onRegisteredSW,
        onRegisterError,
      })
    },
    updateServiceWorker,
  }
}
