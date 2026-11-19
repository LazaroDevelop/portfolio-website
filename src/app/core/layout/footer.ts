import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ExternalLinkDirective } from '../../shared/ui';
import { CONTENT_REPOSITORY } from '../data';
import { LanguageService } from '../i18n';

@Component({
  selector: 'app-footer',
  imports: [ExternalLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-t border-line bg-surface' },
  template: `
    @if (profile(); as profile) {
      <div
        class="container-editorial flex flex-col gap-4 py-8 type-label-md uppercase text-subtle md:flex-row md:items-center md:justify-between"
      >
        <span>© {{ year }} {{ profile.name }}</span>
        <span>{{ t().footer.built }}</span>
        <div class="flex gap-5">
          <a appExternal [href]="profile.github" class="hover:text-ink">GitHub</a>
          <a appExternal [href]="profile.linkedin" class="hover:text-ink">LinkedIn</a>
        </div>
      </div>
    }
  `,
})
export class FooterComponent {
  protected readonly t = inject(LanguageService).t;
  protected readonly profile = toSignal(inject(CONTENT_REPOSITORY).getProfile());
  protected readonly year = new Date().getFullYear();
}
