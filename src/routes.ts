import type { ComponentType } from 'react';

type BotonicRoutes = {
  [key: string]: {
    path: string;
    action: () => Promise<{ default: ComponentType }>;
  };
};

export const routes: BotonicRoutes = {
  welcome: {
    path: 'welcome',
    action: () => import('./actions/welcome'),
  },
  help: {
    path: 'help',
    action: () => import('./actions/help'),
  },
  error: {
    path: 'error',
    action: () => import('./actions/error'),
  },
  404: {
    path: '404',
    action: () => import('./actions/error'),
  }
}
