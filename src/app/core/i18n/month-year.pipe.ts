import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';

/** Formats an ISO year-month (`2025-06`) as `jun 2025` / `Jun 2025` in the active language. */
@Pipe({ name: 'monthYear', pure: false })
export class MonthYearPipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(value: string): string {
    const [year, month] = value.split('-').map(Number);
    if (!year || !month) {
      return value;
    }
    const lang = this.language.lang();
    return new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(Date.UTC(year, month - 1, 1)))
      .replace('.', '');
  }
}
