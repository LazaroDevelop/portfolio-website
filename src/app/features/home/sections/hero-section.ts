import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService, LocalizePipe } from '../../../core/i18n';
import { Profile } from '../../../core/models';
import {
  BadgeComponent,
  ButtonDirective,
  CountUpDirective,
  ExternalLinkDirective,
  IconComponent,
  NetworkBackgroundComponent,
} from '../../../shared/ui';

@Component({
  selector: 'app-hero-section',
  imports: [
    RouterLink,
    LocalizePipe,
    BadgeComponent,
    ButtonDirective,
    CountUpDirective,
    ExternalLinkDirective,
    IconComponent,
    NetworkBackgroundComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative isolate block overflow-hidden' },
  template: `
    @let p = profile();
    <app-network-bg />
    <div class="container-editorial grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-8">
        <app-badge variant="active" class="animate-fade-up">{{ t().hero.status }}</app-badge>
        <p
          class="mt-8 flex items-center gap-2 type-label-md uppercase text-subtle animate-fade-up [animation-delay:80ms]"
        >
          {{ p.role | loc }} <span class="text-accent">/</span>
          <app-icon name="map-pin" [size]="13" class="text-accent" />
          {{ p.location }}
        </p>
        <h1 class="mt-4 max-w-4xl type-display text-ink animate-fade-up [animation-delay:160ms]">
          {{ p.headline | loc }}
        </h1>
        <p class="mt-6 max-w-2xl type-body-lg text-muted animate-fade-up [animation-delay:240ms]">
          {{ p.summary | loc }}
        </p>
        <div class="mt-10 flex flex-wrap gap-3 animate-fade-up [animation-delay:320ms]">
          <a appButton appExternal [href]="p.github" class="group">
            <img src="icons/github.svg" alt="" class="size-4 invert" />
            {{ t().hero.ctaGithub }}
            <app-icon
              name="arrow-up-right"
              class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a appButton variant="outline" appExternal [href]="p.linkedin">
            <img src="icons/linkedin.svg" alt="" class="size-4" />
            {{ t().hero.ctaLinkedin }}
          </a>
          <a appButton variant="outline" routerLink="/" fragment="projects" class="group">
            {{ t().hero.ctaProjects }}
            <app-icon name="arrow-right" class="rotate-90 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>

      <aside class="animate-fade-up [animation-delay:400ms] lg:col-span-4 lg:self-end">
        <figure
          class="relative mx-auto mb-4 max-w-sm animate-float overflow-hidden rounded-sm border border-line bg-surface p-2 shadow-card-hover lg:max-w-none"
        >
          <picture>
            <source [srcset]="p.photo.src" type="image/webp" />
            <img
              [src]="p.photo.fallback"
              [alt]="p.photo.alt | loc"
              width="800"
              height="800"
              class="aspect-square w-full rounded-xs object-cover"
              fetchpriority="high"
            />
          </picture>
          <figcaption
            class="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 rounded-xs bg-surface/90 px-3 py-2 backdrop-blur"
          >
            <span class="type-label-sm uppercase text-ink">{{ p.name }}</span>
            <span class="flex items-center gap-1 type-label-sm uppercase text-subtle">
              <app-icon name="map-pin" [size]="11" class="text-accent" /> MVD · UY
            </span>
          </figcaption>
        </figure>

        <dl class="grid grid-cols-2 overflow-hidden rounded-sm border border-line bg-surface shadow-card">
          @for (metric of p.metrics; track metric.value; let i = $index) {
            <div
              class="group flex flex-col gap-1 border-line p-5 transition-colors hover:bg-canvas"
              [class.border-r]="i % 2 === 0"
              [class.border-t]="i > 1"
            >
              <dt class="order-2 type-label-sm uppercase text-subtle">{{ metric.label | loc }}</dt>
              <dd class="order-1 flex items-start justify-between gap-2">
                <span class="type-headline-md tabular-nums text-ink" [appCountUp]="metric.value">{{
                  metric.value
                }}</span>
                <app-icon
                  [name]="metric.icon"
                  [size]="18"
                  class="mt-1 text-accent transition-transform"
                  [class]="metric.icon === 'rocket' ? 'group-hover:animate-rocket' : 'group-hover:scale-125'"
                />
              </dd>
            </div>
          }
        </dl>
        <p class="mt-3 flex items-center gap-2 type-label-sm uppercase text-subtle">
          <span class="h-px w-6 bg-accent" aria-hidden="true"></span>
          Java · Spring Boot · Kafka · AWS
        </p>
      </aside>
    </div>
  `,
})
export class HeroSectionComponent {
  readonly profile = input.required<Profile>();
  protected readonly t = inject(LanguageService).t;
}
