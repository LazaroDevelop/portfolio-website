import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { LocalizePipe } from './localize.pipe';
import { MonthYearPipe } from './month-year.pipe';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    localStorage.removeItem('portfolio.lang');
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(LanguageService);
  });

  afterEach(() => localStorage.removeItem('portfolio.lang'));

  it('switches dictionary and persists the choice', () => {
    service.set('en');
    TestBed.tick();
    expect(service.t().nav.experience).toBe('Experience');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('portfolio.lang')).toBe('en');

    service.set('es');
    TestBed.tick();
    expect(service.t().nav.experience).toBe('Experiencia');
  });

  it('localizes content and pipes follow the active language', () => {
    const loc = TestBed.runInInjectionContext(() => new LocalizePipe());
    const monthYear = TestBed.runInInjectionContext(() => new MonthYearPipe());

    service.set('en');
    expect(loc.transform({ es: 'Hola', en: 'Hello' })).toBe('Hello');
    expect(monthYear.transform('2025-06')).toBe('Jun 2025');

    service.set('es');
    expect(loc.transform({ es: 'Hola', en: 'Hello' })).toBe('Hola');
    expect(monthYear.transform('2025-06')).toBe('jun 2025');
  });
});
