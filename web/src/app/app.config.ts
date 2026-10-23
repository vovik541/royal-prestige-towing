import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { ScrollManager } from './core/scroll';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      // Position restoration is handled by ScrollManager so same-page query changes (the photo viewer) never jump.
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled', anchorScrolling: 'enabled' }),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAppInitializer(() => void inject(ScrollManager)),
  ],
};
