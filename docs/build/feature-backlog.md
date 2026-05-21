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
| B2 | Cody Skill Auditor documentation | Add third skill once that skill itself is ready. Same shape as Cody Article Writer onboarding. | Agent |
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


## v1.1.0 - 🟢 Completed
Add **Cody Article Writer** to the site as the second fully-documented skill. Flip the existing `coming-soon` placeholder in `src/skills/cody-article-writer/skill.ts` to `available`, populate the `Skill` metadata (version, github, getSkill array, sidebar groups), and ship 19 content pages drafted from the real skill source at `~/.claude/skills/cody-article-writer/` and the Cody Article Writer FigJam. Mostly a content-only diff per the PRD's framing — one component (`Sidebar.astro`) added to resolve a v1.0.0 known debt (single global sidebar → per-route swap).

| ID    | Feature                       | Description                              | Priority | Status |
|-------|-------------------------------|------------------------------------------|----------|--------|
| 1.1.1 | Flip skill.ts to AvailableSkill | Change `src/skills/cody-article-writer/skill.ts` from `ComingSoonSkill` to `AvailableSkill`. Fill in `version: '3.0'`, `github: 'https://github.com/ibuildwith-ai/cody-article-writer'`, `getSkill[]` (`.zip` + `.skill`, real hrefs to `/skills/cody-article-writer/downloads/cody-article-writer.{zip,skill}` — files already present), and the 19-page `sidebar` groups (Getting Started, Workflow, Writing Styles, Reference). | High | 🟢 Completed |
| 1.1.2 | Sidebar auto-derivation works | Verify `astro.config.mjs` derives Article Writer's per-route sidebar from `skills.ts` automatically. Navigate to `/docs/cody-article-writer/*` and confirm the correct sidebar renders. | High | 🟢 Completed |
| 1.1.3 | Content scaffolding           | Create stub `.md` files under `src/skills/cody-article-writer/` matching every slug declared in `skill.ts`: `index.md` (Overview) plus subfolders `getting-started/`, `workflow/`, `writing-styles/`, `reference/` each with the corresponding pages. Each stub has frontmatter `title` + `description` and a "Placeholder. Real content arrives in tasks 1.1.4–1.1.7." body so the build doesn't error on missing pages. | High | 🟢 Completed |
| 1.1.4 | Content — Getting Started     | Three pages: **Overview**, **Installation**, **Quick Start**. Drafted from `SKILL.md` (Directory Setup, Command Reference, intro). User-reviewed. | High | 🟢 Completed |
| 1.1.5 | Content — Workflow            | Six pages: **The Article Workflow** (high-level tour with an embedded Mermaid version of the FigJam), **Topic Ideation & Research** (Phases 1–2), **Style Selection** (Phase 3), **Title, Thesis & Outline** (Phases 4–6), **Writing the Article** (Phase 7, section-by-section vs full-draft, inline citations), **Editor Pass & Export** (Phases 8–12: approval loops, optional editor pass, metadata, export). Drafted from `references/article-workflow.md` + `research-workflow.md` + `editor-style-guide.md`. User-reviewed. | High | 🟢 Completed |
| 1.1.6 | Content — Writing Styles      | Six pages: **Style Guides Overview** (4 categories + creation workflow: Voice → Context → Structure → Formatting → Review → Save), **Voice** (tone, humor, opinion, technical), **Formatting** (emojis, em_dashes, blockquotes), **Structure** (opening/closing, visual_breaks, examples, example_types), **Context** (author + audience), **Managing Styles** (list, edit, delete). Drafted from `references/style-schema.md` + `style-workflow.md`. User-reviewed. | High | 🟢 Completed |
| 1.1.7 | Content — Reference           | Four pages: **Triggers & Commands** (the 10 plain-language activation phrases), **Editor Style Guide** (the editor pass ruleset — 5 user-style-calibrated checks + 4 always-applied checks), **Storage & Data** (`cody-projects/article-writer/{styles,drafts,articles,archive}` + draft JSON schema), **Changelog**. Drafted from SKILL.md Command Reference table + `editor-style-guide.md` + the FigJam's Editor Style Guide section. User-reviewed. | High | 🟢 Completed |
| 1.1.8 | Marketing landing flip        | Verify the home page automatically swaps the Article Writer card from "coming soon" to a live "Available" card once `status` flips in `skill.ts`. Confirm tagline + illustration still render. If the landing has a separate visual treatment for coming-soon vs available cards, verify both code paths work. | High | 🟢 Completed |
| 1.1.9 | Skill switcher verification   | Verify Article Writer appears in the Skill Switcher dropdown as a selectable, available skill (no coming-soon treatment). Selecting it navigates to `/cody-article-writer/` overview. | High | 🟢 Completed |
| 1.1.10 | GitHub link verification     | Verify the GitHub icon points to `ibuildwith-ai/cody-article-writer` whenever Article Writer is the active skill. | Medium | 🟢 Completed |
| 1.1.11 | Get Skill menu verification  | Verify the Get Skill dropdown renders Article Writer's `getSkill[]` entries when active. Placeholder `#` URLs are acceptable until real release assets exist. | Medium | 🟢 Completed |
| 1.1.12 | Search verification          | Confirm Pagefind picks up the 19 new pages and ranks reasonably for terms like "writing style", "research", "editor pass", "thesis", "outline". | Medium | 🟢 Completed |
| 1.1.13 | Responsive verification      | Walk all three breakpoints (≥1100, 768–1100, <768) with an Article Writer route active. Sidebar, top bar, content all behave. | High | 🟢 Completed |
| 1.1.14 | Editorial pass               | User reviews every new page for tone, accuracy, link checks, and consistency with Cody Product Builder's voice. | High | 🟢 Completed |
| 1.1.15 | Deploy v1.1.0                | Push to `main`, GitHub Actions builds and deploys, verify live site flips Article Writer to live. Tag release. Update `release-notes.md`. | High | 🟢 Completed |
