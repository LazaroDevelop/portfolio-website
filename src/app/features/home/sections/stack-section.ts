import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService, LocalizePipe } from '../../../core/i18n';
import { Stack } from '../../../core/models';
import {
  BadgeComponent,
  RevealDirective,
  SectionHeaderComponent,
  TechIconComponent,
} from '../../../shared/ui';

@Component({
  selector: 'app-stack-section',
  imports: [LocalizePipe, BadgeComponent, RevealDirective, SectionHeaderComponent, TechIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-t border-line' },
  template: `
    @let s = stack();
    <div class="container-editorial py-20 md:py-28">
      <app-section-header
        index="01"
        icon="layers"
        [label]="t().sections.stack.label"
        [title]="t().sections.stack.title"
        [lead]="t().sections.stack.lead"
      />

      <ul
        class="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3 lg:grid-cols-5"
      >
        @for (tech of s.primary; track tech.name; let i = $index) {
          <li
            appReveal
            [revealDelay]="i * 90"
            class="group relative bg-surface px-4 py-8 transition-colors duration-300 hover:bg-canvas"
          >
            <span
              class="absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
              aria-hidden="true"
            ></span>
            <app-tech-icon [name]="tech.name" [icon]="tech.icon" [size]="56" />
          </li>
        }
      </ul>

      <ul class="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
        @for (tech of s.secondary; track tech.name) {
          <li class="group flex items-center gap-2">
            <img
              [src]="'icons/' + tech.icon + '.svg'"
              alt=""
              class="size-6 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-115"
              loading="lazy"
            />
            <span class="type-label-md uppercase text-muted transition-colors group-hover:text-ink">
              {{ tech.name }}
            </span>
          </li>
        }
      </ul>

      <div class="mt-14 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
        @for (group of s.groups; track group.title.en; let i = $index) {
          <div appReveal [revealDelay]="(i % 3) * 90">
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
