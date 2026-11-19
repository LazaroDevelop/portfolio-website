# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static personal portfolio for Lazaro Guerra (Java backend engineer). Its main purpose is to send visitors to GitHub and the projects there. Built with Angular 20 (standalone, signals, zoneless, OnPush) and Tailwind CSS v4. There is no backend. Content is bilingual (ES/EN).

Requires Node ≥ 20.19 (Node 22 is installed). Node 26 is not supported by Angular 20.

## Commands

```bash
npm start                 # ng serve on http://localhost:4200
npm run build             # production build → dist/portfolio-website
npm run lint              # angular-eslint
npm run test:ci           # Karma + Jasmine, single run in ChromeHeadless
npx ng test --watch=false --browsers=ChromeHeadless --include src/app/core/i18n/language.service.spec.ts   # one spec
```

## Git workflow

Use git flow (AVH). Run `git flow feature start <name>` before each piece of work. Finish it with `git flow feature finish -k --no-ff <name>`. **Keep feature branches; never delete them.** `develop` is the integration branch and `main` is for releases.

## Architecture (`src/app`)

- `content/*.data.ts`: **all real portfolio content** (profile, stack, experience, projects, certifications) as typed data. Edit these to change what the site says. Every user-facing string is a `Localized` (`{ es, en }`).
- `core/models`: content interfaces (`Profile`, `Project`, `Experience`…).
- `core/data`: the `CONTENT_REPOSITORY` token and its `ContentRepository` interface, implemented by `StaticContentRepository` (bound in `app.config.ts`). Pages and layout read content **only** through this token (`toSignal(repo.getX())`). To add a backend later, write an HTTP implementation and swap the provider.
- `core/i18n`:
  - `LanguageService` holds the `lang` signal, persisted to localStorage, and keeps `<html lang>` in sync.
  - `t()` returns the typed UI dictionary. `dictionaries/es.ts` defines its shape and `en.ts` must match.
  - The `loc` pipe resolves `Localized` content and `monthYear` formats `YYYY-MM` dates. Both pipes are impure on purpose so they re-render when the language changes.
- `core/contact`: delivers the contact form through the `CONTACT_GATEWAY` token.
  - The implementation is `Web3FormsContactGateway`, which POSTs to Web3Forms. Web3Forms emails the inbox tied to the access key (the owner's Gmail).
  - Set the key in `contact.config.ts`. It's public by design and safe to commit. While it's empty, the form shows a "not active yet" message and sends nothing.
  - A future backend only needs a new gateway bound in `app.config.ts`.
  - The form (`features/home/sections/contact-form.ts`) is reactive, validates its fields and has a `botcheck` honeypot.
- `core/layout`: header (nav anchors and ES/EN toggle), footer, and `PageMetaService` (title and description per page and language).
- `shared/ui`: presentational primitives with no data access:
  - the `appButton` directive (primary/outline/critical/inverse) and the `appExternal` directive (target=_blank + noopener)
  - `app-badge`, `app-card`, `app-section-header`, `app-tech-icon`, `app-project-card` and `app-avatar`
  - `app-icon`: Lucide line icons, referenced by name. Register new icons in the `ICONS` map in `icon.ts`; content data uses those names (`Metric.icon`).
  - `appReveal` (fade-up on scroll, with an optional `revealDelay` stagger) and `appCountUp` (metric counters). Both use IntersectionObserver and render the final state when motion is reduced or no observer exists.
- `features/<name>/`: lazy-loaded feature "modules". Each exposes a `*.routes.ts` used by `app.routes.ts`.
  - `home`: one page made of section components in `sections/`. Section `id`s (`stack`, `experience`, `projects`, `certifications`, `contact`) are the header's anchor targets.
  - `projects`: `/projects/:slug` case study. The slug is bound via `withComponentInputBinding` and an unknown slug redirects to `/`.

## Design system

`DESIGN.md` (exported from Stitch) is the visual spec. **The palette comes from the DESIGN.md prose values** (slate/white canvas, navy `#0f172a` ink, red `#dc2626` accent), not the YAML front-matter colors. Tokens live in `src/styles.css`:

- `@theme` colors: `canvas`, `surface`, `well`, `ink`, `muted`, `subtle`, `line`, `line-strong`, `accent`…
- fonts: `display` = Space Grotesk, `sans` = Geist, `mono` = Space Mono. All are self-hosted via `@fontsource`.
- shadows: `shadow-card` and `shadow-card-hover`
- type utilities: `type-display`, `type-headline-*`, `type-body-*` and `type-label-*`
- the `container-editorial` layout utility
- `.network-bg`: the mask and light-blue glow for `app-network-bg` (shared/ui), an animated canvas network graph behind every home section and the project header. Its color is per section: green for Stack, yellow for Certifications, light blue for Contact and blue elsewhere. The parent needs `relative isolate overflow-hidden`. The graph pauses off-screen and draws one still frame under reduced motion.
- `animate-fade-up`, `animate-float` and `animate-rocket`, plus the `.reveal` styles

`prefers-reduced-motion` disables all motion.

The profile photo lives in `public/images/profile-{800,160}.webp` with a `.jpg` fallback. It was cropped once with sharp, which is not kept as a dependency.

When previewing in the Claude browser pane while it's hidden, animations and IntersectionObserver don't run. To inspect the final state, call `document.getAnimations()` + `.finish()` and add `is-visible` to the `.reveal` elements.

Use the red accent sparingly: status dots, small labels and the 2px top rule on featured cards. Never use it on large surfaces.

Technology logos are the official devicon SVGs, copied into `public/icons/` (the devicon package is not a dependency). Reference them by file name without `.svg`, e.g. `java-original`.
