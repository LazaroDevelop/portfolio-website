import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CONTENT_REPOSITORY } from '../../core/data';
import { LanguageService, LocalizePipe } from '../../core/i18n';
import { PageMetaService } from '../../core/layout';
import {
  BadgeComponent,
  ButtonDirective,
  ExternalLinkDirective,
  IconComponent,
  ProjectCardComponent,
} from '../../shared/ui';

/** Case study: 4-column metadata sidebar + 8-column narrative rail (DESIGN.md layout). */
@Component({
  selector: 'app-project-detail-page',
  imports: [
    RouterLink,
    LocalizePipe,
    BadgeComponent,
    ButtonDirective,
    ExternalLinkDirective,
    IconComponent,
    ProjectCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (state(); as s) {
      @if (s.project; as p) {
        <article>
          <header class="bg-dots-accent overflow-hidden border-b border-line">
            <div class="container-editorial py-12 md:py-20">
              <a
                routerLink="/"
                fragment="projects"
                class="group inline-flex items-center gap-2 type-label-md uppercase text-muted transition-colors hover:text-ink"
              >
                <app-icon
                  name="arrow-right"
                  [size]="14"
                  class="rotate-180 transition-transform group-hover:-translate-x-1"
                />
                {{ t().project.back }}
              </a>
              <p class="mt-10 flex items-center gap-2 type-label-md uppercase text-subtle animate-fade-up">
                <app-icon name="folder-git" [size]="14" class="text-accent" />
                <span class="text-accent">P-{{ number() }}</span> / {{ p.stack[0] }}
              </p>
              <h1 class="mt-4 max-w-4xl type-display text-ink animate-fade-up [animation-delay:100ms]">
                {{ p.name | loc }}
              </h1>
              <p class="mt-6 max-w-2xl type-body-lg text-muted animate-fade-up [animation-delay:200ms]">
                {{ p.tagline | loc }}
              </p>
            </div>
          </header>

          <div class="container-editorial grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
            <aside class="lg:col-span-4">
              <div class="space-y-8 lg:sticky lg:top-24">
                <section>
                  <h2 class="border-b border-ink pb-3 type-label-md uppercase text-ink">
                    {{ t().project.stack }}
                  </h2>
                  <ul class="mt-4 flex flex-wrap gap-1.5">
                    @for (tech of p.stack; track tech) {
                      <li><app-badge>{{ tech }}</app-badge></li>
                    }
                  </ul>
                </section>
                <section>
                  <h2 class="border-b border-ink pb-3 type-label-md uppercase text-ink">
                    {{ t().project.links }}
                  </h2>
                  <div class="mt-4 flex flex-col items-start gap-3">
                    <a appButton appExternal [href]="p.repoUrl">
                      <img src="icons/github.svg" alt="" class="size-4 invert" />
                      {{ t().project.repo }}
                    </a>
                    @for (link of p.extraLinks ?? []; track link.url) {
                      <a appButton variant="outline" appExternal [href]="link.url">
                        <img src="icons/github.svg" alt="" class="size-4" />
                        {{ link.label | loc }}
                      </a>
                    }
                  </div>
                </section>
              </div>
            </aside>

            <div class="lg:col-span-8">
              <section>
                <h2 class="type-label-md uppercase text-accent">{{ t().project.overview }}</h2>
                <p class="mt-4 type-body-lg text-ink">{{ p.overview | loc }}</p>
              </section>
              <section class="mt-14">
                <h2 class="type-label-md uppercase text-accent">{{ t().project.keyPoints }}</h2>
                <ol class="mt-4 border-t border-line">
                  @for (point of p.keyPoints; track $index) {
                    <li class="flex gap-6 border-b border-line py-5">
                      <span class="type-label-md text-subtle">{{ ($index + 1).toString().padStart(2, '0') }}</span>
                      <span class="type-body-md text-muted">{{ point | loc }}</span>
                    </li>
                  }
                </ol>
              </section>
            </div>
          </div>

          @if (next(); as next) {
            <footer class="border-t border-line bg-surface">
              <div class="container-editorial py-16">
                <p class="type-label-md uppercase text-subtle">{{ t().project.next }}</p>
                <div class="mt-6 max-w-xl">
                  <app-project-card [project]="next.project" [index]="next.number" />
                </div>
              </div>
            </footer>
          }
        </article>
      }
    }
  `,
})
export class ProjectDetailPage {
  /** Bound from the `:slug` route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  private readonly content = inject(CONTENT_REPOSITORY);
  private readonly language = inject(LanguageService);
  protected readonly t = this.language.t;

  protected readonly state = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) => this.content.getProject(slug)),
      map((project) => ({ project })),
    ),
  );
  private readonly projects = toSignal(this.content.getProjects(), { initialValue: [] });

  private readonly position = computed(() =>
    this.projects().findIndex((p) => p.slug === this.state()?.project?.slug),
  );
  protected readonly number = computed(() => String(this.position() + 1).padStart(2, '0'));
  protected readonly next = computed(() => {
    const list = this.projects();
    const index = this.position();
    if (index < 0 || list.length < 2) {
      return null;
    }
    const nextIndex = (index + 1) % list.length;
    return { project: list[nextIndex], number: String(nextIndex + 1).padStart(2, '0') };
  });

  constructor() {
    const router = inject(Router);
    const meta = inject(PageMetaService);
    effect(() => {
      const state = this.state();
      if (!state) {
        return;
      }
      if (!state.project) {
        void router.navigate(['/']);
        return;
      }
      meta.set(this.language.localize(state.project.name));
    });
  }
}
