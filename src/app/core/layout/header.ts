import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ButtonDirective, ExternalLinkDirective } from '../../shared/ui';
import { CONTENT_REPOSITORY } from '../data';
import { LanguageService } from '../i18n';
import { Lang } from '../models';

type NavKey = 'stack' | 'experience' | 'projects' | 'certifications' | 'contact';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ButtonDirective, ExternalLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sticky top-0 z-40 block border-b border-line bg-canvas/85 backdrop-blur-md' },
  template: `
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2"
    >
      {{ t().nav.skip }}
    </a>
    @if (profile(); as profile) {
    <div class="container-editorial flex h-16 items-center justify-between gap-6">
      <a routerLink="/" class="flex items-center gap-3" [attr.aria-label]="profile.name">
        <span
          class="grid size-8 place-items-center rounded-xs bg-ink type-label-md font-bold text-white"
          aria-hidden="true"
        >
          {{ profile.initials }}
        </span>
        <span class="hidden type-headline-sm text-ink sm:inline">Lazaro Guerra</span>
      </a>

      <nav class="hidden items-center gap-7 lg:flex" aria-label="Main">
        @for (key of navKeys; track key) {
          <a
            routerLink="/"
            [fragment]="key"
            class="type-label-md uppercase text-muted transition-colors hover:text-ink"
          >
            {{ t().nav[key] }}
          </a>
        }
      </nav>

      <div class="flex items-center gap-3">
        <div
          class="flex rounded-xs border border-line-strong p-0.5"
          role="group"
          [attr.aria-label]="t().nav.language"
        >
          @for (code of langs; track code) {
            <button
              type="button"
              class="cursor-pointer rounded-xs px-2 py-1 type-label-sm uppercase transition-colors"
              [class]="language.lang() === code ? 'bg-ink text-white' : 'text-muted hover:text-ink'"
              [attr.aria-pressed]="language.lang() === code"
              (click)="language.set(code)"
            >
              {{ code }}
            </button>
          }
        </div>
        <a appButton appExternal [href]="profile.github" class="!px-3 !py-1.5">
          <img src="icons/github.svg" alt="" class="size-4 invert" />
          <span class="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </div>
    }
  `,
})
export class HeaderComponent {
  protected readonly language = inject(LanguageService);
  protected readonly t = this.language.t;
  protected readonly profile = toSignal(inject(CONTENT_REPOSITORY).getProfile());
  protected readonly navKeys: NavKey[] = ['stack', 'experience', 'projects', 'certifications', 'contact'];
  protected readonly langs: Lang[] = ['es', 'en'];
}
