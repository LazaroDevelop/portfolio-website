import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { LanguageService } from '../../../core/i18n';
import { Profile } from '../../../core/models';
import { ThemeService } from '../../../core/theme';
import {
  ButtonDirective,
  ExternalLinkDirective,
  IconComponent,
  NetworkBackgroundComponent,
  RevealDirective,
} from '../../../shared/ui';
import { ContactFormComponent } from './contact-form';

@Component({
  selector: 'app-contact-section',
  imports: [
    ButtonDirective,
    ContactFormComponent,
    ExternalLinkDirective,
    IconComponent,
    NetworkBackgroundComponent,
    RevealDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative isolate block overflow-hidden bg-ink text-on-ink' },
  template: `
    @let p = profile();
    <app-network-bg [color]="networkColor()" />
    <div class="container-editorial grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
      <div appReveal class="lg:col-span-6 xl:col-span-7">
        <div class="flex items-center gap-3 type-label-md uppercase text-control">
          <span class="grid size-7 place-items-center rounded-xs border border-accent/40 bg-accent/15 text-accent">
            <app-icon name="send" [size]="15" class="animate-float" />
          </span>
          <span class="text-accent">05</span>
          <span class="h-px w-8 bg-ink-soft" aria-hidden="true"></span>
          <span>{{ t().sections.contact.label }}</span>
        </div>
        <h2 class="mt-4 type-headline-lg">{{ t().sections.contact.title }}</h2>
        <p class="mt-4 max-w-xl type-body-lg text-control">{{ t().sections.contact.lead }}</p>
        <div class="mt-10 flex flex-wrap gap-3">
          <a appButton variant="inverse" appExternal [href]="p.github">
            <img src="icons/github.svg" alt="" class="size-4 dark:invert" />
            GitHub
          </a>
          <a appButton appExternal [href]="p.linkedin" class="!border-ink-soft hover:!border-control">
            <img src="icons/linkedin.svg" alt="" class="size-4 invert dark:invert-0" />
            LinkedIn
          </a>
        </div>
      </div>
      <div appReveal [revealDelay]="150" class="lg:col-span-6 xl:col-span-5">
        <app-contact-form />
      </div>
    </div>
  `,
})
export class ContactSectionComponent {
  readonly profile = input.required<Profile>();
  protected readonly t = inject(LanguageService).t;
  private readonly theme = inject(ThemeService).theme;
  /** Light blue on the navy band (light theme), regular blue on the white band (dark theme). */
  protected readonly networkColor = computed(() =>
    this.theme() === 'dark' ? '59, 130, 246' : '147, 197, 253',
  );
}
