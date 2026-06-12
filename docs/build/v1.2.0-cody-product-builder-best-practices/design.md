# Version Design Document : v1.2.0 — Cody Product Builder Best Practices
Technical implementation and design guide for the upcoming version.

## 1. Features Summary
_Overview of features included in this version._

This version documents the **Best Practices** functionality introduced in Cody Product Builder **v2.2.0** on the documentation site. It is a content-and-metadata update to the already-published Cody Product Builder skill docs — **not** a new skill. The work is:

1. **Version bump + sidebar entry** (task 1.2.1) — bump the skill's `version` to `2.2.0` and add a "Best Practices" link to the Reference sidebar group in `skill.ts`.
2. **New Reference page** (task 1.2.2) — `reference/best-practices.md`, the canonical conceptual explainer, modeled on the existing Prototypes reference page.
3. **Changelog entry** (task 1.2.3) — a `v2.2.0 · Best Practices` entry at the top of the changelog page.
4. **Consistency pass** (tasks 1.2.4–1.2.7) — weave short, linked mentions of Best Practices into the four pages where the feature actually appears in the workflow (Build Phase, Versions & Patches, `:cody refresh`, `:cody build`), plus a one-line introduction of the project-level `best-practices/` folder in the Overview and/or Project Settings page.
5. **Editorial pass + deploy** (tasks 1.2.8–1.2.9).

### What Best Practices is (the feature being documented)

A project-level concept in Cody Product Builder v2.2.0:

- A `best-practices/` folder sits at the **project level**, a sibling of `plan/` and `build/` (under `projectPath`). Today it holds one file, `project-best-practices.md`. It is a **folder, not a single file** by design: stack-specific best-practice files (e.g. `swift-best-practices.md`) are expected to live alongside it in a future version. v2.2.0 ships only `project-best-practices.md`.
- The file is the project's living, **categorized** record of build learnings. Starter categories: Architecture, Code & Style, Testing, Tooling & Dependencies, Workflow & Process, Gotchas — adaptable (add what the project needs, drop empty starters).
- Each entry is **one rule plus a one-line "why."** No version tags on entries.
- **Created** empty when the project workspace is set up, or **lazily** on first build/refresh for older projects.
- **Read** when generating a version design, starting a patch, during implementation, and on `:cody refresh`.
- **Written** two ways: **automatically** after every version or patch build (captured from the retrospective/`patch.md` plus the session), and **on demand** when the user asks (e.g. "please add this to our best practices"). Both paths keep the file lean.
- Kept **lean**: when a new learning contradicts an existing rule, the old rule is changed or removed, not appended. It's the project's "bible," not an append-only log. (Contrast with the Prototypes Findings Log, which is deliberately append-only — a useful distinction to draw on the page.)

## 2. Technical Architecture Overview
_High-level technical structure that supports all features in this version._

No architectural change. This rides the existing Astro 5 + Starlight site and the established `skills.ts`-driven shell:

- **Content** lives as Markdown under `src/skills/cody-product-builder/`. A new page is just a new `.md` file with `title` + `description` frontmatter.
- **Sidebar + version badge + landing card** are all derived from `src/skills/cody-product-builder/skill.ts`. Bumping `version` there updates the VersionBadge and the marketing landing card automatically; adding a `{ label, slug }` to a sidebar group registers the new page in navigation.
- **Routing.** A Reference page at `reference/best-practices.md` resolves to the URL `/docs/cody-product-builder/reference/best-practices/`. The sidebar `slug` must be `reference/best-practices` to match.
- **Search.** Pagefind re-indexes on build; the new page is picked up automatically — no config.

**Critical build constraint:** a sidebar entry whose `slug` has no corresponding content file will fail the Astro build. So task 1.2.1 (sidebar slug) and task 1.2.2 (the page file) must both land before `npm run build` passes. Build order: create the page, then (or together) add the sidebar entry.

## 3. Implementation Notes
_Shared technical considerations across all features in this version._

### File map

| Task | File | Change |
|------|------|--------|
| 1.2.1 | `src/skills/cody-product-builder/skill.ts` | `version: '2.1.0'` → `'2.2.0'`; add `{ label: 'Best Practices', slug: 'reference/best-practices' }` as the **first** item in the **Reference** sidebar group (so order is Best Practices → Prototypes → Project Settings → Changelog). It leads because it's read across the whole build cycle and on every refresh — the most-touched Reference concept. |
| 1.2.2 | `src/skills/cody-product-builder/reference/best-practices.md` | **New file.** Canonical explainer. |
| 1.2.3 | `src/skills/cody-product-builder/reference/changelog.md` | Add `## v2.2.0 · Best Practices (2026-06-12)` as the newest (top) entry. |
| 1.2.4 | `src/skills/cody-product-builder/workflow/build-phase.md` | Note Best Practices read at design/implementation and captured after each ship; add `best-practices/` to layout where relevant; link to the new page. |
| 1.2.5 | `src/skills/cody-product-builder/workflow/versions-and-patches.md` | Add capture to "After a version or patch ships"; show `best-practices/` as a project-level sibling in "What lives where." |
| 1.2.6 | `src/skills/cody-product-builder/commands/refresh.md` | Add a "load Best Practices" step to the documented refresh flow. |
| 1.2.7 | `src/skills/cody-product-builder/commands/build.md` + `index.md` (Overview) | One-line mentions; introduce the project-level `best-practices/` folder in the Overview where the project/structure is described. **Project Settings page is left unchanged** — it stays strictly `cody.json`-scoped (resolved open question #1). |

### New Reference page — section plan (`best-practices.md`)

Mirror the structure and voice of `reference/prototypes.md`:

- **Lead paragraph** — what Best Practices is in one or two sentences.
- **What it's for** — why a project keeps its own learned rules; how it differs from generic best practices.
- **How it's organized** — the `best-practices/` folder + `project-best-practices.md`; a project layout code block showing it as a sibling of `plan/`, `build/`, `prototypes/`. The categories list. The entry format (rule + one-line why; no version tags).
- **When Cody reads it** — design generation, patch start, implementation, `:cody refresh`.
- **When Cody writes it** — two ways:
  - **Automatically (the usual path)** — after every version/patch; captured from the retrospective/`patch.md` plus the session; write-first-then-tell pattern; user can adjust entries.
  - **On demand** — you can tell Cody at any time, e.g. *"please add this to our best practices,"* and Cody records the rule into `project-best-practices.md`. The same lean discipline applies: it's still one rule + a one-line why, and a contradicted rule is changed/removed rather than stacked on top. Keep the page's emphasis on **keeping it lean** so on-demand additions don't bloat the file.
- **Kept lean (the project's bible)** — contradicted rules changed/removed, not appended. Explicitly contrast with the append-only Prototypes Findings Log.
- **The folder holds more than one file (looking ahead)** — `best-practices/` is a folder, not a single file. Today it holds the project-wide `project-best-practices.md`. It's designed so that **stack-specific** best practices can live alongside it as their own files in a **future version** — e.g. `swift-best-practices.md` for Swift conventions. Frame this as forward-looking on the page (one short line), and keep the v2.2.0 content accurate to what ships now (the single `project-best-practices.md`). Describe the folder as holding "the project's best-practices file(s)" so the structure reads correctly when those files arrive.
- **Older projects** — lazy creation on first build/refresh.
- **What's next** — link to Build Phase / Versions & Patches / `:cody refresh`.

### Path conventions in prose

Existing pages are inconsistent: some hardcode `cody-projects/product-builder/build/`, others use the `<project-path>/` placeholder. **Use the `<project-path>/` placeholder style** in all new/edited prose for this version (matches the newer Prototypes/Project Settings pages and stays correct under a custom `projectPath`). Do not do a blanket path-style refactor of untouched pages in this version — keep the diff scoped to Best Practices.

## 4. Other Technical Considerations
_Share any other technical information that might be relevant to building this version._

- **Source of truth for the feature** is the real skill at `~/.claude/skills/cody-product-builder/` — specifically `references/best-practices-capture.md`, `references/best-practices-consult.md`, `references/phases.md` (the Best Practices table row), and `assets/best-practices/project-best-practices.md` (the template with its starter categories and "how to use" notes). Draft from these, not from memory.
- **Voice/consistency:** match the existing Cody Product Builder docs — second person, present tense, short sections, tables for structured facts, relative links in the `/docs/cody-product-builder/...` form.
- **No download/asset changes.** `getSkill[]` URLs and images are untouched. This is not a new skill, so no new `skill.ts` skill object, no landing-page card wiring beyond the automatic version bump.
- **Verification before deploy:** `npm run build` must pass (catches the missing-file-for-slug failure and any broken relative links), then visual check of the new page + sidebar locally before pushing.

## 5. Open Questions
_Unresolved technical or product questions affecting this version._

- **Project Settings page (1.2.7):** ✅ **Resolved** — do **not** mention the `best-practices/` folder on the Project Settings page; keep that page strictly `cody.json`-scoped. The folder is introduced only in the Overview.
- **Sidebar placement:** ✅ **Resolved** — Best Practices is the **first** item in the Reference group (before Prototypes), because it's used across the whole system (read on design, patch, implementation, and every refresh).
