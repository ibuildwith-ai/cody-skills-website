---
title: Best Practices
description: The project's own living record of build learnings. A categorized set of rules Cody reads before it builds and writes after every version and patch, kept deliberately lean.
---

Best Practices is the project's own living record of what it has learned while being built. It's a categorized set of rules, each one a short instruction plus a one-line reason, that Cody reads before it builds and updates after every version and patch.

Unlike generic, language-wide "best practices," these are specific to *your* project: the conventions you settled on, the architecture decisions you made, the traps you hit once and don't want to hit again. Over time the file becomes the project's standards, written down where the agent can actually follow them.

## What it's for

A new version, a new patch, or a new AI session all start without the context of everything that came before. Best Practices is how that context survives. When Cody designs a version, starts a patch, or refreshes its memory, it reads this file first, so the new work follows the standards the project has already settled on instead of re-deciding them (or contradicting them) every time.

The goal isn't an exhaustive style guide. It's a short, trustworthy set of rules the project has actually earned.

## How it's organized

Best Practices lives at the **project level**, in its own folder alongside `plan/` and `build/`:

```
<project-path>/
├── plan/
├── build/
├── prototypes/
└── best-practices/
    └── project-best-practices.md
```

`best-practices/` is a folder, not a single file, by design. Today it holds one file, `project-best-practices.md`, the project-wide record. In a future version it will also hold **stack-specific** best practices as their own files (for example, `swift-best-practices.md` for Swift conventions), so language- and framework-level rules sit beside the project-wide ones without crowding them.

### The `project-best-practices.md` document

The file is organized into categories. It ships with a starter set, and Cody adapts it to the project, adding a category the project needs and dropping a starter that stays empty:

| Category | What goes here |
|----------|----------------|
| **Architecture** | Structural decisions and patterns: layering, module boundaries, how the pieces fit. |
| **Code & Style** | Naming, formatting, idioms, and conventions specific to this project. |
| **Testing** | How this project tests: what to test, where tests live, what "done" means. |
| **Tooling & Dependencies** | Build tools, libraries, versions, and how the project manages them. |
| **Workflow & Process** | How work moves through the project: commits, reviews, releases, checkpoints. |
| **Gotchas** | Traps, surprises, and hard-won lessons to avoid repeating. |

### The entry format

Each entry is a single rule plus a one-line *why*:

```
- Keep command files short. **Why:** long files get skimmed and steps skipped.
```

The *why* matters: it's what lets a future session judge whether the rule still applies. Entries carry **no version tags**: this is a current statement of how the project works, not a history of how it got there.

## When Cody reads it

Cody loads Best Practices at the moments where the rules should shape the work:

- **Generating a version design**, so the design follows conventions the project already uses.
- **Starting a patch**, so even a quick fix stays consistent with everything around it.
- **During implementation**, where the loaded rules guide the code as it's written.
- **On [`:cody refresh`](/docs/cody-product-builder/commands/refresh/)**, so a fresh AI session works to the project's standards from its first action.

## When Cody writes it

Best Practices gets updated two ways.

**Automatically, after every build.** When a version or patch ships, Cody captures what it learned: from the retrospective (for a version) or the `patch.md` (for a patch), plus the working session itself, which is often where the richest signal is. It writes the new rules in, then tells you what changed and invites you to adjust. (Same pattern as the plan, PRD, and release notes: Cody writes first, then tells you.)

**On demand, whenever you want.** You don't have to wait for a build to end. Tell Cody something like *"please add this to our best practices,"* and it records the rule into `project-best-practices.md` on the spot. This is the exception, not the rule (most learnings are captured automatically), but it's there for the moment you notice a convention worth locking in mid-flow.

## Kept lean: the project's bible

The single most important property of this file is that it stays **lean**. It is the project's bible, not an append-only log.

When a new learning refines or contradicts an existing rule, Cody **changes or removes** the old rule rather than stacking a second one next to it. Empty starter categories get dropped. The file is meant to stay short enough that it's actually read and followed. A sprawling list of half-true rules is worse than a handful of trustworthy ones. This applies to on-demand additions too: a rule you add by hand is held to the same discipline.

This is the deliberate opposite of the [Prototypes](/docs/cody-product-builder/reference/prototypes/) Findings Log, which is append-only on purpose so you can see how your understanding evolved. Best Practices doesn't preserve history; it preserves the current truth.

## Older projects

Best Practices is created empty, with just the category headers, when a project's workspace is first set up. Projects that predate the feature don't have the folder yet, so Cody creates it **lazily**: the first time you build or run [`:cody refresh`](/docs/cody-product-builder/commands/refresh/) on such a project, Cody adds `best-practices/project-best-practices.md` from the template before doing anything that needs it. An empty file is expected and fine. It fills in as the project teaches Cody what to record.

## What's next

See [The Build Phase](/docs/cody-product-builder/workflow/build-phase/) for where Best Practices is read and written in the build cycle, [Versions & Patches](/docs/cody-product-builder/workflow/versions-and-patches/) for how capture fits the ship sequence, and [`:cody refresh`](/docs/cody-product-builder/commands/refresh/) for how the file is loaded at the start of a new session.
