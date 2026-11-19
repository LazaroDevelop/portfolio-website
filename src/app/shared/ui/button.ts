import { Directive, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'outline' | 'critical' | 'inverse';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 type-body-md font-medium ' +
  'border transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-on-ink border-ink hover:bg-ink-soft hover:border-control',
  outline: 'bg-transparent text-ink border-line-strong hover:bg-surface hover:border-ink',
  critical: 'bg-transparent text-accent border-accent hover:bg-accent hover:text-on-ink',
  /** For inverse (ink) surfaces such as the header and the contact band. */
  inverse: 'bg-on-ink text-ink border-on-ink hover:bg-well hover:border-well',
};

/** Applies DESIGN.md button styles to an `<a>` or `<button>`: `<a appButton variant="outline">`. */
@Directive({
  selector: 'a[appButton], button[appButton]',
  host: { '[class]': 'classes()' },
})
export class ButtonDirective {
  readonly variant = input<ButtonVariant>('primary');
  protected readonly classes = computed(() => `${BASE} ${VARIANTS[this.variant()]}`);
}
