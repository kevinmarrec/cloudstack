import { inject } from 'vue'

import { injectionKey } from './constants'

export function useI18n() {
  const instance = inject(injectionKey)

  if (!instance)
    throw new Error('Plugin has not been installed')

  return instance
}
