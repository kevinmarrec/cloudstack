import { antfu } from '@antfu/eslint-config'

export function defineConfig(...userConfigs: Array<Parameters<typeof antfu>[2]>) {
  return antfu({
    formatters: true,
    unocss: {
      attributify: true,
      strict: true,
    },
    typescript: {
      overrides: {
        'require-unicode-regexp': 'error',
        'ts/consistent-type-imports': [
          'error',
          { fixStyle: 'inline-type-imports' },
        ],
      },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    vue: {
      overrides: {
        'vue/no-unused-properties': 'error',
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          'alphabetize': { order: 'asc' },
          'distinctGroup': true,
          'newlines-between': 'always',
          'pathGroups': [
            {
              pattern: '~/**',
              group: 'external',
              position: 'after',
            },
          ],
        },
      ],
    },
  }, ...userConfigs)
}
