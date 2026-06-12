---
title: Storage & Data
description: Where Cody Article Writer keeps your styles, drafts, articles, and archive, plus the JSON schemas behind each.
---

Everything Cody Article Writer creates lives under `cody-projects/article-writer/` in your project (or your home directory, depending on where you installed the skill). Plain files on disk, no database, no external service.

## Folder layout

```
cody-projects/
└── article-writer/
    ├── .cody-version           # Installed skill version (used for migrations)
    ├── styles/                 # Saved writing styles (JSON)
    │   ├── professional-linkedin.json
    │   ├── casual-newsletter.json
    │   └── technical-tutorial.json
    ├── drafts/                 # Articles in progress (JSON + working markdown)
    │   ├── ai-radiology-2026-05-20.json
    │   ├── ai-radiology-2026-05-20.md
    │   └── ai-radiology-2026-05-20-editorpass.md
    ├── articles/               # Finished, exported articles (markdown only)
    │   └── ai-radiology-changes-everything.md
    └── archive/                # Archived draft JSONs (preserves all research)
        └── ai-radiology-2026-05-20.json
```

The four data folders serve distinct purposes:

| Folder | Holds | Lifetime |
|--------|-------|----------|
| `styles/` | Reusable writing style guide JSONs | Permanent until you delete them. |
| `drafts/` | Articles in progress, JSON state + working `.md` (+ optional `-editorpass.md`) | Lives while you're writing; on export, the JSON moves to `archive/` and the `.md` files are deleted. |
| `articles/` | Finished, shareable markdown files | Permanent. Never deleted automatically. |
| `archive/` | Frozen draft JSON state for every exported article | Permanent. Enables re-export with original research preserved. |

## The `.cody-version` file

A single-line file (e.g., `3.0`) tracking which version of Cody Article Writer last touched your data. On activation, the skill reads its own version and compares.

- If the stored version is older, the skill runs any required migration steps (silently transforming on-disk data to the new schema), then writes the new version.
- If the stored version equals the current version, no migrations run.
- If the file is missing, the skill treats you as a pre-versioning (`"1.0"`) user and runs the full migration chain.

Migrations are designed to be transparent: you'll get a one-line "I've updated your style guides to vX format" message if any data was transformed.

## Style guide schema

Style guides live at `styles/<name>.json` (kebab-case filename derived from the style name). Schema:

```json
{
  "name": "Style Name",
  "description": "Brief description of when to use this style",
  "voice": {
    "tone": 7,
    "humor": 3,
    "opinion": 8,
    "technical": 5
  },
  "formatting": {
    "emojis": 0,
    "em_dashes": 2,
    "blockquotes": "occasional"
  },
  "structure": {
    "opening": ["narrative"],
    "closing": ["call_to_action"],
    "visual_breaks": "moderate",
    "examples": "some",
    "example_types": ["lists", "code_snippets"]
  },
  "context": {
    "author_role": "AI Educator and Startup Founder",
    "author_topic_knowledge": 8,
    "audience_role": "Enterprise Product Managers",
    "audience_topic_knowledge": 4,
    "author_relationship_to_audience": 7
  }
}
```

Field validation rules:

- Slider values (`voice.*`, `formatting.emojis`, `formatting.em_dashes`, `context.*_knowledge`, `context.author_relationship_to_audience`) must be integers 0–10 inclusive.
- `formatting.blockquotes` must be one of `never`, `rare`, `occasional`, `frequent`.
- `structure.visual_breaks` must be one of `minimal`, `moderate`, `generous`.
- `structure.examples` must be one of `none`, `some`, `many`.
- `structure.example_types` must contain at least one of `lists`, `tables`, `diagrams`, `code_snippets`, `quotes`, `case_studies` (only required if `examples != "none"`).
- `structure.opening` must contain at least one of `direct`, `contextual`, `narrative`, `tension`.
- `structure.closing` must contain at least one of `summary`, `call_to_action`, `open_question`, `callback`, `provocation`, `key_takeaways`.
- `context.author_role` and `context.audience_role` must be non-empty strings.

For deeper explanations of each field, see the per-category pages: [Voice](/docs/cody-article-writer/writing-styles/voice/), [Formatting](/docs/cody-article-writer/writing-styles/formatting/), [Structure](/docs/cody-article-writer/writing-styles/structure/), [Context](/docs/cody-article-writer/writing-styles/context/).

## Draft state schema

Drafts live at `drafts/<draft-id>.json`. The draft ID is generated when the article starts (typically `<topic-slug>-<date>`).

The schema grows as the workflow progresses, early phases have fewer fields populated:

```json
{
  "id": "ai-radiology-2026-05-20",
  "created_at": "2026-05-20T14:23:11Z",
  "updated_at": "2026-05-20T16:45:02Z",
  "phase": "ideation | research | thesis | outline | writing | approval | editor | metadata | export",

  "topic": {
    "initial_idea": "raw user input before refinement",
    "refined_topic": "refined topic after ideation",
    "exploratory_research": {
      "searches_performed": ["query1", "query2"],
      "sources_reviewed": ["url1", "url2"],
      "date": "2026-05-20T14:25:00Z"
    }
  },

  "research": {
    "depth": "none | light | medium | heavy",
    "include_citations_in_export": true,
    "citation_style": "footnotes",
    "approved_sources": [
      {
        "url": "https://example.com/article",
        "title": "Article Title",
        "author": "Author Name (optional)",
        "date": "2024-01-15 (optional)",
        "domain": "example.com",
        "required": true,
        "relevance": "Why this source matters",
        "excerpt": "Cached relevant content",
        "accessed": "2026-05-20T14:30:00Z"
      }
    ],
    "citations_used": [
      {
        "source_url": "https://example.com/article",
        "citation_count": 3,
        "cited_in_sections": ["introduction", "section-2"]
      }
    ]
  },

  "style_guide": "professional-linkedin",
  "title": "Approved title",
  "thesis": "Approved thesis statement",

  "outline": [
    { "heading": "Introduction", "type": "opening", "status": "complete" },
    { "heading": "Section heading", "type": null, "status": "complete" },
    { "heading": "Conclusion", "type": "closing", "status": "pending" }
  ],

  "writing_mode": "section | full",
  "sections": {
    "introduction": "Section content with inline citations [^1].",
    "section-slug": "Section content..."
  },

  "editor_suggestions": {
    "examples_added": ["Section 2: comparison table"],
    "blockquotes_added": ["Section 1: pull quote"]
  },

  "metadata": {
    "title": "Article title",
    "description": "Meta description",
    "keywords": ["keyword1", "keyword2"]
  },

  "filename": "user-approved-filename"
}
```

Phase advances mark the workflow's progress. The full progression: `ideation → research → thesis → outline → writing → approval → editor → metadata → export`. Each phase fills in new fields; nothing is overwritten.

## Working draft markdown

While writing (Phase 7), Cody also maintains a readable markdown version at `drafts/<draft-id>.md`. This file is **regenerated from the JSON** as you approve each section (in section-by-section mode) or all at once (in full-draft mode). It exists so you can read the article in your editor without scrolling chat history.

The JSON is the source of truth. The `.md` is a generated view.

If the editor pass runs, it produces a second file at `drafts/<draft-id>-editorpass.md`. The original `<draft-id>.md` is preserved as backup.

## Export

On export (Phase 12), three things happen:

1. The chosen source (`<draft-id>.md` or `<draft-id>-editorpass.md`) is filled into the export template at `assets/templates/article_default.md` and saved to `articles/<filename>.md`.
2. The draft JSON is moved (not copied) to `archive/<draft-id>.json`: every decision, source, citation, and section preserved.
3. The intermediate `.md` files in `drafts/` are deleted.

The article in `articles/` is a regular markdown file with frontmatter:

```markdown
---
title: Article Title
date: 2026-05-20
description: Meta description
keywords: [keyword1, keyword2]
author: AI Educator and Startup Founder
---

Article content with inline citations[^1] if enabled.

## References

[^1]: Author. "Title." Domain. https://url
```

If citations were disabled at export, the `[^N]` markers are stripped and the `## References` section is omitted entirely (no trailing whitespace).

## Re-export

You can re-export any archived article by triggering "re-export the X article". Cody:

1. Loads the archived JSON.
2. Optionally lets you pick a different export template.
3. Asks the citation choice again (the archived JSON preserves the option both ways).
4. Re-runs the export, saving a new file to `articles/`.

This is what makes the archive valuable: your original research and sources persist, and you can produce different export variants from the same writing without rewriting.

## Direct file access

Every file in this folder structure is plain JSON or plain Markdown. You can:

- Open style JSONs in your editor and edit directly (schema validation happens when an article tries to use them).
- Read draft JSONs to inspect the workflow state at any point.
- Move `.md` files out of `articles/` to a publishing folder.
- Back the entire `article-writer/` folder up.
- Version-control it with git.

The skill never requires you to use its triggers; they're conveniences. Disk is the source of truth.
