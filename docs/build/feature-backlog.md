# Feature Backlog

This document lists features and enhancements derived from the plan. It is a living document that will evolve throughout the project. It is grouped by version, with the Backlog tracking all features not added to a version yet. It is used to create versions to work on.

| Status |  | Priority |  |
|--------|-------------|---------|-------------|
| 🔴 | Not Started | High | High priority items |
| 🟡 | In Progress | Medium | Medium priority items |
| 🟢 | Completed | Low | Low priority items |


## Backlog

| #  | Feature             | Description                               | Source |
|----|---------------------|-------------------------------------------|--------|
| B1 | Cody Article Writer documentation | Add second skill to the site: per-skill content pages (Getting Started, Workflow, Writing Styles, Reference), sidebar config, `getSkill[]` array, and GitHub URL in `skills.ts`. Architecture already supports it — this is a content-only diff. | Agent |
| B2 | Cody Skill Auditor documentation | Add third skill once that skill itself is ready. Same shape as Cody Article Writer onboarding. | Agent |
| B3 | Custom domain — codyskills.ai | Acquire the domain, add `public/CNAME` with `codyskills.ai`, configure A/ALIAS records at the registrar pointing at GitHub Pages, configure a `CNAME` record for `www`. | Agent |
| B4 | Edit-on-GitHub button | Per-page "Edit this page" link that opens the corresponding source file in the GitHub repo. | Agent |
| B5 | Privacy-respecting analytics | Lightweight, cookie-free analytics (e.g. Plausible) to track pageviews. | Agent |
| B6 | Marketing landing review | User reviews the marketing landing at `codyskills.ai/` end-to-end (copy, layout, responsive behavior, cross-browser) and edits anything off-tone or off-design. Deferred from v1.0.0 task 7.4 so Phase 7 could ship to production without blocking on the review. | User |
| B7 | Designed 1200×630 OG share image | Replace the temp og:image (currently reuses `cody-skills-logo.png`) with a proper 1200×630 PNG showing the Cody Skills mark + tagline on the brand-dark background with the green accent. Update `og:image` and `twitter:image` references in `astro.config.mjs` head config and `src/pages/index.astro` head. | Agent |
| B8 | Full favicon suite | Generate the multi-format favicon set: `favicon.svg` (modern browsers, scales perfectly), `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` at 180×180 (iOS). Currently only the brand logo PNG is wired — modern browsers auto-scale it, but a purpose-cropped 16/32 favicon set renders sharper at small sizes. | Agent |


## v1.0.0 - 🟢 Completed
Launch the multi-skill site shell with full Cody Product Builder documentation, deployed to GitHub Pages.

| ID  | Feature                 | Description                              | Priority | Status |
|-----|-------------------------|------------------------------------------|----------|--------|
| 1.1 | Astro Starlight scaffolding | Initialize Astro 5+ with `@astrojs/starlight` in the repo root. Configure TypeScript and the site title. Pin every package to a stable release at least 3 months old (per the plan's version policy). Verify `npm run dev` and `npm run build` work end-to-end. | High | 🟢 Completed |
| 1.2 | Brand theme | Override Starlight's CSS custom properties to match iBuildWith.ai: DM Sans (Google Fonts), `#121212`/`#ffffff` backgrounds, `#22c55e`/`#16a34a` accents, `#2a2a2a` borders, 8–9px radii. Verify both dark and light modes. | High | 🟢 Completed |
| 1.3 | `skills.ts` data module | Single source of truth at `src/data/skills.ts`. Types: `Skill`, `SkillDownload`, `SidebarGroup`. Populate with the Cody Product Builder entry (id, name, version 2.1.0, github URL, getSkill array, sidebar groups). | High | 🟢 Completed |
| 1.4 | Sidebar config derived from `skills.ts` | In `astro.config.mjs`, generate Starlight's per-route sidebar from the `skills` array so each skill's URL prefix gets its own sidebar automatically. | High | 🟢 Completed |
| 1.5 | Header override | Custom Header replacing Starlight's default. Layout: brand · SkillSwitcher · GetSkillMenu (left); spacer; search · GitHubLink · theme toggle (right). | High | 🟢 Completed |
| 1.6 | SkillSwitcher component | Dropdown listing every skill from `skills.ts` with name + version + check on active. Selecting a skill navigates to that skill's overview page. Close on outside click and route change. | High | 🟢 Completed |
| 1.7 | GetSkillMenu component | Download dropdown rendering the active skill's `getSkill[]` entries. Each entry has an icon (zipper-file for `.zip`, lightning bolt for `.skill`), name, and description. Download arrow icon on the button, no chevron. | High | 🟢 Completed |
| 1.8 | GitHubLink component | Icon button linking to the active skill's `github` URL. Hides at very small viewports. | Medium | 🟢 Completed |
| 1.9 | VersionBadge component | Small pill showing the active skill's `version`. Used on each skill's overview page (at minimum). | Medium | 🟢 Completed |
| 1.10 | Mobile responsive shell | Verify Starlight's built-in mobile drawer matches the prototype's hamburger pattern. Override only what's needed. Verify the three breakpoints (≥ 1100px, 768–1100px, < 768px) and verify all interactive controls work on touch. | High | 🟢 Completed |
| 1.11 | Search configuration | Confirm Pagefind (Starlight's built-in static search) indexes correctly. Tune if `:cody command`-style content ranks poorly. | Medium | 🟢 Completed |
| 1.12 | Content — Getting Started | Three Cody Product Builder pages: Overview, Installation, Quick Start. Drafted from `cody-product-builder/SKILL.md` and the real skill folder; user-reviewed. | High | 🟢 Completed |
| 1.13 | Content — Workflow | Three Cody Product Builder pages: The Plan Phase, The Build Phase, Versions & Patches. Drafted from the skill's command files; user-reviewed. | High | 🟢 Completed |
| 1.14 | Content — Commands | Six Cody Product Builder pages, one per command: `:cody plan`, `:cody build`, `:cody prototype`, `:cody idea`, `:cody refresh`, `:cody help`. Drafted from `cody-product-builder/commands/*.md`; user-reviewed. | High | 🟢 Completed |
| 1.15 | Content — Reference | Three Cody Product Builder pages: Prototypes, Project Settings, Changelog. Drafted from skill references; user-reviewed. | High | 🟢 Completed |
| 1.16 | GitHub Actions CI/CD | Workflow at `.github/workflows/deploy.yml`. On push to `main`: checkout, setup Node, `npm ci`, `npm run build`, upload `./dist` as a Pages artifact, deploy to GitHub Pages. | High | 🟢 Completed |
| 1.17 | GitHub Pages configuration | Enable Pages in repo Settings with source = "GitHub Actions". Verify the site loads at the default `*.github.io` URL. | High | 🟢 Completed |
