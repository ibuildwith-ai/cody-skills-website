# Prototype – **Design Chooser**
This document captures a throwaway, interactive prototype built to test an idea. A prototype is independent of the Plan and Build phases: build one whenever you want to try something, then ask Cody to use it when planning or building.

## Created
2026-05-19

## Last Updated
2026-05-20

## The Idea
The Cody Skills documentation website should look like a polished developer-docs
site in the spirit of stainless.com/docs and code.claude.com/docs. Before
committing to a single visual direction in the plan, the USER wants to *see*
options. This prototype presents four full-page HTML mockups of the same
documentation page so the USER can pick the visual direction for the real site.

The question it answers: **which design direction do we build?**

## What to Test
- Compare four visual directions for the docs site:
  1. **Stainless Minimal** — light, airy, lots of whitespace, restrained typography.
  2. **Claude Docs** — warm dark theme, coral accent, developer-familiar.
  3. **Cody Branded** — bolder identity: tinted sidebar, stronger accent, more personality.
  4. **iBuildWith.ai Theme** — themed from ibuildwith.ai's stylesheet (DM Sans, #121212 dark, #22c55e green).
- Evaluate the shared layout pattern: top bar = brand + skill switcher + search,
  left sidebar = pages for the selected skill, main content with a version badge
  and code blocks.
- Use the **skill switcher** (▾): it lists Cody Product Builder (v2.1.0) and Cody
  Article Writer (v3.0); selecting one swaps the whole page — sidebar, content,
  and version badge.
- Use **search** (⌘K or the search box): a modal with live, cross-skill results,
  match highlighting, and arrow-key navigation. Selecting a result jumps to that
  skill.
- Decide which direction (or blend) becomes the design basis for the plan.

## Build Approach
Self-contained static HTML files, one per design direction, with inline CSS — no
build step, no dependencies. A `chooser.html` index page embeds the mockups
and lets the USER flip between them. All files open directly in a browser.

- `chooser.html` — the design chooser (flip between the four)
- `mockup-1-stainless-minimal.html`
- `mockup-2-claude-docs.html`
- `mockup-3-cody-branded.html`
- `mockup-4-ibuildwith.html` — themed from ibuildwith.ai's live stylesheet

Sample content is real Cody Product Builder material (phases, `:cody` commands)
so the mockups read truthfully.

## Findings Log
_What was learned, updated throughout the prototype session._

| Date | Finding |
|------|---------|
| 2026-05-19 | Prototype created with three design-direction mockups. |
| 2026-05-19 | IA decision: standardized sidebar categories — **Getting Started** and **Reference** are mandatory for every skill; **Workflow** is the strong default a skill may omit; skills can insert their own categories (e.g. **Commands** for Cody Product Builder) between Workflow and Reference. |
| 2026-05-19 | Top bar trimmed to brand + skill switcher + search docs. Secondary nav removed; **Changelog** moved to a page under Reference. All four mockups updated to match. |
| 2026-05-19 | Added `mockup-4-ibuildwith.html`, themed from ibuildwith.ai's live stylesheet (DM Sans; #121212 background; #22c55e green accent; #2a2a2a borders). |
| 2026-05-19 | All four mockups rebuilt on a shared interactive core — only the theme differs now. The skill switcher is a working dropdown (Cody Product Builder v2.1.0 + Cody Article Writer v3.0); selecting a skill swaps the sidebar, content, and version badge. |
| 2026-05-19 | Added a ⌘K search modal with live, cross-skill results, match highlighting, and arrow-key navigation, so the search-results UX can be evaluated. |
| 2026-05-19 | Cody Article Writer reference: it is at v3.0 and has **no `:cody` commands** (guided in plain language) — so its sidebar uses a **Writing Styles** skill-specific category instead of a Commands category. |
| 2026-05-20 | Mockup 3 (Cody Branded) was the early front-runner; user then switched to mockup 4 (iBuildWith.ai theme) as the chosen direction because it matches the existing site's visual identity. |
| 2026-05-20 | Mockup 4 gained a **light / dark theme toggle** (sun/moon, top-right). Default = dark. Light mode uses `#16a34a` (a deeper green than the dark mode's `#22c55e`) for better contrast on white. Code blocks stay dark in both modes. |
| 2026-05-20 | **Layout alignment fixed.** Removed `max-width:1440px` from `.layout`; sidebar now aligns flush with the topbar's left padding on any viewport. Without that, on wide monitors the sidebar was offset inward from the topbar's brand. |
| 2026-05-20 | **Sidebar gutter** raised to 22px horizontal (matching the TOC's 22px). Width increased to 196px to keep label fit. Result: visual balance between left sidebar and right TOC. |
| 2026-05-20 | **Get Skill button + GitHub icon** added to mockup 4 only. Get Skill sits next to the skill switcher (left side — contextual, tied to the selected skill); GitHub icon sits with theme toggle on the right (global affordance). Get Skill's options are per-skill via an array in the SKILLS data, so each skill can expose `.zip`, `.skill`, or any other download. |
| 2026-05-20 | Get Skill button finalized: download arrow icon (left), no chevron. Menu icons converted from emoji to stroke SVG (file-with-zipper for `.zip`, lightning bolt for `.skill`) so the button and menu share one icon style. |
| 2026-05-20 | **Responsive / mobile-friendly added (mockup 4).** Breakpoints: ≤1100px hides the TOC; ≤768px collapses sidebar into a hamburger-triggered slide-in drawer with backdrop, compresses topbar controls to icon-only, swaps to single-column cards, scales down headings; ≤480px hides the GitHub icon to save space on small phones. |
| 2026-05-20 | **VERDICT: Mockup 4 (iBuildWith.ai theme) is the chosen design direction.** Default theme = dark. The plan document will be built on top of this. |
| 2026-05-20 | Removed the `core` / `skill` pill badges next to sidebar category titles. They were useful for visually explaining the standardized IA in the prototype, but they're noise in the production sidebar. The IA itself stays — categories are just rendered as plain titles now. |

## Likes & Dislikes
_The USER's judgment about the prototype: what works, what does not, what to keep,
what to throw away, and opinions on the design and architecture._

**Chosen:** Mockup 4 — **iBuildWith.ai theme**. Reason: it matches the existing iBuildWith.ai site identity (DM Sans, `#121212` dark background, `#22c55e` green accent, `#2a2a2a` borders), so the docs site reads as part of the same family.

**Likes (carried into the plan):**
- Top bar pattern: brand + skill switcher + Get Skill (contextual, left) / search + GitHub + theme toggle (global, right).
- Sidebar information architecture: **Getting Started**, **Workflow**, **Reference** mandatory; skills add their own categories (e.g. Commands for Cody Product Builder, Writing Styles for Cody Article Writer) between Workflow and Reference.
- Per-skill version badge (latest only — no multi-version docs).
- Sidebar width and gutter (196px wide, 22px horizontal padding) that mirrors the TOC's spacing.
- Light + dark theme toggle. Dark is default.
- Stroke SVG icon set (download arrow, hamburger, zipper file, bolt) — one visual system.

**Dislikes / earlier directions thrown away:**
- Mockup 1 (Stainless Minimal): too restrained for the Cody Skills brand.
- Mockup 2 (Claude Docs): the warm coral accent doesn't match iBuildWith.ai.
- Mockup 3 (Cody Branded violet): the violet brand is strong but it isn't *Marcelo's* brand; the green identity already exists at iBuildWith.ai and should carry through.
- Multi-version docs: out of scope. Latest version only.
- Top secondary nav (Documentation / Commands / Changelog tabs): dropped. Changelog moved into Reference as a page; everything else is sidebar.

**Open / to revisit during the plan:**
- Domain `codyskills.ai` — needs to be acquired and DNS pointed at GitHub Pages with a CNAME.
- Replace placeholder GitHub URLs (`bymarcelolewin/cody-product-builder`, `bymarcelolewin/cody-article-writer`) with the real repo URLs.
- Confirm framework choice: **Astro Starlight** is the recommendation (close visual fit, static output, GitHub Pages deploy). Docusaurus is the alternative.
- Decide whether the Get Skill button should download directly when a skill has only one option (currently always opens the menu).
