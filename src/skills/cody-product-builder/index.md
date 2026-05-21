---
title: Cody Product Builder
description: From idea to finished product. A structured, repeatable workflow for domain experts and knowledge workers, in any AI coding environment.
---

Cody Product Builder is an agent skill that takes you from idea to finished product through a structured two-phase workflow. It gives knowledge workers and domain experts a repeatable process so projects stay scalable and maintainable, whether you're starting fresh, improving existing work, or shipping quick fixes, in any AI coding environment (Claude Code, Cursor, GitHub Copilot, and others).

## Why it exists

AI coding tools are powerful, but without structure they fall apart fast: messy prompts, inconsistent code, unclear requirements, lost context, and endless rework. Good ideas the AI suggests get buried in chat transcripts instead of being captured and evaluated.

Cody Product Builder fixes that by giving you a workflow the AI can follow, templates that eliminate guesswork, and a structure that prevents chaos without killing creativity.

## What it helps you do

- **Surface and evaluate AI-generated ideas.** Capture ideas from both you and the AI in one structured place so good suggestions aren't lost.
- **Refine ideas.** Shape sparks of inspiration into clear, well-defined product concepts.
- **Plan without overhead.** Use AI-ready documents that organize your thoughts, requirements, flows, and decisions.
- **Ship working versions.** Break work into incremental, shippable versions you can build and test fast.
- **Apply lightweight patches.** Fix bugs and ship small enhancements without a full version cycle.
- **Prototype an idea.** Build a throwaway, interactive mockup any time, before, during, or after planning and building.

## The two-phase workflow

Cody Product Builder organizes work into two phases.

**[The Plan Phase](/docs/cody-product-builder/workflow/plan-phase/)** turns raw ideas into actionable plans. It produces a discovery doc (or a brownfield analysis for existing codebases), a product requirements doc, and an implementation plan.

**[The Build Phase](/docs/cody-product-builder/workflow/build-phase/)** translates the plan into structured, version-based execution. It produces a feature backlog, then per-version design docs, task lists, and retrospectives. Lightweight patches let you skip the full cycle for small fixes.

Both phases run alongside **[prototyping](/docs/cody-product-builder/reference/prototypes/)**, which gives you disposable, self-contained experiments you can run anytime to test an idea before committing.

For naming conventions and how versions and patches are organized, see **[Versions & Patches](/docs/cody-product-builder/workflow/versions-and-patches/)**.

## Commands

You drive Cody with `:cody` commands.

| Command | What it does |
|---------|--------------|
| [:cody help](/docs/cody-product-builder/commands/help/) | Shows help and all available commands. |
| [:cody plan](/docs/cody-product-builder/commands/plan/) | Starts the Plan phase and creates a new project. |
| [:cody build](/docs/cody-product-builder/commands/build/) | Starts or continues the Build phase. Creates the feature backlog if needed, then lets you start a new version, work on an existing version, or apply a patch. |
| [:cody idea](/docs/cody-product-builder/commands/idea/) | Captures an idea to the backlog without breaking your flow, or views backlog items. |
| [:cody prototype](/docs/cody-product-builder/commands/prototype/) | Builds a throwaway prototype to test an idea. Independent of Plan and Build. |
| [:cody refresh](/docs/cody-product-builder/commands/refresh/) | Refreshes the agent's memory about the project. Auto-detects brownfield projects. |

## Where to start

New here? Begin with **[Installation](/docs/cody-product-builder/getting-started/installation/)** to add Cody to your agent, then walk through the **[Quick Start](/docs/cody-product-builder/getting-started/quick-start/)** to ship your first version end-to-end.
