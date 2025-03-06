export interface LocaleMessages {
  [key: string]: string | LocaleMessages
}

export interface Messages {
  [locale: string]: LocaleMessages
}

interface LazyMessages {
  [path: string]: () => Promise<unknown>
}

export interface VueI18nOptions {
  locale?: string
  fallbackLocale?: string
  messages?: Messages | LazyMessages
}

export interface ResolvedVueI18nOptions extends Required<VueI18nOptions> {}
