import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Lang, Localized } from '../models';
import { en } from './dictionaries/en';
import { Dictionary, es } from './dictionaries/es';

const STORAGE_KEY = 'portfolio.lang';
const DICTIONARIES: Record<Lang, Dictionary> = { es, en };

function readStoredLang(): Lang | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'es' || value === 'en' ? value : null;
  } catch {
    return null;
  }
}

/** Active UI language. Read `t()` for UI strings and `localize()` for content. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  readonly lang = signal<Lang>(readStoredLang() ?? this.detectBrowserLang());
  readonly t = computed(() => DICTIONARIES[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.document.documentElement.lang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Storage unavailable (private mode): language just won't persist.
      }
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  localize(text: Localized): string {
    return text[this.lang()];
  }

  private detectBrowserLang(): Lang {
    const nav = this.document.defaultView?.navigator;
    return nav?.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
  }
}
