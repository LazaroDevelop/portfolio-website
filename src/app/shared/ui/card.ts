import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** White card with hairline border and ambient shadow. `featured` adds the 2px red top rule. */
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex flex-col rounded-sm border border-line bg-surface shadow-card transition-shadow duration-300 hover:shadow-card-hover',
    '[class.border-t-2]': 'featured()',
    '[class.border-t-accent]': 'featured()',
  },
  template: `<ng-content />`,
})
export class CardComponent {
  readonly featured = input(false);
}
