---
title: Cody Article Writer
description: Plan, research, draft, and manage long-form articles end-to-end. Custom writing styles you can save and reuse across pieces.
---

Cody Article Writer is an agent skill that takes you from a raw idea to a finished, exported article through a structured twelve-phase workflow. It is built for thought leadership, essays, and product writing (long-form pieces where voice, structure, and source quality matter) in any AI coding environment (Claude Code, Cursor, GitHub Copilot, and others).

## Why it exists

Writing long-form with AI usually goes one of two ways. Either the AI moves too fast (generating a finished draft that sounds nothing like you, with no clear thesis, no sources, and no plan) or it stalls in conversation, helping you "explore the topic" without ever producing something you can ship.

Cody Article Writer fixes both. It moves through twelve discrete phases with an iteration loop at every step, so you and the AI converge on each decision (topic, thesis, outline, every section) before moving on. It pulls in current web research where it matters. And it writes in a saved, reusable **style guide** that controls voice, formatting, structure, and audience context, so every article sounds like you, not the model.

## What it helps you do

- **Refine raw ideas into focused topics.** Always-on exploratory research informs ideation, so you start from what's actually being said today, not stale training data.
- **Gather and cite sources, optionally.** Light, medium, or heavy research with explicit source approval and inline citations.
- **Save your voice once, reuse it forever.** Reusable style guides shape tone, formatting, structure, and context across every article.
- **Write the way that fits the piece.** Section-by-section iteration for complex articles, or full-draft mode when you want to react to the whole thing.
- **Get an editor pass.** An optional second pass tightens prose, removes AI tells, suggests examples and pull quotes, and applies your style guide's calibration rules.
- **Manage drafts cleanly.** Drafts in progress, finished articles, and archived JSON state (with all research preserved) all live in dedicated folders. Resume any draft at any phase.

## How it works

Cody Article Writer organizes work around two reusable systems.

**[The Article Workflow](/docs/cody-article-writer/workflow/the-article-workflow/)** is the twelve-phase pipeline from raw topic to exported markdown. It splits into ideation and research, style selection, title/thesis/outline development, writing, an optional editor pass, and metadata + export. Every phase iterates until you approve.

**[Style Guides](/docs/cody-article-writer/writing-styles/overview/)** are the reusable definitions of how your articles read. Four categories, **Voice**, **Formatting**, **Structure**, and **Context**: get applied progressively across the workflow: voice and context inform the thesis, structure shapes the outline, formatting shapes the writing.

For where files end up on disk (drafts, finished articles, archive, saved styles), see **[Storage & Data](/docs/cody-article-writer/reference/storage-and-data/)**.

## Triggers

Cody Article Writer has no `:cody`-prefixed commands. You activate it with plain-language phrases.

| Trigger | What it does |
|---------|--------------|
| "write an article about X" | Start a new article from a raw topic. |
| "continue my article" | Resume the most recent draft at whatever phase it's on. |
| "continue the X article" | Resume a specific draft by name. |
| "show my drafts" | List drafts in progress. |
| "show my articles" | List exported, finished articles. |
| "show my archive" | List archived draft JSON (preserves all research). |
| "list my writing styles" | Show saved style guides. |
| "create a new article style" | Start the style guide workflow. |
| "edit my X style" | Modify an existing style. |
| "re-export the X article" | Re-export from an archived draft, optionally with a different template. |

The full reference, including how each trigger maps to a workflow, lives at **[Triggers & Commands](/docs/cody-article-writer/reference/triggers-and-commands/)**.

## Where to start

New here? Begin with **[Installation](/docs/cody-article-writer/getting-started/installation/)** to add Cody Article Writer to your agent, then walk through the **[Quick Start](/docs/cody-article-writer/getting-started/quick-start/)** to write your first article end-to-end.
