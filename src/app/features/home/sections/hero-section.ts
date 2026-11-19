import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService, LocalizePipe } from '../../../core/i18n';
import { Profile } from '../../../core/models';
import { BadgeComponent, ButtonDirective, ExternalLinkDirective } from '../../../shared/ui';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, LocalizePipe, BadgeComponent, ButtonDirective, ExternalLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative block overflow-hidden' },
  styles: `
    .hero-grid {
      background-image:
        linear-gradient(to right, var(--color-line) 1px, transparent 1px),
        linear-gradient(to bottom, var(--color-line) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse at 70% 30%, black 10%, transparent 70%);
    }
  `,
  template: `
    <div class="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true"></div>
    @let p = profile();
    <div class="container-editorial relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-8">
        <app-badge variant="active">{{ t().hero.status }}</app-badge>
        <p class="mt-8 type-label-md uppercase text-subtle">
          {{ p.role | loc }} <span class="text-accent">/</span> {{ p.location }}
        </p>
        <h1 class="mt-4 max-w-4xl type-display text-ink">{{ p.headline | loc }}</h1>
        <p class="mt-6 max-w-2xl type-body-lg text-muted">{{ p.summary | loc }}</p>
        <div class="mt-10 flex flex-wrap gap-3">
          <a appButton appExternal [href]="p.github">
            <img src="icons/github.svg" alt="" class="size-4 invert" />
            {{ t().hero.ctaGithub }}
          </a>
          <a appButton variant="outline" appExternal [href]="p.linkedin">
            <img src="icons/linkedin.svg" alt="" class="size-4" />
            {{ t().hero.ctaLinkedin }}
          </a>
          <a appButton variant="outline" routerLink="/" fragment="projects">
            {{ t().hero.ctaProjects }} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <aside class="lg:col-span-4 lg:self-end">
        <figure class="relative mb-4 overflow-hidden rounded-sm border border-line bg-surface p-2 shadow-card">
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
            <span class="type-label-sm uppercase text-subtle">MVD · UY</span>
          </figcaption>
        </figure>
        <dl class="grid grid-cols-2 overflow-hidden rounded-sm border border-line bg-surface shadow-card">
          @for (metric of p.metrics; track metric.value; let i = $index) {
            <div
              class="flex flex-col gap-1 border-line p-5"
              [class.border-r]="i % 2 === 0"
              [class.border-t]="i > 1"
            >
              <dt class="order-2 type-label-sm uppercase text-subtle">{{ metric.label | loc }}</dt>
              <dd class="order-1 type-headline-md text-ink">{{ metric.value }}</dd>
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
