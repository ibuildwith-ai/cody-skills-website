# Cody Skills Website

![Version](https://img.shields.io/badge/version-1.0.0-22c55e?style=flat-square)
[![Release Notes](https://img.shields.io/badge/Release_Notes-changelog-blue?style=flat-square)](release-notes.md)

Public website and documentation for the Cody Skills family of AI agent skills.

**Live site:** [https://codyskills.ai/](https://codyskills.ai/)

## What this is

A multi-skill platform with two surfaces:

- **Marketing landing** at [`/`](https://codyskills.ai/) — hero, skill-card grid, footer. Outside the Starlight frame.
- **Documentation** at [`/docs/<skill-id>/`](https://codyskills.ai/docs/cody-product-builder/) — full docs for each shipped skill. Built on Starlight.

The architecture is data-driven from a single source of truth (`src/skills/`). Every skill is one folder; adding a new skill is a content-and-data diff, not a refactor.

## Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | [Astro](https://astro.build/) 5.17.3 | Static-first, ships zero JS by default, custom pages outside docs |
| Docs framework | [Starlight](https://starlight.astro.build/) 0.37.6 | Astro-native, sidebar/search/theming for the `/docs/*` surface |
| Language | TypeScript (strict) | Discriminated unions on `Skill` give the data layer type safety |
| Content | [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) | Markdown pages discovered via a glob loader rooted at `src/skills/` |
| Styling | Plain CSS + custom properties | Brand tokens in `src/styles/theme.css`; component-scoped styles via Astro |
| Typography | [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Loaded via Google Fonts, matches iBuildWith.ai identity |
| Search | [Pagefind](https://pagefind.app/) | Built into Starlight, indexed at build, fully static |
| Image processing | [Sharp](https://sharp.pixelplumbing.com/) 0.34.5 | Astro's default image pipeline |
| Hosting | [GitHub Pages](https://pages.github.com/) | Custom domain via `public/CNAME` |
| CI/CD | GitHub Actions | Workflow at `.github/workflows/deploy.yml`, Node 24 |

All dependencies are pinned exactly (no `^` or `~`) and stay on releases at least 3 months old before adoption. See [release-notes.md](release-notes.md) for version history.

## Project structure

```
src/
├── components/             Reusable Astro components
│   ├── MarketingHeader.astro       Custom topbar for the landing page
│   ├── Header.astro                Starlight Header override (docs site)
│   ├── SkillCard.astro             Marketing landing card row
│   ├── SkillSwitcher.astro         Docs site skill dropdown
│   ├── GetSkillMenu.astro          Docs site download menu
│   ├── PageTitle.astro             Injects breadcrumb + version pill
│   ├── VersionBadge.astro          The version pill itself
│   ├── Breadcrumb.astro
│   └── ThemeToggle.astro
├── pages/
│   └── index.astro         Marketing landing at codyskills.ai/
├── skills/                 The single source of truth
│   ├── index.ts                    Exports `skills` and `availableSkills`
│   ├── types.ts                    Discriminated union: AvailableSkill | ComingSoonSkill
│   ├── active.ts                   getActiveSkill(pathname) helper
│   └── cody-product-builder/       One folder per skill
│       ├── skill.ts                Skill metadata + sidebar config
│       └── *.md                    Content pages (Overview, etc.)
├── styles/
│   └── theme.css           Brand tokens + Starlight overrides
├── site-config.ts          Centralized constants (contact email, URLs)
└── content.config.ts       Astro Content Collection config

public/
├── images/                 General brand assets (logo, favicon)
└── skills/                 Per-skill public assets
    └── cody-product-builder/
        ├── downloads/              .zip, .skill files
        └── images/                 SVG illustrations
```

## Adding a new skill

Skills come in two states: **`coming-soon`** (placeholder on the marketing landing, no docs) and **`available`** (fully shipped with docs, downloads, and a sidebar). Most skills start as coming-soon and get promoted to available when they ship.

### Step 1 — Add the skill as `coming-soon`

For a new skill `my-new-skill`:

**1. Create the skill data file** at `src/skills/my-new-skill/skill.ts`:

```ts
import type { ComingSoonSkill } from '../types';

const skill: ComingSoonSkill = {
  id: 'my-new-skill',
  name: 'My New Skill',
  status: 'coming-soon',
  tagline:
    'Two to three sentences of marketing pitch. This shows up as the body text on the landing-page card.',
  illustration: '/skills/my-new-skill/images/my-new-skill.svg',
};

export default skill;
```

**2. Add the SVG illustration** at `public/skills/my-new-skill/images/my-new-skill.svg`. Match the visual language of the existing illustrations (600×280 viewport, dark background, green accents, abstract UI mockup shapes). Cody Product Builder's `public/skills/cody-product-builder/images/cody-product-builder.svg` is the reference.

**3. Register it in the barrel** at `src/skills/index.ts`:

```ts
import myNewSkill from './my-new-skill/skill';

export const skills: readonly Skill[] = [
  codyProductBuilder,
  codyArticleWriter,
  codySkillAuditor,
  myNewSkill,   // ← add here
];
```

That's it for coming-soon. The skill will appear on the marketing landing card grid, in the topbar Skills dropdown (greyed out), and in the mobile drawer — all automatically.

### Step 2 — Promote to `available` when the skill ships

When the actual skill is ready to launch:

**1. Convert `skill.ts` to `AvailableSkill`** by adding the four required fields:

```ts
import type { AvailableSkill } from '../types';

const skill: AvailableSkill = {
  id: 'my-new-skill',
  name: 'My New Skill',
  status: 'available',            // ← was 'coming-soon'
  tagline: '...',                  // ← same as before
  illustration: '/skills/...',     // ← same as before

  // NEW required fields for an available skill:
  version: '1.0.0',
  github: 'https://github.com/ibuildwith-ai/my-new-skill',
  getSkill: [
    {
      icon: 'zip',
      name: 'Download .zip',
      description: 'Source archive',
      href: '/skills/my-new-skill/downloads/my-new-skill.zip',
    },
    {
      icon: 'skill',
      name: 'Download .skill',
      description: 'Skill bundle (drop-in)',
      href: '/skills/my-new-skill/downloads/my-new-skill.skill',
    },
  ],
  sidebar: [
    {
      label: 'Getting Started',
      items: [
        { label: 'Overview', slug: '' },               // → /docs/my-new-skill/
        { label: 'Installation', slug: 'getting-started/installation' },
        // ... etc
      ],
    },
    // ... more sidebar groups
  ],
};
```

**2. Create the content pages** as markdown files under `src/skills/my-new-skill/`, matching every `slug` declared in the sidebar. Folder structure mirrors the slugs:

```
src/skills/my-new-skill/
├── skill.ts
├── index.md                              # slug: '' (Overview)
├── getting-started/
│   ├── installation.md                   # slug: 'getting-started/installation'
│   └── quick-start.md
├── workflow/
│   └── ...
└── reference/
    └── ...
```

Each markdown file uses Starlight frontmatter:

```markdown
---
title: Installation
description: How to add My New Skill to your AI coding environment.
---

Body content goes here.
```

**3. Place download artifacts** at `public/skills/my-new-skill/downloads/`:

```
public/skills/my-new-skill/downloads/
├── my-new-skill.zip
└── my-new-skill.skill
```

**4. Run the build** to verify everything wires up:

```bash
npm run build
```

The skill now has a full `/docs/my-new-skill/*` set of routes, appears as a live (clickable) entry in the topbar Skills dropdown, and its downloads work from the Get Skill button.

### Step 3 — Future versions of the skill

For minor bumps (the skill itself ships v1.0.1, v1.1.0, etc.):

1. Update the `version` string in `skill.ts`
2. Replace the files in `public/skills/<skill-id>/downloads/` with the new artifacts (same filenames)
3. Add a changelog entry under `src/skills/<skill-id>/reference/changelog.md` if the skill has one
4. Commit and push — GitHub Actions deploys automatically

The version pill on every docs page reads from `skill.ts` at build time, so changing the one field updates the badge everywhere.

## Development

```bash
# Install
npm install

# Local dev server with hot reload
npm run dev          # http://localhost:4321/

# Production build
npm run build        # output in dist/

# Preview the production build locally
npm run preview
```

### Browser dev tips

- Keep DevTools open with **"Disable cache"** checked (Network tab) while developing. The `/` → `/docs/*` redirect history and CSS files can be cached aggressively otherwise.
- Astro hot-reloads CSS and most components; structural changes to `astro.config.mjs` require a dev server restart.

## Deployment

Push to `main` and the GitHub Actions workflow (`.github/workflows/deploy.yml`) takes care of the rest:

1. Checkout
2. Install dependencies (`npm ci`)
3. Build (`npm run build`)
4. Upload `dist/` as a Pages artifact
5. Deploy to GitHub Pages at [codyskills.ai](https://codyskills.ai/)

The custom domain is configured via `public/CNAME` — this file ships with every deploy and is what keeps GitHub Pages routing `codyskills.ai` to this repo. Don't delete it.

## License

Copyright © 2026 Red Pill Blue Pill Studios. [iBuildWith.ai](https://www.ibuildwith.ai).
