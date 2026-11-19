import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService } from '../../../core/i18n';
import { Profile } from '../../../core/models';
import {
  ButtonDirective,
  ExternalLinkDirective,
  IconComponent,
  RevealDirective,
} from '../../../shared/ui';

@Component({
  selector: 'app-contact-section',
  imports: [ButtonDirective, ExternalLinkDirective, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bg-dots-accent block overflow-hidden bg-ink text-white' },
  template: `
    @let p = profile();
    <div appReveal class="container-editorial grid gap-10 py-20 md:py-28 lg:grid-cols-12">
      <div class="lg:col-span-8">
        <div class="flex items-center gap-3 type-label-md uppercase text-control">
          <span class="grid size-7 place-items-center rounded-xs border border-accent/40 bg-accent/15 text-accent">
            <app-icon name="send" [size]="15" class="animate-float" />
          </span>
          <span class="text-accent">05</span>
          <span class="h-px w-8 bg-ink-soft" aria-hidden="true"></span>
          <span>{{ t().sections.contact.label }}</span>
        </div>
        <h2 class="mt-4 type-headline-lg">{{ t().sections.contact.title }}</h2>
        <p class="mt-4 max-w-2xl type-body-lg text-control">{{ t().sections.contact.lead }}</p>
      </div>
      <div class="flex flex-wrap items-end gap-3 lg:col-span-4 lg:justify-end">
        <a appButton variant="inverse" appExternal [href]="p.github">
          <img src="icons/github.svg" alt="" class="size-4" />
          GitHub
        </a>
        <a
          appButton
          appExternal
          [href]="p.linkedin"
          class="!border-ink-soft hover:!border-control"
        >
          <img src="icons/linkedin.svg" alt="" class="size-4 invert" />
          LinkedIn
        </a>
        @if (p.email) {
          <a appButton [href]="'mailto:' + p.email" class="!border-ink-soft hover:!border-control">
            Email
          </a>
        }
      </div>
    </div>
  `,
})
export class ContactSectionComponent {
  readonly profile = input.required<Profile>();
  protected readonly t = inject(LanguageService).t;
}
