# Release Notes

This document lists new features, bug fixes and other changes implemented during a particular build (version or patch) of the Cody Skills documentation website.

The order of releases listed below is descending — the latest version or patch is always shown at the top.

- [v1.0.0 - Initial Creation](#v100---initial-creation---2026-05-20)

---

# v1.0.0 - Initial Creation - 2026-05-20

## Overview

First public release of the Cody Skills website. v1.0.0 launches a multi-skill documentation platform from day one: a marketing landing at `codyskills.ai/` showcasing the Cody Skills family, plus full Cody Product Builder documentation at `codyskills.ai/docs/cody-product-builder/`. The architecture is built around a data-driven skills layer so adding future skills (Cody Article Writer, Cody Skill Auditor) is a content-and-data diff rather than a rebuild.

## Key Features

- **Marketing landing page at `codyskills.ai/`.** Hero with "Agent Skills Created for Builders" headline + gradient accent, "works with" marquee listing supported AI environments, three side-by-side skill cards (Cody Product Builder live, Cody Article Writer + Cody Skill Auditor as Coming Soon), 3-column footer.
- **Cody Product Builder documentation (15 pages).** Overview, Installation, Quick Start, three Workflow pages (Plan Phase, Build Phase, Versions & Patches), six command reference pages (`:cody plan`, `:cody build`, `:cody prototype`, `:cody idea`, `:cody refresh`, `:cody help`), three Reference pages (Prototypes, Project Settings, Changelog).
- **Custom topbar on both surfaces.** Docs topbar shows brand + SkillSwitcher + Get Skill + search + GitHub + theme toggle. Marketing topbar shows brand + Skills dropdown + Documentation / Contact / iBuildWith.ai. Both honor the same brand identity (DM Sans, iBuildWith.ai green `#22c55e`, dark `#121212`).
- **Multi-skill data layer.** `src/skills/` is the single source of truth. The `Skill` type is a discriminated union (`AvailableSkill` for shipped skills, `ComingSoonSkill` for marketing-only entries) so coming-soon skills appear on the landing but have no docs surface. Three skills modeled at launch: CPB (available, v2.1.0), Cody Article Writer (coming-soon), Cody Skill Auditor (coming-soon).
- **Skill downloads.** Cody Product Builder's `.zip` and `.skill` artifacts are served from `public/skills/cody-product-builder/downloads/` and accessible via the docs topbar's Get Skill icon button.
- **Per-skill SVG illustrations.** Custom iBuildWith.ai-style illustrations for each skill (`public/skills/<id>/images/`) used on the marketing landing's full-width skill rows.
- **Brand logo and favicon.** Single source robot-mark logo at `public/images/cody-skills-logo.png`, used as both the topbar brand image (docs + marketing) and the production favicon.
- **Mobile responsive.** Hamburger drawer on the marketing landing; Starlight's built-in mobile drawer on the docs site. Topbar controls collapse cleanly at ≤768px; cards stack to a single column.
- **Production deploy.** GitHub Actions workflow (`upload-pages-artifact@v5` + `deploy-pages@v5`, Node 24) deploys to GitHub Pages on every push to `main`. Custom domain `codyskills.ai` configured via `public/CNAME`, DNS at Namecheap pointing at GitHub Pages.

## Enhancements

- **Data-driven topbar Skills dropdown.** Lists all three skills on both surfaces, with live ones linked and coming-soon ones greyed out. Single rendering pattern reused across docs and marketing.
- **Centralized site config (`src/site-config.ts`).** Contact email and parent-brand URL exported as constants. Single-line edit propagates to topbar Contact link, mobile drawer, footer, and the per-skill "Notify me" mailto on coming-soon cards.
- **Designed-on-prototype workflow.** Two `:cody prototype` runs settled the visual identity (`design-chooser` for the docs site, `marketing-landing-page` for the home page) in throwaway HTML before any Astro code was written. Both prototypes retained in `docs/prototypes/` for reference.
- **CSS token system.** `theme.css` exposes typography (`--sl-text-*`), tracking (`--cs-tracking-*`), weight (`--cs-fw-*`), and color tokens. Components consume tokens rather than hardcoded values, so global rhythm is tunable from one file.
- **Coming-soon Notify-me CTA.** Each Coming Soon skill card includes a `mailto:` link with the skill name pre-filled in the subject, capturing visitor interest with zero backend infrastructure.
- **External-link arrow on parent-brand links.** "iBuildWith.ai ↗" in topbar and footer signals that the link leaves the Cody Skills site, without needing extra "by" prose.

## Bug Fixes

- **Icon-letter bug.** SkillSwitcher and marketing dropdown initially showed "C / C / C" for all three Cody skills (`name.charAt(0)` always returned "C"). Replaced with a `getSkillIconLetter(skill)` helper that returns the first letter of the second word, yielding "P / A / S".
- **Topbar / sidebar borders missing.** Restored after an earlier `--sl-color-hairline-shade` override had set the variable to the background color (`#121212`), making the borders invisible. Reset to `#2a2a2a` to make them visible against the dark page.
- **Content-panel separator border (post-fix).** Restoring `--sl-color-hairline-shade` revealed a separator between the page-title content-panel and the body content-panel. Suppressed with a targeted `.content-panel + .content-panel { border-top: 0 }` rule.
- **Doubled vertical spacing around the version badge.** Starlight's `.sl-container > * + *` rule added 24px margin-top between siblings, on top of each component's existing margin-bottom, doubling the breadcrumb-to-badge and badge-to-H1 gaps. Reset `margin-top` to 0 on the version badge and H1 inside the content panel.
- **Marketing landing brand text rendering heavier than docs.** Starlight applies `-webkit-font-smoothing: antialiased` globally inside its surface; the raw Astro landing page didn't. Same font/weight/size rendered visibly heavier on the landing due to subpixel rendering. Added both font-smoothing rules to the landing's body.
- **Hardcoded `v2.1.0` in the CPB illustration SVG.** Replaced with a generic `PLAN` tag so the illustration doesn't need updating each release. Page-level status pill renders the version dynamically from `skill.ts`.

## Other Notes

- **Phase 6 content review (task 6.16) is deferred.** The 15 Cody Product Builder docs pages were drafted by the agent and not yet reviewed end-to-end by the user. Tracked in the v1.0.0 tasklist; will run in v1.0.1 or as a follow-up patch.
- **`public/` reorganization mid-build.** Per-skill assets migrated from flat `public/images/` and `public/downloads/` into per-skill `public/skills/<skill-id>/images/` and `public/skills/<skill-id>/downloads/`. General assets (the Cody Skills logo) remain in `public/images/`. The convention scales as each skill accumulates more assets.
- **Three known browser-cache pitfalls** to watch for in development: (1) `/` → `/docs/...` redirect can be cached by the browser even after the redirect is removed from `astro.config.mjs`, (2) CSS changes may be served stale until hard-reload, (3) the recommended workaround is opening DevTools with "Disable cache" enabled during development.
- **GitHub Pages custom-domain mechanism.** `public/CNAME` ships with each deploy to keep the custom domain wired up; setting the domain only in the Pages dashboard isn't enough for Actions-based deploys.
- **Three audit-flagged npm vulnerabilities** in Astro were accepted at launch (would have required upgrading to Astro 6.x, violating the ≥3-months-stable version policy). Documented in `docs/build/v1.0.0-initial-creation/design.md` open questions. Re-evaluate when v1.1.0 is scoped.
- **Backlog items deferred to v1.0.1+:** Cody Article Writer documentation onboarding (B1), Cody Skill Auditor documentation onboarding (B2), Edit-on-GitHub button (B4), privacy-respecting analytics (B5). All architecturally unblocked by v1.0.0.
