---
title: The Build Phase
description: Turn the plan into a feature backlog and ship shippable versions, one at a time. The second half of the Cody Product Builder workflow.
---

The Build phase translates the plan into structured, version-based execution. You run it whenever you want to ship new work: a fresh version, continuing an existing version, or a quick patch.

## What the Build phase produces

The Build phase owns one shared document plus a folder per version (and per patch), all under `cody-projects/product-builder/build/`:

| Artifact | What it is |
|----------|------------|
| `feature-backlog.md` | The master list of features and enhancements, organized by version. Includes a free-form **Backlog** section for unscoped ideas. Lives at the top of the Build folder. |
| `v<x.y.z>-<name>/` (per version) | One folder per version, containing `design.md`, `tasklist.md`, and `retrospective.md`. |
| `v<x.y.z>-<name>/` (per patch) | One folder per patch, containing only `patch.md`. |
| `release-notes.md` | Auto-updated after each version or patch ships. Location is configurable (see [Project Settings](/docs/cody-product-builder/reference/project-settings/)). |

Inside each version folder:

| Document | Purpose |
|----------|---------|
| `design.md` | Technical implementation guidance, architecture overview, open questions. |
| `tasklist.md` | The work to do, grouped by sub-phases, with status indicators. |
| `retrospective.md` | What worked, what didn't, what to improve next time. Captured at the end. |

## How to run it

Type:

```
:cody build
```

The first time you run this on a project, Cody creates `feature-backlog.md` from your plan and flips `cody.json` from `phase: "plan"` to `phase: "build"`. You review the backlog before going any further.

After that, every `:cody build` invocation presents a menu:

1. **Create a new version.** Pick a slice of the backlog, generate `design.md` and `tasklist.md`, and start building.
2. **Work on an existing version.** Resume a version already in progress.
3. **Work on a patch.** Skip the full version cycle for a quick fix or small enhancement.

Whichever you pick, the workflow loops back to the backlog when the version or patch ships, ready for the next one.

For the full command reference, see [:cody build](/docs/cody-product-builder/commands/build/).

## Versions vs patches

A **version** is a planned, shippable slice of the backlog. Each version gets a design doc, a task list, and a retrospective. Versions use the `v<major.minor.patch>` numbering scheme, incrementing the minor or major segment.

A **patch** is a lightweight fix or small enhancement that doesn't justify the full version cycle. Each patch gets only a `patch.md` (problem, plan, solution, files changed). Patches increment the patch segment of the version number.

When to use which:

- Use a **version** when the work is planned, has multiple tasks, or needs a design discussion.
- Use a **patch** for bug fixes, copy tweaks, small enhancements, or anything that takes one focused pass.

See [Versions & Patches](/docs/cody-product-builder/workflow/versions-and-patches/) for the full naming convention and how patches fit alongside versions.

## Best Practices feed every build

The Build phase both reads and writes the project's [Best Practices](/docs/cody-product-builder/reference/best-practices/), the project's living record of learned rules, stored in `<project-path>/best-practices/project-best-practices.md`.

- **Read** when Cody generates a version's `design.md`, when it starts a patch, and as it writes code, so new work follows conventions the project already settled on.
- **Written** after a version or patch ships: Cody captures what it learned (from the retrospective or `patch.md`, plus the session) back into the file, keeping it lean rather than appending endlessly.

You can also tell Cody to record a rule on the spot ("please add this to our best practices") without waiting for a build to finish.

## Capturing ideas without breaking flow

While you're building, ideas come up. Capture them on the spot with:

```
:cody idea <short description>
```

The idea lands in the **Backlog** section of `feature-backlog.md`. When you start a new version or patch later, Cody offers your backlog items as a starting point.

Type `:cody idea` with no arguments to view the current backlog. See [:cody idea](/docs/cody-product-builder/commands/idea/) for details.

## Resuming in a new AI session

A new AI session starts with no memory of the project. Run [:cody refresh](/docs/cody-product-builder/commands/refresh/) at the start of any new session to have Cody re-read your project documents and pick up where you left off.

## What's next

If you haven't already, scan [Versions & Patches](/docs/cody-product-builder/workflow/versions-and-patches/) for the naming convention, and [Prototypes](/docs/cody-product-builder/reference/prototypes/) for how to test a risky idea before committing it to a version.
