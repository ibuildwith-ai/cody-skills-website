---
title: Quick Start
description: Write your first article end-to-end with Cody Article Writer. From topic idea to exported markdown in one sitting.
---

This guide walks you through writing your first article with Cody Article Writer end-to-end. You'll start with a raw topic, refine it with exploratory research, pick (or create) a style guide, draft the article section by section, and export a finished markdown file.

## Before you begin

Make sure Cody Article Writer is installed in your AI coding environment. See [Installation](/docs/cody-article-writer/getting-started/installation/) if you haven't done that yet.

This guide assumes you have no saved writing styles yet. If you already do, you'll be offered them in step 3 instead of creating one.

## 1. Start an article

Open your AI coding environment. Activate Cody Article Writer with a plain-language request:

```
I want to write an article about why AI tools are reshaping product management.
```

Cody captures your raw idea, then performs **exploratory research**: three to five web searches related to your topic, to surface current trends and angles your training data may have missed. It uses what it finds to iterate with you on the topic until it's focused enough to thesis.

When Cody asks `Ready to form a thesis?`, say yes.

## 2. Decide on research depth

Cody asks if you want **comprehensive research** for this article. Comprehensive research means it searches for authoritative sources, presents them for your approval, and uses them throughout the article (optionally with inline citations).

For your first article, you can skip it. Cody moves on to style selection.

If you say yes, Cody asks for depth (light, medium, or heavy), gathers sources, lets you approve and categorize them as required or optional, and asks whether you want citation markers in the export.

See [Topic Ideation & Research](/docs/cody-article-writer/workflow/topic-ideation-and-research/) for the full research flow.

## 3. Pick or create a style

If you have no saved styles yet, Cody offers two options:

1. **Guided creation**: walks you through every setting (voice, formatting, structure, context) with questions.
2. **Starter style**: Cody suggests a complete style based on what it knows about your topic, then you adjust.

Pick whichever feels right. The style guide controls how your article sounds (voice), how it looks (formatting), how it's organized (structure), and who it's for (context). It saves to `cody-projects/article-writer/styles/<name>.json` and is reusable for every future article.

For details, see [Style Guides Overview](/docs/cody-article-writer/writing-styles/overview/).

## 4. Approve the title, thesis, and outline

Cody applies your style's voice and context to generate a title and thesis. Iterate with it (push back, sharpen the angle, refine the framing) until you approve.

Once the thesis is set, Cody uses your style's structure settings to generate an outline. Approve or iterate. Cody then asks if you want to split or combine any sections before writing.

## 5. Write the article

Cody asks how you want to write:

1. **Section by section**: Cody writes one section, you iterate with it, you approve, repeat. Best for complex articles where you want to steer each section.
2. **Full draft first**: Cody writes the whole thing at once, then you review and iterate on the whole article. Best for shorter pieces or when you want to react to the finished shape.

Pick one. Cody writes, you iterate, and eventually announces `Article Completed`.

The working draft is saved to `cody-projects/article-writer/drafts/<draft-id>.md` as Cody writes, so you always have a readable file to review outside the chat.

## 6. Approve and (optionally) editor pass

Review the completed draft. Approve it, or request specific changes ("in section 2, tighten the conclusion").

Once approved, Cody offers an **editor pass**: an optional second pass that suggests examples (tables, code snippets, pull quotes) based on your style preferences, removes AI tells, tightens prose, and polishes formatting. Recommended for your first article. Your original is preserved as backup; the edited version saves as `<draft-id>-editorpass.md`.

See [Editor Pass & Export](/docs/cody-article-writer/workflow/editor-pass-and-export/) for what the editor checks.

## 7. Export

Cody generates article metadata (title, description, keywords), confirms a filename, and writes the final markdown to `cody-projects/article-writer/articles/<filename>.md`.

The draft JSON moves to `cody-projects/article-writer/archive/<draft-id>.json` (preserving every research source, approval, and decision) so you can re-export the article later with a different template if you ever want to.

## 8. Keep going

From here, the loop is:

- **Start a new article** with "I want to write about X."
- **Continue an article** with "continue my article" (or "continue the X article" for a specific one).
- **Reuse your style**: every future article offers your saved style as the first option in step 3.
- **Create more styles** with "create a new article style" for different audiences or formats.
- **Look up a finished article** with "show my articles."
- **Re-export from archive** with "re-export the X article."

That's the full workflow. See [Triggers & Commands](/docs/cody-article-writer/reference/triggers-and-commands/) for every plain-language phrase Cody Article Writer responds to.
