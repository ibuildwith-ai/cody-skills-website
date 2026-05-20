# Version Design Document : v1.0.0
Technical implementation and design guide for the upcoming version.

## 1. Features Summary
_Overview of features included in this version._

v1.0.0 ships the **multi-skill site shell** plus **complete Cody Product Builder documentation**, deployed to GitHub Pages. Three logical groupings of the 17 backlog items:

- **Foundation (1.1–1.4)** — Astro Starlight scaffold, brand theme, the per-skill folder architecture (`src/skills/<skill>/skill.ts`), and sidebar config derived from that data.
- **Site shell (1.5–1.11)** — Header override with the custom top-bar layout, the four custom interactive components (SkillSwitcher, GetSkillMenu, GitHubLink, VersionBadge), responsive verification, and search configuration.
- **Content & deploy (1.12–1.17)** — Cody Product Builder content: 1 skill landing page (Overview at the skill root) + 14 sub-pages organized by sidebar category (Getting Started ×2, Workflow ×3, Commands ×6, Reference ×3), plus the GitHub Actions CI/CD workflow and GitHub Pages enablement.

## 2. Technical Architecture Overview
_High-level technical structure that supports all features in this version._

**Pure static site.** No backend, no database, no runtime server. Markdown/MDX compiles to HTML/CSS/JS at build time and is served from GitHub Pages.

**Stack:**
- **Astro 5** (latest qualifying stable per the version policy) — build tool / SSG
- **`@astrojs/starlight`** — docs framework on top of Astro; supplies sidebar, mobile drawer, dark/light theming, code highlighting, MDX, and **Pagefind**-driven static search
- **TypeScript** — component logic and per-skill metadata files
- **DM Sans** via Google Fonts — typography (matches iBuildWith.ai)
- **GitHub Actions** — CI/CD on push to `main`
- **GitHub Pages** — static hosting

**Repo layout this version will produce:**

```
cody-skills-website/
├── astro.config.mjs              ← Starlight integration + sidebar derived from src/skills
├── content.config.ts             ← content collection config (loader base: ./src/skills)
├── package.json                  ← pinned exact versions
├── tsconfig.json
├── public/                       ← static assets (favicon, OG image, future CNAME)
├── src/
│   ├── pages/
│   │   └── index.astro           ← site landing page (lists the skills)
│   ├── skills/                   ← ONE FOLDER PER SKILL (metadata + content together)
│   │   ├── index.ts              ← barrel: imports each skill.ts, exports `skills` array
│   │   └── cody-product-builder/
│   │       ├── skill.ts          ← metadata for this skill
│   │       ├── index.md          ← Overview — URL: /cody-product-builder/
│   │       ├── getting-started/
│   │       │   ├── installation.md
│   │       │   └── quick-start.md
│   │       ├── workflow/
│   │       │   ├── plan-phase.md
│   │       │   ├── build-phase.md
│   │       │   └── versions-and-patches.md
│   │       ├── commands/
│   │       │   ├── plan.md
│   │       │   ├── build.md
│   │       │   ├── prototype.md
│   │       │   ├── idea.md
│   │       │   ├── refresh.md
│   │       │   └── help.md
│   │       └── reference/
│   │           ├── prototypes.md
│   │           ├── project-settings.md
│   │           └── changelog.md
│   │   (future skills add a sibling folder — see "Adding a new skill" below)
│   ├── components/
│   │   ├── Header.astro          ← overrides Starlight's default Header
│   │   ├── SkillSwitcher.astro
│   │   ├── GetSkillMenu.astro
│   │   ├── GitHubLink.astro
│   │   └── VersionBadge.astro
│   └── styles/
│       └── theme.css             ← brand overrides for Starlight's CSS custom properties
├── .github/
│   └── workflows/
│       └── deploy.yml            ← build + deploy to GitHub Pages
├── docs/                         ← Cody workspace (plan/build/prototypes; NOT site content)
├── cody.json
├── .gitignore
└── (release-notes.md written at project root after each version)
```

**Routing model — `/` for marketing, `/docs/` for documentation.** The site has two distinct routing regions:

| URL | What it is | Source |
|---|---|---|
| `/` | Marketing landing page for all Cody Skills, with per-skill CTA cards | `src/pages/index.astro` (custom Astro page) |
| `/docs/` | Quiet redirect to the **default skill's** Overview (first skill in the barrel file) | Astro `redirects` config |
| `/docs/<skill>/` | The skill's Overview | `src/skills/<skill>/index.md` |
| `/docs/<skill>/<category>/<page>/` | A content page | `src/skills/<skill>/<category>/<page>.md` |

**File ↔ URL mapping.** Folder names under `src/skills/` map 1:1 to URL slugs, with a `/docs/` prefix applied by the content loader (see below):

| File on disk | Public URL |
|---|---|
| `src/skills/cody-product-builder/index.md` | `/docs/cody-product-builder/`  *(the Overview)* |
| `src/skills/cody-product-builder/getting-started/installation.md` | `/docs/cody-product-builder/getting-started/installation/` |
| `src/skills/cody-product-builder/commands/plan.md` | `/docs/cody-product-builder/commands/plan/` |
| `src/skills/cody-article-writer/workflow/draft.md` *(future)* | `/docs/cody-article-writer/workflow/draft/` |

`skill.ts` is not picked up as content because the loader pattern only matches `.md` / `.mdx`.

**Default skill convention.** The **first skill exported from `src/skills/index.ts`** is the default. `/docs/` redirects to that skill's Overview. To change the default, reorder the imports/exports in the barrel file — no separate `default: true` flag needed.

## 3. Implementation Notes
_Shared technical considerations across all features in this version._

**Version policy at install time.** Every package added via `npm install` must be a stable release (no alpha/beta/rc) and must have been released **on or before 2026-02-19** (≥ 3 months before today, 2026-05-19). Within those constraints, take the latest. Pin exactly (`--save-exact`) so `package.json` shows no `^` or `~`. Verify each direct dependency's release date on npm before installing.

**Skill data flow.** Each skill is a **self-contained folder** under `src/skills/<skill-id>/`. The folder contains a `skill.ts` metadata file (id, name, version, github URL, `getSkill[]`, `sidebar[]`) plus the skill's content as `.md` files. A small **barrel file** at `src/skills/index.ts` imports every skill's `skill.ts` and exports them as a single `skills` array. `astro.config.mjs` imports that array and derives Starlight's per-route sidebar config from it. Custom components in the Header read the active skill from the current URL prefix at render time.

**Content collection config.** `content.config.ts` at the project root tells Starlight where to load content from AND prefixes every content ID with `docs/`, which Starlight uses as the route. That's the single line that mounts all documentation under the `/docs/` URL prefix:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: glob({
      base: './src/skills',
      pattern: '*/**/*.{md,mdx}',
      generateId: ({ entry }) =>
        `docs/${entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '')}`,
    }),
    schema: docsSchema(),
  }),
};
```

The `pattern` matches only Markdown files, so `skill.ts` and any other non-markdown file in the skill folders is naturally excluded. The `generateId` callback strips file extensions and trailing `/index` so an `index.md` file becomes the parent URL (e.g. `cody-product-builder/index.md` → ID `docs/cody-product-builder` → URL `/docs/cody-product-builder/`).

**Redirecting `/docs/` to the default skill.** Configure Astro's `redirects` in `astro.config.mjs`, sourcing from the first entry in `src/skills/index.ts`:

```ts
import { skills } from './src/skills';

export default defineConfig({
  redirects: {
    '/docs': `/docs/${skills[0].id}/`,
  },
  integrations: [starlight({ /* ... */ })],
});
```

If the barrel file's first export changes, the redirect target follows automatically — no manual sync.

**Sidebar — visual position vs. URL are independent.** In `skill.ts`, a sidebar item declares a `label` (what the reader sees) and a `slug` (which file/URL it points to). They are independent — an item can live visually inside any category group while its URL points anywhere within the skill. The conventions for `slug`:

- `slug: ''` — resolves to the skill's `index.md`, URL `/<skill-id>/`. Used for the **Overview** item, which sits visually inside Getting Started but routes to the skill root.
- `slug: '<category>/<page>'` — resolves to `src/skills/<skill>/<category>/<page>.md`, URL `/<skill>/<category>/<page>/`.

Sketch for Cody Product Builder's sidebar (lives in its `skill.ts`):

```ts
sidebar: [
  { label: 'Getting Started', items: [
      { label: 'Overview',     slug: '' },                              // /cody-product-builder/
      { label: 'Installation', slug: 'getting-started/installation' },
      { label: 'Quick Start',  slug: 'getting-started/quick-start' },
  ]},
  { label: 'Workflow', items: [
      { label: 'The Plan Phase',     slug: 'workflow/plan-phase' },
      { label: 'The Build Phase',    slug: 'workflow/build-phase' },
      { label: 'Versions & Patches', slug: 'workflow/versions-and-patches' },
  ]},
  { label: 'Commands', items: [
      { label: ':cody plan',      slug: 'commands/plan' },
      { label: ':cody build',     slug: 'commands/build' },
      { label: ':cody prototype', slug: 'commands/prototype' },
      { label: ':cody idea',      slug: 'commands/idea' },
      { label: ':cody refresh',   slug: 'commands/refresh' },
      { label: ':cody help',      slug: 'commands/help' },
  ]},
  { label: 'Reference', items: [
      { label: 'Prototypes',       slug: 'reference/prototypes' },
      { label: 'Project Settings', slug: 'reference/project-settings' },
      { label: 'Changelog',        slug: 'reference/changelog' },
  ]},
]
```

**Adding a new skill — three steps:**
1. Create `src/skills/<new-skill-id>/skill.ts` with the metadata.
2. Create `index.md` at the skill root (the Overview) and category folders with `.md` files matching the slugs in `skill.ts`. Each file's frontmatter sets its `title` and `description`.
3. Add one line to `src/skills/index.ts`:
   ```ts
   import newSkill from './<new-skill-id>/skill';
   export const skills = [codyProductBuilder, newSkill /* preserves switcher order */];
   ```

That's it. The skill switcher, sidebar, Get Skill menu, GitHub icon, and version badge all read from `src/skills/index.ts` and update automatically — no other code changes.

**Getting back to the Overview.** Three navigation paths:
1. The **"Overview" link in the sidebar** (top of Getting Started) — always one click away.
2. **Re-selecting the active skill in the switcher** — navigates to `/docs/<skill-id>/`.
3. (Optional) clicking the brand logo goes to the site landing page (`/`) where the reader can pick a skill via per-skill CTAs.

**The marketing landing page (`/`).** `src/pages/index.astro` is a custom Astro page (not Starlight content) — full creative freedom. v1 follows the "Created for Builders" pattern from [ibuildwith.ai](https://ibuildwith.ai):

> ### Created for Builders
> Real products born from real workflows. Each one designed to help you learn and build professional products with AI.

Below the hero, a grid of skill cards:

- **Shipped skills** — one card per entry in `src/skills/index.ts`, showing name, version, description (lifted from the existing ibuildwith.ai cards), and a **"See docs →"** link to `/docs/<id>/`.
- **Coming Soon cards** — visually muted, non-interactive placeholders for skills not yet shipped (in v1: Cody Article Writer, Cody Skill Auditor). For v1 these are hardcoded directly in `src/pages/index.astro` — they're short-lived, and converting each to a live card when its skill ships is a one-line edit.

The page is intentionally lean for v1 — a richer landing redesign is planned post-launch via a separate prototype.

**Components.** All custom components are written as Astro components (`.astro`). Static content is rendered server-side; interactive dropdowns (SkillSwitcher, GetSkillMenu) and theme toggle behavior use small inline `<script>` blocks (Astro's "islands" model) — no large client framework needed.

**Theme.** `src/styles/theme.css` overrides Starlight's CSS custom properties for both light and dark modes. Registered via Starlight's `customCss` config option. Keep all color/font/radius tokens defined as CSS variables so the file is the one place to tune the brand.

**Mobile.** Starlight ships responsive sidebar/drawer behavior out of the box. Plan A: verify it matches the prototype's hamburger pattern and ship as-is. Plan B (if mismatched): override only the specific component(s) that differ; don't reinvent the whole shell.

**Search.** Pagefind is bundled with Starlight; it indexes generated HTML at build time and serves a fully client-side ⌘K modal — no external service. Defaults are good; tune only if `:cody command`-style content ranks poorly.

**Downloads.** Per-skill download files (`.zip`, `.skill`, future formats) live at `public/downloads/<skill-id>/<filename>`. Astro serves the `public/` directory at the site root as static assets, so the URL is `/downloads/<skill-id>/<filename>`. Each `getSkill` entry in `skill.ts` points its `href` at that URL. Files are committed to git and served by GitHub Pages alongside the rendered site.

**SEO — handled automatically by Starlight.** No separate SEO file or config to maintain.

- **Per-page** — each `.md` file's frontmatter `title:` and `description:` populate `<title>`, `<meta description>`, Open Graph (`og:title`, `og:description`, `og:type`), and Twitter Card tags.
- **Per-skill landing SEO** — `src/skills/<skill>/index.md`'s frontmatter is the SEO for the skill's root URL (`/<skill-id>/`). This is what someone sees in Google or social previews when sharing the skill's "home" URL.
- **Site-wide** — `title`, `description`, and `site` (the canonical URL) on Starlight's config in `astro.config.mjs` set the fallbacks. A `head:` array can inject custom `<meta>` tags (e.g. a site-wide default OG share image).
- **Title formatting** — Starlight auto-appends the site title, e.g. `<title>Installation | Cody Skills</title>`. No per-page boilerplate.
- **Sitemap** — auto-generated by `@astrojs/sitemap`, bundled with Starlight. No work.
- **Per-page OG share image** (optional) — set in frontmatter; falls back to the site-wide default. A Cody-Skills-branded default OG image (1200×630) ships by v1 launch.

**Content authoring.** Each content page is drafted by Cody (this agent) from the corresponding real-skill source files in `/Volumes/Spock/Development/github/ibuildwith-ai/cody-skills/cody-product-builder/` (`SKILL.md`, `commands/*.md`, `references/*.md`), then reviewed and edited by the user. A page is "done" only when the user has signed off.

**CI/CD.** Single workflow at `.github/workflows/deploy.yml`. Steps: checkout → setup Node 20 → `npm ci` → `npm run build` → upload `./dist` as the GitHub Pages artifact → deploy. Triggers on push to `main`. The first successful run produces the `*.github.io` URL the site lives at until DNS is wired.

## 4. Other Technical Considerations
_Shared any other technical information that might be relevant to building this version._

- **Accessibility.** All interactive controls (SkillSwitcher, GetSkillMenu, theme toggle, hamburger) get keyboard support (Enter / Space to open, Escape to close, arrow keys where it makes sense) and proper ARIA labels. Sidebar links use semantic `<a>`. Icon-only buttons get `aria-label`. Focus is visible and trapped inside open modals/menus while they're open.
- **Performance.** Astro emits zero client JS by default; only the islands that need interactivity get JS. Aim for a Lighthouse Performance score ≥ 95 on a representative content page at v1 launch.
- **Code highlighting.** Starlight uses Shiki. Default theme honors light/dark mode. No custom config needed unless a specific token color clashes with the brand.
- **Legal / footer.** Footer content (copyright, link to iBuildWith.ai) goes in a small custom footer component. Out of v1.0.0 scope unless the user wants it explicitly — defer to a patch if needed.
- **404 page.** Starlight ships a default 404. Style it to match brand at minimum; full custom design is not v1 scope.

## 5. Open Questions
_Unresolved technical or product questions affecting this version._

- **Exact Astro and Starlight versions** — to determine at install time by checking npm release dates against the version policy. Will be recorded in `package.json`.
- **Pagefind tuning** — leave for late in the version build; address only if search ranking is visibly poor in practice.
- **Astro vulnerability advisories (accepted for v1.0.0)** — Three advisories affect `astro ≤ 6.1.9` (remote allowlist bypass, `define:vars` XSS, server-island replay). Fix would force-upgrade to Astro 6.3.6, which violates the version policy. Our site doesn't exercise the affected surfaces in a way that creates real risk (no remote image allowlists, no untrusted `define:vars` input, no server islands — we're 100% static). Revisit when Astro 6.x soaks past the 3-month policy (≈ 2026-08).
- **GitHub Actions exempt from the npm version policy** — The version policy targets npm packages going into the built artifact. GitHub Actions are CI tooling, not application dependencies, and have a separate lifecycle (major tags auto-receive patch updates; deprecations are time-bound by GitHub). For Actions we use the latest stable major tags and accept patch auto-updates. Current pins: `actions/checkout@v6`, `actions/setup-node@v6`, `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5` — all Node 24 compatible, no deprecation warnings.
- **Cody Skill Auditor description** — a one-sentence description is needed for its "Coming Soon" card on the landing page. User to supply before Phase 7 completes.

**Resolved during planning:**
- GitHub repo URL → `https://github.com/ibuildwith-ai/cody-product-builder` (future skills follow `github.com/ibuildwith-ai/<skill-id>`).
- Download URLs → user provides the artifacts; stored at `public/downloads/<skill-id>/<filename>`.
- "Last updated" timestamps → disabled. Version badge is the only versioning surface.
- Favicon → custom Cody Skills mark (designed during v1, replaced post-v1 by the user).
- OG share image → custom 1200×630 branded image (`#121212` background, `#22c55e` accent), replaced post-v1.
- Landing page content → "Created for Builders" pattern; copy lifted from ibuildwith.ai. Richer redesign deferred to post-launch.
