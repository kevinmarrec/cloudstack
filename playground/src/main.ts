/// <reference types="@kevinmarrec/cloudstack-vite-plugin/client" />

import { Power } from 'virtual:cloudstack'

import App from './App.vue'
import { install as installPWA } from './modules/pwa'

export const createApp = Power(App, (ctx: any) => {
  installPWA(ctx)
})
