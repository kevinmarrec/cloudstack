import type { Config } from 'stylelint'

interface UserConfig {
  ignores?: Config['ignoreFiles']
  rules?: Config['rules']
}

export function defineConfig(config: UserConfig = {}): Config {
  return {
    extends: [
      'stylelint-config-recommended-scss',
      'stylelint-config-html',
      'stylelint-config-recess-order',
    ],
    rules: {
      'declaration-block-no-duplicate-properties': true,
      'length-zero-no-unit': true,
      ...config.rules,
    },
    ignoreFiles: config.ignores,
  }
}
