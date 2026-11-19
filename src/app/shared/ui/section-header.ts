import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Section heading: mono index + label above a Space Grotesk title, closed by a hairline rule. */
@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="flex items-center gap-3 type-label-md uppercase text-subtle">
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
}
