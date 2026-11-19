import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio.theme';

/** Browser chrome color: matches the header, which is navy in light mode and white in dark mode. */
const THEME_COLOR: Record<Theme, string> = { light: '#0f172a', dark: '#ffffff' };

/**
 * Active color theme. `index.html` sets `data-theme` before Angular boots (no flash); this service
 * picks that value up, keeps `<html data-theme>`, the theme-color meta tag and localStorage in sync.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>(
    this.document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light',
  );

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.document.documentElement.dataset['theme'] = theme;
      this.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLOR[theme]);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        // Storage unavailable (private mode): the theme just won't persist.
      }
    });
  }

  toggle(): void {
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }
}
