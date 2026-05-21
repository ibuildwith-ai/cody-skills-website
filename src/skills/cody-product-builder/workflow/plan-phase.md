---
title: The Plan Phase
description: Turn a raw idea into a Discovery document, a PRD, and an implementation plan. The first half of the Cody Product Builder workflow.
---

The Plan phase turns a raw idea into a set of agreed, AI-ready documents that drive the rest of the project. You run it once at the start of a greenfield project, or once when adopting Cody on an existing codebase (in which case the brownfield variant runs instead).

## What the Plan phase produces

Three documents, all stored under `cody-projects/product-builder/plan/`:

| Document | What it captures |
|----------|------------------|
| `discovery.md` | The raw, unfiltered idea plus the Q&A between you and the agent. The starting point for greenfield projects. |
| `brownfield-analysis.md` | An autonomous technical audit of an existing codebase: tech stack, architecture, dependencies, existing features, plus targeted Q&A. Replaces `discovery.md` for brownfield projects. |
| `prd.md` | The Product Requirements Document. Defines the "what and the why": goals, users, features, success criteria. |
| `plan.md` | The Implementation Plan. Defines the "how and when": architecture, components, data model, milestones, risks. |

The agent drafts each document, you review and revise, and you sign off before moving on. The whole phase is iterative: nothing is locked in until you agree.

## How to run it

For a new project, type:

```
:cody plan
```

Cody walks you through the full flow:

1. **Idea capture.** Cody asks `What do you want to create?` and runs an interactive Q&A to understand the outcome you want. Type `help me` if you need example answers. Type `no more` to cut the questions short.
2. **Confirm understanding.** Cody summarizes what it heard back to you and asks for explicit approval before writing anything.
3. **Create the discovery document.** Cody copies the `discovery.md` template into your plan folder and fills it in from the conversation.
4. **Create the PRD.** Cody reads `discovery.md` and drafts `prd.md`. You iterate on it until you're both happy.
5. **Create the plan.** Cody reads `prd.md` and drafts `plan.md`. Same iteration loop.

When all three documents are signed off, Cody prints `PLAN PHASE : COMPLETED` and points you at `:cody build` to start the Build phase.

For the full step-by-step command reference, see [:cody plan](/docs/cody-product-builder/commands/plan/).

## Brownfield projects

If you're adopting Cody Product Builder on an existing codebase, you don't run `:cody plan`. Instead, run [:cody refresh](/docs/cody-product-builder/commands/refresh/). Cody auto-detects the existing code, performs an autonomous codebase analysis, asks you targeted questions, and generates `brownfield-analysis.md`, `prd.md`, and `plan.md` automatically. The same explicit review gates apply between each document.

## When the Plan phase is "done"

You're done with the Plan phase when:

- `prd.md` and `plan.md` exist and you've signed off on both.
- `cody.json` has `phase: "plan"` (it flips to `"build"` automatically when you create the feature backlog).
- You can describe, in one or two sentences, what the product is and how the first version will be built.

If anything in those three statements is missing, stay in Plan a little longer. Catching gaps now is cheaper than catching them in Build.

## What's next

When you're ready, move to [The Build Phase](/docs/cody-product-builder/workflow/build-phase/). The Build phase turns the plan into a feature backlog and shippable versions.
