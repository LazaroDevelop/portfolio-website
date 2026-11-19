import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub: boolean;
  phase: number;
}

const LINK_DISTANCE = 110;

/**
 * Animated network graph (nodes + links, like a service mesh) drawn on a canvas behind a section.
 * Nodes cluster towards the top-left corner and the layer fades out towards the bottom-right
 * (`.network-bg` mask in styles.css). The parent needs `relative isolate overflow-hidden`.
 * Pauses off-screen and renders a single still frame when the user prefers reduced motion.
 */
@Component({
  selector: 'app-network-bg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'network-bg pointer-events-none absolute inset-0 -z-10 block', 'aria-hidden': 'true' },
  template: `<canvas #canvas class="block size-full"></canvas>`,
})
export class NetworkBackgroundComponent {
  /** RGB triple, e.g. `59, 130, 246`. */
  readonly color = input('59, 130, 246');
  /** Multiplier for the number of nodes. */
  readonly density = input(1);

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const canvas = this.canvas().nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      let width = 0;
      let height = 0;
      let nodes: Node[] = [];
      let frame = 0;
      let visible = true;

      const seed = () => {
        const count = Math.round(
          Math.min(Math.max(((width * height) / 9000) * this.density(), 28), 150),
        );
        // Bias positions towards the top-left corner so the mesh is denser there.
        nodes = Array.from({ length: count }, () => {
          const hub = Math.random() < 0.08;
          return {
            x: width * Math.pow(Math.random(), 1.5),
            y: height * Math.pow(Math.random(), 1.5),
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: hub ? 2.4 : 1 + Math.random() * 0.8,
            hub,
            phase: Math.random() * Math.PI * 2,
          };
        });
      };

      const resize = () => {
        const rect = host.getBoundingClientRect();
        width = Math.max(rect.width, 1);
        height = Math.max(rect.height, 1);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seed();
        draw(0);
      };

      const draw = (time: number) => {
        const rgb = this.color();
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 0.7;
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);
            if (dist < LINK_DISTANCE) {
              ctx.strokeStyle = `rgba(${rgb}, ${(1 - dist / LINK_DISTANCE) * 0.35})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        for (const n of nodes) {
          ctx.fillStyle = `rgba(${rgb}, ${n.hub ? 0.9 : 0.6})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
          if (n.hub) {
            // Hubs "ping" like active services.
            const pulse = (Math.sin(time / 900 + n.phase) + 1) / 2;
            ctx.strokeStyle = `rgba(${rgb}, ${0.35 * (1 - pulse)})`;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + 3 + pulse * 6, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      };

      const step = (time: number) => {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
        draw(time);
        frame = requestAnimationFrame(step);
      };

      const start = () => {
        if (!reduced && visible && !frame) {
          frame = requestAnimationFrame(step);
        }
      };
      const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
      };

      const resizeObserver = new ResizeObserver(() => resize());
      resizeObserver.observe(host);
      resize();

      const io =
        typeof IntersectionObserver === 'undefined'
          ? undefined
          : new IntersectionObserver(([entry]) => {
              visible = entry.isIntersecting;
              if (visible) start();
              else stop();
            });
      io?.observe(host);
      start();

      destroyRef.onDestroy(() => {
        stop();
        resizeObserver.disconnect();
        io?.disconnect();
      });
    });
  }
}
