---
title: Style Selection
description: Choose an existing style guide or create a new one before drafting starts.
---

Phase 3 of the article workflow. A style guide is the reusable definition of how an article reads, voice, formatting, structure, and audience context. Phase 3 is where you pick one (or create one) for the current article.

## How it works

After [topic ideation and research](/docs/cody-article-writer/workflow/topic-ideation-and-research/) wrap, Cody checks `cody-projects/article-writer/styles/` for saved style guides.

### If you have saved styles

Cody lists them with name and description:

```
I found these existing styles:

1. Professional LinkedIn
   For thought leadership articles targeting enterprise product managers

2. Casual Newsletter
   Conversational tone for weekly subscriber updates

Would you like to use one of these, or create a new style?
```

- **Pick one** → Cody loads it and moves to [Title & Thesis](/docs/cody-article-writer/workflow/title-thesis-and-outline/).
- **Create new** → Cody offers the two creation paths below.

### If you have no saved styles

Cody offers two ways to create one:

1. **Guided creation**: Cody walks you through every setting (Voice, Formatting, Structure, Context) with questions. Best when you want full control or when you don't know what you want yet.
2. **Starter style**: Cody suggests a complete style based on what it knows about your topic and audience so far. You review the suggestion and adjust anything you disagree with. Best when you want to move fast.

Either path produces a JSON file saved to `cody-projects/article-writer/styles/<style-name>.json`. It's immediately available for every future article.

For the full style creation flow (what each setting means, how to adjust them, how to edit a style later) see the [Style Guides Overview](/docs/cody-article-writer/writing-styles/overview/) and the per-category pages ([Voice](/docs/cody-article-writer/writing-styles/voice/), [Formatting](/docs/cody-article-writer/writing-styles/formatting/), [Structure](/docs/cody-article-writer/writing-styles/structure/), [Context](/docs/cody-article-writer/writing-styles/context/)).

## What gets loaded into this article

When you select (or create) a style for an article, Cody loads it and applies its settings progressively across the rest of the workflow:

| When | What's applied |
|------|----------------|
| Title & thesis (Phase 4) | **Voice** (tone, humor, opinion, technical) and **Context** (author/audience) inform the framing and claim. |
| Outline (Phase 5) | **Structure** (opening type, closing type, examples, visual breaks) shapes the section plan. |
| Writing (Phase 7) | **Formatting** (emojis, em dashes, blockquotes) shapes how prose is written. |
| Editor pass (Phase 10) | Settings calibrate what the [editor checks](/docs/cody-article-writer/reference/editor-style-guide/), denser formatting, more pull quotes, fewer em dashes, etc. |

## What's saved in the draft

```json
{
  "style_guide": "professional-linkedin"
}
```

Just the style's filename slug: the article references the live style file in `styles/` rather than embedding a copy. If you edit `professional-linkedin.json` later, the next draft that uses it picks up the changes.

## Styles are reusable, research is not

A common point of confusion: research settings (depth, citations, approved sources) are **not** part of a style guide. Research is configured per-article in [Phase 2](/docs/cody-article-writer/workflow/topic-ideation-and-research/); every article makes its own research decision.

Style guides are about voice and form, not subject matter. They travel with you from article to article. Research is article-specific.

## Next

Once the style is selected, Cody moves to **[Title, Thesis & Outline](/docs/cody-article-writer/workflow/title-thesis-and-outline/)**.
