import type { Config } from 'stylelint'

export function useConfig(userConfig: Config = {}): Config {
  return {
    extends: [
      'stylelint-config-recommended-scss',
      'stylelint-config-html',
      'stylelint-config-recess-order',
    ],
    rules: {
      'declaration-block-no-duplicate-properties': true,
      'length-zero-no-unit': true,
      ...userConfig.rules,
    },
    ignoreFiles: [
      '**/dist/**',
      '**/node_modules/**',
      ...userConfig.ignoreFiles ?? [],
    ],
  }
}

export default useConfig()
