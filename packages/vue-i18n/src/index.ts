import { computed, inject, type InjectionKey, type ObjectPlugin, type Plugin, ref, watch } from 'vue'

export type Locale = string & {}

export interface LocaleMessage {
  [key: string]: string | LocaleMessage
}

interface LocaleMessages {
  [locale: string]: LocaleMessage
}

interface LazyLocaleMessages {
  [path: string]: () => Promise<unknown>
}

export interface VueI18nOptions {
  locale?: Locale
  fallbackLocale?: Locale
  messages?: LocaleMessages | LazyLocaleMessages
}

function createInstance(options: VueI18nOptions) {
  const locale = ref(options.locale ?? 'en' as Locale)
  const fallbackLocale = ref(options.fallbackLocale ?? locale.value)
  const messages = ref<LocaleMessages>({})

  async function loadLocale(locale: Locale) {
    if (!options.messages || messages.value[locale])
      return

    messages.value[locale] = typeof options.messages[locale] === 'function'
      ? ((await options.messages[locale]?.()) as any).default as LocaleMessage
      : options.messages[locale]

    if (typeof document !== 'undefined')
      document.querySelector('html')?.setAttribute('lang', locale)
  }

  watch(locale, loadLocale)

  const isReady = new Promise<void>((resolve) => {
    loadLocale(locale.value).then(() => resolve())
  })

  function translate(key: string) {
    return messages.value[locale.value]?.[key]
      ?? messages.value[fallbackLocale.value]?.[key]
      ?? key
  }

  return {
    availableLocales: Object.keys(options.messages ?? {}),
    locale: computed({
      get: () => locale.value,
      set: newValue => locale.value = newValue,
    }),
    fallbackLocale: computed({
      get: () => fallbackLocale.value,
      set: newValue => fallbackLocale.value = newValue,
    }),
    messages: computed(() => messages.value),
    isReady: () => isReady,
    translate,
    t: translate,
  }
}

interface VueI18nInstance extends ReturnType<typeof createInstance> {}
interface VueI18nPlugin extends ObjectPlugin, Pick<VueI18nInstance, 'isReady'> {}

export const injectionKey: InjectionKey<VueI18nInstance> = Symbol('vue-i18n')

export function createI18n(options: VueI18nOptions = {}): VueI18nPlugin {
  for (const key in options.messages) {
    const localePath = key.match(/(\w*)\.yml$/)?.[1]
    if (localePath) {
      options.messages[localePath] = options.messages[key]
      delete options.messages[key]
    }
  }

  const instance = createInstance(options)

  return {
    install: app => app.provide(injectionKey, instance),
    isReady: instance.isReady,
  }
}

export function useI18n(): VueI18nInstance {
  const i18n = inject(injectionKey)
  if (!i18n) {
    throw new Error('No i18n instance found')
  }
  return i18n
}
