import { computed, inject, type InjectionKey, type Plugin, ref } from 'vue'

interface VueI18nOptions {
  locale?: string
  fallbackLocale?: string
  messages?: Record<string, Record<string, string>>
}

function createInstance(options: VueI18nOptions) {
  const locale = ref(options.locale ?? 'en')
  const fallbackLocale = ref(options.fallbackLocale ?? locale.value)
  const messages = ref<NonNullable<VueI18nOptions['messages']>>(options.messages ?? {})

  function setLocaleMessage(locale: string, message: Record<string, string>) {
    messages.value[locale] = message
  }

  function translate(key: string) {
    let message = messages.value[locale.value]?.[key]

    if (message) {
      return message
    }

    if (import.meta.env.NODE_ENV !== 'production') {
      console.warn(`[i18n] Not found '${key}' key in '${locale.value}' locale messages.`)
      console.warn(`[i18n] Fall back to translate '${key}' key with '${fallbackLocale.value}' locale.`)
    }

    message = messages.value[fallbackLocale.value]?.[key]

    if (message) {
      return message
    }

    if (import.meta.env.NODE_ENV !== 'production') {
      console.warn(`[i18n] Not found '${key}' key in '${fallbackLocale.value}' locale messages.`)
    }

    return key
  }

  return {
    locale: computed({
      get: () => locale.value,
      set: newValue => locale.value = newValue,
    }),
    fallbackLocale: computed({
      get: () => fallbackLocale.value,
      set: newValue => fallbackLocale.value = newValue,
    }),
    messages: computed(() => messages.value),
    setLocaleMessage,
    translate,
    t: translate,
  }
}

type I18nInstance = ReturnType<typeof createInstance>

export const injectionKey: InjectionKey<I18nInstance> = Symbol('vue-i18n')

export function createI18n(options: VueI18nOptions = {}): Plugin & { global: I18nInstance } {
  const instance = createInstance(options)

  return {
    global: instance,
    install(app) {
      app.provide(injectionKey, instance)
    },
  }
}

export function useI18n(): I18nInstance {
  const i18n = inject(injectionKey)
  if (!i18n) {
    throw new Error('No i18n instance found')
  }
  return i18n
}
