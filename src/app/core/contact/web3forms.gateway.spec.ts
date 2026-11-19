import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { WEB3FORMS_CONFIG, Web3FormsConfig } from './contact.gateway';
import { Web3FormsContactGateway } from './web3forms.gateway';

const message = { name: 'Ana', email: 'ana@example.com', message: 'Hola, tengo un proyecto.', botcheck: false };

function setup(accessKey: string) {
  const config: Web3FormsConfig = {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey,
    subject: 'Nuevo mensaje',
    fromName: 'Portafolio',
  };
  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: WEB3FORMS_CONFIG, useValue: config },
      Web3FormsContactGateway,
    ],
  });
  return {
    gateway: TestBed.inject(Web3FormsContactGateway),
    http: TestBed.inject(HttpTestingController),
  };
}

describe('Web3FormsContactGateway', () => {
  it('posts the message with the access key and resolves on success', async () => {
    const { gateway, http } = setup('test-key');
    const result = firstValueFrom(gateway.send(message));

    const req = http.expectOne('https://api.web3forms.com/submit');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(
      jasmine.objectContaining({
        access_key: 'test-key',
        email: 'ana@example.com',
        subject: 'Nuevo mensaje — Ana',
      }),
    );
    req.flush({ success: true });
    await expectAsync(result).toBeResolved();
    http.verify();
  });

  it('fails when Web3Forms answers success: false', async () => {
    const { gateway, http } = setup('test-key');
    const result = firstValueFrom(gateway.send(message));
    http.expectOne('https://api.web3forms.com/submit').flush({ success: false, message: 'bad key' });
    await expectAsync(result).toBeRejectedWithError('bad key');
  });

  it('fails without sending when no access key is configured', async () => {
    const { gateway, http } = setup('');
    expect(gateway.configured).toBeFalse();
    await expectAsync(firstValueFrom(gateway.send(message))).toBeRejected();
    http.expectNone('https://api.web3forms.com/submit');
  });
});
