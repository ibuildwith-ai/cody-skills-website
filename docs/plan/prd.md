# Product Requirements Document (PRD)
This document formalizes the idea and defines the what and the why of the product the USER is building.

## Section Explanations
| Section           | Overview |
|-------------------|--------------------------|
| Summary           | Sets the high-level context for the product. |
| Goals             | Articulates the product's purpose — core to the "why". |
| Target Users      | Clarifies the audience, essential for shaping features and priorities. |
| Key Features      | Describes what needs to be built to meet the goals — part of the "what". |
| Success Criteria  | Defines what outcomes validate the goals. |
| Out of Scope      | Prevents scope creep and sets boundaries. |
| User Stories      | High-level stories keep focus on user needs (why) and guide what to build. |
| Assumptions       | Makes the context and unknowns explicit — essential for product clarity. |
| Dependencies      | Identifies blockers and critical integrations — valuable for planning dependencies and realism. |

## Summary
_A 1–2 sentence high-level description of the product or feature._

**Cody Skills Documentation Website (codyskills.ai)** is a public, multi-skill documentation site for the Cody Skills family of AI agent skills. v1 documents **Cody Product Builder** and ships the multi-skill architecture so additional skills (Cody Article Writer, Cody Skill Auditor, future skills) can be added in subsequent versions with minimal effort.

## Goals
_What are we trying to achieve? List the key objectives or outcomes._

- **Give Cody Skills a public home.** Replace "read the SKILL.md in the repo" with a polished, browsable site that a reader can navigate without prior context.
- **Make every skill feel like part of one family.** A consistent shell — top bar, skill switcher, sidebar IA, search, Get Skill, theme — so a reader who learns one skill's docs already knows how to read the next.
- **Make adding the next skill cheap.** New skills drop into the framework as content-only changes; no architectural work to onboard them.
- **Match the iBuildWith.ai brand identity** so the site reads as part of the existing family of products, not a separate property.
- **Stay free and self-hostable.** Deployable to GitHub Pages with no paid services in the critical path.

## Target Users
_Who is this for? Briefly describe the audience._

People who use (or are evaluating) a Cody Skill. The audience is a **mix of technical users and non-technical domain experts** — the docs serve both. Two primary modes of use:

- **Evaluating a skill** — landing on the site to decide whether the skill fits their need.
- **Using a skill** — coming back to the docs as a reference while working with it.

## Key Features
_What core features are required to meet the goals?_

### Site shell (every skill, day-one features)

- **Top bar** — brand · **skill switcher** (dropdown listing every skill with its current version) · **Get Skill** (per-skill download menu; current options: `.zip`, `.skill`) on the left; **search** (⌘K modal with live cross-skill results, match highlighting, keyboard navigation) · **GitHub** icon (per-skill repo) · **light/dark theme toggle** on the right.
- **Left sidebar — standardized IA per skill.** Three mandatory categories — **Getting Started**, **Workflow**, **Reference** (Changelog lives here) — and a flexible slot where a skill may insert its own category (e.g. **Commands** for Cody Product Builder). Selecting a different skill in the switcher swaps the whole sidebar and the page content.
- **Right rail — "on this page"** TOC of in-page section anchors. Hidden at narrower viewports.
- **Version badge** at the top of every skill's pages showing the current shipped version. **Latest-only** — no multi-version dropdown, no historical snapshots.
- **Theming.** Dark mode by default; light mode toggleable; preference persists across pages within a session. Brand: DM Sans, `#121212` dark / `#ffffff` light backgrounds, `#22c55e` green accent (dark mode) / `#16a34a` (light mode).
- **Responsive design.** At ≤ 1100px the right rail hides. At ≤ 768px the sidebar collapses into a hamburger-triggered slide-in drawer with backdrop, top-bar controls compress to icons. At ≤ 480px the GitHub icon hides.

### v1 content — Cody Product Builder docs

- **Getting Started** — Overview, Installation, Quick Start
- **Workflow** — The Plan Phase, The Build Phase, Versions & Patches
- **Commands** (skill-specific) — `:cody plan`, `:cody build`, `:cody prototype`, `:cody idea`, `:cody refresh`, `:cody help`
- **Reference** — Prototypes, Project Settings, Changelog

Content is drafted by Cody (this agent) from the real skill source folder; the user reviews and verifies every page.

## Success Criteria
_How do we know it worked?_

- A reader can land on `codyskills.ai`, choose Cody Product Builder, and successfully install it and run their first `:cody plan` end-to-end using only the docs on the site.
- The site renders correctly on desktop, tablet, and mobile (verified at three breakpoints: ≥ 1100px, 768–1100px, < 768px). All interactive controls (skill switcher, search, Get Skill, theme toggle, hamburger drawer) work on touch.
- The site loads and is usable without JavaScript-heavy interaction blocking initial render (static HTML + progressive enhancement).
- Adding the second skill (Cody Article Writer) is a content-only change — no architectural work, no shell changes — confirmed by the size and shape of the diff that ships v2.
- The site visibly reads as part of the iBuildWith.ai family at a glance (typography, color, density).

## Out of Scope (Optional)
_What won't be included in the first version?_

- **Cody Article Writer documentation.** Architecture supports it; content ships in a later version.
- **Cody Skill Auditor documentation.** Pending that skill being ready.
- **Multi-version documentation.** Latest-only; no version dropdown, no historical doc snapshots.
- **Auto-generation of docs from skill source.** Re-syncing after a skill changes is a manual editorial step.
- **Custom domain `codyskills.ai` DNS wiring.** v1 ships on the `*.github.io` URL; DNS is configured separately.
- **Authenticated areas, comments, ratings, or any community features.** This is a read-only docs site.
- **Analytics beyond what GitHub Pages or a simple privacy-respecting tracker provides.**
- **Edit-on-GitHub or "suggest a change" UI.** Possible later; not v1.

## User Stories (Optional)
_What does the user want to accomplish? Keep these high-level to focus on user goals, not implementation details._

- **As someone evaluating Cody Product Builder**, I want to land on the site, read what it does and what it's for, and decide whether to install it — without leaving the page.
- **As a new user**, I want to install the skill and run my first `:cody plan` by following a single Quick Start page.
- **As a working user**, I want to look up what a specific `:cody` command does and what its phases mean, quickly, while I'm using it.
- **As a maintainer (Marcelo)**, I want to add a new skill to the site by writing Markdown — no framework changes.
- **As a reader on a phone**, I want the docs to be fully usable without horizontal scrolling, with the sidebar accessible behind a hamburger.
- **As a reader who prefers light backgrounds**, I want to toggle the site to light mode and have that preference persist while I read.

## Assumptions
_What are we assuming to be true when building this?_

- The framework choice is **Astro Starlight**. It produces static output that GitHub Pages serves directly; its visual baseline is close to the chosen design; it supports per-instance sidebar config (which the multi-skill switcher needs); and adding a skill is a content-only change. Confirmed in the plan document; Docusaurus is the fallback if Starlight surfaces a blocker.
- **Content lives in `src/content/docs/`** (Starlight's convention), separate from this Cody workspace at `docs/plan|build|prototypes/`. No collision; the two directories serve different purposes.
- **The reader's browser** supports modern CSS (Grid, Flexbox, custom properties, `position: sticky`), ES2017+ JavaScript, and emoji-free SVG iconography. No IE compatibility.
- **Skill content can be drafted from the existing skill folders** in this repo (`cody-product-builder/SKILL.md`, command files, reference files) — they contain enough material to produce useful documentation.
- **The user is comfortable** reviewing and editing Markdown directly. No CMS UI is needed.
- **Page content is stable enough between releases** that manual re-sync after a skill change is acceptable.

## Dependencies
_What systems, tools, or teams does this depend on?_

- **GitHub** — repository, GitHub Actions for build, GitHub Pages for hosting.
- **Astro Starlight** (npm package, MIT) — site framework. Includes built-in search, dark mode, sidebar, code highlighting.
- **DM Sans** via Google Fonts — typography, matching iBuildWith.ai.
- **Real skill source folders** (`cody-product-builder/`, later `cody-article-writer/`, `cody-skill-auditor/`) — the source material the documentation is drafted from. If these change shape significantly, the docs need a re-sync pass.
- **`codyskills.ai` domain registrar + DNS** — required only when the custom domain is wired up. v1 launch does not block on this.
