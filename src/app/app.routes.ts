import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    // canActivate: [loginGuard],
    loadComponent: () =>
      import('./components/auth/login/login').then((m) => m.Login),
  },
    {
    path: '',
    component: MainLayout,
  },
];
