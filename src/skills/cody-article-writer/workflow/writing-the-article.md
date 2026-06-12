---
title: Writing the Article
description: Phase 7, covering section-by-section vs full-draft modes, the iteration loop, and inline citations.
---

Phase 7 of the article workflow. With topic, research, style, title, thesis, and outline all locked, Cody writes the article. You choose how.

## Writing mode

Cody starts by asking how you want to write:

| Mode | How it works | Best for |
|------|--------------|----------|
| **Section by section** | Cody writes one section, you iterate with it, you approve, repeat for the next section. | Complex articles where you want to steer each section. Long-form pieces. Anything where you'd want to react to a draft paragraph by paragraph. |
| **Full draft first** | Cody writes the entire article at once, then you review and iterate on the whole thing. | Shorter pieces. Anything where you want to react to the finished shape before drilling in. Pieces with strong outlines where section-level surprise is unlikely. |

Pick one. The mode is saved as `writing_mode: "section"` or `"full"` in the draft state, so if you resume the draft later (with "continue my article"), Cody picks back up in the right mode.

## Style guide application

Cody pulls **formatting** from your style guide at this phase:

- **Emojis** (0–10), how often emojis appear.
- **EM dashes** (0–10), how often em dashes appear. Overuse is a common AI tell; many styles set this low.
- **Blockquotes** (never / rare / occasional / frequent), how often to use pull quotes.

Voice, context, and structure were already applied in earlier phases; the title, thesis, and outline reflect them. Phase 7's job is to write within those constraints using the formatting layer.

## Mode A: Section by section

For each section in the outline:

1. **Cody drafts the section.** If research is enabled, Cody references relevant approved sources, ensures required sources are incorporated, and (if citations are on) inserts inline `[^1]`, `[^2]` markers. The section also reflects your formatting settings.
2. **Cody presents the section to you.**
3. **You iterate.** Push back, request a tighter intro, ask for a specific example, swap a claim. Cody revises.
4. **You approve.** The section is marked `status: "complete"` in the outline, and the working draft markdown file at `cody-projects/article-writer/drafts/<draft-id>.md` is updated so you have a readable file outside the chat.
5. **Cody moves to the next section.**

When every section is approved, Cody announces `Article Completed` and moves to [Article Approval](/docs/cody-article-writer/workflow/editor-pass-and-export/).

## Mode B: Full draft first

1. **Cody writes the entire article at once.** Same research and formatting integration as Mode A, just all at once.
2. **The full draft is saved to `drafts/<draft-id>.md`** as a single file you can read end-to-end.
3. **Cody announces `Article Completed`** and moves to [Article Approval](/docs/cody-article-writer/workflow/editor-pass-and-export/), where you review the whole article and request changes.

Iteration in Mode B happens at the article level rather than the section level. You read, you respond ("section 2 is too long, can you tighten it?"), Cody revises the specific section in the saved JSON and regenerates the markdown file.

## Citations (Research Integration Point 6)

If `research.include_citations_in_export = true`, Cody inserts inline citation markers as it writes:

```markdown
AI systems achieved 94.2% accuracy in diagnostic imaging.[^1] The market
is projected to reach $12.7 billion by 2027.[^2]
```

The markers are inserted directly into the section content and stored alongside the prose in the draft JSON. Cody also tracks which sources actually got cited:

```json
{
  "citations_used": [
    {
      "source_url": "https://example.com/article",
      "citation_count": 3,
      "cited_in_sections": ["introduction", "section-2"]
    }
  ]
}
```

This makes the export deterministic, only sources that actually appear in the article end up in the References section, in citation order.

If research is enabled but citations are off, Cody still uses the sources to inform the writing but doesn't add any `[^N]` markers.

The decision of whether to include citations in the final exported article can be revisited per export, see [Editor Pass & Export](/docs/cody-article-writer/workflow/editor-pass-and-export/).

## The working draft file

Throughout Phase 7, Cody maintains `cody-projects/article-writer/drafts/<draft-id>.md`, a readable markdown file that reflects the latest approved sections. This file exists so you can review the article outside the chat (open it in your editor, share it with a collaborator, paste it elsewhere) without scrolling chat history.

The authoritative state lives in `<draft-id>.json`; that's what Cody reads from when you resume the draft. The `.md` file is regenerated from the JSON, not the other way around.

See [Storage & Data](/docs/cody-article-writer/reference/storage-and-data/) for the full draft state schema.

## What's saved

```json
{
  "phase": "writing",
  "writing_mode": "section",
  "sections": {
    "introduction": "Section content with inline citations [^1].",
    "section-slug": "Section content..."
  },
  "citations_used": [ /* ... */ ]
}
```

## Next

**[Editor Pass & Export](/docs/cody-article-writer/workflow/editor-pass-and-export/)**: article approval, the optional editor pass, metadata generation, and the final export to your articles folder.
