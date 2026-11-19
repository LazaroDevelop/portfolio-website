import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AvatarComponent, ButtonDirective, ExternalLinkDirective, IconComponent } from '../../shared/ui';
import { ThemeService } from '../theme';
import { CONTENT_REPOSITORY } from '../data';
import { LanguageService } from '../i18n';
import { Lang } from '../models';

type NavKey = 'stack' | 'experience' | 'projects' | 'certifications' | 'contact';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AvatarComponent, ButtonDirective, ExternalLinkDirective, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'header-surface sticky top-0 z-40 block text-on-ink backdrop-blur-md transition-shadow duration-300',
    '[class.shadow-card-hover]': 'scrolled()',
    '(window:scroll)': 'onScroll()',
  },
  template: `
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2 focus:text-ink"
    >
      {{ t().nav.skip }}
    </a>
    @if (profile(); as profile) {
    <div class="container-editorial flex h-16 items-center justify-between gap-6">
      <a routerLink="/" class="group flex items-center gap-3" [attr.aria-label]="profile.name">
        <app-avatar [src]="profile.photo.srcSmall" alt="" [online]="true" tone="dark" />
        <span class="hidden type-headline-sm text-on-ink sm:inline">Lazaro Guerra</span>
      </a>

      <nav class="hidden items-center gap-7 lg:flex" aria-label="Main">
        @for (key of navKeys; track key) {
          <a
            routerLink="/"
            [fragment]="key"
            class="group relative py-1 type-label-md uppercase text-control transition-colors hover:text-on-ink"
          >
            {{ t().nav[key] }}
            <span
              class="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
              aria-hidden="true"
            ></span>
          </a>
        }
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          class="group grid size-8 cursor-pointer place-items-center rounded-xs border border-on-ink/15 text-control transition-colors hover:border-on-ink/40 hover:text-on-ink"
          [attr.aria-label]="theme.theme() === 'dark' ? t().nav.themeLight : t().nav.themeDark"
          [attr.title]="theme.theme() === 'dark' ? t().nav.themeLight : t().nav.themeDark"
          (click)="theme.toggle()"
        >
          <app-icon
            [name]="theme.theme() === 'dark' ? 'sun' : 'moon'"
            [size]="15"
            class="transition-transform duration-500 group-hover:rotate-[20deg]"
          />
        </button>
        <div
          class="flex rounded-xs border border-on-ink/15 p-0.5"
          role="group"
          [attr.aria-label]="t().nav.language"
        >
          @for (code of langs; track code) {
            <button
              type="button"
              class="cursor-pointer rounded-xs px-2 py-1 type-label-sm uppercase transition-colors"
              [class]="language.lang() === code ? 'bg-on-ink text-ink' : 'text-control hover:text-on-ink'"
              [attr.aria-pressed]="language.lang() === code"
              (click)="language.set(code)"
            >
              {{ code }}
            </button>
          }
        </div>
        <a appButton variant="inverse" appExternal [href]="profile.github" class="!px-3 !py-1.5">
          <img src="icons/github.svg" alt="" class="size-4 dark:invert" />
          <span class="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </div>
    }
    <!-- Hairline accent: red into blue, fading out. -->
    <span
      class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,rgb(220_38_38/0.75),rgb(59_130_246/0.45)_45%,transparent)]"
      aria-hidden="true"
    ></span>
  `,
})
export class HeaderComponent {
  protected readonly language = inject(LanguageService);
  protected readonly t = this.language.t;
  protected readonly theme = inject(ThemeService);
  protected readonly profile = toSignal(inject(CONTENT_REPOSITORY).getProfile());
  protected readonly navKeys: NavKey[] = ['stack', 'experience', 'projects', 'certifications', 'contact'];
  protected readonly langs: Lang[] = ['es', 'en'];
  protected readonly scrolled = signal(false);

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
