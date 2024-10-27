import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './auth.interceptor'; // Asegúrate de que la ruta es correcta

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Sin withFetch
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Permite múltiples interceptores
    }
  ]
};
