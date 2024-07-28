/// <reference types="@kevinmarrec/cloudstack-vite-plugin/client" />

import { Power } from 'virtual:cloudstack'

import App from './App.vue'

export const createApp = Power(App, () => {
  // installPWA(ctx)
})
