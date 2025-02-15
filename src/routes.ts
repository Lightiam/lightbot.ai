import { Routes } from '@botonic/react'

export const routes: Routes = {
  welcome: {
    path: 'welcome',
    action: import('./actions/welcome'),
  },
  404: {
    path: '404',
    action: () => import('./actions/welcome'),
  },
}
