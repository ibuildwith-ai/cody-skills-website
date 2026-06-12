---
title: Triggers & Commands
description: The plain-language phrases that activate Cody Article Writer and its draft management commands.
---

Cody Article Writer has no `:cody`-prefixed commands. You guide it in plain language, describing what you want, naming articles by topic, asking for what to do next. That's why its sidebar has no "Commands" category the way [Cody Product Builder](/docs/cody-product-builder/)'s does.

What follows is the canonical list of trigger phrases the skill recognizes. You don't have to memorize them (variations of these phrases all work) but they're the most reliable forms.

## Starting articles

| Trigger | What it does |
|---------|--------------|
| `I want to write an article about X` | Starts a new article workflow from a raw topic. |
| `help me write an article on X` | Same as above. |
| `let's write a blog post about X` | Same as above. |
| `start a new article` | Same as above, without a topic; Cody asks for one. |

Cody captures whatever follows as your raw idea and saves it verbatim before kicking off [topic ideation](/docs/cody-article-writer/workflow/topic-ideation-and-research/).

## Resuming articles

| Trigger | What it does |
|---------|--------------|
| `continue my article` | Resumes the most recent draft at whatever phase it's on. |
| `continue the X article` | Resumes a specific draft by topic / title keyword. |

Resumption restores the full draft state (style guide, research, title, thesis, outline, completed sections, citations) and Cody picks up exactly where you left off. This is how the workflow survives across sessions, days, or models.

## Viewing your work

| Trigger | What it does |
|---------|--------------|
| `show my drafts` / `list drafts` | Lists every JSON file in `drafts/` with title, phase, and last updated. |
| `show my articles` / `list my articles` | Lists every finished `.md` file in `articles/`. |
| `show my archive` | Lists every archived `.json` in `archive/`. |

`drafts/` is your work-in-progress. `articles/` is shipped pieces. `archive/` is the preserved draft state of finished articles (full research, citations, decisions) kept so you can re-export later.

## Managing writing styles

| Trigger | What it does |
|---------|--------------|
| `list my writing styles` / `show my styles` | Lists every style guide in `styles/` by name + description. |
| `create a new article style` | Starts the style guide creation workflow. |
| `create a new article style called X` | Same, with the name pre-supplied. |
| `edit my X style` / `update the X writing style` | Modify an existing style. |
| `delete the X style` | Remove a style guide (with explicit confirmation). |

See [Managing Styles](/docs/cody-article-writer/writing-styles/managing-styles/) for the full management flow.

## Re-exporting

| Trigger | What it does |
|---------|--------------|
| `re-export the X article` | Re-runs the export phase from an archived draft. Optionally pick a different template. |

Re-export uses the **current** style guide settings (not the settings at original write time), so a style tuned after the article shipped will affect re-exports. See [Editor Pass & Export](/docs/cody-article-writer/workflow/editor-pass-and-export/) for what happens at export.

## Plain-language flexibility

The phrases above are the canonical forms, but Cody is built to recognize variants. All of these work:

- "I'd like to start writing about climate adaptation policy" → start article
- "Pick up where I left off on the radiology piece" → continue specific draft
- "What drafts do I have going?" → show drafts
- "Make a new style called Newsletter Casual" → create style
- "Remove the LinkedIn style" → delete style

If Cody isn't sure whether you want to act on a draft, list your drafts, or start something new, it asks. There's no penalty for being imprecise; the skill is designed to clarify when ambiguous.

## What Cody Article Writer is NOT for

Per its activation rules, Cody Article Writer is meant for long-form written content: articles, blog posts, essays, thought leadership pieces. It is **not** the right skill for:

- Emails
- Social media posts (LinkedIn one-liners, tweets)
- API documentation
- Slide decks
- Summaries of existing content
- PRDs (use [Cody Product Builder](/docs/cody-product-builder/) for that)

If you ask Cody to write something outside its scope, it will say so and suggest you use a different approach.
