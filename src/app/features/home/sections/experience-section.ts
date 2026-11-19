import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService, LocalizePipe, MonthYearPipe } from '../../../core/i18n';
import { Experience } from '../../../core/models';
import { BadgeComponent, SectionHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-experience-section',
  imports: [LocalizePipe, MonthYearPipe, BadgeComponent, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-t border-line bg-surface' },
  template: `
    <div class="container-editorial py-20 md:py-28">
      <app-section-header
        index="02"
        [label]="t().sections.experience.label"
        [title]="t().sections.experience.title"
      />

      <ol class="mt-12 border-t border-line">
        @for (job of experience(); track job.company) {
          <li class="grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-10">
            <div class="lg:col-span-4">
              <p class="type-label-md uppercase text-subtle">
                {{ job.start | monthYear }} — {{ job.end | monthYear }}
              </p>
              <h3 class="mt-2 type-headline-sm text-ink">{{ job.company }}</h3>
              <p class="mt-1 type-body-sm text-muted">{{ job.location | loc }}</p>
              @if (job.partTime) {
                <app-badge class="mt-3">{{ t().sections.experience.partTime }}</app-badge>
              }
            </div>
            <div class="lg:col-span-8">
              <p class="type-label-md uppercase text-accent">{{ job.role | loc }}</p>
              <ul class="mt-4 space-y-3">
                @for (item of job.highlights; track $index) {
                  <li class="relative pl-5 type-body-md text-muted">
                    <span class="absolute left-0 top-[11px] h-px w-2.5 bg-line-strong" aria-hidden="true"></span>
                    {{ item | loc }}
                  </li>
                }
              </ul>
              <ul class="mt-5 flex flex-wrap gap-1.5">
                @for (tech of job.stack; track tech) {
                  <li><app-badge>{{ tech }}</app-badge></li>
                }
              </ul>
            </div>
          </li>
        }
      </ol>
    </div>
  `,
})
export class ExperienceSectionComponent {
  readonly experience = input.required<Experience[]>();
  protected readonly t = inject(LanguageService).t;
}
