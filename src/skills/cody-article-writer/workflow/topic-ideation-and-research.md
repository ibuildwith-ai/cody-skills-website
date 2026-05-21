---
title: Topic Ideation & Research
description: Refine a raw idea into a focused topic with always-on exploratory research, then optionally gather comprehensive sources for citations.
---

The first two phases of the article workflow turn a raw topic idea into something focused and (optionally) researched. Together they cover the first three of Cody Article Writer's six research integration points.

## Phase 1 — Topic Ideation

**Goal:** Refine the raw topic idea into something focused and angle-able.

### How it works

1. You provide an initial topic idea in plain language ("I want to write about how AI is reshaping product management"). Cody captures the input verbatim as `initial_idea` — exactly as you typed it.
2. Cody immediately performs **exploratory research** using WebSearch. It runs three to five queries related to your topic to surface current trends, recent data, and angles you may not have considered. The searches and URLs reviewed are saved into the draft state for the record.
3. You and Cody iterate on the topic — pushing back, narrowing scope, finding a unique angle informed by what the research surfaced.
4. When Cody asks `Ready to form a thesis?`, you say yes. The refined topic is saved as `refined_topic` in the draft state.

### Why exploratory research is always on

Your AI's training data may be months or years out of date. Without a quick web pass, ideation happens in a vacuum. Three to five searches at the top of the workflow gives Cody current context — recent studies, market shifts, who's writing about what — without making you opt in.

This exploratory pass uses **search snippets only** (not full-page fetches). It's lightweight, fast, and meant for context, not citation. Full source content is gathered later in Phase 2 if you opt in to comprehensive research.

### What's saved

```json
{
  "topic": {
    "initial_idea": "raw user input — exactly as typed",
    "refined_topic": "the refined version after iteration",
    "exploratory_research": {
      "searches_performed": ["query1", "query2", "query3"],
      "sources_reviewed": ["url1", "url2", "url3"],
      "date": "ISO timestamp"
    }
  }
}
```

The draft is saved with `phase: "ideation"`.

## Phase 2 — Research Planning

**Goal:** Decide whether this article needs comprehensive research, and if so, gather and approve sources.

After Phase 1, Cody asks:

> Do you want to gather comprehensive research sources for this article?

The decision branches.

### If you say NO

- Cody sets `research.depth = "none"` and moves directly to [Style Selection](/docs/cody-article-writer/workflow/style-selection/).
- The exploratory research from Phase 1 is still preserved in the draft.
- No source approval, no citations, no References section in the export.

This is the right choice for opinion pieces, personal essays, retrospectives, or any article where current sources aren't the point.

### If you say YES

Cody walks you through three steps.

**1. Research depth.** Cody asks how deeply to research:

| Depth  | Sources | Best for |
|--------|---------|----------|
| Light  | 1–5     | Credibility-establishing sources for an opinion piece. |
| Medium | 6–11    | Standard research piece; key claims cited. |
| Heavy  | 12–20   | Deeply researched, most claims cited (long-form essays, white-paper-style articles). |

**2. Source approval.** Cody runs targeted searches (the number scales with depth) and presents a long list of candidate sources — title, domain, brief relevance note, URL. You decide:

- Which to keep.
- Which to drop.
- Any specific URLs to add manually (a paper you know is essential, your own previous writing, etc.).
- Which sources are **required** (must be incorporated into the article) versus **optional** (use if relevant).

Cody then uses WebFetch to pull the full content of each approved source, extracting title, author (if present), date (if present), domain, and a relevant excerpt. If a fetch fails (paywall, 404), Cody asks if you want to supply the content manually, drop the source, or substitute another URL.

**3. Citation preference.** Cody asks:

> Do you want citations in your final exported article?

If **yes**, Cody inserts `[^1]`, `[^2]` markers in the article as it writes and generates a References section at export. If **no**, the sources still inform the writing — Cody references them while drafting — but no markers or References section appear in the output.

### What's saved

```json
{
  "research": {
    "depth": "light | medium | heavy | none",
    "include_citations_in_export": true,
    "citation_style": "footnotes",
    "approved_sources": [
      {
        "url": "https://example.com/article",
        "title": "Article Title",
        "author": "Author Name",
        "date": "2024-01-15",
        "domain": "example.com",
        "required": true,
        "relevance": "Why this source matters",
        "excerpt": "Cached relevant content",
        "accessed": "ISO timestamp"
      }
    ],
    "citations_used": []
  }
}
```

The draft is saved with `phase: "research"`.

## Where research shows up later

If you opted in to comprehensive research, sources are pulled back in at three more points in the workflow:

| Where | What happens |
|-------|--------------|
| [Title & Thesis](/docs/cody-article-writer/workflow/title-thesis-and-outline/) (Phase 4) | Required sources shape the thesis claim. Cody won't generate a thesis that contradicts a well-supported required source. |
| [Outline](/docs/cody-article-writer/workflow/title-thesis-and-outline/) (Phase 5) | Sections planned around where evidence lives. Required sources get sections; optional sources strengthen others. |
| [Writing](/docs/cody-article-writer/workflow/writing-the-article/) (Phase 7) | Inline citations inserted (`[^1]`, `[^2]`) if enabled. The `citations_used` array tracks which sources got cited. |

If you skipped comprehensive research, all three integration points are skipped automatically.

## Next

Either way, the next phase is **[Style Selection](/docs/cody-article-writer/workflow/style-selection/)** — choosing how the article should sound and read.
