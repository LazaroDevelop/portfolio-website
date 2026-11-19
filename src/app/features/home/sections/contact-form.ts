import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT_GATEWAY } from '../../../core/contact';
import { LanguageService } from '../../../core/i18n';
import { ButtonDirective, IconComponent } from '../../../shared/ui';

type Status = 'idle' | 'sending' | 'success' | 'error';

const FIELD =
  'w-full rounded-sm border border-line-strong bg-surface px-3 py-2.5 type-body-md text-ink ' +
  'placeholder:text-control transition-colors focus:border-ink focus:outline-none ' +
  'focus:shadow-[0_0_0_2px_rgba(15,23,42,0.05)] aria-[invalid=true]:border-accent';

/** Contact form; messages are delivered through the CONTACT_GATEWAY (Web3Forms → Gmail). */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, ButtonDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block rounded-sm border border-line bg-surface p-6 text-ink shadow-card-hover md:p-8' },
  template: `
    @let f = t().sections.contact.form;
    <h3 class="type-headline-sm text-ink">{{ f.title }}</h3>

    @if (status() === 'success') {
      <div class="mt-6 flex flex-col items-start gap-4" role="status">
        <p class="flex items-start gap-2 type-body-md text-ink">
          <app-icon name="circle-check" [size]="20" class="mt-0.5 text-accent" />
          {{ f.success }}
        </p>
        <button appButton variant="outline" type="button" (click)="reset()">{{ f.sendAnother }}</button>
      </div>
    } @else {
      <form class="mt-6 space-y-5" [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <div>
          <label for="cf-name" class="type-label-md uppercase text-subtle">{{ f.name }}</label>
          <input
            id="cf-name"
            type="text"
            formControlName="name"
            autocomplete="name"
            maxlength="100"
            [placeholder]="f.namePlaceholder"
            [class]="field"
            class="mt-1.5"
            [attr.aria-invalid]="showError('name')"
            [attr.aria-describedby]="showError('name') ? 'cf-name-error' : null"
          />
          @if (showError('name')) {
            <p id="cf-name-error" class="mt-1 type-body-sm text-accent">{{ f.required }}</p>
          }
        </div>

        <div>
          <label for="cf-email" class="type-label-md uppercase text-subtle">{{ f.email }}</label>
          <input
            id="cf-email"
            type="email"
            formControlName="email"
            autocomplete="email"
            maxlength="254"
            [placeholder]="f.emailPlaceholder"
            [class]="field"
            class="mt-1.5"
            [attr.aria-invalid]="showError('email')"
            [attr.aria-describedby]="showError('email') ? 'cf-email-error' : null"
          />
          @if (showError('email')) {
            <p id="cf-email-error" class="mt-1 type-body-sm text-accent">
              {{ form.controls.email.hasError('required') ? f.required : f.invalidEmail }}
            </p>
          }
        </div>

        <div>
          <label for="cf-message" class="type-label-md uppercase text-subtle">{{ f.message }}</label>
          <textarea
            id="cf-message"
            formControlName="message"
            rows="5"
            maxlength="4000"
            [placeholder]="f.messagePlaceholder"
            [class]="field"
            class="mt-1.5 resize-y"
            [attr.aria-invalid]="showError('message')"
            [attr.aria-describedby]="showError('message') ? 'cf-message-error' : null"
          ></textarea>
          @if (showError('message')) {
            <p id="cf-message-error" class="mt-1 type-body-sm text-accent">
              {{ form.controls.message.hasError('required') ? f.required : f.tooShort }}
            </p>
          }
        </div>

        <!-- Honeypot: hidden from people and assistive tech; bots tend to tick it. -->
        <input
          type="checkbox"
          formControlName="botcheck"
          class="hidden"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        />

        @if (status() === 'error') {
          <p class="flex items-start gap-2 type-body-sm text-accent" role="alert">
            <app-icon name="circle-alert" [size]="16" class="mt-0.5" />
            {{ gateway.configured ? f.error : f.notConfigured }}
          </p>
        }

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="type-label-sm uppercase text-subtle">{{ f.privacy }}</p>
          <button
            appButton
            type="submit"
            class="group shrink-0 whitespace-nowrap"
            [disabled]="status() === 'sending'"
          >
            @if (status() === 'sending') {
              <app-icon name="loader" class="animate-spin" />
              {{ f.sending }}
            } @else {
              {{ f.submit }}
              <app-icon
                name="send"
                class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            }
          </button>
        </div>
      </form>
    }
  `,
})
export class ContactFormComponent {
  protected readonly gateway = inject(CONTACT_GATEWAY);
  protected readonly t = inject(LanguageService).t;
  protected readonly field = FIELD;
  protected readonly status = signal<Status>('idle');
  private readonly submitted = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
    botcheck: [false],
  });

  protected showError(name: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.submitted());
  }

  protected submit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid || this.status() === 'sending') {
      return;
    }
    const value = this.form.getRawValue();
    // Silently "succeed" for bots that ticked the honeypot.
    if (value.botcheck) {
      this.status.set('success');
      return;
    }
    this.status.set('sending');
    this.gateway
      .send({
        name: value.name.trim(),
        email: value.email.trim(),
        message: value.message.trim(),
        botcheck: false,
      })
      .subscribe({
        next: () => {
          this.status.set('success');
          this.form.reset();
          this.submitted.set(false);
        },
        error: () => this.status.set('error'),
      });
  }

  protected reset(): void {
    this.status.set('idle');
  }
}
