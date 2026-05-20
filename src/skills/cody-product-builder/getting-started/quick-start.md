---
title: Quick Start
description: Build your first project end-to-end with Cody Product Builder. From idea to a shipped first version in one sitting.
---

This guide walks you through your first Cody Product Builder project end-to-end. You'll start with an idea, run through the Plan phase, ship your first version with the Build phase, and end with a working `release-notes.md`.

## Before you begin

Make sure Cody Product Builder is installed in your AI coding environment. See [Installation](/docs/cody-product-builder/getting-started/installation/) if you haven't done that yet.

This guide assumes a brand-new project (no existing code). For an existing codebase, see the [`:cody refresh`](/docs/cody-product-builder/commands/refresh/) command, which auto-detects brownfield projects.

## 1. Activate the skill

Open your AI coding environment in a new (or empty) project folder.

Activate Cody Product Builder either by typing the activation command (for example, `/cody-product-builder` in Claude Code) or by describing what you want in plain language ("I want to build a new product"). Cody shows its activation banner and a prompt suggesting next steps.

## 2. Run the Plan phase

Type:

```
:cody plan
```

Cody asks `What do you want to create?` and then walks you through a Q&A to fully understand the idea. If you get stuck, type `help me` and Cody offers example answers. To cut the Q&A short, type `no more`.

When you're done, Cody summarizes its understanding back to you and asks for explicit approval. Confirm or refine until you're happy with it.

Cody then creates three documents in `cody-projects/product-builder/plan/`:

| Document | Purpose |
|----------|---------|
| `discovery.md` | The unfiltered idea plus the Q&A you just had. |
| `prd.md` | The "what and why": goals, users, features, success criteria. |
| `plan.md` | The "how and when": architecture, components, milestones. |

You review each one, suggest edits, and tell Cody to continue. The Plan phase ends with a banner letting you know it's done.

For more detail, see [The Plan Phase](/docs/cody-product-builder/workflow/plan-phase/).

## 3. Start the Build phase

Type:

```
:cody build
```

The first time you run this, Cody creates the **feature backlog** (`feature-backlog.md`) from your plan. The backlog is the master list of everything that gets built, organized into versions, with a free-form **Backlog** section for unscoped ideas.

Review the backlog, then Cody asks what you want to do:

1. Create a new version
2. Work on an existing version
3. Work on a patch (quick fix or small enhancement)

Pick **option 1** to create your first version.

## 4. Ship your first version

Cody walks you through creating a new version. For each version, it generates three documents in `cody-projects/product-builder/build/v<version>-<name>/`:

| Document | Purpose |
|----------|---------|
| `design.md` | Technical implementation guidance and open questions. |
| `tasklist.md` | A detailed breakdown of tasks. |
| `retrospective.md` | Lessons learned, captured at the end. |

Work through the task list with Cody. When the version ships, Cody updates `release-notes.md` and bumps the version in `cody.json`.

The default starting version is `v0.1.0`. For naming conventions, see [Versions & Patches](/docs/cody-product-builder/workflow/versions-and-patches/).

## 5. Keep going

From here, the loop is:

- **Add a version** with `:cody build` → option 1.
- **Continue a version** with `:cody build` → option 2.
- **Ship a quick fix** with `:cody build` → option 3 (patch).
- **Capture an idea** mid-flow with `:cody idea <description>`. It lands in the backlog.
- **Try something risky** with `:cody prototype`. Throwaway, self-contained.
- **Resume in a new AI session** by activating Cody, then running `:cody refresh` to rebuild context.

That's the full workflow. Type `:cody help` any time to see the command list.
