import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    // canActivate: [loginGuard],
    loadComponent: () => import('./components/auth/login/login').then((m) => m.Login),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'donors',
        loadComponent: () => import('./components/donors/donors').then((m) => m.Donors),
      },
    ],
  },
];
