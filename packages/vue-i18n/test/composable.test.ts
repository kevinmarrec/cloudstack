/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import { createI18n, useI18n } from '../src'

describe('composable', () => {
  it('should setup a default locale', async () => {
    const Component = defineComponent({
      setup() {
        const { locale } = useI18n()
        return () => locale.value
      },
    })

    const wrapper = mount(Component, {
      global: {
        plugins: [
          await createI18n({}),
        ],
      },
    })

    expect(wrapper.text()).toBe('en')
  })
})
