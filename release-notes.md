# Release Notes

This document lists new features, bug fixes and other changes implemented during a particular build (version or patch) of the Cody Skills documentation website.

The order of releases listed below is descending — the latest version or patch is always shown at the top.

- [v1.2.0 - Cody Product Builder Best Practices](#v120---cody-product-builder-best-practices---2026-06-12)
- [v1.1.0 - Cody Article Writer](#v110---cody-article-writer---2026-05-21)
- [v1.0.0 - Initial Creation](#v100---initial-creation---2026-05-20)

---

# v1.2.0 - Cody Product Builder Best Practices - 2026-06-12

## Overview

Documents the **Best Practices** functionality added in Cody Product Builder skill v2.2.0. A content-and-metadata diff against the already-published Cody Product Builder docs, not a new skill. Adds one Reference page, bumps the documented skill version 2.1.0 to 2.2.0, adds a changelog entry, and weaves Best Practices into the four pages where the feature appears in the workflow. Validates again the PRD's promise that documenting a skill change is a content diff against the `skills.ts`-driven shell, with no shell rebuild.

## Key Features

- **New Reference page: Best Practices** (`src/skills/cody-product-builder/reference/best-practices.md`). The canonical explainer, modeled on the Prototypes page: what Best Practices is and why; the project-level `best-practices/` folder and `project-best-practices.md`; the starter category set and the one-rule-plus-why entry format (no version tags); when Cody reads it (design, patch start, implementation, refresh) and writes it (automatically after every version/patch, and on demand); the keep-it-lean "project's bible" principle, contrasted with the append-only Prototypes Findings Log; and lazy creation for older projects. Drafted from the real skill source at `~/.claude/skills/cody-product-builder/`.
- **Skill version bumped 2.1.0 to 2.2.0** in `skill.ts`, with **Best Practices** added as the first item under the Reference sidebar group (it leads because it is read across the whole build cycle and on every refresh). The version pill and landing card pick up the bump automatically.
- **Changelog entry** `v2.2.0 · Best Practices` added to `src/skills/cody-product-builder/reference/changelog.md`.

## Enhancements

- **Consistency pass across four touched pages.** `workflow/build-phase.md` gains a "Best Practices feed every build" section; `workflow/versions-and-patches.md` adds capture to "After a version or patch ships" and shows `best-practices/` as a project-level sibling of `build/` in the layout; `commands/refresh.md` adds a "Load Best Practices" step to the documented flow; `commands/build.md` gains a short Best Practices section; `index.md` (Overview) introduces the project-level `best-practices/` folder in one line.
- **House style: no em-dashes.** All v1.2.0 content was written or rewritten without em-dashes (replaced with commas, parentheses, colons, or restructured sentences). Captured as a project best practice so future content follows it automatically.

## Bug Fixes

- None. This is a documentation-only release.

## Other Notes

- **"Duplicate id" build warnings are a local cache artifact.** Incremental `npm run build` emitted Starlight glob-loader "Duplicate id" warnings for recently-edited files. Confirmed harmless: clearing `node_modules/.astro` and `node_modules/.vite` produces a clean build, and CI builds from a fresh checkout never see them.
- **Best Practices framework feature exercised live.** Mid-build the user used the on-demand capture path ("add this to our best practices") to record the em-dash rule, which was then applied across the version, a real-world use of the feature being documented.
- **On-demand-capture phrasing documented on the skill author's authority.** That behavior is not spelled out in the skill's reference files (which cover automatic post-build capture); worth confirming against the skill's implementation when convenient.
- **Pre-existing em-dashes left in place.** Older content from v1.0.0 / v1.1.0 (e.g. `reference/changelog.md` lines 6 and 22) still contains em-dashes; sweeping them is a candidate follow-up patch, deferred to keep this version's diff scoped.
- **Remaining backlog:** B2 (Cody Skill Auditor docs), B6 (marketing landing review), B7 (designed OG image), B8 (favicon suite).

---

# v1.1.0 - Cody Article Writer - 2026-05-21

## Overview

Adds **Cody Article Writer** to the site as the second fully documented skill. Flips the existing "coming soon" placeholder to a live, fully shipped skill with 19 documentation pages, real download URLs, and per-route sidebar swapping. Resolves a known v1.0.0 architectural debt (single global sidebar) along the way. Validates the PRD's promise that adding a new skill is a content-and-data diff — no shell rebuild needed.

## Key Features

- **Cody Article Writer documentation (19 pages).** Overview, Installation, Quick Start (Getting Started); The Article Workflow with ASCII flowchart, Topic Ideation & Research, Style Selection, Title/Thesis/Outline, Writing the Article, Editor Pass & Export (Workflow); Style Guides Overview, Voice, Formatting, Structure, Context, Managing Styles (Writing Styles); Triggers & Commands, Editor Style Guide, Storage & Data, Changelog (Reference). Drafted from the real skill source at `~/.claude/skills/cody-article-writer/` and the Cody Article Writer FigJam.
- **Marketing landing card flipped to live.** Cody Article Writer now renders as an "Available now · v3.0" card with the real tagline, illustration, alternating left/right rhythm (`reverse` prop), and "Get the skill" CTA. The flip was automatic — `src/pages/index.astro` already iterated over the skills barrel; only `status: 'coming-soon'` → `status: 'available'` was needed in `skill.ts`.
- **Per-route sidebar swap.** New `src/components/Sidebar.astro` override that reads the active skill from `Astro.url.pathname` (via the existing `getActiveSkill()` utility) and renders that skill's own `sidebar` array. Each skill's `skill.ts` stays the single source of truth; the override iterates over whatever's there (N groups, M items). No new npm dependencies.
- **Real CAW download URLs.** Get Skill menu serves `/skills/cody-article-writer/downloads/cody-article-writer.{zip,skill}` from the per-skill `public/` folder. Files were pre-staged during v1.0.0 task 8.6.
- **Skill switcher + GitHub link auto-swap.** Topbar Skills dropdown lists CAW as clickable; GitHub icon points to `ibuildwith-ai/cody-article-writer` on CAW pages and to `ibuildwith-ai/cody-product-builder` on CPB pages. All driven by `getActiveSkill()` — no per-page configuration.

## Enhancements

- **Changelog format unified across both skills.** Each skill's Changelog page is now a single-sentence-per-entry summary linking out to that skill's `release-notes.md` on GitHub for the full version history. Every released version and patch is listed — 16 entries for CPB (v1.3.0 through v2.1.0), 9 entries for CAW (v1.0 through v3.0).
- **External release-notes link uses a real anchor with `target="_blank"`.** Opens in a new tab without losing the site session. Avoids the small-monospace styling that markdown code-in-link produced.
- **Backticks stripped from link text across all skill pages.** All `[\`text\`](url)` patterns replaced with plain `[text](url)` so links render at body-text size instead of small monospace. Affects ~30 occurrences across CPB pages (mostly `:cody command` references in tables and inline mentions). Improves visual consistency with the surrounding prose.
- **`<code>` inside `<a>` now normalized in the design system.** New CSS rule in `src/styles/theme.css` (PART 5 — INLINE CODE INSIDE LINKS) makes `<code>` inside `<a>` inherit the link's font, size, background, and padding. Even if a future page author accidentally writes `[\`text\`](url)`, the link will render at body-text size automatically — no need to remember the convention.

## Bug Fixes

- **Sidebar override initially hid all groups except the one containing the current page.** First implementation computed `collapsed: !entries.some(e => e.isCurrent)`. On the CAW Overview page, only "Getting Started" rendered items; Workflow, Writing Styles, and Reference were collapsed. Fixed by always setting `collapsed: false` to match v1.0.0 behavior (theme.css hides chevrons and disables click-to-collapse via `<summary>` `pointer-events: none`, so groups are visually always-open).

## Other Notes

- **No new npm dependencies.** Stayed within v1.0.0's pinned stack (Astro 5.17.3, Starlight 0.37.6, etc.). The version policy (≥ 3-month soak) was not exercised for this release.
- **Mermaid not rendered natively.** Probed Starlight 0.37.6 with a `mermaid` code fence; rendered as a plain code block. Per design decision, no plugin added — the workflow diagram in "The Article Workflow" page uses an ASCII boxes-and-arrows flowchart instead.
- **Pagefind re-indexed automatically.** 34 pages in the search index (17 CPB + 17 CAW after excluding 404/redirect/short pages). Live ranking quality was deferred to user review during the editorial pass.
- **Editorial pass (task 4.1) signed off by user.** Walked every new CAW page; one issue surfaced (the sidebar collapse bug above) and was fixed. Pagefind ranking and responsive cross-device behavior verified.
- **Backlog item B1 absorbed into this version.** B3 (custom domain), B4 (Edit-on-GitHub), B5 (analytics) removed from backlog during planning as out of scope for v1.1.0. B2 (Cody Skill Auditor), B6 (marketing landing review), B7 (designed OG image), B8 (favicon suite) remain in backlog.
- **Cody Article Writer skill version on the badge is `3.0`.** This is the CAW skill's own metadata version (from its `SKILL.md` frontmatter), separate from the docs-site version (v1.1.0).
- **CAW download artifacts already staged.** v1.0.0 task 8.6 pre-placed the `.zip` and `.skill` files at `public/skills/cody-article-writer/downloads/`. v1.1.0 just wired the hrefs in `skill.ts` — no new artifacts shipped.
- **Mermaid + ASCII flowchart decision recorded.** The ASCII diagram in `workflow/the-article-workflow.md` covers all 12 phases plus the iteration loops and the research integration branches. If a future version adds Mermaid support (via plugin or Starlight upgrade), the diagram is a candidate to swap to native Mermaid for interactivity.

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

- **SEO + meta tags shipped on every page.** Marketing landing emits its own full OpenGraph + Twitter Card set; docs pages get title/description/og:* from Starlight automatically. `og:image` and `twitter:image` reference the brand logo as a temporary card (proper 1200×630 design tracked as backlog B7). Sitemap (`sitemap-index.xml` + `sitemap-0.xml`) lists all 16 public URLs.
- **Lighthouse scores (production)**: Marketing landing 100/98/100/100 desktop, 99/98/100/100 mobile. Docs Overview 99/100/100/100 desktop, 93/100/100/100 mobile (mobile-perf 93 explicitly flagged by Lighthouse as Chrome-extension contamination, would clear 95 in incognito). All beat the ≥95 v1.0.0 target.
- **Link audit clean.** All 24 unique internal links resolve; external links to GitHub repos, Google Fonts, and ibuildwith.ai spot-checked valid.
- **Phase 6 content review (task 6.16) is deferred.** The 15 Cody Product Builder docs pages were drafted by the agent and not yet reviewed end-to-end by the user. Tracked in the v1.0.0 tasklist; will run in v1.0.1 or as a follow-up patch.
- **Marketing landing review (was task 7.4) deferred to backlog B6.** User reviews the landing at codyskills.ai/ end-to-end (copy, layout, responsive, cross-browser) and edits anything off-tone or off-design. Deferred so Phase 7 could ship to production without blocking.
- **Tasks 9.5 (git tag) and 9.6 (final-deploy verification) removed from v1.0.0 scope.** User handles git tagging directly. Final deploy happens automatically via the GitHub Actions workflow on push to `main`.
- **Single PNG covers favicon + apple-touch-icon.** Modern browsers auto-scale `cody-skills-logo.png` for all favicon sizes. Full multi-format suite (SVG, 16/32px PNGs, dedicated 180×180 apple-touch-icon) tracked as backlog B8.
- **`public/` reorganization mid-build.** Per-skill assets migrated from flat `public/images/` and `public/downloads/` into per-skill `public/skills/<skill-id>/images/` and `public/skills/<skill-id>/downloads/`. General assets (the Cody Skills logo) remain in `public/images/`. The convention scales as each skill accumulates more assets.
- **Three known browser-cache pitfalls** to watch for in development: (1) `/` → `/docs/...` redirect can be cached by the browser even after the redirect is removed from `astro.config.mjs`, (2) CSS changes may be served stale until hard-reload, (3) the recommended workaround is opening DevTools with "Disable cache" enabled during development.
- **GitHub Pages custom-domain mechanism.** `public/CNAME` ships with each deploy to keep the custom domain wired up; setting the domain only in the Pages dashboard isn't enough for Actions-based deploys.
- **Three audit-flagged npm vulnerabilities** in Astro were accepted at launch (would have required upgrading to Astro 6.x, violating the ≥3-months-stable version policy). Documented in `docs/build/v1.0.0-initial-creation/design.md` open questions. Re-evaluate when v1.1.0 is scoped.
- **Backlog items deferred to v1.0.1+:** Cody Article Writer documentation onboarding (B1), Cody Skill Auditor documentation onboarding (B2), Edit-on-GitHub button (B4), privacy-respecting analytics (B5), marketing landing review (B6), designed 1200×630 OG image (B7), full favicon suite (B8). All architecturally unblocked by v1.0.0.

## Live site

https://codyskills.ai/
