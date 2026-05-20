---
title: Installation
description: Add Cody Product Builder to your AI coding environment, either as a packaged .skill file or as a folder dropped into your agent's skills directory.
---

Cody Product Builder is an Agent Skill. There are two ways to install it. Use whichever your AI coding environment supports.

## Option 1: The `.skill` file

Use this option for Claude.ai (desktop or web) and any other app that installs skills from a file.

1. Download `cody-product-builder.skill` from the [GitHub repository](https://github.com/ibuildwith-ai/cody-product-builder), or grab it from the **Get Skill** menu in this site's top bar.
2. Upload the file in your app's skill settings. In Claude.ai, this is done from your skills settings. For other apps, follow that app's process for adding a `.skill` file.

## Option 2: The skill folder

Use this option for coding agents that load skills from a folder, such as Claude Code, Cursor, GitHub Copilot, and Codex.

1. Clone or download the repository from [github.com/ibuildwith-ai/cody-product-builder](https://github.com/ibuildwith-ai/cody-product-builder), or download the `.zip` from the **Get Skill** menu in this site's top bar.
2. Copy the `source/cody-product-builder/` folder into your agent's skills directory, keeping the folder name `cody-product-builder`:

| Agent | Path |
|-------|------|
| Claude Code | `.claude/skills/cody-product-builder/` |
| Cursor | `.cursor/skills/cody-product-builder/` |
| GitHub Copilot | `.github/skills/cody-product-builder/` |

A skills directory inside a project makes Cody available for that project only. A skills directory in your home folder makes Cody available across all your projects. Check your agent's documentation for the exact supported locations.

## Activating

Once installed, Cody Product Builder activates two ways:

- **Automatically.** Describe what you want in plain language (for example, "I want to build a product", "help me plan a new app", or "I need to add a new version"), and your agent invokes the skill.
- **Explicitly.** Run the `/cody-product-builder` command.

After it activates, drive Cody with the `:cody` commands. See the [Quick Start](/docs/cody-product-builder/getting-started/quick-start/) to ship your first version.

## What gets created in your project

When you run `:cody plan`, Cody creates these files in your project:

```
cody.json                       # Project settings
release-notes.md                # Release notes (location configurable)

<project-path>/                 # Default: cody-projects/product-builder/
├── plan/                       # Planning phase documents
├── build/                      # Build phase documents
└── prototypes/                 # Throwaway prototypes
```

You can change the project path during setup. See [Project Settings](/docs/cody-product-builder/reference/project-settings/) for the full `cody.json` reference.
