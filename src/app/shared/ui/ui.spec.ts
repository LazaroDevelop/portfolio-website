import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar';
import { CountUpDirective } from './count-up.directive';
import { RevealDirective } from './reveal.directive';

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

/** IntersectionObserver stub that reports every observed element as visible. */
class VisibleObserver {
  constructor(private readonly callback: ObserverCallback) {}
  observe(): void {
    queueMicrotask(() => this.callback([{ isIntersecting: true }]));
  }
  disconnect(): void {
    // no-op
  }
}

@Component({
  imports: [AvatarComponent, CountUpDirective, RevealDirective],
  template: `
    <app-avatar src="images/a.webp" fallback="images/a.jpg" alt="Profile photo" size="lg" [online]="true" />
    <span id="metric" appCountUp="+50%" [countDuration]="0">+50%</span>
    <span id="text" appCountUp="8 → 21" [countDuration]="0">8 → 21</span>
    <div id="reveal" appReveal></div>
  `,
})
class HostComponent {}

describe('shared ui', () => {
  let original: typeof IntersectionObserver;

  beforeEach(() => {
    original = window.IntersectionObserver;
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = VisibleObserver;
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    });
  });

  afterEach(() => (window.IntersectionObserver = original));

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve));
    return fixture.nativeElement as HTMLElement;
  }

  it('avatar renders the photo with its alt text and webp source', async () => {
    const el = await render();
    const img = el.querySelector('app-avatar img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('images/a.jpg');
    expect(img.alt).toBe('Profile photo');
    expect(el.querySelector('app-avatar source')?.getAttribute('srcset')).toBe('images/a.webp');
  });

  it('count-up ends on the final value and leaves non-numeric values untouched', async () => {
    const el = await render();
    expect(el.querySelector('#metric')?.textContent).toBe('+50%');
    expect(el.querySelector('#text')?.textContent).toBe('8 → 21');
  });

  it('reveal marks the element visible once it intersects', async () => {
    const el = await render();
    const target = el.querySelector('#reveal') as HTMLElement;
    expect(target.classList).toContain('reveal');
    expect(target.classList).toContain('is-visible');
  });
});
