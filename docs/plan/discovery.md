# Discovery
This document captures the raw, unfiltered idea or initial AI prompt that sparked the project.

## Starting Prompt

> I'm interested in creating a documentation website for my Cody Skills. I have 3:
>
> 1. Cody Product Builder
> 2. Cody Article Writer
> 3. Cody Skill Auditor
>
> For now, I want to document Cody Product Builder and Cody Article Writer since I'm still working on Cody Skill Auditor. The key is that I can keep adding more skills and document them.
>
> The site URL is codyskills.ai. But I don't have that set up.
>
> I want it in this style: https://www.stainless.com/docs/

## Questions

The Q&A here is consolidated. It began with an initial discovery round, then deepened through a `:cody prototype` session ([design-chooser](../prototypes/design-chooser/prototype.md)) that turned abstract preferences into concrete design and IA decisions. Where a later answer overrode an earlier one (for example: v1 scope, chosen design direction), the final answer is the one recorded.

### Audience, problem, content

**AGENT Q1:** Who is the primary audience, and what do you want them to walk away able to do?
**USER A1:** People using the skill. Whichever they use — technical or non-technical, evaluating or already using.

**AGENT Q2:** What does a single skill's documentation page need to contain?
**USER A2:** What the skill does, install, commands, example walkthroughs, workflow/phases. For Cody Product Builder specifically: the phases, how to create prototypes, the `:cody` commands.

**AGENT Q3:** Who writes the actual prose on the pages?
**USER A3:** Cody (the agent) drafts the documentation by reading the real skill folders; the user reviews and verifies everything.

### Hosting, framework, extensibility

**AGENT Q4:** How should this site be built and hosted?
**USER A4:** GitHub public Pages. Free static hosting. (Custom domain `codyskills.ai` later — not set up yet.)

**AGENT Q5:** How hands-on should adding a new skill be?
**USER A5:** Content organized by skill, all skills sharing one framework. The reader picks a skill from a switcher at the top and the whole sidebar swaps to that skill's pages — like `code.claude.com/docs`.

**AGENT Q6:** Should the docs be Markdown-based / use a static site generator?
**USER A6:** Yes. Every page is Markdown / MDX. SSG framework recommended.

**AGENT Q7:** Should the framework be flexible enough that each skill can define its own sidebar categories?
**USER A7:** Yes. Standardize on **Getting Started**, **Workflow**, and **Reference** as the mandatory categories every skill must have. Allow any skill to add its own skill-specific category between Workflow and Reference (for example **Commands** for Cody Product Builder, since `:cody plan`, `:cody build`, etc. are specific to that skill; Cody Article Writer would not have a Commands category because it's guided in plain language).

### Versions

**AGENT Q8:** Should the docs track versions?
**USER A8:** Yes, but **latest only** — no multi-version dropdown, no historical snapshots. Display the current version of each skill as a badge.

### v1 scope

**AGENT Q9:** What is in v1, and what comes later?
**USER A9:** v1 = **Cody Product Builder docs only**. The multi-skill switcher architecture ships in v1 (so the next skill is cheap to add) but only Cody Product Builder is populated. Cody Article Writer is a later version. Cody Skill Auditor when that skill is ready.

### Top bar

**AGENT Q10:** What goes in the top bar?
**USER A10:** Drop the original "Documentation / Commands / Changelog" tabs. Move Changelog into Reference as a page. The top bar is **brand · skill switcher · Get Skill (left, contextual) — search · GitHub icon · theme toggle (right, global)**.

### Get Skill button

**AGENT Q11:** What does Get Skill do?
**USER A11:** A download menu, per-skill. Each skill defines its own list of download options (`.zip`, `.skill`, etc.). The menu items change automatically when the skill switcher changes. A separate GitHub icon button links to the per-skill repo.

### Visual direction

**AGENT Q12:** Which visual direction do you want? (Asked via four full-page mockups in the [design-chooser](../prototypes/design-chooser/prototype.md) prototype.)
**USER A12:** **Mockup 4 — iBuildWith.ai theme.** Reason: it matches the existing iBuildWith.ai site identity (DM Sans, `#121212` dark background, `#22c55e` green accent, `#2a2a2a` borders), so the docs read as part of the same family.

**AGENT Q13:** Should the site support both light and dark mode?
**USER A13:** Yes. Default = dark. A sun/moon toggle in the top-right switches to light. Light mode uses a deeper green (`#16a34a`) for contrast on white; code blocks stay dark in both modes.

### Mobile

**AGENT Q14:** Should the site be mobile-friendly?
**USER A14:** Yes — locked as a v1 requirement.

## Discovery Summary

We are building a public documentation website for the **Cody Skills** family of AI agent skills. The site will live at **codyskills.ai** (DNS to be configured later; until then it runs on a `*.github.io` URL). It is hosted free on **GitHub public Pages**. Content is **Markdown / MDX**, rendered by a **static site generator** — the working recommendation is **Astro Starlight**, with Docusaurus as the fallback; the framework choice is confirmed in the PRD.

The reader experience is modeled on `code.claude.com/docs`: a persistent top bar carries the brand, a **skill switcher** (dropdown), and a **Get Skill** download menu on the left, plus **search**, a **GitHub** icon, and a **light/dark theme toggle** on the right. Selecting a different skill in the switcher swaps the whole left sidebar and the page content. Each skill displays a **version badge** showing its current version; the docs are **latest-only** — no multi-version history.

Every skill's sidebar follows a **standardized information architecture**: three mandatory categories — **Getting Started**, **Workflow**, **Reference** (Changelog lives inside Reference) — plus a flexible slot where a skill can insert its own category (for example **Commands** for Cody Product Builder). This keeps the cross-skill experience consistent while letting each skill expose what's unique about it.

**v1 scope is Cody Product Builder only.** The multi-skill switcher architecture ships in v1 so the next skill is cheap to add, but only one skill is populated. Cody Article Writer is a later version; Cody Skill Auditor whenever that skill is ready.

The site must be **mobile-friendly**: at narrower viewports the right "on this page" rail collapses, the sidebar becomes a hamburger-triggered slide-in drawer with backdrop, and top-bar controls compress to icons. The current design has been prototyped end-to-end ([design-chooser](../prototypes/design-chooser/prototype.md)) including a working skill switcher, live search, the Get Skill menu, light/dark theming, and responsive breakpoints — all decisions there flow forward into the PRD and the plan.

**Content is authored by Cody** (this agent) by reading the real skill source folders (`cody-product-builder/`, and later `cody-article-writer/`), with the user as editor reviewing and verifying every page. There is no auto-generation — re-syncing the docs after a skill changes is a manual editorial step.

The brand identity is **iBuildWith.ai**: DM Sans, `#121212` dark / `#ffffff` light, `#22c55e` green accent in dark mode and `#16a34a` in light mode, `#2a2a2a` borders. The site visibly reads as part of the iBuildWith.ai family.
