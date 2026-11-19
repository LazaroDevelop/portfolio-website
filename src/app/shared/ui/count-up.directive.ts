import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

const NUMERIC = /^(\D*)(\d+)(\D*)$/;

/**
 * Counts a metric up from 0 when it scrolls into view, keeping its prefix and suffix
 * (`+50%`, `−70%`, `5+`). Values that are not a single number (`8 → 21`) render as-is.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective {
  readonly appCountUp = input.required<string>();
  /** Animation length in ms; 0 renders the final value immediately. */
  readonly countDuration = input(1400);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    afterNextRender(() => {
      const value = this.appCountUp();
      el.textContent = value;
      const match = NUMERIC.exec(value);
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (!match || reduced || typeof IntersectionObserver === 'undefined') {
        return;
      }
      const [, prefix, digits, suffix] = match;
      const target = Number(digits);
      const duration = this.countDuration();
      const render = (n: number) => (el.textContent = `${prefix}${n}${suffix}`);

      const run = () => {
        if (duration <= 0) {
          render(target);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          render(Math.round(target * eased));
          if (t < 1) {
            frame = requestAnimationFrame(tick);
          }
        };
        frame = requestAnimationFrame(tick);
      };

      render(0);
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          run();
        }
      });
      observer.observe(el);
    });

    destroyRef.onDestroy(() => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    });
  }
}
