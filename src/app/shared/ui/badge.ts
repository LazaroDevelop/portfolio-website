import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant = 'neutral' | 'active';

/** Telemetry badge (Space Mono label). `active` adds the pulsing red dot. */
@Component({
  selector: 'app-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex' },
  template: `
    <span
      class="inline-flex items-center gap-1.5 rounded-xs px-2 py-1 type-label-sm uppercase"
      [class]="
        variant() === 'active'
          ? 'border border-accent-line bg-accent-wash text-accent'
          : 'bg-well text-muted'
      "
    >
      @if (variant() === 'active') {
        <span class="relative flex size-1.5" aria-hidden="true">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60"></span>
          <span class="relative inline-flex size-1.5 rounded-full bg-accent"></span>
        </span>
      }
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('neutral');
}
