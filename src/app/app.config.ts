import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {loggingInterceptor} from '../shared/http/logging.interceptor';
import {authInterceptor} from '../shared/auth/auth.interceptor';
import {errorInterceptor} from '../shared/http/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
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
