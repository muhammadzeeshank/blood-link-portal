import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/components/main-layout/main-layout';
import { authGuard, loginGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [loginGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./core/auth/components/login/login').then((m) => m.Login),
      },
    ],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'donors',
        loadComponent: () => import('./features/donors/donors').then((m) => m.Donors),
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
