---
title: ":cody plan"
description: Create a Cody Product Builder project and run the Plan phase. Produces discovery, PRD, and plan documents through guided Q&A.
---

`:cody plan` kicks off the [Plan phase](/docs/cody-product-builder/workflow/plan-phase/) for a new project. It walks you through idea discovery, then drafts a Discovery document, a PRD, and an Implementation Plan, with explicit review gates between each.

## When to use it

Use `:cody plan` once, at the start of a brand-new (greenfield) project.

Do not use `:cody plan` if:

- You already have application code in the project. Run [`:cody refresh`](/docs/cody-product-builder/commands/refresh/) instead. Cody auto-detects the brownfield case and runs the equivalent flow.
- You already have a Plan phase in progress. `:cody plan` checks for existing plan documents before doing anything and stops if it finds them, so you don't overwrite work in progress.

## What it does

When you run `:cody plan`, Cody walks through this flow:

1. **Safety check.** Cody checks `cody-projects/product-builder/plan/` for existing documents. If any are found, the command stops and lists them. This prevents accidental overwrites.
2. **Note available prototypes.** If you've built any prototypes already, Cody mentions them so you can pull one into the planning conversation if you want.
3. **Idea discovery.** Cody asks `What do you want to create?` and runs an interactive Q&A to understand the outcome you want.
   - Type `help me` for example answers if you're stuck.
   - Type `no more` to cut the Q&A short.
4. **Confirm understanding.** Cody summarizes its understanding back to you and asks for explicit approval. This is the "we both agree" gate before anything is written.
5. **Create the project workspace.** Cody creates `cody.json` at the project root and the `cody-projects/product-builder/plan/` folder.
6. **Draft `discovery.md`.** Cody fills in the discovery template from the conversation. You review and request edits, or say `continue`.
7. **Draft `prd.md`.** Cody reads `discovery.md` and drafts the Product Requirements Document. Iterate until you're both happy with it.
8. **Draft `plan.md`.** Cody reads `prd.md` and drafts the Implementation Plan. Same iteration loop.
9. **End of phase.** Cody prints `PLAN PHASE : COMPLETED` and points you at `:cody build` to start the next phase.

## Output

By the time `:cody plan` finishes, you'll have:

```
cody.json                                       # phase: "plan", version: "0.0.0"
cody-projects/product-builder/plan/
├── discovery.md
├── prd.md
└── plan.md
```

For the brownfield variant (existing codebase), `brownfield-analysis.md` replaces `discovery.md`. That flow is triggered by [`:cody refresh`](/docs/cody-product-builder/commands/refresh/), not by `:cody plan`.

## What's next

When the Plan phase ends, run [`:cody build`](/docs/cody-product-builder/commands/build/) to create the feature backlog and start shipping versions.

For the conceptual overview, see [The Plan Phase](/docs/cody-product-builder/workflow/plan-phase/).
