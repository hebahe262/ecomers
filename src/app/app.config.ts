import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideToastr } from 'ngx-toastr';
import { hedarsInterceptor } from './core/interceptors/headers/hedars.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withHashLocation()), provideHttpClient(withFetch(),withInterceptors([hedarsInterceptor,errorsInterceptor,loadingInterceptor])),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr(), // Toastr providers
    importProvidersFrom(NgxSpinnerModule),
    importProvidersFrom([BrowserAnimationsModule])
  ]

};
  


