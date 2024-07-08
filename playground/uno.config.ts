import presetIcons from '@unocss/preset-icons'
import presetUno, { type Theme } from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'

export default defineConfig<Theme>({
  presets: [
    presetUno({
      preflight: true,
    }),
    presetIcons({
      scale: 1.2,
    }),
    presetWebFonts({
      processors: createLocalFontProcessor(),
      fonts: {
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
})
