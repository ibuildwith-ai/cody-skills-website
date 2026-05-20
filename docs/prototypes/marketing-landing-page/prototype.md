# Prototype – **Marketing Landing Page**
This document captures a throwaway, interactive prototype built to test an idea. A prototype is independent of the Plan and Build phases: build one whenever you want to try something, then ask Cody to use it when planning or building.

## Created
2026-05-20

## Last Updated
2026-05-20

## The Idea
Before committing Phase 7 (`src/pages/index.astro` marketing landing) to a single layout, the USER wants to *see* design directions for the home page at `codyskills.ai/`. The docs site itself already has a chosen visual direction (mockup 4 from the `design-chooser` prototype, iBuildWith.ai theme: DM Sans, `#22c55e` green, `#121212` dark). The home page should feel like the same family but is a marketing surface, not a docs surface, so the rhythm and emphasis are open.

The question it answers: **which marketing-landing direction do we build for Phase 7?**

## What to Test
- Compare three layout directions for the `codyskills.ai/` home page, all themed on the iBuildWith.ai brand:
  1. **Restrained (docs-extension)** — feels like the docs site moved to `/`. Calm, content-first, low visual energy. Closest to "the docs are the product."
  2. **Marketing-energetic** — bigger hero, accent gradient, more visual punch. Pushes typography and color while staying on brand.
  3. **Skill-showcase** — minimal hero, large detailed skill cards that take center stage. Each card sells its skill.
- Same content in all three so the layout is the variable:
  - Hero with "Created for Builders" copy.
  - Skill-card grid: Cody Product Builder (LIVE, v2.1.0), Cody Article Writer (COMING SOON), Cody Skill Auditor (COMING SOON).
  - Simple footer (copyright, links to GitHub, docs, ibuildwith.ai).
- Decide which direction (or blend) becomes the Phase 7 build target.

## Build Approach
Self-contained static HTML files, one per design direction, with inline CSS. No build step, no dependencies. A `chooser.html` index page embeds the mockups in an iframe and lets the USER flip between them. All files open directly in a browser.

- `chooser.html` — the design chooser (flip between the three)
- `mockup-1-restrained.html` — docs-extension; feels like the docs site at `/`
- `mockup-2-energetic.html` — marketing-energetic; bigger hero, more punch
- `mockup-3-showcase.html` — skill-showcase; cards-first layout

Real content lifted from existing sources (CPB README, skill descriptions) so the mockups read truthfully. Placeholder GitHub URLs use `ibuildwith-ai/cody-product-builder`.

## Findings Log
_What was learned, updated throughout the prototype session._

| Date | Finding |
|------|---------|
| 2026-05-20 | Prototype created with three marketing-landing directions, all themed on the chosen iBuildWith.ai brand. |
| 2026-05-20 | USER chose mockup 2 (energetic). Focus narrowed to refining that single mockup. |
| 2026-05-20 | Iterated mockup 2: removed eyebrow badge ("CPB v2.1.0 · Available now"), changed H1 to "Agent Skills / Created for Builders" (gradient stays on "Builders" only), removed topbar "Browse Skills" CTA, removed "Read the Docs" ghost CTA in hero, renamed remaining hero CTA from "Browse Skills →" to "Get Started →" (centered). |
| 2026-05-20 | Added new robot logo (`public/images/cody-skills-logo.png`) to mockup topbar + footer, replacing the green "C" square placeholder. Wired same file as the production favicon via Starlight's `favicon` config option; removed the old `public/favicon.svg`. |
| 2026-05-20 | Tightened lead paragraph to "...using any AI agent that supports agent skills" (replaces "using any AI coding environment"). |
| 2026-05-20 | Added "works with" label above the marquee strip (centered, lowercase, accent green, lighter weight) so the chain of supported AI environments reads as labelled, not just floating. |
| 2026-05-20 | **Major layout change to skills section:** removed the section header ("THE SKILLS / One workflow... / A growing family..."), restructured cards from 3-up grid to one-per-row with illustration on one side and content on the other (CPB illust left, CAW illust right, Skill Auditor illust left — alternating rhythm). Each card now has room for a fuller description and a status pill. Uses real iBuildWith.ai-style SVG illustrations from `public/images/`. Created `cody-skill-auditor.svg` as a temp in matching style. |
| 2026-05-20 | **Nav links overhaul (topbar + footer):** removed GitHub, renamed Docs → Documentation, added Contact, added iBuildWith.ai with a small external-link arrow (↗) to signal the parent-brand link. Same three links mirrored in both topbar and footer. |
| 2026-05-20 | **Skills dropdown added to topbar** (first item). Click-to-toggle, closes on outside click and Escape. Lists all 3 skills with icon + name + status; CPB links to its docs, the Coming Soon ones render but are non-clickable. Patterned after the docs site's SkillSwitcher for consistency. |
| 2026-05-20 | Increased gap between topbar nav items to 28px for breathing room. |
| 2026-05-20 | Contact links (topbar + footer) now point to `mailto:marcelo@ibuildwith.ai`. |
| 2026-05-20 | Removed `iBuildWith.ai` from the footer copyright line so it doesn't appear twice in the footer (still appears in the footer links). Copyright now reads simply "© 2026 Red Pill Blue Pill Studios." |
| 2026-05-20 | **Mobile menu added.** Hamburger button visible at ≤768px (replaces the desktop nav, which is hidden). Tapping opens a slide-down drawer below the topbar with Skills (all 3 listed inline, not collapsed under a dropdown — more discoverable on mobile) and the Documentation / Contact / iBuildWith.ai links. Closes on Escape and when the viewport grows past the breakpoint. |
| 2026-05-20 | **Footer restructured into 3-column layout to sync with the header.** Brand+copyright column on the left, "Skills" column listing all 3 skills (CPB linked, two Coming Soon as plain text), "Site" column with Documentation / Contact / iBuildWith.ai. Mobile collapses to a single column. |

## Likes & Dislikes
_The USER's judgment about the prototype: what works, what does not, what to keep, what to throw away, and opinions on the design and architecture._

**Chosen direction: Mockup 2 — marketing-energetic**, with substantial iteration. The other two mockups (restrained, showcase) were dropped early once mockup 2 was picked as the basis.

**Likes (carry into the Phase 7 build):**

- **Hero with gradient accent on a single word.** "Agent Skills Created for **Builders**" with the gradient on "Builders" only — concentrated visual punch without diluting across the whole headline.
- **Single centered hero CTA** ("Get Started →"). One clear action; no second ghost CTA distracting from it.
- **Soft radial green glow behind the hero** plus the dot-bordered eyebrow pill style was felt as too dressed-up — kept the glow, dropped the eyebrow badge.
- **"works with" marquee** with a quiet lowercase green label stacked above the chain of supported AI agents. Reads as a clear label, not as another tool name in the chain.
- **One skill card per row** with illustration on one side and content on the other, alternating sides (illust left → right → left). Each card has room for a proper description, a status pill, and a single CTA. Replaces the original 3-up grid.
- **iBuildWith.ai-style SVG illustrations** as the visual anchor for each skill row. Dark panel + green accents + abstract UI shapes. Already in `public/images/` for the three skills.
- **Skills dropdown in the topbar** as the first nav item. Lists all 3 skills (live + coming-soon); live one is linked, coming-soon ones render but aren't clickable. Mirrors the docs site's SkillSwitcher pattern.
- **Mobile drawer** (hamburger ≤768px) shows Skills expanded inline rather than collapsed under a dropdown — more discoverable on a phone.
- **Footer mirrors the header structure.** 3-column layout: brand+copyright | Skills | Site. Same items as the topbar, rendered as columns.
- **External-link arrow (↗) on iBuildWith.ai** signals the parent-brand link without needing "by" prose.
- **Robot logo (`cody-skills-logo.png`) in the topbar and footer**, also wired as the production favicon. Replaces the green "C" square placeholder.

**Dislikes / directions thrown away:**

- Mockup 1 (Restrained): too quiet for a marketing surface; felt like the docs site at `/`, not a separate landing.
- Mockup 3 (Showcase): the in-card feature bullets read as cluttered; the larger cards were the right instinct but the bullet list approach was wrong.
- The original 3-up card grid: too cramped, no room for illustrations, descriptions clipped at 2 lines.
- Section header above the cards ("THE SKILLS / One workflow... / A growing family..."): redundant with the hero. Dropped entirely.
- Eyebrow badge in the hero ("CODY PRODUCT BUILDER v2.1.0 · AVAILABLE NOW"): too noisy above an already-decorative hero. The status now lives only on the card row.
- Topbar "Browse Skills" green CTA: redundant once the Skills dropdown was added.
- "Read the Docs" ghost CTA in the hero: removed; the single "Get Started" CTA is enough.
- "GitHub" in the topbar/footer: not actionable at the umbrella-brand level (each skill has its own repo). Dropped; per-skill GitHub access stays on the individual docs pages.
- Brand rename to "Cody Agent Skills": discussed and rejected. Domain is `codyskills.ai`; H1 already says "Agent Skills". Adding "Agent" to the name creates domain mismatch and redundancy without gaining clarity.

**Carried as open items into Phase 7:**

- Each illustration SVG should be checked for hardcoded version text. `cody-product-builder.svg` currently has `v2.1.0` baked in as a `<text>` element; remove it (or replace with a generic label) so the SVG doesn't need updating on each release. The page-level status pill (rendered dynamically from `skill.ts`) already shows the version.
- The marketing landing must render the cards by mapping over `src/skills/index.ts`, not by hardcoding the version string. Same for the Skills dropdown.
- The "coming-soon" skills (Article Writer, Skill Auditor) need data entries (with `status: 'coming-soon'`, a marketing tagline, and an illustration path) before Phase 7 can render them from data.
- The `/` redirect in `astro.config.mjs` can be removed once `src/pages/index.astro` exists (Astro routes take precedence anyway).
- Cody Skill Auditor's SVG illustration is a temp; user may want to replace later with a custom version.

**Verdict:** the prototype answered the question ("which marketing-landing direction do we build?") with a clear winner that's been iterated to near-build-ready state. Closing the prototype; Phase 7 builds on this.
