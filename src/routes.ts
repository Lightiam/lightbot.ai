import { Routes } from '@botonic/react'

export const routes: Routes = {
  welcome: {
    path: 'welcome',
    action: import('./actions/welcome'),
  },
  help: {
    path: 'help',
    action: import('./actions/help'),
  },
  error: {
    path: 'error',
    action: import('./actions/error'),
  },
  404: {
    path: '404',
    action: () => import('./actions/error'),
  },
}
