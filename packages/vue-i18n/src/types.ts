export interface LocaleMessages {
  [key: string]: string | LocaleMessages
}

export interface Messages {
  [locale: string]: LocaleMessages
}

interface LazyMessages<T> {
  [path: string]: () => Promise<T>
}

export interface VueI18nOptions {
  locale?: string
  fallbackLocale?: string
  messages?: Messages | LazyMessages<unknown>
}

export interface ResolvedVueI18nOptions extends Required<VueI18nOptions> {
  messages: Messages | LazyMessages<{ default: Messages }>
}
