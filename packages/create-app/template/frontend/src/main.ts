/// <reference types="@kevinmarrec/cloudstack-vite-config/client" />

import { Power } from 'virtual:cloudstack'

import App from './App.vue'

export const createApp = Power(App, {
  routes: [
    {
      path: '/',
      component: () => import('./pages/Index.vue'),
    },
  ],
})
