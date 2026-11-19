import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent, IconName } from './icon';
import { RevealDirective } from './reveal.directive';

/** Section heading: icon + mono index + label above a Space Grotesk title, revealed on scroll. */
@Component({
  selector: 'app-section-header',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RevealDirective],
  host: { class: 'block' },
  template: `
    <div class="flex items-center gap-3 type-label-md uppercase text-subtle">
      @if (icon(); as icon) {
        <span
          class="grid size-7 place-items-center rounded-xs border border-accent-line bg-accent-wash text-accent"
        >
          <app-icon [name]="icon" [size]="15" />
        </span>
      }
      <span class="text-accent">{{ index() }}</span>
      <span class="h-px w-8 bg-line-strong" aria-hidden="true"></span>
      <span>{{ label() }}</span>
    </div>
    <h2 class="mt-4 type-headline-lg text-ink">{{ title() }}</h2>
    @if (lead()) {
      <p class="mt-4 max-w-2xl type-body-lg text-muted">{{ lead() }}</p>
    }
  `,
})
export class SectionHeaderComponent {
  readonly index = input.required<string>();
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input<string>();
  readonly icon = input<IconName>();
}
