import presetIcons, { type IconsOptions } from '@unocss/preset-icons'
import presetUno, { type Theme } from '@unocss/preset-uno'
import presetWebFonts, { type WebFontsOptions } from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { type UserConfig as BaseUserConfig, defineConfig as defineBaseConfig } from 'unocss'
import { definePreset } from 'unocss'

export type { Theme }

type UserConfig = Pick<
  BaseUserConfig<Theme>,
  'autocomplete' |
  'blocklist' |
  'extendTheme' |
  'preflights' |
  'rules' |
  'theme' |
  'safelist' |
  'separators' |
  'shortcuts' |
  'variants'
>

interface Config extends UserConfig {
  icons?: IconsOptions
  fonts?: WebFontsOptions['fonts']
}

export function defineConfig(config: Config = {}) {
  const { icons, fonts, ...baseConfig } = config

  return defineBaseConfig<Theme>({
    ...baseConfig,
    presets: [
      definePreset(() => ({
        name: '@kevinmarrec/preset-uno',
        presets: [
          presetUno(),
          presetIcons({
            scale: 1.2,
            ...icons,
          }),
          presetWebFonts({
            processors: createLocalFontProcessor(),
            fonts: fonts ?? {
              sans: 'DM Sans',
              serif: 'DM Serif Display',
              mono: 'DM Mono',
            },
          }),
        ],
        transformers: [
          transformerDirectives(),
          transformerVariantGroup(),
        ],
        preflights: [
          {
            layer: 'default',
            getCSS: () => 'html, body, #app {height: 100%;}',
          },
        ],
        theme: {
          preflightRoot: ['*,::before,::after,::backdrop'],
        },
      })),
    ],
  })
}
