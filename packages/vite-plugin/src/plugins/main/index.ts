/// <reference types="vite-ssg" />

import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { type Plugin, type UserConfig, mergeConfig } from 'vite'

export function MainPlugin(): Plugin {
  return {
    name: '@kevinmarrec/cloudstack-vite-plugin',
    async config(userConfig) {
      return mergeConfig<UserConfig, UserConfig>(userConfig, {
        resolve: {
          alias: {
            /* c8 ignore next */
            '~': path.resolve(userConfig.root ?? process.cwd(), 'src'),
          },
        },
        ssgOptions: {
          script: 'async',
          formatting: 'minify',
          crittersOptions: {
            reduceInlineStyles: false,
          },
        },
      })
    },
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            injectTo: 'head',
            children: readFileSync(path.join(import.meta.dirname, 'darkMode.script.js'), 'utf-8'),
          },
        ],
      }
    },
  }
}
