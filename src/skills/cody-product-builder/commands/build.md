---
title: ":cody build"
description: Start or continue the Build phase. Creates the feature backlog if needed, then offers a menu for a new version, an existing version, or a patch.
---

`:cody build` is the single entry point for everything in the [Build phase](/docs/cody-product-builder/workflow/build-phase/). It creates the feature backlog the first time you run it, then presents a menu every time after.

## When to use it

Use `:cody build` whenever you want to ship work. That includes:

- Creating the feature backlog right after `:cody plan`.
- Starting a new version.
- Continuing a version that's already in progress.
- Shipping a quick patch (bug fix or small enhancement).

## What it does

When you run `:cody build`, Cody walks through this flow:

1. **Check prerequisites.** Cody confirms the Plan phase has produced `prd.md` or `plan.md`. If it hasn't, the command stops and points you at `:cody plan` first.
2. **Check project settings.** Cody validates `cody.json` exists and is up to date. If the project predates `cody.json`, Cody migrates the older `project.json` automatically (with your confirmation).
3. **Create the feature backlog (first run only).** If `feature-backlog.md` doesn't exist yet, Cody creates it from the plan, flips `cody.json` from `phase: "plan"` to `phase: "build"`, and asks you to review the backlog before moving on.
4. **Note available prototypes.** If you've built any prototypes, Cody mentions them so you can pull one into the build conversation.
5. **Show the menu.** Cody asks:

   ```
   What would you like to do?

   1) Create a new version
   2) Work on an existing version
   3) Work on a patch (quick fix or small enhancement)
   ```

6. **Delegate.** Cody runs the workflow for whichever option you pick. Each workflow has its own start banner so you always know which one you're in.

## Picking the right option

| You want to... | Pick |
|----------------|------|
| Ship the next planned slice of work. | Create a new version. |
| Continue a version that already has a folder and a tasklist. | Work on an existing version. |
| Fix a bug or ship a small, focused enhancement without a tasklist. | Work on a patch. |

If you're not sure whether something is a version or a patch, default to a version. See [Versions & Patches](/docs/cody-product-builder/workflow/versions-and-patches/) for the rule of thumb.

## What's next

While building, you can capture ideas without breaking flow using [`:cody idea`](/docs/cody-product-builder/commands/idea/), or test risky ideas with a throwaway [`:cody prototype`](/docs/cody-product-builder/commands/prototype/). Resuming in a new AI session? Start with [`:cody refresh`](/docs/cody-product-builder/commands/refresh/).

For the conceptual overview, see [The Build Phase](/docs/cody-product-builder/workflow/build-phase/).
