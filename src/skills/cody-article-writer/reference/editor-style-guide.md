---
title: Editor Style Guide
description: The ruleset the optional editor pass follows — calibrated checks that adapt to your style, plus always-applied checks.
---

The **Editor Style Guide** is the ruleset that governs the optional [editor pass](/docs/cody-article-writer/workflow/editor-pass-and-export/) (Phase 10 of the article workflow). It is **not** the same as your writing [style guide](/docs/cody-article-writer/writing-styles/overview/) — that's the one you configure per article (Voice, Formatting, Structure, Context). The Editor Style Guide is fixed; it ships with the skill and defines what the editor pass checks.

Two categories of checks: **User Style Calibrated** (the editor adapts to your style settings) and **Always Applied** (the editor runs them regardless of style).

## Citations are untouched

Before anything else: the editor pass **does not modify citation markers** (`[^1]`, `[^2]`, etc.) or the References section. Those live in the writing layer (Phase 7) and are finalized at export (Phase 12). The editor pass only touches prose, structure, and formatting.

## User Style Calibrated

These five checks read your writing style guide's settings and apply differently for different styles.

### Visual Breaks — calibrated by `structure.visual_breaks`

| Setting | Editor action |
|---------|---------------|
| `minimal` | Allow longer paragraphs (6–8 sentences acceptable). Fewer section breaks. Dense prose preferred. |
| `moderate` | Standard paragraph lengths (3–5 sentences). Regular section breaks. Balanced white space. |
| `generous` | Shorter paragraphs (2–4 sentences). Frequent section breaks. Liberal use of single-sentence paragraphs for impact. |

### Blockquotes — calibrated by `formatting.blockquotes`

| Setting | Editor action |
|---------|---------------|
| `never` | Don't suggest any blockquotes. |
| `rare` | Suggest only for truly exceptional insights — quotes that earn their visual weight. |
| `occasional` | Suggest 1–2 blockquotes per article where they add emphasis. |
| `frequent` | Actively look for opportunities (2–4 per article). |

Pull quotes are always pulled from the article's own prose, not external citations.

### EM Dashes — calibrated by `formatting.em_dashes`

| Setting | Editor action |
|---------|---------------|
| 0–2 | Replace em dashes with commas, parentheses, or periods. |
| 3–5 | Use sparingly (max 1–2 per article). |
| 6–10 | Acceptable to use where appropriate. |

The low end of this scale is the AI-tell defense — see [Formatting](/docs/cody-article-writer/writing-styles/formatting/) for the rationale.

### Emojis — calibrated by `formatting.emojis`

| Setting | Editor action |
|---------|---------------|
| 0 | Remove all emojis. |
| 1–3 | Max 1–2 emojis in the entire article. |
| 4–6 | Occasional use in headers or key points. |
| 7–10 | Liberal use throughout. |

### Tone Consistency — calibrated by `voice.tone`

| Setting | Editor action |
|---------|---------------|
| 0–3 (Casual) | Conversational, contractions okay, "you" and "I" used freely. |
| 4–6 (Balanced) | Professional but approachable. |
| 7–10 (Professional) | Formal, minimal contractions, third person acceptable. |

The editor flags sections where tone drifts unexpectedly from the style's intended level.

## Always Applied

These four checks run regardless of style settings.

### AI Tell Removal

The editor scans for common AI writing patterns and removes or rephrases them.

**Filler phrases to remove:**

- "It's important to note that…"
- "It's worth mentioning that…"
- "Interestingly enough…"
- "In today's world…"
- "In this article, we will…"

**Transition words to reduce:**

- "Additionally" → vary with "Also," "Beyond this," or restructure
- "Furthermore" → often unnecessary, delete or restructure
- "Moreover" → same as above
- "However" → fine occasionally, but vary with "But," "Yet," "Still"
- "Therefore" → vary with "So," "This means," or restructure

**Overused structures:**

- Starting multiple paragraphs with "This…"
- "When it comes to [X]…"
- "[X] is a [Y] that [Z]" (weak opener pattern)

### Prose Tightening

**Remove:**

- Redundant words ("very unique" → "unique")
- Weasel words ("somewhat," "quite," "rather")
- Unnecessary qualifiers ("I think," "I believe" — unless voice settings call for them)
- Repeated words in close proximity

**Improve:**

- Passive voice → active voice (where appropriate)
- Long sentences → break into shorter ones
- Weak verbs → stronger alternatives

### Spelling & Grammar

- Fix typos
- Correct grammar errors
- Ensure consistent punctuation style

### Flow & Transitions

- Ensure smooth transitions between sections
- Check that each section connects logically to the next
- Break up walls of text (no paragraphs > 5–6 sentences)

## Content Enhancement Suggestions

In addition to the calibrated and always-applied checks above, the editor suggests **content enhancements** based on your style guide. These are proactive suggestions, not silent edits — the editor proposes, you approve or skip.

### Examples & Illustrations (driven by `structure.examples` and `structure.example_types`)

For each section, the editor assesses whether adding an example would clarify the concept, based on your `examples` preference:

- `none` — no proactive example suggestions.
- `some` — suggestions where examples genuinely clarify.
- `many` — actively look for opportunities to add examples.

Example types come from `example_types`:

- **Lists** → "Would a bulleted/numbered list make this clearer?"
- **Tables** → "Would a comparison table help readers see the differences?"
- **Diagrams** → "Would a flowchart or sequence diagram clarify this process?" (generated as Mermaid, falls back to ASCII art).
- **Code Snippets** → "Would a code example make this concrete?"
- **Quotes** → "Is there a standout insight worth highlighting as a pull quote?"
- **Case Studies** → "Would a brief real-world example help ground this concept?" (2–4 paragraphs, embedded inline, not as a separate section).

### Text Emphasis (Bold and Italic)

The editor adds bold for:

- Key terms on first mention or definition
- Critical takeaways or action items
- Important warnings or caveats
- Emphasizing the core point in a section

The editor adds italics for:

- Subtle emphasis or inflection
- Technical terms, product names, or foreign words
- Book/article/product titles
- Vocal stress ("I didn't say *he* stole the money")

Neither is applied liberally — both lose impact when overused.

## Output

After the editor pass runs, you get a summary in chat that itemizes every change:

```
Editorial pass complete! Here's what I updated:

Content Enhancements:
- Added comparison table in Section 2 (based on style guide: examples="some")
- Added code snippet example in Section 4
- Added 1 blockquote in Section 1 to emphasize key insight (based on style guide: blockquotes="occasional")

Formatting:
- Added 2 bulleted lists
- Bolded 5 key terms at first mention
- Applied moderate visual breaks (standard paragraph lengths per style guide)

Tightening:
- Removed 3 instances of "Additionally"
- Replaced 2 em dashes with commas
- Shortened 4 long sentences

Fixes:
- Corrected 2 typos
- Fixed 1 grammar issue

📄 Review the edited version: cody-projects/article-writer/drafts/<id>-editorpass.md
📄 Original preserved at: cody-projects/article-writer/drafts/<id>.md

Approve the changes, or let me know what to adjust.
```

The editor never overwrites the original — `<id>.md` stays as a backup, and the edited version saves as `<id>-editorpass.md`. If you reject the editor pass entirely, the original is what flows forward to metadata and export.

## Iteration

If you request changes to the editor pass, Cody updates `<id>-editorpass.md` directly and shows a fresh summary. Iterate as many times as needed.

## Related

- [Editor Pass & Export](/docs/cody-article-writer/workflow/editor-pass-and-export/) — the workflow phases where the editor runs.
- [Formatting](/docs/cody-article-writer/writing-styles/formatting/) — the user-side formatting fields that calibrate the editor pass.
- [Structure](/docs/cody-article-writer/writing-styles/structure/) — the structure fields that calibrate example suggestions and visual breaks.
- [Voice](/docs/cody-article-writer/writing-styles/voice/) — the voice fields that calibrate tone consistency.
