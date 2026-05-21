---
title: Installation
description: Add Cody Article Writer to your AI coding environment, either as a packaged .skill file or as a folder dropped into your agent's skills directory.
---

Cody Article Writer is an Agent Skill. There are two ways to install it. Use whichever your AI coding environment supports.

## Option 1: The `.skill` file

Use this option for Claude.ai (desktop or web) and any other app that installs skills from a file.

1. Download `cody-article-writer.skill` from the [GitHub repository](https://github.com/ibuildwith-ai/cody-article-writer), or grab it from the **Get Skill** menu in this site's top bar.
2. Upload the file in your app's skill settings. In Claude.ai, this is done from your skills settings. For other apps, follow that app's process for adding a `.skill` file.

## Option 2: The skill folder

Use this option for coding agents that load skills from a folder, such as Claude Code, Cursor, GitHub Copilot, and Codex.

1. Clone or download the repository from [github.com/ibuildwith-ai/cody-article-writer](https://github.com/ibuildwith-ai/cody-article-writer), or download the `.zip` from the **Get Skill** menu in this site's top bar.
2. Copy the `source/cody-article-writer/` folder into your agent's skills directory, keeping the folder name `cody-article-writer`:

| Agent | Path |
|-------|------|
| Claude Code | `.claude/skills/cody-article-writer/` |
| Cursor | `.cursor/skills/cody-article-writer/` |
| GitHub Copilot | `.github/skills/cody-article-writer/` |

A skills directory inside a project makes Cody Article Writer available for that project only. A skills directory in your home folder makes it available across all your projects. Check your agent's documentation for the exact supported locations.

## Activating

Cody Article Writer has no `:cody`-prefixed commands. You activate it with plain-language requests:

- **Topical** — "I want to write an article about AI in healthcare", "help me write a blog post on remote work", "let's draft an essay about pricing strategy."
- **Resumption** — "continue my article", "continue the X article."
- **Management** — "show my drafts", "list my writing styles", "create a new article style."

Your agent invokes the skill automatically. See the [Triggers & Commands](/docs/cody-article-writer/reference/triggers-and-commands/) reference for the full list.

## What gets created in your project

The first time you run Cody Article Writer in a project (or in your home directory, depending on where you installed the skill), it creates this folder structure:

```
cody-projects/
└── article-writer/
    ├── .cody-version           # Tracks installed version for migrations
    ├── styles/                 # Saved writing styles (JSON)
    ├── drafts/                 # In-progress articles (JSON + working markdown)
    ├── articles/               # Finished, exported articles (markdown)
    └── archive/                # Completed drafts (JSON, preserves research)
```

Styles are reusable across articles. Drafts move to `articles/` on export, with their JSON state archived to `archive/` so you can re-export any article later using its preserved research and sources.

See [Storage & Data](/docs/cody-article-writer/reference/storage-and-data/) for the full folder reference and the draft state JSON schema.

## Next

With Cody Article Writer installed, walk through the [Quick Start](/docs/cody-article-writer/getting-started/quick-start/) to write your first article end-to-end.
