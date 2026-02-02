import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import BloodlinkPreset from './bloodlink-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: BloodlinkPreset,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            // This order ensures Tailwind (which is unlayered by default) 
            // or your custom layers come AFTER the primeng layer.
            order: 'theme, base, primeng, tailwind-utilities' 
          }
        },
      },
    }),
  ],
};
