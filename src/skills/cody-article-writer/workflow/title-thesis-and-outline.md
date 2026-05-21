---
title: Title, Thesis & Outline
description: Phases 4–6 — develop a compelling title and thesis, generate a structured outline, then confirm sections before writing.
---

Phases 4, 5, and 6 of the article workflow. By the end of these three phases, you have an approved title, a thesis statement, and a confirmed section breakdown ready to draft.

## Phase 4 — Title & Thesis

**Goal:** Land a title and a thesis statement strong enough to anchor the entire article.

Cody pulls **voice** and **context** from your style guide:

- **Voice** (tone, humor, opinion, technical) shapes how the title sounds and how strong the thesis claim is.
- **Context** (author role, audience role, knowledge levels, relationship) shapes who the thesis is framed for and at what level.

### If research is enabled (Integration Point 4)

Before generating, Cody reviews every approved source's excerpt:

- **Required sources** — the thesis must accommodate their findings. Cody won't generate a thesis that contradicts a well-supported required source.
- **Optional sources** — used when they strengthen the thesis.

A worked example from the AI radiology domain:

> Required source: "AI accuracy 94.2% vs human 91.8%"
> Required source: "FDA requires non-inferiority to humans"
>
> Weak thesis: "AI will replace human radiologists"
> *(Contradicts the FDA requirement)*
>
> Strong thesis: "While AI radiology systems now exceed human diagnostic accuracy in specific tasks, regulatory frameworks and edge-case limitations mean the technology should augment rather than replace human radiologists."
> *(Incorporates both required sources)*

If the iteration surfaces gaps in research — "I need a source for X" — Cody can run additional WebSearches mid-phase to fill them, with your approval.

### The iteration loop

1. Cody generates title and thesis options informed by voice, context, and (if enabled) research.
2. You iterate — push back, sharpen, reframe.
3. Cody asks `Ready for outline?`. No → keep refining. Yes → proceed.

### What's saved

```json
{
  "phase": "thesis",
  "title": "Approved title",
  "thesis": "Approved thesis statement"
}
```

## Phase 5 — Outline

**Goal:** Turn the thesis into a structured plan for the article.

Cody pulls **structure** from your style guide:

- **Opening type(s)** — direct, contextual, narrative, tension — shape the introduction approach.
- **Closing type(s)** — summary, call to action, open question, callback, provocation, key takeaways — shape the conclusion.

### If research is enabled (Integration Point 5)

Cody reviews approved sources to understand what evidence is available, then plans sections around them:

- Required sources get dedicated sections (or are mapped to specific sections that will use them).
- Optional sources are identified as candidates to strengthen specific arguments.
- If the outline reveals research gaps, Cody may add more sources — same iteration pattern as Phase 4.

### The iteration loop

1. Cody generates an outline based on thesis, structure settings, and (if enabled) research.
2. You iterate.
3. Cody asks `Start writing?`. No → keep refining. Yes → proceed to section confirmation.

### What's saved

```json
{
  "phase": "outline",
  "outline": [
    { "heading": "Introduction", "type": "opening", "status": "pending" },
    { "heading": "Section heading", "type": null, "status": "pending" },
    { "heading": "Conclusion", "type": "closing", "status": "pending" }
  ]
}
```

## Phase 6 — Section Confirmation

**Goal:** Confirm the section breakdown before drafting starts.

Cody presents the sections from the outline:

```
I see 5 sections in your outline:

1. Introduction (Opening)
2. Section heading
3. Section heading
4. Section heading
5. Conclusion (Closing)

Would you like to split or combine any sections before we start writing?
```

You can split a section into two, combine adjacent sections, rename, or reorder. This is the last chance to restructure before writing begins.

The outline updates to reflect any changes. Section labels like "Opening" and "Closing" are workflow metadata — they tag which section uses the opening/closing types from your style guide, but they don't end up as visible "Opening:" or "Closing:" prefixes in the final article.

## What rolls forward

By the end of Phase 6, the draft state contains:

- Topic (initial + refined)
- Exploratory research (Phase 1)
- Optional comprehensive research (Phase 2)
- Style guide reference (Phase 3)
- Approved title and thesis (Phase 4)
- Approved outline with confirmed sections (Phases 5–6)

That's everything Cody needs to start writing.

## Next

**[Writing the Article](/docs/cody-article-writer/workflow/writing-the-article/)** — section-by-section vs full-draft mode, inline citations, and the writing iteration loop.
