---
title: Style Guides Overview
description: The four categories of a style guide (Voice, Formatting, Structure, Context) and how they progressively shape every article you write.
---

A **style guide** is the reusable definition of how your articles sound, look, and land. One JSON file per style, saved to `cody-projects/article-writer/styles/<name>.json`. Every article you write attaches to a style guide; one style can power infinite articles.

Style guides exist so you don't have to teach Cody your voice every time. Configure once, reuse forever.

## The four categories

| Category | What it controls | When it applies in the [workflow](/docs/cody-article-writer/workflow/the-article-workflow/) |
|----------|------------------|-------------------------------------------------------------------------------------------|
| [Voice](/docs/cody-article-writer/writing-styles/voice/) | Tone, humor, opinion strength, technical depth | Phase 4 (title & thesis) |
| [Context](/docs/cody-article-writer/writing-styles/context/) | Who you are, who you're writing for, the relationship | Phase 4 (title & thesis) |
| [Structure](/docs/cody-article-writer/writing-styles/structure/) | Opening type, closing type, examples, visual breaks | Phase 5 (outline) |
| [Formatting](/docs/cody-article-writer/writing-styles/formatting/) | Emojis, em dashes, blockquotes | Phase 7 (writing) |

## Why settings apply progressively

Voice and context shape **what** you're saying and **to whom**, so they belong at the thesis layer: the article's claim and framing are inseparable from how strong an opinion you hold and who you're addressing.

Structure shapes **how the article is organized**, so it belongs at the outline layer: opening types decide how you hook the reader, closing types decide how you leave them, examples decide what evidence you weave in.

Formatting shapes **prose-level texture**: em dashes, emojis, blockquotes, so it belongs at the writing layer, after the structure is settled.

Applying every setting at every phase would muddy the work. Progressive application keeps each phase focused.

## Creating a style guide

Triggered explicitly with "create a new article style", or inline during Phase 3 of the article workflow when you have no styles yet. The creation flow:

```
1. Recommendation Offer (optional)
       │
       ▼
2. Configuration  (Set Voice → Set Context → Set Structure → Set Formatting)
       │
       ▼
3. Review Settings
       │  Needs Update ───┐
       ▼                  │
4. Name & Description     │
       │                  │
       ▼                  │
5. Final Confirmation ────┘
       │
       ▼
6. Save to styles/<name>.json
```

### Phase 0: Recommendation Offer

Before configuration, Cody asks if you want AI-recommended settings based on your writing purpose, target audience, or example articles. If yes, Cody generates a complete style as a starting point and you skip directly to Review. If no, manual configuration starts.

### Phase 1: Configuration

Cody walks you through each category in order:

1. **Voice**: Tone, Humor, Opinion, Technical (each 0–10).
2. **Formatting**: Emojis (0–10), EM Dashes (0–10), Blockquotes (never/rare/occasional/frequent).
3. **Structure**: Opening type(s), Closing type(s), Visual Breaks, Examples, Example Types.
4. **Context**: Author Role, Author Topic Knowledge, Audience Role, Audience Topic Knowledge, Author Relationship to Audience.

Detailed prompts for each setting live on the per-category pages, see the table above.

### Phase 2: Review Settings

Cody presents the full configuration for approval:

```
Voice:
- Tone: 7/10 (leaning professional)
- Humor: 3/10 (mostly serious)
- Opinion: 8/10 (opinionated)
- Technical: 5/10 (balanced)

Formatting:
- Emojis: 0/10 (none)
- EM Dashes: 2/10 (minimal)
- Blockquotes: Occasional

Structure:
- Opening: Narrative + Tension
- Closing: Callback + Call to Action
- Visual Breaks: Moderate
- Examples: Some
- Example Types: Lists, Code Snippets, Quotes

Context:
- Author Role: AI Educator and Startup Founder
- Author Knowledge: 8/10
- Audience Role: Enterprise Product Managers
- Audience Knowledge: 4/10
- Relationship: 7/10 (expert positioning)

Does this look correct, or would you like to adjust anything?
```

Adjust as many times as needed.

### Phase 3: Name & Description

Once settings are approved, Cody suggests a name and a one-line description:

```
Suggested name: "Professional LinkedIn"
Suggested description: "For thought leadership articles targeting enterprise product managers"
```

You approve or override. Both are required.

### Phase 4: Final Confirmation & Save

Cody shows the full style one more time (settings + name + description) and asks for explicit "save" confirmation. On save:

1. Filename is generated from the name (kebab-case): `Professional LinkedIn` → `professional-linkedin.json`.
2. All required fields are validated.
3. File is written to `cody-projects/article-writer/styles/`.
4. Cody confirms: `Saved style guide as professional-linkedin.json`.

The style is now available in every future article's Phase 3.

## What's NOT in a style guide

A common point of confusion: **research settings are not part of a style guide**. Research depth, citation preference, and approved sources are configured per-article in [Phase 2 of the article workflow](/docs/cody-article-writer/workflow/topic-ideation-and-research/). Style guides are reusable across articles regardless of research needs.

Style guides are about voice and form. Research is about subject matter. They live separately by design.

## Storage and editing

Styles live as plain JSON files in `cody-projects/article-writer/styles/`. You can:

- **Edit** with a trigger ("edit my X style") or by opening the JSON directly.
- **Delete** with "delete the X style".
- **List** with "list my writing styles".

For the full management flow, see [Managing Styles](/docs/cody-article-writer/writing-styles/managing-styles/). For the JSON schema, see [Storage & Data](/docs/cody-article-writer/reference/storage-and-data/).
