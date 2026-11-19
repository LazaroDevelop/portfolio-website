import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService, LocalizePipe } from '../../core/i18n';
import { Project } from '../../core/models';
import { BadgeComponent } from './badge';
import { CardComponent } from './card';
import { ExternalLinkDirective } from './external-link';
import { IconComponent } from './icon';

/** Project summary card, reused by the home grid and the "next project" link. */
@Component({
  selector: 'app-project-card',
  imports: [
    RouterLink,
    LocalizePipe,
    BadgeComponent,
    CardComponent,
    ExternalLinkDirective,
    IconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
  template: `
    @let p = project();
    <app-card class="h-full" [featured]="!!p.featured">
      <div class="flex flex-1 flex-col p-6 md:p-8">
        <div class="flex items-center justify-between type-label-sm uppercase text-subtle">
          <span>P-{{ index() }}</span>
          @if (p.featured) {
            <span class="flex items-center gap-1 text-accent">
              <app-icon name="rocket" [size]="12" class="group-hover/card:animate-rocket" />
              {{ t().sections.projects.featured }}
            </span>
          }
        </div>
        <h3 class="mt-4 type-headline-sm text-ink">
          <a [routerLink]="['/projects', p.slug]" class="hover:underline">{{ p.name | loc }}</a>
        </h3>
        <p class="mt-2 type-body-md text-muted">{{ p.tagline | loc }}</p>
        <ul class="mt-5 flex flex-wrap gap-1.5">
          @for (tech of p.stack; track tech) {
            <li><app-badge>{{ tech }}</app-badge></li>
          }
        </ul>
      </div>
      <div class="mt-auto flex border-t border-well type-label-md uppercase">
        <a
          appExternal
          [href]="p.repoUrl"
          class="flex flex-1 items-center gap-2 px-6 py-4 text-ink transition-colors hover:bg-canvas md:px-8"
        >
          <img src="icons/github.svg" alt="" class="size-4" />
          {{ t().sections.projects.repo }}
        </a>
        <a
          [routerLink]="['/projects', p.slug]"
          class="group/link flex items-center gap-2 border-l border-well px-6 py-4 text-muted transition-colors hover:bg-canvas hover:text-ink md:px-8"
        >
          {{ t().sections.projects.caseStudy }}
          <app-icon
            name="arrow-right"
            [size]="14"
            class="transition-transform duration-300 group-hover/card:translate-x-1 group-hover/link:text-accent"
          />
        </a>
      </div>
    </app-card>
  `,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  /** Display number, e.g. `01`. */
  readonly index = input('01');
  protected readonly t = inject(LanguageService).t;
}
