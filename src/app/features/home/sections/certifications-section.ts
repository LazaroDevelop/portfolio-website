import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService, LocalizePipe } from '../../../core/i18n';
import { CertificationGroup } from '../../../core/models';
import {
  ExternalLinkDirective,
  IconComponent,
  RevealDirective,
  SectionHeaderComponent,
  NetworkBackgroundComponent,
} from '../../../shared/ui';

@Component({
  selector: 'app-certifications-section',
  imports: [
    NetworkBackgroundComponent,
    LocalizePipe, ExternalLinkDirective, IconComponent, RevealDirective, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative isolate block overflow-hidden border-t border-line bg-surface' },
  template: `
    <app-network-bg color="59, 130, 246" />
    <div class="container-editorial py-20 md:py-28">
      <app-section-header
        index="04"
        icon="award"
        [label]="t().sections.certifications.label"
        [title]="t().sections.certifications.title"
      />

      <div class="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
        @for (group of groups(); track group.title.en; let i = $index) {
          <section appReveal [revealDelay]="i * 100">
            <h3 class="border-b border-ink pb-3 type-label-md uppercase text-ink">{{ group.title | loc }}</h3>
            <ul>
              @for (cert of group.items; track cert.name) {
                <li class="flex items-start justify-between gap-4 border-b border-line py-3">
                  <div>
                    <p class="type-body-sm font-medium text-ink">{{ cert.name }}</p>
                    <p class="type-label-sm uppercase text-subtle">{{ cert.issuer }}</p>
                  </div>
                  @if (cert.url) {
                    <a
                      appExternal
                      [href]="cert.url"
                      class="group flex shrink-0 items-center gap-1 type-label-sm uppercase text-muted transition-colors hover:text-accent"
                      [attr.aria-label]="t().sections.certifications.verify + ': ' + cert.name"
                    >
                      {{ t().sections.certifications.verify }}
                      <app-icon
                        name="arrow-up-right"
                        [size]="12"
                        class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  }
                </li>
              }
            </ul>
          </section>
        }
      </div>
    </div>
  `,
})
export class CertificationsSectionComponent {
  readonly groups = input.required<CertificationGroup[]>();
  protected readonly t = inject(LanguageService).t;
}
