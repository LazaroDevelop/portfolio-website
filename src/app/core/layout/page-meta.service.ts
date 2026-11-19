import { Injectable, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../i18n';

/**
 * Keeps <title> and meta description in sync with the active page and language.
 * Pages call `set(prefix)`; `null` falls back to the site title.
 */
@Injectable({ providedIn: 'root' })
export class PageMetaService {
  private readonly language = inject(LanguageService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly prefix = signal<string | null>(null);

  constructor() {
    effect(() => {
      const t = this.language.t();
      const prefix = this.prefix();
      this.title.setTitle(prefix ? `${prefix} · ${t.meta.title}` : t.meta.title);
      this.meta.updateTag({ name: 'description', content: t.meta.description });
    });
  }

  set(prefix: string | null): void {
    this.prefix.set(prefix);
  }
}
