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
npm run test:ci           # Karma + Jasmine, single run in ChromeHeadlessCI (--no-sandbox) + coverage
npm run build:pages       # production build with base href /portfolio-website/ (GitHub Pages)
npx ng test --watch=false --browsers=ChromeHeadless --include src/app/core/i18n/language.service.spec.ts   # one spec
```

## Git workflow

Use git flow (AVH). Run `git flow feature start <name>` before each piece of work. Finish it with `git flow feature finish -k --no-ff <name>`. **Keep feature branches; never delete them.** `develop` is the integration branch and `main` is for releases. Releases are tagged without a `v` prefix (`1.1.0`). Release branches are kept too.

`git flow release start` refuses while an old `release/*` branch exists, so releases are done by hand with the same steps. Pushing `main` triggers the Pages deploy.

```bash
git checkout -b release/X.Y.Z develop && npm pkg set version=X.Y.Z && git commit -am "chore(release): X.Y.Z"
git checkout main && git merge --no-ff --no-edit release/X.Y.Z && git tag -a X.Y.Z -m "Release X.Y.Z"
git checkout develop && git merge --no-ff --no-edit X.Y.Z
git push origin main develop release/X.Y.Z X.Y.Z
```

The remote is `origin` (github.com/LazaroDevelop/portfolio-website). This repo's git config pins `credential.https://github.com.username` to `LazaroDevelop`, so pushes don't ask which account to use. Push every branch, including features.

## CI/CD (`.github/workflows`)

- `ci.yml` runs lint, `test:ci` and a production build on pushes to `develop`, `feature/**`, `release/**` and `hotfix/**`, and on PRs into `develop` and `main`.
- `deploy-pages.yml` runs on every push to `main` (a git flow release or hotfix) and on manual dispatch. It runs the same checks, then:
  - builds with `build:pages`;
  - copies `index.html` to `404.html` (SPA fallback for deep links such as `/projects/<slug>`) and adds `.nojekyll`;
  - deploys to https://lazarodevelop.github.io/portfolio-website/ with `actions/deploy-pages`.
- The repository's Settings → Pages → Source must be **GitHub Actions**.

Asset paths in templates are relative (`icons/…`, `images/…`) so they resolve against the base href. Keep it that way: a leading `/` breaks the Pages subpath.

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

**Light/dark theme.** `ThemeService` (`core/theme`) toggles `<html data-theme="dark">` from the header's sun/moon button. It also persists the choice to localStorage and syncs the theme-color meta. An inline script in `index.html` applies the saved theme before first paint.

The dark theme is the light one inverted. `[data-theme='dark']` in `styles.css` redefines the palette, so the page goes navy while the **inverse surfaces** turn white: the header (`.header-surface`), the contact band and primary buttons. Inverse surfaces must use `bg-ink` + `text-on-ink` (and `ink-deep` / `ink-blue` for the header gradient), never literal `white` or navy.

Use `dark:` utilities (custom variant) only for things tokens can't express:
- the dark GitHub/LinkedIn SVGs: `dark:invert` on light backgrounds, `invert dark:invert-0` inside primary buttons;
- logos flagged `invertOnDark` in `stack.data.ts`.

Angular can't bind class names with a colon (`[class.dark:invert]` silently does nothing), so use a `[class]="cond ? 'dark:…' : ''"` string instead.

`prefers-reduced-motion` disables all motion.

The profile photo lives in `public/images/profile-{800,160}.webp` with a `.jpg` fallback. It was cropped once with sharp, which is not kept as a dependency.

When previewing in the Claude browser pane while it's hidden, animations and IntersectionObserver don't run. To inspect the final state, call `document.getAnimations()` + `.finish()` and add `is-visible` to the `.reveal` elements.

Use the red accent sparingly: status dots, small labels and the 2px top rule on featured cards. Never use it on large surfaces.

Technology logos are the official devicon SVGs, copied into `public/icons/` (the devicon package is not a dependency). Reference them by file name without `.svg`, e.g. `java-original`.
