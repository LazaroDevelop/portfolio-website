import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService, LocalizePipe } from '../../../core/i18n';
import { Stack } from '../../../core/models';
import { BadgeComponent, SectionHeaderComponent, TechIconComponent } from '../../../shared/ui';

@Component({
  selector: 'app-stack-section',
  imports: [LocalizePipe, BadgeComponent, SectionHeaderComponent, TechIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-t border-line' },
  template: `
    @let s = stack();
    <div class="container-editorial py-20 md:py-28">
      <app-section-header
        index="01"
        [label]="t().sections.stack.label"
        [title]="t().sections.stack.title"
        [lead]="t().sections.stack.lead"
      />

      <ul class="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
        @for (tech of s.primary; track tech.name) {
          <li class="bg-surface px-4 py-8 transition-colors hover:bg-canvas">
            <app-tech-icon [name]="tech.name" [icon]="tech.icon" [size]="56" />
          </li>
        }
      </ul>

      <ul class="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
        @for (tech of s.secondary; track tech.name) {
          <li class="flex items-center gap-2">
            <img [src]="'icons/' + tech.icon + '.svg'" alt="" class="size-6" loading="lazy" />
            <span class="type-label-md uppercase text-muted">{{ tech.name }}</span>
          </li>
        }
      </ul>

      <div class="mt-14 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
        @for (group of s.groups; track group.title.en) {
          <div>
            <h3 class="type-label-md uppercase text-ink">{{ group.title | loc }}</h3>
            <ul class="mt-3 flex flex-wrap gap-1.5">
              @for (item of group.items; track item) {
                <li><app-badge>{{ item }}</app-badge></li>
              }
            </ul>
          </div>
        }
      </div>
    </div>
  `,
})
export class StackSectionComponent {
  readonly stack = input.required<Stack>();
  protected readonly t = inject(LanguageService).t;
}
