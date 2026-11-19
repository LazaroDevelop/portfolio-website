<div align="center">

# Lazaro Guerra · Portfolio

**Personal portfolio of a Java backend engineer** — Java, Spring Boot, Kafka, PostgreSQL and AWS.<br/>
Built with Angular 20 and Tailwind CSS v4, bilingual (ES / EN), deployed to GitHub Pages.

[![Live site](https://img.shields.io/badge/live-lazarodevelop.github.io-0f172a?style=for-the-badge&logo=githubpages&logoColor=white)](https://lazarodevelop.github.io/portfolio-website/)

[![CI](https://github.com/LazaroDevelop/portfolio-website/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/LazaroDevelop/portfolio-website/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/LazaroDevelop/portfolio-website/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/LazaroDevelop/portfolio-website/actions/workflows/deploy-pages.yml)
![Angular](https://img.shields.io/badge/Angular-20-dd0031?logo=angular&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-22_LTS-5fa04e?logo=nodedotjs&logoColor=white)

<br/>

<img src="docs/screenshots/desktop-home.webp" alt="Portfolio home page on desktop" width="100%"/>

</div>

---

## Preview

### Mobile

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/mobile-home.webp" alt="Home on mobile" width="240"/><br/><sub>Home</sub></td>
    <td align="center"><img src="docs/screenshots/mobile-stack.webp" alt="Tech stack on mobile" width="240"/><br/><sub>Tech stack</sub></td>
    <td align="center"><img src="docs/screenshots/mobile-projects.webp" alt="Projects on mobile" width="240"/><br/><sub>Projects</sub></td>
    <td align="center"><img src="docs/screenshots/mobile-contact.webp" alt="Contact form on mobile" width="240"/><br/><sub>Contact</sub></td>
  </tr>
</table>

### Desktop

| Tech stack | Projects on GitHub |
| :---: | :---: |
| <img src="docs/screenshots/desktop-stack.webp" alt="Tech stack section" /> | <img src="docs/screenshots/desktop-projects.webp" alt="Projects section" /> |
| **Project case study** | **Contact form** |
| <img src="docs/screenshots/desktop-project.webp" alt="Project case study page" /> | <img src="docs/screenshots/desktop-contact.webp" alt="Contact section with form" /> |

---

## Highlights

- **Editorial design system.** "Technical Editorial" style from [`DESIGN.md`](DESIGN.md): Space Grotesk, Geist and Space Mono, hairline grids, a navy and red palette.
- **Animated network backgrounds.** A canvas mesh of nodes and links behind each section, in a different color per section. It pauses off-screen and respects `prefers-reduced-motion`.
- **Bilingual (ES / EN).** A typed UI dictionary plus localized content. The language is detected from the browser and remembered.
- **Real content.** Experience, projects, certifications and official technology logos, all kept as typed data.
- **Project case studies.** Each `/projects/:slug` page has a metadata sidebar and a narrative column, with direct links to the GitHub repositories.
- **Working contact form.** Messages are delivered by e-mail through [Web3Forms](https://web3forms.com), with validation and a honeypot against bots.
- **Motion with care.** Scroll reveals, metric counters and hover micro-interactions, all disabled under reduced motion.
- **Ready for a backend.** Pages read content and send messages through injection tokens, so an HTTP backend can replace the static data by changing one provider.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Angular 20: standalone components, signals, zoneless change detection, OnPush, lazy-loaded routes |
| Styling | Tailwind CSS v4 (`@theme` tokens), self-hosted fonts via `@fontsource` |
| Icons | Official [devicon](https://devicon.dev) logos, [Lucide](https://lucide.dev) line icons |
| Forms | Angular Reactive Forms + Web3Forms |
| Quality | angular-eslint, Karma + Jasmine (headless Chrome, coverage) |
| CI/CD | GitHub Actions → GitHub Pages |
| Workflow | git flow (feature, release and hotfix branches) |

## Architecture

```text
src/app
├── content/          # All real portfolio content as typed data (profile, stack, experience, projects, certifications)
├── core/
│   ├── data/         # CONTENT_REPOSITORY token + StaticContentRepository
│   ├── contact/      # CONTACT_GATEWAY token + Web3Forms implementation and config
│   ├── i18n/         # LanguageService, typed ES/EN dictionaries, `loc` and `monthYear` pipes
│   ├── layout/       # Header, footer, per-page <title>/meta
│   └── models/       # Content interfaces
├── shared/ui/        # Reusable presentational pieces: button, badge, card, avatar, icons,
│                     # project card, network background, reveal and count-up directives
└── features/         # Lazy-loaded feature "modules", each with its own *.routes.ts
    ├── home/         # Home page made of section components (hero, stack, experience, projects…)
    └── projects/     # /projects/:slug case study page
```

```mermaid
flowchart LR
  subgraph Features
    H[Home page] --> S[Section components]
    P[Project page]
  end
  S & P --> UI[shared/ui]
  S & P --> R[(CONTENT_REPOSITORY)]
  S --> G[(CONTACT_GATEWAY)]
  R --> SR[StaticContentRepository<br/>content/*.data.ts]
  G --> W[Web3FormsContactGateway] --> M[E-mail inbox]
  R -. future .-> API[HTTP backend]
```

## Getting started

**Prerequisites:** Node.js **22 LTS** (Angular 20 needs ≥ 20.19 and does not support Node 26) and npm.

```bash
git clone https://github.com/LazaroDevelop/portfolio-website.git
cd portfolio-website
npm ci
npm start            # http://localhost:4200
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Dev server with live reload on `http://localhost:4200` |
| `npm run build` | Production build into `dist/portfolio-website/browser` |
| `npm run build:pages` | Production build with base href `/portfolio-website/` for GitHub Pages |
| `npm run lint` | Lint TypeScript and templates with angular-eslint |
| `npm test` | Unit tests in watch mode (Karma) |
| `npm run test:ci` | Single headless test run with coverage report in `coverage/` |

Run a single spec:

```bash
npx ng test --watch=false --browsers=ChromeHeadless --include src/app/core/i18n/language.service.spec.ts
```

## Customizing

- **Content:** edit the files in [`src/app/content`](src/app/content). Every visible text is a `{ es, en }` pair.
- **UI strings:** [`core/i18n/dictionaries/es.ts`](src/app/core/i18n/dictionaries/es.ts) defines the dictionary shape, and `en.ts` must match it. The compiler checks this.
- **Technology logos:** add the SVG to `public/icons/` and reference it by file name in `stack.data.ts`.
- **Contact form:** set your Web3Forms access key in [`core/contact/contact.config.ts`](src/app/core/contact/contact.config.ts). The key is public by design. While it's empty, the form shows a "not active yet" notice and sends nothing.
- **Design tokens:** colors, fonts, shadows and type scale live in [`src/styles.css`](src/styles.css).

## CI/CD

| Workflow | Trigger | Steps |
| --- | --- | --- |
| [`ci.yml`](.github/workflows/ci.yml) | Push to `develop`, `feature/**`, `release/**`, `hotfix/**`; PRs into `develop` / `main` | Lint → unit tests (headless Chrome) → production build → coverage artifact |
| [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) | Push to `main`, manual dispatch | Same checks → `build:pages` → SPA `404.html` fallback → deploy to GitHub Pages |

```mermaid
flowchart LR
  F[feature/*] -->|merge| D[develop]
  D -->|release branch| R[release/x.y.z]
  R -->|pull request| M[main]
  F & D & R -. CI .-> CI{{Lint · Test · Build}}
  M -->|push| DP{{Deploy workflow}} --> GP[(GitHub Pages)]
```

GitHub Pages has no server-side rewrites. The deploy publishes `index.html` again as `404.html`, so a deep link such as `/projects/rag-ai-assistant` loads the app, which then handles the route in the browser.

## Branching

This repository follows **git flow**:

- `feature/*` branches are merged into `develop` with `--no-ff` and are **kept** as history.
- Releases are cut from `develop` into a `release/x.y.z` branch, which is merged into `main` through a pull request.
- Every release is tagged without a `v` prefix (`1.0.0`, `1.1.0`, …).
- Merging into `main` publishes the site automatically.

## Author

**Lazaro Noel Guerra Medina**, Backend Engineer · Montevideo, Uruguay

[![GitHub](https://img.shields.io/badge/GitHub-LazaroDevelop-181717?logo=github)](https://github.com/LazaroDevelop)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-lazarogm13-0a66c2?logo=linkedin)](https://www.linkedin.com/in/lazarogm13)
[![Portfolio](https://img.shields.io/badge/Portfolio-visit-dc2626)](https://lazarodevelop.github.io/portfolio-website/)
