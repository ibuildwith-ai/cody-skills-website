---
title: Structure
description: Opening and closing types, visual breaks, examples and example types — the structural skeleton of every article.
---

The **Structure** category of a style guide. Five fields that control how each article is organized at the section and paragraph level. Structure is applied in Phase 5 of the article workflow (Outline).

## The five fields

| Field | Type | Values |
|-------|------|--------|
| **Opening** | Array (multi-select) | `direct`, `contextual`, `narrative`, `tension` |
| **Closing** | Array (multi-select) | `summary`, `call_to_action`, `open_question`, `callback`, `provocation`, `key_takeaways` |
| **Visual Breaks** | String | `minimal` / `moderate` / `generous` |
| **Examples** | String | `none` / `some` / `many` |
| **Example Types** | Array (multi-select, required if `examples != "none"`) | `lists`, `tables`, `diagrams`, `code_snippets`, `quotes`, `case_studies` |

## Opening types

How each article begins. You pick one or more — Cody chooses the right one per article based on the topic.

| Type | What it does |
|------|--------------|
| `direct` | State the main point immediately. "AI radiology systems now exceed human accuracy. Here's what that means." |
| `contextual` | Set the scene, provide background first. "For the past decade, radiology has been the first medical specialty where AI made measurable inroads..." |
| `narrative` | Open with a story or anecdote. "In a Boston ER last March, an AI system flagged a stroke that two human radiologists missed..." |
| `tension` | Create stakes, pose a problem. "Hospitals are buying AI diagnostic systems they don't trust, deployed in workflows their staff resent, and the regulators are watching." |

Many styles pick one (e.g., `["direct"]` for technical content) or two (e.g., `["narrative", "tension"]` for opinion pieces).

## Closing types

How each article ends.

| Type | What it does |
|------|--------------|
| `summary` | Recap key points. |
| `call_to_action` | Tell the reader what to do next. |
| `open_question` | Leave them thinking, no resolution offered. |
| `callback` | Reference the opening for symmetry. |
| `provocation` | Challenge an assumption the article just built up. |
| `key_takeaways` | Bullet list of main insights. |

Most styles pick one or two. `["callback", "call_to_action"]` is a common pairing (echo the opening, then prompt the next step).

**Note:** Section labels like "Opening" and "Closing" are workflow metadata — Cody uses them internally to apply the right opening/closing type, but they don't end up as visible "Opening:" or "Closing:" prefixes in the article body. Section headings are written normally.

## Visual Breaks

How much white space and paragraph spacing the article uses.

- `minimal` — Dense prose, longer paragraphs, fewer section breaks. Reads like a journal article or long-form essay.
- `moderate` — Balanced spacing, standard paragraph lengths. Reads like a mainstream blog post.
- `generous` — Short paragraphs, more white space, frequent breaks. Reads like a newsletter or LinkedIn post.

Visual breaks influence both writing (Phase 7) and the editor pass (Phase 10). A style set to `generous` will be edited toward shorter paragraphs even if the draft came in dense.

## Examples

Default preference for including examples in the article.

- `none` — Minimal to no examples. Rely on explanation. Suitable for opinion pieces, manifestos.
- `some` — Occasional examples where they genuinely clarify a concept.
- `many` — Liberal use of examples throughout. Suitable for tutorials, explainers, technical posts.

If you set this to `none`, the **Example Types** field becomes optional (and is ignored). For `some` or `many`, you must pick at least one example type below.

## Example Types

When examples are used, which kinds Cody should reach for. Multi-select.

| Type | What it is |
|------|------------|
| `lists` | Bulleted or numbered lists. |
| `tables` | Comparison tables, data tables. |
| `diagrams` | Flowcharts, sequence diagrams, state diagrams. Generated as Mermaid markdown when possible; ASCII as fallback. |
| `code_snippets` | Code examples (for technical content). |
| `quotes` | Pull quotes, expert citations, testimonials. |
| `case_studies` | Brief real-world scenarios (2–4 paragraphs each, embedded inline — not separate sections). |

A technical tutorial style might pick `["lists", "code_snippets", "diagrams"]`. A LinkedIn thought-leadership style might pick `["lists", "quotes", "case_studies"]`. An academic essay might pick `["quotes", "case_studies"]` only.

## How structure is applied

In **Phase 5** (Outline), Cody:

1. Extracts opening and closing types from your style and picks the right one for this article's topic (e.g., a piece about a controversial decision benefits from `tension`; a how-to benefits from `direct`).
2. Tags the first section with the chosen opening type and the last with the chosen closing type — internal metadata, doesn't appear in the article.
3. Plans section count and length based on `visual_breaks` (generous = more sections, shorter; minimal = fewer sections, longer).
4. Identifies where examples can land based on `examples` and `example_types`.

In **Phase 10** (Editor Pass), structure also calibrates editor suggestions — visual breaks gets re-checked, example types inform what kinds of inline examples the editor adds.

## What's stored

```json
{
  "structure": {
    "opening": ["narrative"],
    "closing": ["call_to_action"],
    "visual_breaks": "moderate",
    "examples": "some",
    "example_types": ["lists", "code_snippets"]
  }
}
```

Required:
- `opening` and `closing` must each contain at least one valid value.
- `visual_breaks` must be one of `minimal` / `moderate` / `generous`.
- `examples` must be one of `none` / `some` / `many`.
- `example_types` must contain at least one valid value if `examples != "none"`.

## Picking values

Some example combinations:

| Style purpose | Opening | Closing | Visual Breaks | Examples | Example Types |
|---------------|---------|---------|---------------|----------|---------------|
| Thought leadership essay | narrative, tension | callback, call_to_action | moderate | some | lists, quotes, case_studies |
| Technical tutorial | direct | summary | generous | many | lists, code_snippets, diagrams |
| Opinion column | tension | provocation | moderate | some | quotes, case_studies |
| Casual newsletter | narrative | call_to_action | generous | some | lists, quotes |
| Reference / explainer | contextual | key_takeaways | moderate | many | tables, lists, diagrams |

## Related

- [Voice](/docs/cody-article-writer/writing-styles/voice/) — applied at Phase 4.
- [Formatting](/docs/cody-article-writer/writing-styles/formatting/) — applied at Phase 7.
- [Style Guides Overview](/docs/cody-article-writer/writing-styles/overview/) — how structure fits into the full style guide.
