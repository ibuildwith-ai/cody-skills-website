---
title: Project Settings
description: The cody.json project settings file. What each field means, where it lives, and what changes it.
---

`cody.json` is the project settings file Cody Product Builder reads on every session and updates as your project moves through phases, versions, and patches. It lives at the root of your project (not inside the project's plan or build folders) so external tooling can discover Cody-managed projects.

`cody.json` is keyed by skill name. Each Cody skill has its own section. Cody Product Builder owns the `cody-product-builder` section. If you also use other Cody skills later, they sit alongside it in the same file.

## When it's created and updated

| Event | What happens to `cody.json` |
|-------|------------------------------|
| `:cody plan` (new project) | File is created. `cody-product-builder` section populated from the discovery Q&A. `phase` is `"plan"`, `version` is `"0.0.0"`. |
| Brownfield onboarding via `:cody refresh` | Same as above, but populated from codebase analysis instead of discovery. |
| Feature backlog created via `:cody build` | `phase` flips from `"plan"` to `"build"`. `updatedAt` is set to today. |
| A version ships | `version` updated to the new version number. `updatedAt` is set to today. |
| A patch ships | `version` updated (patch segment bumped). `updatedAt` is set to today. |
| Project name or description changes | `:cody refresh` offers to sync `cody.json` with the latest PRD and plan. |

## Full example

```json
{
  "cody-product-builder": {
    "name": "My Product",
    "description": "Short description of what the product is.",
    "version": "0.1.0",
    "phase": "build",
    "projectPath": "cody-projects/product-builder",
    "releaseNotesPath": "{{projectPath}}",
    "createdAt": "2026-05-19",
    "updatedAt": "2026-05-20"
  }
}
```

## Field reference

### `name`

The project's human-readable name. Captured during `:cody plan` (or brownfield onboarding) and confirmed before saving. Used in document titles and agent-facing context.

### `description`

A short description of the project, one or two sentences. Captured during discovery. Used in agent-facing context so future sessions know what they're working on.

### `version`

The project's current version in `major.minor.patch` format. Starts at `"0.0.0"` during the Plan phase and is bumped automatically when versions and patches ship. You should not edit this by hand.

For details on numbering and naming, see [Versions & Patches](/docs/cody-product-builder/workflow/versions-and-patches/).

### `phase`

The phase the project is in. One of:

- `"plan"`: Plan phase is in progress. The feature backlog does not yet exist.
- `"build"`: Build phase is in progress. The feature backlog exists.

The transition from `"plan"` to `"build"` happens automatically the first time `:cody build` creates the feature backlog.

### `projectPath`

The path (relative to the project root) where Cody stores plan, build, and prototype folders. The default is `cody-projects/product-builder`. You're prompted to change this during first-time setup.

`projectPath` is the parent of:

- `<projectPath>/plan/`
- `<projectPath>/build/`
- `<projectPath>/prototypes/`

Use no leading `./` and no absolute paths.

### `releaseNotesPath`

Where `release-notes.md` is stored. Three valid forms:

| Value | Resolves to |
|-------|-------------|
| `"{{projectPath}}"` | The build folder: `<projectPath>/build/`. |
| `"{{projectRoot}}"` | The project root (alongside `cody.json`). |
| Any other string | That literal path, relative to the project root. |

The default for fresh installs is `"{{projectPath}}"`. If the directory doesn't exist when Cody writes `release-notes.md`, it is created.

### `createdAt`

The date the project was created, in `YYYY-MM-DD` format. Set once at creation time. You should not edit this by hand.

### `updatedAt`

The date `cody.json` was last updated, in `YYYY-MM-DD` format. Updated automatically on phase transitions, version ships, and patch ships.

## Migration from `project.json`

Older Cody projects used `project.json` (inside `cody-projects/product-builder/`) instead of `cody.json` at the project root. The first time you run `:cody build` or `:cody refresh` on a project with a legacy `project.json`, Cody offers to migrate it. Confirm, and Cody copies the values into the new format and removes the old file.

## What's next

For the workflow that reads and writes `cody.json`, see [The Plan Phase](/docs/cody-product-builder/workflow/plan-phase/) and [The Build Phase](/docs/cody-product-builder/workflow/build-phase/).
