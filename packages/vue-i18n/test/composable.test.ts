/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'

import { createI18n, useI18n } from '../src'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('composable', () => {
  describe('locale behaviors', () => {
    it('default locale', async () => {
      const Component = defineComponent({
        setup() {
          const { t } = useI18n()
          return () => t('welcome')
        },
      })

      const wrapper = mount(Component, {
        global: {
          plugins: [
            await createI18n({
              messages: {
                './locales/en.json': () => Promise.resolve({
                  default: {
                    welcome: 'Welcome !',
                  },
                }),
              },
            }),
          ],
        },
      })

      await vi.waitFor(() => {
        expect(wrapper.text()).toBe('Welcome !')
      })
    })

    it('navigator language', async () => {
      vi.stubGlobal('navigator', {
        language: 'fr-FR',
      })

      const Component = defineComponent({
        setup() {
          const { t } = useI18n()
          return () => t('welcome')
        },
      })

      const wrapper = mount(Component, {
        global: {
          plugins: [
            await createI18n({
              messages: {
                en: {
                  welcome: 'Welcome!',
                },
                fr: {
                  welcome: 'Bienvenue !',
                },
              },
            }),
          ],
        },
      })

      await vi.waitFor(() => {
        expect(wrapper.text()).toBe('Bienvenue !')
      })
    })

    it('fallback locale (when translation not found)', async () => {
      vi.stubGlobal('navigator', {
        language: 'fr-FR',
      })

      const Component = defineComponent({
        setup() {
          const { t } = useI18n()
          return () => t('welcome')
        },
      })

      const wrapper = mount(Component, {
        global: {
          plugins: [
            await createI18n({
              messages: {
                en: {
                  welcome: 'Welcome!',
                },
              },
            }),
          ],
        },
      })

      expect(wrapper.text()).toBe('Welcome!')
    })

    it('raw key (when fallback translation also not found)', async () => {
      const Component = defineComponent({
        setup() {
          const { t } = useI18n()
          return () => t('welcome')
        },
      })

      const wrapper = mount(Component, {
        global: {
          plugins: [
            await createI18n({}),
          ],
        },
      })

      expect(wrapper.text()).toBe('welcome')
    })
  })

  describe('translation behaviors', () => {
    it('named interpolation', async () => {
      const Component = defineComponent({
        setup() {
          const { t } = useI18n()
          return () => t('welcome', { name: 'John' })
        },
      })

      const wrapper = mount(Component, {
        global: {
          plugins: [
            await createI18n({
              messages: {
                en: {
                  welcome: 'Welcome, {name}!',
                },
              },
            }),
          ],
        },
      })

      expect(wrapper.text()).toBe('Welcome, John!')
    })

    it('list interpolation', async () => {
      const Component = defineComponent({
        setup() {
          const { t } = useI18n()
          return () => t('welcome', ['John', 'Doe'])
        },
      })

      const wrapper = mount(Component, {
        global: {
          plugins: [
            await createI18n({
              messages: {
                en: {
                  welcome: 'Welcome, {0} {1}!',
                },
              },
            }),
          ],
        },
      })

      expect(wrapper.text()).toBe('Welcome, John Doe!')
    })

    it('pluralization', async () => {
      const Component = defineComponent({
        setup() {
          const { t } = useI18n()
          return () => [
            t('cars', 0),
            t('cars', 1),
            t('cars', 2),
            t('apples', 0),
            t('apples', 1),
            t('apples', 2),
          ].join('\n')
        },
      })

      const wrapper = mount(Component, {
        global: {
          plugins: [
            await createI18n({
              messages: {
                en: {
                  cars: 'car | cars',
                  apples: 'no apples | one apple | {count} apples',
                },
              },
            }),
          ],
        },
      })

      expect(wrapper.text()).toBe([
        'cars',
        'car',
        'cars',
        'no apples',
        'one apple',
        '2 apples',
      ].join('\n'))
    })
  })

  it('should throw error when plugin has not been installed', () => {
    const Component = defineComponent({
      setup() {
        useI18n()
      },
    })

    vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(() => mount(Component)).toThrowError('Plugin has not been installed')
  })
})
