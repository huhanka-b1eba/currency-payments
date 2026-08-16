import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {loggingInterceptor} from '../shared/http/logging.interceptor';
import {authInterceptor} from '../shared/auth/auth.interceptor';
import {errorInterceptor} from '../shared/http/error.interceptor';
import {API_URL} from '../shared/config/api-url.token';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: API_URL,
      useValue: 'http://localhost:3000/api'
    },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        loggingInterceptor,
        authInterceptor,
        errorInterceptor
      ])
    ),
    provideRouter(routes)],
};
