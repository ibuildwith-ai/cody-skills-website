---
title: Formatting
description: Control emoji frequency, em dash usage, and blockquote frequency at the prose level.
---

The **Formatting** category of a style guide. Three fields that control prose-level texture — the visual and rhythmic flourishes that appear inside paragraphs. Formatting is applied in Phase 7 of the article workflow (Writing) and re-applied in Phase 10 (Editor Pass).

## The three fields

| Field | Type | Values |
|-------|------|--------|
| **Emojis** | Integer | 0 (None) ↔ 10 (Heavy) |
| **EM Dashes** | Integer | 0 (None) ↔ 10 (Frequent) |
| **Blockquotes** | String | `never` / `rare` / `occasional` / `frequent` |

## Emojis (0–10)

How often emojis appear in the article body.

- **0** — Never. No emojis anywhere, including in headings or pull quotes.
- **1–3** — Rare. The occasional ✅ or ⚠️ in a callout, nothing more.
- **4–6** — Moderate. Emojis as visual markers (✅, ❌, 💡, ⚠️) in lists and callouts; occasional emoji in headings.
- **7–10** — Heavy. Emojis throughout — in headings, in lists, mid-sentence. Suitable for casual newsletters or social-first content.

Most professional styles set this to 0. The lift from emojis is real (visual scanning, friendliness), but the credibility cost in formal contexts is also real. Pick based on audience.

## EM Dashes (0–10)

How often em dashes (—) appear.

- **0** — Never. Cody uses commas, colons, or parentheses instead.
- **1–3** — Rare. One or two per article max, only when nothing else fits cleanly.
- **4–6** — Standard. Used where they're the right tool — for parenthetical asides or dramatic pauses — without overuse.
- **7–10** — Frequent. Em dashes used liberally for emphasis, asides, and rhythm.

### Why this slider matters

Em dashes are one of the most recognizable AI writing tells. Models trained on AI-edited prose pick up the habit of using em dashes for nearly every parenthetical, every aside, every transition. A reader who's seen a lot of AI-written content learns to spot the pattern instantly.

Setting this low (0–2) is a deliberate move to write prose that doesn't read as AI-generated. The [editor pass](/docs/cody-article-writer/reference/editor-style-guide/) actively replaces em dashes with commas or restructures sentences when this value is low.

## Blockquotes

How often pull quotes / blockquotes appear in the article. Unlike the integer sliders, this is a four-value enum.

| Value | Behavior |
|-------|----------|
| `never` | Don't use blockquotes at all. |
| `rare` | Only for truly exceptional insights — quotes that earn their visual weight. |
| `occasional` | Where they add emphasis (typically 1–2 per article). |
| `frequent` | Actively look for opportunities (2–4 per article). |

Pull quotes are sentences pulled from the article's own prose and rendered as blockquotes for visual emphasis. They're not external citations. They're "this sentence is the one to remember" markers.

## How formatting is applied

In **Phase 7** (Writing), Cody applies all three formatting fields as it drafts each section. Emoji count, em dash frequency, and blockquote rendering happen during writing, not in a separate pass.

In **Phase 10** (Editor Pass), formatting is re-calibrated. If the writing layer drifted (too many em dashes, missing pull quotes for an `occasional`-set style), the editor pass corrects. See [Editor Style Guide](/docs/cody-article-writer/reference/editor-style-guide/) for the exact calibration rules.

## What's stored

```json
{
  "formatting": {
    "emojis": 0,
    "em_dashes": 2,
    "blockquotes": "occasional"
  }
}
```

All three fields are required. Slider values must be integers 0–10. `blockquotes` must be one of the four enum values.

## Picking values

Some examples:

| Style purpose | Emojis | EM Dashes | Blockquotes |
|---------------|--------|-----------|-------------|
| Long-form professional essay | 0 | 2 | occasional |
| Technical tutorial | 0 | 1 | rare |
| Casual newsletter | 4 | 4 | rare |
| LinkedIn thought leadership | 0 | 3 | frequent |
| Internal documentation | 0 | 0 | never |

## Related

- [Voice](/docs/cody-article-writer/writing-styles/voice/) — applied at Phase 4 (title & thesis).
- [Structure](/docs/cody-article-writer/writing-styles/structure/) — applied at Phase 5 (outline).
- [Editor Style Guide](/docs/cody-article-writer/reference/editor-style-guide/) — how formatting settings calibrate the editor pass.
