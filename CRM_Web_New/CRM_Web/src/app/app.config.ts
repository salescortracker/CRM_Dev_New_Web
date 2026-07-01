import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import {
  provideClientHydration
} from '@angular/platform-browser';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { routes } from './app.routes';

import {
  jwtInterceptor
} from './core/authentication/interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    // provideClientHydration(),

    provideHttpClient(
      withInterceptors([
        jwtInterceptor
      ])
    )

  ]

};