import { readonly, ref, watch } from 'vue'

import type { LocaleMessage, LocaleMessages, VueI18nOptions } from './types'

export function createInstance(options: Required<VueI18nOptions>) {
  const availableLocales = Object.keys(options.messages)
  const locale = ref(options.locale)
  const fallbackLocale = ref(options.fallbackLocale)
  const messages = ref<LocaleMessages>({})

  async function loadLocale(locale: string) {
    if (!options.messages || messages.value[locale])
      return

    messages.value[locale] = typeof options.messages[locale] === 'function'
      ? ((await options.messages[locale]?.()) as any).default as LocaleMessage
      : options.messages[locale]
  }

  watch(locale, loadLocale)

  const isReady = new Promise<void>((resolve) => {
    loadLocale(locale.value).then(() => resolve())
  })

  return {
    availableLocales,
    locale,
    fallbackLocale,
    messages: readonly(messages),
    isReady: () => isReady,
    t: (key: string) => {
      const segments = key.split('.')
      let current: LocaleMessage = messages.value[locale.value]
      for (const segment of segments) {
        current = current?.[segment] as LocaleMessage
      }
      return current ?? key
    },
  }
}

export interface VueI18nInstance extends ReturnType<typeof createInstance> {}
