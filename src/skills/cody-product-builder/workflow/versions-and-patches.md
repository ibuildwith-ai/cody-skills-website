---
title: Versions & Patches
description: How Cody Product Builder numbers, names, and organizes versions and patches. The conventions that keep your build folder coherent over time.
---

Cody Product Builder organizes shippable work into **versions** and **patches**. Both live inside `cody-projects/product-builder/build/`, both use the same `v<major.minor.patch>` numbering scheme, and both increment the version recorded in `cody.json` when they ship.

## Versions

A version is a planned, shippable slice of the [feature backlog](/docs/cody-product-builder/workflow/build-phase/). It gets its own folder with three documents.

| Document | Purpose |
|----------|---------|
| `design.md` | Technical implementation guidance and open questions. |
| `tasklist.md` | A detailed breakdown of tasks, grouped by sub-phases. |
| `retrospective.md` | What worked, what didn't, what to improve. Captured at the end. |

Versions increment the **major** or **minor** segment of the version number. Use:

- A **major** bump (`v1.0.0` → `v2.0.0`) for breaking changes, large reworks, or significant new capability.
- A **minor** bump (`v1.0.0` → `v1.1.0`) for additive, backward-compatible work.

## Patches

A patch is a lightweight fix or small enhancement that skips the full version cycle. It gets its own folder containing only `patch.md`, which captures the problem, the plan, the solution, and the files changed. No design doc, no tasklist, no retrospective.

Patches increment the **patch** segment of the version number (`v1.1.0` → `v1.1.1`).

Use a patch when:

- It's a bug fix.
- It's a small enhancement or copy tweak.
- The work takes one focused pass.
- The change does not need a design discussion.

If any of those don't apply, use a version instead.

## Naming convention

Both version and patch folders use the same name format.

**Format:** `v[major.minor.patch]-[name]`

**Example:** `v1.0.3-refactor-code`

Rules:

- Start at `v0.1.0` unless you specify otherwise.
- Names are 30 characters or fewer.
- Names are lowercase, alphanumeric only, with `-` separating words.
- Cody increments the version automatically unless you specify one.
- The `-[name]` suffix is optional. If you don't give one, the folder is just `v<x.y.z>`.

## What lives where

```
<project-path>/
├── build/
│   ├── feature-backlog.md           # Master backlog, organized by version
│   ├── release-notes.md             # Auto-updated after each ship (location configurable)
│   ├── v0.1.0-initial-version/      # First version
│   │   ├── design.md
│   │   ├── tasklist.md
│   │   └── retrospective.md
│   ├── v0.1.1-fix-login-bug/        # Patch on top of v0.1.0
│   │   └── patch.md
│   └── v0.2.0-search/               # Next version
│       ├── design.md
│       ├── tasklist.md
│       └── retrospective.md
└── best-practices/                  # Project-level, sibling of build/
    └── project-best-practices.md    # Learnings captured after each ship
```

`feature-backlog.md` is the single source of truth for what gets built next. Every version and patch is drawn from it.

## After a version or patch ships

When a version or patch ships, Cody:

- Updates `release-notes.md` with the changes.
- Captures what it learned into [Best Practices](/docs/cody-product-builder/reference/best-practices/) (`best-practices/project-best-practices.md`).
- Bumps the `version` field in `cody.json`.
- Updates the `updatedAt` timestamp in `cody.json`.

You don't have to do any of that by hand.

## What's next

See [:cody build](/docs/cody-product-builder/commands/build/) for the menu that picks between a new version, an existing version, and a patch. See [Project Settings](/docs/cody-product-builder/reference/project-settings/) for the `cody.json` reference.
