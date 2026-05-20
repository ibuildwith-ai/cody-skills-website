# Product Implementation Plan
This document defines how the product will be built and when.

## Section Explanations
| Section                  | Overview |
|--------------------------|--------------------------|
| Overview                 | A brief recap of what we're building and the current state of the PRD. |
| Architecture             | High-level technical decisions and structure (e.g., frontend/backend split, frameworks, storage). |
| Components               | Major parts of the system and their roles. Think modular: what pieces are needed to make it work. |
| Data Model               | What data structures or models are needed. Keep it conceptual unless structure is critical. |
| Major Technical Steps    | High-level implementation tasks that guide development. Not detailed coding steps. |
| Tools & Services         | External tools, APIs, libraries, or platforms this app will depend on. |
| Risks & Unknowns         | Technical or project-related risks, open questions, or blockers that need attention. |
| Milestones    | Key implementation checkpoints or phases to show progress. |
| Environment Setup | Prerequisites or steps to get the app running in a local/dev environment. |

## Overview
_A quick summary of what this plan is for and what product it's implementing._

This plan implements the **Cody Skills Documentation Website** as defined in [prd.md](./prd.md). v1 ships a multi-skill site shell — top bar, skill switcher, sidebar IA, search, Get Skill, GitHub icon, light/dark theme toggle, responsive design — populated with documentation for **Cody Product Builder only**. Future versions add Cody Article Writer, Cody Skill Auditor, and any other skills as content-only diffs against the same shell. The site is built as static HTML with **Astro Starlight**, built and deployed via **GitHub Actions** to **GitHub Pages**, with `codyskills.ai` wired in as a custom domain after launch.

## Architecture
_High-level structure and major technical decisions. Include how the system is organized (e.g., client-server, monolith, microservices) and the proposed tech stack (frameworks, languages, storage, deployment)._

**Pure static site, no runtime backend.** Markdown/MDX content is compiled at build time into HTML/CSS/JS and served from a static host.

```
┌────────────────────────────────────────────────────────────────┐
│  GitHub Repo (cody-skills-website)                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  src/content/docs/             ← Markdown / MDX content  │  │
│  │   ├─ index.mdx                  (home / landing)         │  │
│  │   └─ cody-product-builder/      (per-skill folder)       │  │
│  │       ├─ getting-started/                                │  │
│  │       ├─ workflow/                                       │  │
│  │       ├─ commands/                                       │  │
│  │       └─ reference/                                      │  │
│  │  src/components/                ← custom UI overrides    │  │
│  │  src/data/skills.ts             ← per-skill metadata     │  │
│  │  astro.config.mjs               ← Starlight + sidebars   │  │
│  │  public/                        ← static assets, CNAME   │  │
│  └──────────────────────────────────────────────────────────┘  │
│         │                                                      │
│         │  push to main                                        │
│         ▼                                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  GitHub Actions  →  npm run build  →  ./dist             │  │
│  └──────────────────────────────────────────────────────────┘  │
│         │                                                      │
│         ▼                                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  GitHub Pages (codyskills.ai once DNS is wired)          │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

**Stack:**
- **Astro 5+** as the build tool / SSG
- **Starlight** (`@astrojs/starlight`) as the docs framework — gives us sidebar, dark/light toggle, code highlighting, MDX, mobile drawer, and **Pagefind**-based static search for free
- **TypeScript** for component logic and the per-skill data file
- **DM Sans** via Google Fonts (matches iBuildWith.ai)
- **GitHub Actions** + **GitHub Pages** for CI/CD and hosting
- **Pagefind** (bundled by Starlight) for the ⌘K search modal — runs entirely client-side against a static index built at compile time

**Content separation:** the Cody workspace (`docs/plan/`, `docs/build/`, `docs/prototypes/`) sits at the repo root, separate from the site's source. The site's content lives under `src/content/docs/` per Starlight convention.

## Components
_What are the key parts/modules of the system and what do they do?_

- **Starlight shell** — provides the page chrome (header slot, sidebar slot, main, right TOC, mobile drawer behavior), the search modal, and the dark/light theme switching. Most of the work is configuration; we override only what we need.
- **Custom header** (`src/components/Header.astro`, overriding Starlight's default) — renders our top bar layout: brand · `SkillSwitcher` · `GetSkillMenu` on the left; default Starlight search · `GitHubLink` · theme toggle on the right.
- **`SkillSwitcher`** — dropdown listing every skill from `src/data/skills.ts`. Selecting a skill navigates to that skill's overview page; the Starlight `sidebar` config keys off the URL prefix so the sidebar swaps automatically.
- **`GetSkillMenu`** — dropdown rendering the `getSkill[]` array for the currently active skill (detected from URL). Each entry is a download link with an icon, label, and description.
- **`GitHubLink`** — icon link to the active skill's GitHub repo.
- **`VersionBadge`** — small pill rendered at the top of every skill's pages, reading the active skill's `version` from `skills.ts`.
- **`skills.ts`** — single source of truth for per-skill metadata: id, name, version, github URL, getSkill array, sidebar definition. This is the file you edit to onboard a new skill.
- **Sidebar config in `astro.config.mjs`** — derived from `skills.ts`. Maps each URL prefix (e.g. `/cody-product-builder/`) to that skill's sidebar groups.
- **Per-skill content folders** (`src/content/docs/<skill-id>/`) — Markdown/MDX pages organized by the standardized IA (Getting Started, Workflow, [skill-specific], Reference).

## Data Model
_What are the main types of data or objects the system will manage?_

A single TypeScript module — `src/data/skills.ts` — defines the per-skill metadata. The sidebar config in `astro.config.mjs` is derived from this.

```ts
type SkillDownload = {
  icon: 'zip' | 'skill';        // maps to an SVG component
  name: string;                 // e.g. "Download .zip"
  description?: string;         // e.g. "Source archive"
  href: string;                 // external URL
};

type SidebarLink = { label: string; slug: string };
type SidebarGroup = { label: string; items: SidebarLink[] };

type Skill = {
  id: string;                   // URL slug, e.g. "cody-product-builder"
  name: string;                 // display name
  version: string;              // e.g. "2.1.0"
  github: string;               // repo URL
  getSkill: SkillDownload[];
  sidebar: SidebarGroup[];      // Getting Started, Workflow, [skill-specific], Reference
};

export const skills: Skill[] = [
  { id: 'cody-product-builder', name: 'Cody Product Builder', version: '2.1.0', /* ... */ },
];
```

Page content itself is plain Markdown/MDX files on disk. No database, no CMS.

## Major Technical Steps
_High-level implementation tasks that guide development. Not detailed coding steps._

1. **Scaffold the Astro Starlight project** in the repo root, alongside the existing `docs/` Cody workspace. Configure TypeScript and the site title.
2. **Apply the brand theme.** Override Starlight's CSS custom properties to match iBuildWith.ai (DM Sans, `#121212`/`#ffffff`, `#22c55e`/`#16a34a` accents, `#2a2a2a` borders, `8–9px` radii).
3. **Create `src/data/skills.ts`** with Cody Product Builder's metadata (name, version `2.1.0`, GitHub URL, getSkill array, sidebar groups for Getting Started / Workflow / Commands / Reference).
4. **Derive the Starlight sidebar config from `skills.ts`** in `astro.config.mjs` so each skill's URL prefix gets its own sidebar.
5. **Override Starlight's Header component** to drop in our top-bar layout: brand · `SkillSwitcher` · `GetSkillMenu` · spacer · search · `GitHubLink` · theme toggle.
6. **Build `SkillSwitcher`** — dropdown that reads from `skills.ts`, marks the active skill (from URL prefix), and navigates to the chosen skill's overview page.
7. **Build `GetSkillMenu`** — dropdown that renders the active skill's `getSkill[]` array. Open-on-click, close-on-outside-click, close-on-route-change.
8. **Build `GitHubLink`** — icon button that links to the active skill's `github` URL.
9. **Build `VersionBadge`** — small pill component used in each skill's overview page (and optionally on every page) showing the active skill's version.
10. **Verify responsive behavior.** Confirm Starlight's mobile drawer handles the hamburger pattern; if not, lightly override it. Test the three breakpoints (≥ 1100px, 768–1100px, < 768px).
11. **Draft Cody Product Builder content.** Cody writes every page in the sidebar — Overview, Installation, Quick Start, Plan Phase, Build Phase, Versions & Patches, the six `:cody` command pages, Prototypes, Project Settings, Changelog — by reading the real `cody-product-builder/` source folder. User reviews each page.
12. **Wire CI/CD.** GitHub Actions workflow: on push to `main`, run `npm ci && npm run build`, upload `./dist` as a Pages artifact, deploy to GitHub Pages. Enable Pages in repo settings.
13. **Configure custom domain (later).** Add a `public/CNAME` file containing `codyskills.ai` and configure DNS at the registrar. Non-blocking for v1 launch.

## Tools & Services
_What tools, APIs, or libraries will be used?_

- **Astro** — static site generator
- **`@astrojs/starlight`** — docs framework on top of Astro
- **Pagefind** — search index (bundled by Starlight)
- **DM Sans** via **Google Fonts** — typography
- **GitHub** — repo hosting, **GitHub Actions** for CI, **GitHub Pages** for deploy
- **Node.js 18+** and **npm** (or pnpm) — local dev
- **TypeScript** — typed component logic and data files
- **(Optional)** Prettier / ESLint for code style; Astro's defaults are fine to start

**Version policy — applies to every package we add.**

- **Stable releases only.** No alpha, beta, release-candidate, or any other pre-release version of any package. If the latest published version is a pre-release, we step down to the most recent stable.
- **Soak period: ≥ 3 months in production.** A version must have been released **at least three calendar months before we install it**. As of project start (2026-05-19) that means **released on or before 2026-02-19**. This filters out brand-new versions that haven't yet absorbed real-world bug reports.
- **No stale versions either.** Within the above constraints, take the **latest** qualifying version — don't pin to something a year or more old just because it's "safe."
- **Scope.** The policy applies to every direct dependency we add ourselves (Astro, Starlight, any plugin or component library we pull in). Transitive dependencies of those packages aren't separately pinned — they ride whatever range our direct dependency declares.
- **Where this gets checked.** Before each `npm install <pkg>` during the build phase, look up the package's release history on npm, confirm a stable version satisfies the soak period, and install that exact version (pin with `--save-exact` or the equivalent).

## Risks & Unknowns
_What might block us, or what needs more investigation?_

- **Can Starlight's per-route sidebar be driven entirely from `skills.ts`** the way we want? Almost certainly yes (sidebar is a config value in `astro.config.mjs`, which is just JS — we can compute it from the skills array). To verify in M1.
- **Does Starlight's Header override accept arbitrary content** without breaking the search modal or theme toggle behavior? To confirm in M2; if it constrains us, fall back to Starlight's `components` override system one piece at a time.
- **Does Starlight's mobile sidebar drawer match our prototype's hamburger pattern**, or do we need to override the mobile shell as well? Likely matches; verify on a real phone in M2.
- **Pagefind's index quality** for the kind of short, command-style content we have (`:cody plan`, etc.). The prototype's search was a hand-built static list; the real Pagefind-driven search may rank differently. Address in M3 with content tuning if needed.
- **`codyskills.ai` domain availability.** Outside our control; needs to be acquired before DNS step. Non-blocking for v1 launch on `*.github.io`.
- **Per-skill download URLs** for `.zip` and `.skill` — these are placeholder `#` in the prototype. Real URLs (probably GitHub Releases assets) need to exist before launch.

## Milestones
_What are the major implementation phases or delivery checkpoints?_

- **M1 — Scaffolded site.** Astro Starlight running locally; brand colors and DM Sans applied; empty Cody Product Builder content tree; pushes to `main` deploy automatically to GitHub Pages on the default `*.github.io` URL. *Goal: prove the pipeline end-to-end with zero content.*
- **M2 — Site shell.** Skill switcher, Get Skill, GitHub icon, version badge, theme toggle, responsive breakpoints all working with placeholder content. The shell matches the chosen prototype at all three breakpoints.
- **M3 — Content draft.** Every Cody Product Builder page in the sidebar has real, Cody-drafted content. Site is feature-complete pending editorial review.
- **M4 — Editorial pass.** User reviews every page; corrections, tone, code-example accuracy, link checks.
- **M5 — v1 launch.** Final deploy. Repo tagged `v1.0.0`. Release notes written to `release-notes.md` at the repo root.
- **(M6, optional, post-launch) — Custom domain.** `codyskills.ai` DNS wired; `public/CNAME` added.

## Environment Setup
_What setup steps are needed to start development or run the app?_

- **Node.js 18+** and **npm** (or pnpm) installed locally.
- Clone the repo, then from the repo root:
  ```
  npm install
  npm run dev          # local dev server, usually http://localhost:4321
  npm run build        # produces ./dist (the static site)
  npm run preview      # serves the built site locally
  ```
- **Recommended VSCode extensions:** Astro, MDX, Prettier.
- **GitHub Pages setup (one-time):** in repo Settings → Pages, set the source to "GitHub Actions". The workflow handles the rest.
- **Custom domain (later):** add `public/CNAME` with `codyskills.ai`; at the registrar, point an `A` record (or `ALIAS`) at GitHub Pages' IPs and a `CNAME` for `www` at the `*.github.io` URL.
