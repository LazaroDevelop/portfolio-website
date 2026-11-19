import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService, LocalizePipe } from '../../../core/i18n';
import { CertificationGroup } from '../../../core/models';
import { ExternalLinkDirective, SectionHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-certifications-section',
  imports: [LocalizePipe, ExternalLinkDirective, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-t border-line bg-surface' },
  template: `
    <div class="container-editorial py-20 md:py-28">
      <app-section-header
        index="04"
        [label]="t().sections.certifications.label"
        [title]="t().sections.certifications.title"
      />

      <div class="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
        @for (group of groups(); track group.title.en) {
          <section>
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
                      class="shrink-0 type-label-sm uppercase text-muted transition-colors hover:text-accent"
                      [attr.aria-label]="t().sections.certifications.verify + ': ' + cert.name"
                    >
                      {{ t().sections.certifications.verify }} ↗
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
