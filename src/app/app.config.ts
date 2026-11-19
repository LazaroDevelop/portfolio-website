import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import {
  CONTACT_FORM_CONFIG,
  CONTACT_GATEWAY,
  WEB3FORMS_CONFIG,
  Web3FormsContactGateway,
} from './core/contact';
import { CONTENT_REPOSITORY, StaticContentRepository } from './core/data';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    // Swap these for HTTP-backed implementations if a backend is added.
    { provide: CONTENT_REPOSITORY, useClass: StaticContentRepository },
    { provide: WEB3FORMS_CONFIG, useValue: CONTACT_FORM_CONFIG },
    { provide: CONTACT_GATEWAY, useClass: Web3FormsContactGateway },
  ],
};
