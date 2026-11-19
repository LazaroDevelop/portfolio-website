import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Official technology logo (SVG in public/icons) with its name in Space Mono. */
@Component({
  selector: 'app-tech-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col items-center gap-2.5' },
  template: `
    <img
      [src]="src()"
      [alt]="name() + ' logo'"
      [width]="size()"
      [height]="size()"
      class="object-contain transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-115"
      [style.width.px]="size()"
      [style.height.px]="size()"
      loading="lazy"
      decoding="async"
    />
    <span
      class="text-center uppercase text-muted transition-colors group-hover:text-ink"
      [class]="compact() ? 'type-label-sm' : 'type-label-md'"
    >
      {{ name() }}
    </span>
  `,
})
export class TechIconComponent {
  readonly name = input.required<string>();
  /** File name in public/icons without extension, e.g. `java-original`. */
  readonly icon = input.required<string>();
  readonly size = input(48);
  /** Smaller label, for the secondary tiles. */
  readonly compact = input(false);
  protected readonly src = computed(() => `icons/${this.icon()}.svg`);
}
