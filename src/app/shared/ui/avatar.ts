import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AvatarSize = 'sm' | 'lg';

/** Round profile photo with a hairline ring and an optional red "online" dot. */
@Component({
  selector: 'app-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative inline-flex shrink-0' },
  template: `
    <picture
      class="block overflow-hidden rounded-full ring-1 ring-offset-2"
      [class]="tone() === 'dark' ? 'ring-white/30 ring-offset-ink' : 'ring-line-strong ring-offset-canvas'"
    >
      @if (fallback()) {
        <source [srcset]="src()" type="image/webp" />
      }
      <img
        [src]="fallback() ?? src()"
        [alt]="alt()"
        [width]="px()"
        [height]="px()"
        [style.width.px]="px()"
        [style.height.px]="px()"
        class="block object-cover"
        [attr.loading]="size() === 'lg' ? 'eager' : null"
        decoding="async"
      />
    </picture>
    @if (online()) {
      <span
        class="absolute flex"
        [class]="size() === 'lg' ? 'bottom-3 right-3 size-4' : 'bottom-0 right-0 size-2.5'"
        aria-hidden="true"
      >
        <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50"></span>
        <span
          class="relative inline-flex size-full rounded-full border-2 bg-accent"
          [class]="tone() === 'dark' ? 'border-ink' : 'border-surface'"
        ></span>
      </span>
    }
  `,
})
export class AvatarComponent {
  readonly src = input.required<string>();
  /** Optional JPEG fallback when `src` is WebP. */
  readonly fallback = input<string>();
  readonly alt = input.required<string>();
  readonly size = input<AvatarSize>('sm');
  readonly online = input(false);
  /** Background the avatar sits on; adjusts the ring offset and the dot border. */
  readonly tone = input<'light' | 'dark'>('light');
  protected readonly px = computed(() => (this.size() === 'lg' ? 176 : 32));
}
