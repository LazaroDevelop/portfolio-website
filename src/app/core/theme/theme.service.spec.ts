import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

describe('ThemeService', () => {
  let meta: HTMLMetaElement;

  beforeEach(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    delete document.documentElement.dataset['theme'];
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
  });

  afterEach(() => {
    meta.remove();
    localStorage.removeItem(THEME_STORAGE_KEY);
    delete document.documentElement.dataset['theme'];
  });

  it('starts light and toggles to dark, syncing <html>, theme-color and storage', () => {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');

    service.toggle();
    TestBed.tick();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(meta.content).toBe('#ffffff');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('picks up the theme applied by the inline script in index.html', () => {
    document.documentElement.dataset['theme'] = 'dark';
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('dark');
  });
});
