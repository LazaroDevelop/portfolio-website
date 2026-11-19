import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NetworkBackgroundComponent } from './network-background';

@Component({
  imports: [NetworkBackgroundComponent],
  template: `<section style="position: relative; width: 400px; height: 300px"><app-network-bg /></section>`,
})
class HostComponent {}

describe('NetworkBackgroundComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('sizes its canvas to the parent, stays decorative and cleans up on destroy', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
    await fixture.whenStable();

    const host = (fixture.nativeElement as HTMLElement).querySelector('app-network-bg') as HTMLElement;
    const canvas = host.querySelector('canvas') as HTMLCanvasElement;
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(canvas.width).toBeGreaterThanOrEqual(400);
    expect(canvas.height).toBeGreaterThanOrEqual(300);

    const cancel = spyOn(window, 'cancelAnimationFrame').and.callThrough();
    fixture.destroy();
    expect(cancel).toHaveBeenCalled();
  });
});
