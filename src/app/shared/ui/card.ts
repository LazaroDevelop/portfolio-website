import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * White card with hairline border and ambient shadow. On hover it lifts and a red rule draws
 * across the top; `featured` keeps the 2px red top rule visible.
 */
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'group/card relative flex flex-col overflow-hidden rounded-sm border border-line bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover',
  },
  template: `
    <span
      class="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent transition-transform duration-500 ease-out"
      [class]="featured() ? 'scale-x-100' : 'scale-x-0 group-hover/card:scale-x-100'"
      aria-hidden="true"
    ></span>
    <ng-content />
  `,
})
export class CardComponent {
  readonly featured = input(false);
}
