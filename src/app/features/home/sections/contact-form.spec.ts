import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CONTACT_GATEWAY, ContactGateway } from '../../../core/contact';
import { ContactFormComponent } from './contact-form';

describe('ContactFormComponent', () => {
  let gateway: jasmine.SpyObj<ContactGateway>;

  beforeEach(() => {
    gateway = jasmine.createSpyObj<ContactGateway>('ContactGateway', ['send'], { configured: true });
    gateway.send.and.returnValue(of(undefined));
    TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [provideZonelessChangeDetection(), { provide: CONTACT_GATEWAY, useValue: gateway }],
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(ContactFormComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const type = (selector: string, value: string) => {
      const input = el.querySelector(selector) as HTMLInputElement;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    const submit = async () => {
      (el.querySelector('button[type=submit]') as HTMLButtonElement).click();
      await fixture.whenStable();
    };
    return { el, type, submit };
  }

  it('shows validation errors and does not send an empty form', async () => {
    const { el, submit } = await render();
    await submit();
    expect(el.querySelectorAll('[id$="-error"]').length).toBe(3);
    expect(gateway.send).not.toHaveBeenCalled();
  });

  it('sends a valid message and shows the success state', async () => {
    const { el, type, submit } = await render();
    type('#cf-name', ' Ana ');
    type('#cf-email', 'ana@example.com');
    type('#cf-message', 'Hola, tengo un proyecto con Spring Boot.');
    await submit();

    expect(gateway.send).toHaveBeenCalledOnceWith({
      name: 'Ana',
      email: 'ana@example.com',
      message: 'Hola, tengo un proyecto con Spring Boot.',
      botcheck: false,
    });
    expect(el.querySelector('[role=status]')).toBeTruthy();
  });
});
