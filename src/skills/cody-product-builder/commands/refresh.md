---
title: ":cody refresh"
description: Refresh the agent's memory about a project by re-reading its documents. Auto-detects brownfield projects and generates the Plan phase docs from existing code.
---

`:cody refresh` rebuilds the agent's understanding of the project by re-reading the project's own documents. A new AI session starts with no memory of your project, so refresh is how you hand context back to the agent at the start of a new session.

It also handles two adjacent jobs: detecting brownfield projects (existing codebases that don't yet have Cody documents) and optionally updating the PRD, plan, and release notes.

## When to use it

Use `:cody refresh` when:

- **You start a new AI session** on a Cody-managed project. Run it first so the agent works from current facts instead of guessing.
- **You're adopting Cody on an existing codebase.** Refresh auto-detects brownfield projects and generates `brownfield-analysis.md`, `prd.md`, and `plan.md` for you.
- **You changed something significant outside Cody** (renamed the project folder, edited `cody.json`, restructured the build folder). Refresh re-resolves paths and re-reads documents.
- **The plan drifted.** Refresh can update the PRD, plan, and release notes if you ask it to.

## What it does

When you run `:cody refresh`, Cody walks through this flow:

1. **Re-resolve the project path.** Cody re-runs its config resolver against `cody.json` to pick up any changes to `projectPath`, `releaseNotesPath`, and the placeholder paths derived from them.
2. **Brownfield check.** Cody looks for plan documents.
   - If `prd.md`, `plan.md`, or `brownfield-analysis.md` exist, continue with the standard refresh.
   - If no plan documents exist but the project has application code, Cody runs the brownfield workflow: an autonomous codebase analysis, targeted Q&A, then auto-generated `brownfield-analysis.md`, `prd.md`, and `plan.md` with explicit review gates between each.
   - If neither plan documents nor code exist, Cody suggests running `:cody plan` and stops.
3. **Check project settings.** Cody validates `cody.json` and migrates legacy `project.json` if it finds one.
4. **Review documents.** Cody reads the project documents in order, only going deeper if it needs more context:
   1. `plan.md`
   2. `prd.md`
   3. `brownfield-analysis.md` (if it exists)
   4. `feature-backlog.md`
   5. All files for the most recent version
   6. The most recent patch documents
   7. The whole project root, as a last resort
   8. Asking you directly, only if everything above is still insufficient
5. **Announce.** Cody tells you its memory is refreshed and that it's ready to work.
6. **Offer to update documents.** Cody asks `Would you also like me to review and update the PRD, plan, and release notes?` Say yes if you want the docs brought up to date with the current state of the project. Say no if you just wanted to refresh memory.

## Brownfield projects

For an existing codebase, refresh is also how you onboard. Cody performs an autonomous audit of:

- Tech stack and dependencies
- Project structure and key files
- Architecture and data model
- API endpoints and existing features

Then it runs targeted Q&A (with the same `help me` and `no more` escape hatches as `:cody plan`) and auto-generates the full Plan phase: `brownfield-analysis.md` replaces `discovery.md`, then `prd.md` and `plan.md` follow. Each document has an explicit review gate before the next is drafted.

## What's next

After refresh completes, drive Cody with the normal `:cody` commands. Most commonly, that's [`:cody build`](/docs/cody-product-builder/commands/build/) to continue building.
