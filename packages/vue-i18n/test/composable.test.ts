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
  it('should translate (default locale)', async () => {
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

  it('should translate (navigator language)', async () => {
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

  it('should translate (fallback locale when translation not found)', async () => {
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

  it('should translate (raw key when fallback translation also not found)', async () => {
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
