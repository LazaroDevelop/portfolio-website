import { Pipe, PipeTransform, inject } from '@angular/core';
import { Localized } from '../models';
import { LanguageService } from './language.service';

/**
 * Resolves a `Localized` value to the active language: `{{ project.tagline | loc }}`.
 * Impure so it re-evaluates when the language signal changes (the signal read inside
 * `transform` is tracked by the template, which schedules the re-render).
 */
@Pipe({ name: 'loc', pure: false })
export class LocalizePipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(value: Localized): string {
    return this.language.localize(value);
  }
}
