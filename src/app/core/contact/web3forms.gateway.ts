import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { ContactGateway, ContactMessage, WEB3FORMS_CONFIG } from './contact.gateway';

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

/** Sends messages through https://web3forms.com (delivered to the inbox tied to the access key). */
@Injectable()
export class Web3FormsContactGateway implements ContactGateway {
  private readonly http = inject(HttpClient);
  private readonly config = inject(WEB3FORMS_CONFIG);

  get configured(): boolean {
    return this.config.accessKey.trim().length > 0;
  }

  send(message: ContactMessage): Observable<void> {
    if (!this.configured) {
      return throwError(() => new Error('Web3Forms access key is not configured'));
    }
    return this.http
      .post<Web3FormsResponse>(
        this.config.endpoint,
        {
          access_key: this.config.accessKey,
          subject: `${this.config.subject} — ${message.name}`,
          from_name: this.config.fromName,
          name: message.name,
          email: message.email,
          message: message.message,
          botcheck: message.botcheck,
        },
        { headers: { Accept: 'application/json' } },
      )
      .pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(response.message ?? 'Web3Forms rejected the message');
          }
        }),
      );
  }
}
