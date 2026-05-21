---
title: ":cody help"
description: Show every Cody Product Builder command and what it does, with the current skill version.
---

`:cody help` prints the list of available commands and the current skill version. Useful when you've forgotten what's available or want to confirm which version of Cody Product Builder is installed.

## When to use it

- You want a quick reminder of the command surface.
- You want to confirm which version of the skill your agent loaded.

## What it does

When you run `:cody help`, Cody:

1. Reads the version from its own `SKILL.md` frontmatter (`metadata.version`).
2. Prints a header along the lines of `Cody Product Builder v<version> - Available Commands`.
3. Lists every available command and a short description of what each does.

That's it. No follow-up questions, no flow change. The skill stays in whatever state it was already in.

## The command list

These are all the `:cody` commands Cody Product Builder responds to:

| Command | What it does |
|---------|--------------|
| [:cody help](/docs/cody-product-builder/commands/help/) | Shows help and every available command. |
| [:cody plan](/docs/cody-product-builder/commands/plan/) | Starts the Plan phase and creates a new project. |
| [:cody build](/docs/cody-product-builder/commands/build/) | Starts or continues the Build phase. Creates the feature backlog if needed, then offers a new version, an existing version, or a patch. |
| [:cody idea](/docs/cody-product-builder/commands/idea/) | Captures an idea to the backlog without breaking your flow, or views backlog items. |
| [:cody prototype](/docs/cody-product-builder/commands/prototype/) | Builds a throwaway prototype to test an idea. Independent of Plan and Build. |
| [:cody refresh](/docs/cody-product-builder/commands/refresh/) | Refreshes the agent's memory about the project. Auto-detects brownfield projects. |
