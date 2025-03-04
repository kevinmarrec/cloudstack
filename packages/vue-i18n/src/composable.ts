import { inject } from 'vue'

import { injectionKey } from './constants'

export function useI18n() {
  const instance = inject(injectionKey)

  if (!instance)
    throw new Error('No Vue I18n instance found')

  return instance
}
