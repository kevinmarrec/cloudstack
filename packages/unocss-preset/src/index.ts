import { definePreset } from '@unocss/core'
import presetIcons, { type IconsOptions } from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import presetWebFonts, { type WebFontsOptions } from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export type { Theme } from '@unocss/preset-uno'

export interface PresetOptions {
  cwd?: string
  icons?: IconsOptions
  fonts?: WebFontsOptions['fonts']
}

export default definePreset<PresetOptions>(options => ({
  name: '@kevinmarrec/cloudstack-unocss-preset',
  presets: [
    presetUno(),
    presetIcons(options?.icons),
    presetWebFonts({
      processors: createLocalFontProcessor({
        cwd: options?.cwd,
      }),
      fonts: options?.fonts,
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
}))
