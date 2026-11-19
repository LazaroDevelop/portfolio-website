import { Directive } from '@angular/core';

/** Opens a link in a new tab safely: `<a appExternal href="...">`. */
@Directive({
  selector: 'a[appExternal]',
  host: { target: '_blank', rel: 'noopener noreferrer' },
})
export class ExternalLinkDirective {}
