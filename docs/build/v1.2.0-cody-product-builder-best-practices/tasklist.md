# Version Tasklist – v1.2.0 — Cody Product Builder Best Practices
This document outlines all the tasks to work on to deliver this particular version, grouped by phases.

Implements the v1.2.0 entry in `feature-backlog.md` and the design in `design.md` (same folder). Documents the **Best Practices** functionality added in Cody Product Builder v2.2.0 on the documentation site.

| Status |      |
|--------|------|
| 🔴 | Not Started |
| 🟡 | In Progress |
| 🟢 | Completed |


## Phase 1 — New page, metadata & changelog

The net-new content: the canonical Best Practices reference page, the skill version bump + sidebar registration, and the changelog entry. These land together because a sidebar slug with no matching content file fails the Astro build.

| ID  | Task | Description | Dependencies | Status | Assigned To |
|-----|------|-------------|--------------|--------|-------------|
| 1.1 | Draft Best Practices reference page | Create `src/skills/cody-product-builder/reference/best-practices.md` per the section plan in `design.md`. Cover: what it is and why; the project-level `best-practices/` **folder** (holds the project's best-practices file(s); today just `project-best-practices.md`, with stack-specific files like `swift-best-practices.md` as a forward-looking one-liner); categories + entry format (one rule + one-line why, no version tags); when Cody **reads** it (design, patch start, implementation, refresh); when Cody **writes** it (automatically after each version/patch **and** on demand — "please add this to our best practices"); kept lean (contrast with the append-only Prototypes Findings Log); lazy creation for older projects. Draft from the real skill source, not memory. | None | 🟢 Completed | AGENT |
| 1.2 | Version bump + sidebar entry | In `src/skills/cody-product-builder/skill.ts`: change `version: '2.1.0'` → `'2.2.0'`, and add `{ label: 'Best Practices', slug: 'reference/best-practices' }` as the **first** item in the **Reference** sidebar group (order: Best Practices → Prototypes → Project Settings → Changelog). | 1.1 | 🟢 Completed | AGENT |
| 1.3 | Changelog entry | Add `## v2.2.0 · Best Practices (2026-06-12)` as the newest (top) entry in `src/skills/cody-product-builder/reference/changelog.md`, in the house style. | None | 🟢 Completed | AGENT |
| 1.4 | Verify Phase 1 locally | Run `npm run build` (and/or `npm run dev`). Confirm: build passes, the new page renders at `/docs/cody-product-builder/reference/best-practices/`, the sidebar shows Best Practices first under Reference, and the VersionBadge reads 2.2.0. | 1.1, 1.2, 1.3 | 🟢 Completed | AGENT |


## Phase 2 — Consistency pass

Weave short, linked mentions of Best Practices into the pages where the feature actually appears in the workflow, so the docs are internally consistent. Use the `<project-path>/` placeholder style in any new prose; keep the diff scoped to Best Practices (no blanket path refactors).

| ID  | Task | Description | Dependencies | Status | Assigned To |
|-----|------|-------------|--------------|--------|-------------|
| 2.1 | Update Build Phase page | `workflow/build-phase.md`: note Cody reads Best Practices when generating the design and during implementation, and captures learnings into `project-best-practices.md` after each version/patch ships. Add `best-practices/` to the project layout where relevant; link to the new Best Practices page. | 1.1 | 🟢 Completed | AGENT |
| 2.2 | Update Versions & Patches page | `workflow/versions-and-patches.md`: in "After a version or patch ships," add that Cody captures build learnings into Best Practices. Show `best-practices/` as a project-level sibling (of `build/`) in the "What lives where" layout. | 1.1 | 🟢 Completed | AGENT |
| 2.3 | Update :cody refresh page | `commands/refresh.md`: add a step to the documented refresh flow for loading the project's Best Practices so the agent works to the project's standards from the start of the session. | 1.1 | 🟢 Completed | AGENT |
| 2.4 | Update :cody build page + Overview | `commands/build.md`: note Best Practices are consulted/captured during the build. `index.md` (Overview): introduce the project-level `best-practices/` folder where the project structure is described (one line). **Do not** touch the Project Settings page — it stays strictly `cody.json`-scoped. | 1.1 | 🟢 Completed | AGENT |
| 2.5 | Verify Phase 2 locally | Run `npm run build`. Confirm build passes and all new internal links resolve (no broken `/docs/cody-product-builder/...` links). | 2.1, 2.2, 2.3, 2.4 | 🟢 Completed | AGENT |


## Phase 3 — Editorial pass

| ID  | Task | Description | Dependencies | Status | Assigned To |
|-----|------|-------------|--------------|--------|-------------|
| 3.1 | Editorial review | USER reviews every new and changed page for tone, accuracy, link checks, and consistency with the existing Cody Product Builder voice. Confirm the on-demand-capture phrasing matches how the skill actually behaves. | Phase 1, Phase 2 | 🟢 Completed | USER |
| 3.2 | Apply editorial edits | AGENT applies the corrections from the editorial review. | 3.1 | 🟢 Completed | AGENT |
| 3.3 | Final test & commit | USER does the single final review of all of v1.2.0 (Phases 1–3), then commits everything to git. Per-phase USER check/commit gates were intentionally removed — this is the one review point before deploy. | 3.2 | 🟢 Completed | USER |


## Phase 4 — Deploy

| ID  | Task | Description | Dependencies | Status | Assigned To |
|-----|------|-------------|--------------|--------|-------------|
| 4.1 | Final build check | Run `npm run build` one last time on the final content. Confirm a clean build. | Phase 3 | 🟢 Completed | AGENT |
| 4.2 | Push & deploy | Push `main`. GitHub Actions builds and deploys to GitHub Pages. | 4.1 | 🟢 Completed | USER |
| 4.3 | Verify live | Confirm the live site shows v2.2.0, the new Best Practices page (first under Reference), and the changelog entry. | 4.2 | 🟢 Completed | USER |
| 4.4 | Tag release | Released via version-prefixed commit (repo uses no git tags; matches v1.0.0/v1.1.0). Tag the release `v1.2.0` (matching the v1.0.0 / v1.1.0 convention). | 4.3 | 🟢 Completed | USER |

> After Phase 4, the `:cody build` version-completion flow runs: mark the version completed in the feature backlog, write the retrospective, capture best practices, bump `cody.json`, and update root `release-notes.md`.
