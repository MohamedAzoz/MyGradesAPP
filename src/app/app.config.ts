import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './Core/Interceptors/loading.interceptor';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { authInterceptor } from './Core/Interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(ToastModule, HttpClientModule),
    provideRouter(routes),
    provideAnimations(),
    MessageService,
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor, authInterceptor])
    ),
  ],
};
