import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { provideRouter } from '@angular/router';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    // provideRouter(routes)
    provideRouter(
      routes,
      // to scroll to the top when navigating to another page
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    )
  ]
};


