# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

This is a personal portfolio website that hasn't been built yet. The only file so far is `DESIGN.md`. There is no framework, package manager, build, lint or test setup. Once a stack is chosen, add its commands here.

## Design system (`DESIGN.md`)

`DESIGN.md` sets the visual language ("Technical Editorial"). All UI work should follow it. It has two parts:

- **YAML front matter**: design tokens for `colors` (Material 3-style role names such as `surface`, `on-surface`, `primary-container`), `typography`, `rounded` and `spacing`. If a token-driven setup is used (e.g. Tailwind theme, CSS custom properties), generate it from these.
- **Prose sections**: brand intent, layout grid, elevation, shapes and component specs (buttons, telemetry badges, cards, inputs, code blocks, selection controls).

Key rules from the prose:
- Fonts: **Space Grotesk** for headlines, **Geist** for body text (line height 1.7–1.8), **Space Mono** for labels and metadata (uppercase for statuses).
- Use the red accent sparingly. It is only for live pings, active chips, thin highlight rules and featured-card top borders, never for large surfaces.
- Show depth with 1px hairline borders, tonal contrast and very faint shadows rather than heavy drop shadows. Exact shadow values are in "Elevation & Depth".
- Grid: 12 columns on desktop (max width 1320px, 40px gutters, 64px margins, 4-column metadata sidebar + 8-column reading rail), 8 columns on tablet (768–1199px), 4 columns on mobile (<768px).
- Corner radius: 4px for base components, 8px for code and asset frames, 2px or square for badges.

**Known inconsistency:** the hex values in the prose (Tailwind slate/red: `#f8fafc`, `#0f172a`, `#dc2626`, `#e2e8f0`…) do not match the front-matter tokens (`surface: #f7f9fb`, `primary: #000000`, `secondary: #bb0112`…). Ask the user which source wins before setting up theme tokens.
