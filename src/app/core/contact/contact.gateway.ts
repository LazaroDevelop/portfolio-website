import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** Honeypot: bots fill it, humans never see it. */
  botcheck: boolean;
}

/**
 * Delivers contact form messages. The default implementation posts to Web3Forms, which emails
 * the site owner; a future backend only needs a new implementation bound in `app.config.ts`.
 */
export interface ContactGateway {
  readonly configured: boolean;
  send(message: ContactMessage): Observable<void>;
}

export const CONTACT_GATEWAY = new InjectionToken<ContactGateway>('CONTACT_GATEWAY');

export interface Web3FormsConfig {
  endpoint: string;
  /** Public access key from web3forms.com, tied to the inbox that receives the messages. */
  accessKey: string;
  subject: string;
  fromName: string;
}

export const WEB3FORMS_CONFIG = new InjectionToken<Web3FormsConfig>('WEB3FORMS_CONFIG');
