import { computed, readonly, ref, watch } from 'vue'

import type { Locale, LocaleMessage, LocaleMessages, VueI18nOptions } from './types'

export function createInstance(options: VueI18nOptions) {
  const locale = ref(options.locale ?? 'en' as Locale)
  const fallbackLocale = ref(options.fallbackLocale ?? locale.value)
  const messages = ref<LocaleMessages>({})

  async function loadLocale(locale: Locale) {
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

  function translate(key: string) {
    return messages.value[locale.value]?.[key] as string
      ?? messages.value[fallbackLocale.value]?.[key] as string
      ?? key
  }

  return {
    availableLocales: Object.keys(options.messages ?? {}),
    locale: readonly(locale),
    fallbackLocale: computed({
      get: () => fallbackLocale.value,
      set: newValue => fallbackLocale.value = newValue,
    }),
    isReady: () => isReady,
    // messages: computed(() => messages.value),
    translate,
    t: translate,
  }
}

export interface VueI18nInstance extends ReturnType<typeof createInstance> {}
