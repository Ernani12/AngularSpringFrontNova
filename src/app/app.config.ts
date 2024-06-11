import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ClienteService } from './servico/cliente.service';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ClienteService,FilterPipe, importProvidersFrom(HttpClient), provideHttpClient(withFetch())]
};
