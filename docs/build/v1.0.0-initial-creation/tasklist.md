# Version Tasklist – v1.0.0
This document outlines all the tasks to work on to deliver this particular version, grouped by phases.

| Status |      |
|--------|------|
| 🔴 | Not Started |
| 🟡 | In Progress |
| 🟢 | Completed |


## Phase 1 — Project Foundation
_Scaffold Astro Starlight, wire CI/CD, and confirm an empty site deploys end-to-end to GitHub Pages. By the end of this phase, pushing to `main` produces a live `*.github.io` URL._

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|--------------|--------|-------------|
| 1.1 | Verify Astro & Starlight versions | Check npm release dates for `astro` and `@astrojs/starlight`. Pick the latest **stable** version of each that was released on or before **2026-02-19** (≥3 months ago). Record the chosen versions before installing. **Chosen: `astro@5.17.3` (2026-02-18) and `@astrojs/starlight@0.37.6` (2026-02-02). Compatibility: Starlight 0.37.6 requires `astro ^5.5.0` → 5.17.3 satisfies. Astro 6.0.0 released 2026-03-10, correctly excluded by the cutoff.** | None | 🟢 Completed | AGENT |
| 1.2 | Scaffold the project | Run Astro init in repo root with the Starlight integration, TypeScript template. Pin every direct dependency exactly (`--save-exact`). **Done: wrote `package.json` (with exact pins `astro@5.17.3`, `@astrojs/starlight@0.37.6`, `sharp@0.34.5`), `tsconfig.json`, `astro.config.mjs` (minimal Starlight config), `src/content.config.ts` (default loader for now — Phase 3 replaces), `src/content/docs/index.mdx` placeholder, `public/favicon.svg` placeholder, `.vscode/{extensions,launch}.json`, `.npmrc` with `save-exact=true`. `npm install` succeeded — 371 packages, exact pins resolved. 3 audit vulnerabilities documented in `design.md` Open Questions as accepted for v1.0.0.** | 1.1 | 🟢 Completed | AGENT |
| 1.3 | Verify local dev | Run `npm install`, `npm run dev`, and `npm run build`. Confirm Starlight default site renders at `http://localhost:4321` and a static `./dist` is produced. **Done: `npm install --cache /tmp/npm-cache-cody` succeeded (global cache had root-owned files, isolated cache used as workaround). `npm run build` succeeded — 2 pages compiled (placeholder home + 404), Pagefind search index built in 533ms, total build 1.47s. Output at `./dist/`. `npm run dev` not separately tested — build covers more ground.** | 1.2 | 🟢 Completed | AGENT |
| 1.4 | Configure Astro `site` URL | Set `site: 'https://codyskills.ai'` in `astro.config.mjs` (or the github.io URL as a temporary value until the domain is wired). **Done: `site: 'https://codyskills.ai'` set in astro.config.mjs; `public/CNAME` created with `codyskills.ai`. Build emits `sitemap-index.xml` correctly. User to configure DNS at Namecheap pointing to GitHub Pages IPs.** | 1.2 | 🟢 Completed | AGENT |
| 1.5 | Create GitHub Actions workflow | Add `.github/workflows/deploy.yml`: on push to `main`, checkout, setup Node 22, `npm ci`, `npm run build`, upload `./dist` as the GitHub Pages artifact, deploy. **Done: workflow file created. Triggers on push to main + manual dispatch. Uses actions/checkout@v4, actions/setup-node@v4, actions/upload-pages-artifact@v3, actions/deploy-pages@v4. Node 22 LTS. Correct Pages permissions and concurrency group set.** | 1.2 | 🟢 Completed | AGENT |
| 1.6 | Enable GitHub Pages | In repo Settings → Pages, set source to "GitHub Actions". | 1.5 | 🔴 Not Started | USER |
| 1.7 | First successful deploy | Push to `main`, watch the workflow succeed, confirm the site loads at the `*.github.io` URL. | 1.5, 1.6 | 🔴 Not Started | AGENT |


## Phase 2 — Brand Theme
_Make the default Starlight site look like iBuildWith.ai: DM Sans, the right colors in both modes, 8–9px radii._

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|--------------|--------|-------------|
| 2.1 | Add DM Sans | Load DM Sans from Google Fonts (preconnect + stylesheet link). Add to Starlight `head` config. | 1.3 | 🔴 Not Started | AGENT |
| 2.2 | Create theme.css | `src/styles/theme.css`. Override Starlight's CSS custom properties for color, font, radius — both dark and light modes. Use the exact tokens from `prototype.md`: `#121212`/`#ffffff` bg; `#22c55e`/`#16a34a` accents; `#2a2a2a`/`#e8e8e6` borders; `8px` radii. | 1.3 | 🔴 Not Started | AGENT |
| 2.3 | Register theme.css | Add `customCss: ['./src/styles/theme.css']` to Starlight config. | 2.2 | 🔴 Not Started | AGENT |
| 2.4 | Verify dark/light toggle | Confirm Starlight's built-in dark/light toggle works with the brand theme in both modes. Check that brand colors render correctly in each. | 2.2, 2.3 | 🔴 Not Started | AGENT |


## Phase 3 — Per-Skill Architecture
_Build the data layer that makes adding a new skill a data-only diff. By the end of this phase, the `/docs/cody-product-builder/...` URLs render placeholder content from `src/skills/`._

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|--------------|--------|-------------|
| 3.1 | Define skill types | Create `src/skills/types.ts` with the `Skill`, `SkillDownload`, `SidebarGroup`, `SidebarItem` types from `design.md`. | 1.3 | 🔴 Not Started | AGENT |
| 3.2 | Create CPB skill.ts | `src/skills/cody-product-builder/skill.ts` — populate with id `cody-product-builder`, name `Cody Product Builder`, version `2.1.0`, github URL `https://github.com/ibuildwith-ai/cody-product-builder`, `getSkill[]` with hrefs pointing to `/downloads/cody-product-builder/<filename>` (placeholder filenames until task 8.6 receives the artifacts), and the full sidebar tree from `design.md` (Overview slug `''`, plus Installation, Quick Start, Workflow×3, Commands×6, Reference×3). | 3.1 | 🔴 Not Started | AGENT |
| 3.3 | Create barrel | `src/skills/index.ts` — imports each `skill.ts`, exports a `skills` array. CPB is index `[0]`, making it the default skill. | 3.2 | 🔴 Not Started | AGENT |
| 3.4 | Configure content collection | `content.config.ts` at repo root — uses `glob` loader with `base: './src/skills'`, `pattern: '*/**/*.{md,mdx}'`, and a `generateId` that prefixes IDs with `docs/` and strips `/index`. | 3.3 | 🔴 Not Started | AGENT |
| 3.5 | Derive Starlight sidebar from skills | In `astro.config.mjs`, import `skills` from the barrel and generate Starlight's `sidebar` config — one sidebar per `/docs/<skill-id>/` URL prefix. | 3.3, 3.4 | 🔴 Not Started | AGENT |
| 3.6 | Wire `/docs/` redirect | Add `redirects: { '/docs': '/docs/<skills[0].id>/' }` (computed from the barrel) to `astro.config.mjs`. | 3.3 | 🔴 Not Started | AGENT |
| 3.7 | Drop placeholder content | Create stub `.md` files for every slug declared in CPB's `skill.ts` (Overview + 14 sub-pages) with frontmatter title only and a one-line body. Goal: every sidebar link resolves to a 200 page. | 3.2, 3.4 | 🔴 Not Started | AGENT |
| 3.8 | Verify routing | `npm run build` and walk every URL: `/` shows Starlight default (replaced in Phase 5), `/docs/` redirects to CPB Overview, every sidebar link works, `Versions & Patches` URL is `/docs/cody-product-builder/workflow/versions-and-patches/`. | 3.5, 3.6, 3.7 | 🔴 Not Started | AGENT |


## Phase 4 — Custom Top-Bar Components
_Override Starlight's Header with our top-bar layout. Each interactive piece becomes a small Astro component reading from the skills data._

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|--------------|--------|-------------|
| 4.1 | SkillSwitcher | `src/components/SkillSwitcher.astro` — dropdown listing every skill from the barrel with name + version. Active skill detected from URL prefix; check icon on active. Open/close on click, close on outside click and Escape. Selecting a skill navigates to `/docs/<id>/`. | 3.3 | 🔴 Not Started | AGENT |
| 4.2 | GetSkillMenu | `src/components/GetSkillMenu.astro` — dropdown rendering the active skill's `getSkill[]`. Each entry has a stroke SVG icon (zipper-file for `.zip`, lightning bolt for `.skill`), name, description. Download-arrow icon on the button, no chevron. Open/close behavior matches SkillSwitcher. | 3.3 | 🔴 Not Started | AGENT |
| 4.3 | GitHubLink | `src/components/GitHubLink.astro` — icon button (GitHub mark SVG) linking to the active skill's `github` URL. | 3.3 | 🔴 Not Started | AGENT |
| 4.4 | VersionBadge | `src/components/VersionBadge.astro` — small pill showing the active skill's `version`. Placed on each skill's Overview (and optionally every page). | 3.3 | 🔴 Not Started | AGENT |
| 4.5 | Custom Header | `src/components/Header.astro` overriding Starlight's default Header. Layout: brand · SkillSwitcher · GetSkillMenu · spacer · Starlight search · GitHubLink · theme toggle. Configure Starlight's `components.Header` override. | 4.1, 4.2, 4.3 | 🔴 Not Started | AGENT |
| 4.6 | Visual QA against prototype | Open `docs/prototypes/design-chooser/mockup-4-ibuildwith.html` and the local dev site side by side. Confirm spacing, colors, and behavior match. | 4.5, 2.4 | 🔴 Not Started | USER |


## Phase 5 — Responsive Verification
_Confirm the site works at desktop, tablet, and mobile. Override Starlight's defaults only where they don't match the prototype._

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|--------------|--------|-------------|
| 5.1 | Right rail at narrow viewport | Verify Starlight's "on this page" rail hides at ≤1100px. Adjust breakpoint via CSS if needed. | 4.6 | 🔴 Not Started | AGENT |
| 5.2 | Mobile drawer | Verify Starlight's mobile sidebar drawer behavior at ≤768px matches the prototype's hamburger pattern. Override the mobile menu component if needed. | 4.6 | 🔴 Not Started | AGENT |
| 5.3 | Top-bar control compression | At ≤768px, hide switcher's skill name, hide "Search docs" text and `⌘K` kbd hint (search shrinks to icon), hide "Get Skill" text (button shrinks to icon). | 4.5 | 🔴 Not Started | AGENT |
| 5.4 | Hide GitHub on very small | At ≤480px, hide `GitHubLink`. | 5.3 | 🔴 Not Started | AGENT |
| 5.5 | Touch QA on real device | Test on an actual phone (iOS or Android): hamburger opens drawer, all interactive controls work on touch, no horizontal scroll. | 5.1, 5.2, 5.3 | 🔴 Not Started | USER |


## Phase 6 — Cody Product Builder Content
_Replace the placeholder stubs with real content. Cody drafts each page from the real `cody-product-builder/` source folder; user reviews and signs off. A task is 🟢 only after sign-off._

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|--------------|--------|-------------|
| 6.1  | Overview (`index.md`) | Skill landing. Frontmatter title + description (drives SEO). Draft from `cody-product-builder/SKILL.md`. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.2  | Installation | How to add the skill to a user's environment. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.3  | Quick Start | End-to-end first project — start the Plan phase, see it through. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.4  | The Plan Phase | The full plan workflow from `commands/plan.md` + references. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.5  | The Build Phase | The full build workflow from `commands/build.md` + references. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.6  | Versions & Patches | Versioning conventions from `references/phases.md`. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.7  | `:cody plan` | Command page — purpose, what it does, what it produces. From `commands/plan.md`. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.8  | `:cody build` | From `commands/build.md`. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.9  | `:cody prototype` | From `commands/prototype.md`. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.10 | `:cody idea` | From `commands/idea.md`. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.11 | `:cody refresh` | From `commands/refresh.md`. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.12 | `:cody help` | From `commands/help.md`. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.13 | Prototypes (reference) | What prototypes are, how they fit the workflow. From `references/note-available-prototypes.md` and `commands/prototype.md`. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.14 | Project Settings (reference) | The `cody.json` reference. From `assets/cody.json` template and the workspace references. | 3.7 | 🔴 Not Started | AGENT + USER |
| 6.15 | Changelog (reference) | Reverse-chronological changelog stub. Real entries get added per version going forward; v1.0.0 entry created after launch. | 3.7 | 🔴 Not Started | AGENT + USER |


## Phase 7 — Marketing Landing Page
_The custom Astro page at `src/pages/index.astro` that lives at `codyskills.ai/`._

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|--------------|--------|-------------|
| 7.1 | Landing layout draft | Follow the "Created for Builders" pattern from ibuildwith.ai (hero copy locked in `design.md`). v1 is intentionally lean: hero + skill-card grid only — no other sections. Richer redesign deferred to post-launch. | 3.3 | 🔴 Not Started | AGENT |
| 7.2 | Skill card component | `src/components/SkillCard.astro` — reads name, version, description from a skill entry; links to `/docs/<id>/`. Variant: "Coming Soon" cards (visually muted, non-interactive) showing name + description only, no link. | 7.1, 3.3 | 🔴 Not Started | AGENT |
| 7.3 | Landing page build | `src/pages/index.astro` — hero with "Created for Builders" copy; skill-card grid rendering one live card per entry in `src/skills/index.ts` plus hardcoded Coming Soon cards for Cody Article Writer (description lifted from ibuildwith.ai) and Cody Skill Auditor (description supplied by user — see Open Questions in `design.md`). Brand-consistent styling. | 7.1, 7.2 | 🔴 Not Started | AGENT |
| 7.4 | Landing review | User reviews the landing page; copy and visual adjustments. | 7.3 | 🔴 Not Started | USER |


## Phase 8 — SEO & Site Assets
_Wire up the bits that make the site shareable and indexable._

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|--------------|--------|-------------|
| 8.1 | Site title & description | Set `title` and `description` on Starlight config. Confirm they appear in `<title>` fallback and the default `<meta description>`. | 1.4 | 🔴 Not Started | AGENT |
| 8.2 | Custom OG share image | Design a 1200×630 Cody Skills branded OG image — the Cody Skills mark on `#121212` with `#22c55e` accent. Place at `public/og-default.png`; reference via Starlight `head` config. User replaces post-v1. | 2.2 | 🔴 Not Started | AGENT |
| 8.3 | Custom favicon | Design a Cody Skills mark as SVG (the green-rounded-square "C" from the prototype). Generate assets: `favicon.svg`, `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` (180×180). Place in `public/`; reference in Starlight `head`. User replaces post-v1. | 2.2 | 🔴 Not Started | AGENT |
| 8.4 | Sitemap verification | Confirm `@astrojs/sitemap` produces `sitemap-index.xml` at the site root with all pages listed. | 1.3 | 🔴 Not Started | AGENT |
| 8.5 | Per-page SEO spot-check | Open a sample of pages in each category and verify `<title>`, `<meta description>`, `og:title`, `og:description`, `og:image` are populated correctly. | 6.15, 8.2 | 🔴 Not Started | AGENT |
| 8.6 | Place download artifacts | User provides the Cody Product Builder `.zip` and `.skill` files. Place them at `public/downloads/cody-product-builder/<filename>`; update the `href` values in `skill.ts` (task 3.2) to match. Commit the files to git. | 3.2 | 🔴 Not Started | USER + AGENT |


## Phase 9 — Launch
_Final QA, tag, deploy, release notes._

| ID  | Task             | Description                             | Dependencies | Status | Assigned To |
|-----|------------------|-----------------------------------------|--------------|--------|-------------|
| 9.1 | Cross-browser sanity | Smoke-test on the latest Safari, Chrome, Firefox: top bar, skill switcher, search, theme toggle, drawer. | 5.5, 6.15, 7.4 | 🔴 Not Started | AGENT |
| 9.2 | Lighthouse run | Run Lighthouse on the Overview page and one content page. Target: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Address any blockers. | 9.1 | 🔴 Not Started | AGENT |
| 9.3 | Link audit | Crawl the site (Astro build does this implicitly) and check no broken internal links. Spot-check external links. | 6.15, 7.4 | 🔴 Not Started | AGENT |
| 9.4 | Final editorial pass | User reviews every page end to end with the live site open. Last-pass corrections. | 9.1 | 🔴 Not Started | USER |
| 9.5 | Tag v1.0.0 | Tag the commit `v1.0.0` in git. | 9.4 | 🔴 Not Started | USER |
| 9.6 | Final deploy | Confirm the v1.0.0 tag's commit is what's on the `*.github.io` URL. | 9.5 | 🔴 Not Started | AGENT |
| 9.7 | Release notes | Create `release-notes.md` at the repo root with the v1.0.0 entry (features shipped, link to live site). | 9.5 | 🔴 Not Started | AGENT |
