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
  404: {
    path: '404',
    action: () => import('./actions/welcome'),
  },
}
