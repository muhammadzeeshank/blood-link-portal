import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenValid()) {
    console.log('User is authenticated, access granted to route:', state.url);
    return true;
  }

  // Redirect to login page with return url
  return router.createUrlTree(['/login']);
};

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenValid()) {
    console.log('User is already authenticated, redirecting to dashboard.');
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
