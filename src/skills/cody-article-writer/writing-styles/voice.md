---
title: Voice
description: The four voice sliders (tone, humor, opinion, technical) that define how your articles sound.
---

The **Voice** category of a style guide. Four sliders, each 0–10, that control how your articles sound at the sentence level. Voice (together with [Context](/docs/cody-article-writer/writing-styles/context/)) is applied in Phase 4 of the article workflow to shape title and thesis.

## The four sliders

| Slider | 0 | 10 | Controls |
|--------|---|-----|----------|
| **Tone** | Casual | Professional | How formal the writing is. |
| **Humor** | Serious | Playful | How much wit and levity Cody uses. |
| **Opinion** | Balanced | Opinionated | How strong the viewpoint is. |
| **Technical** | Less | More | Depth of technical detail and jargon. |

All four are integers 0–10. There is no neutral or default; every style guide picks an explicit value for each.

## Tone

**0 = Casual, conversational. 10 = Professional, formal.**

- Low (0–3): contractions, second person, casual transitions ("anyway"), short fragments for rhythm. Reads like a chat message or a blog post.
- Mid (4–6): clean prose, occasional contractions, mix of full and partial sentences. Reads like an industry blog post.
- High (7–10): no contractions, full sentences, third person or impersonal, formal transitions ("furthermore", "however"). Reads like a white paper or industry journal.

## Humor

**0 = Serious, straightforward. 10 = Playful, witty.**

- Low (0–3): no jokes, no asides, no parenthetical winks. The piece focuses on its argument.
- Mid (4–6): occasional dry humor, an aside per few sections, the rare turn of phrase that gets a smile.
- High (7–10): persistent wit, callbacks, intentional comedic structure. Suitable for personal newsletters, opinion columns, satirical pieces.

**Note:** In Cody Article Writer v3.0+, the humor slider direction was reversed for consistency with the other voice sliders (higher = more of the named quality). Pre-v3.0 style guides are auto-migrated.

## Opinion

**0 = Balanced, presenting multiple sides. 10 = Opinionated, clear stance.**

- Low (0–3): neutral framing, "on one hand / on the other", explicit acknowledgment of counter-arguments, recommendations hedged.
- Mid (4–6): clear position with acknowledgment of trade-offs. Recommendations made with caveats.
- High (7–10): direct claims, minimal hedging, strong recommendations. The piece argues, it doesn't just inform.

## Technical

**0 = Accessible to all. 10 = Technical depth assumed.**

- Low (0–3): jargon explained, analogies used, no assumed prior knowledge. Suitable for cross-disciplinary or executive audiences.
- Mid (4–6): some jargon used unexplained where the audience is expected to know it, others defined. Standard industry vocabulary assumed.
- High (7–10): deep jargon, no definitions, formula notation, references to specific tools/frameworks/algorithms without context. Suitable for practitioner audiences.

## How voice is applied

In **Phase 4** (Title & Thesis), Cody reads your voice settings before generating any title or thesis options. The four sliders inform:

- **Title**: formality (Tone), playfulness (Humor), assertiveness (Opinion).
- **Thesis claim strength**: how directly the thesis takes a position (Opinion), how much it explains vs. asserts (Technical).
- **Audience framing**: works together with [Context](/docs/cody-article-writer/writing-styles/context/) settings.

Voice doesn't directly shape the outline (that's [Structure](/docs/cody-article-writer/writing-styles/structure/)) or the prose-level texture (that's [Formatting](/docs/cody-article-writer/writing-styles/formatting/)). But the voice baked into the thesis carries forward; Cody won't generate a casual, joke-filled section under a thesis it just wrote in formal academic language.

## What's stored

```json
{
  "voice": {
    "tone": 7,
    "humor": 3,
    "opinion": 8,
    "technical": 5
  }
}
```

All four fields are required. Values must be integers 0–10 inclusive.

## Picking values

A few combinations that work:

| Style purpose | Tone | Humor | Opinion | Technical |
|---------------|------|-------|---------|-----------|
| Thought leadership for executives | 7 | 3 | 8 | 5 |
| Technical tutorial for developers | 4 | 2 | 4 | 9 |
| Conversational newsletter | 2 | 6 | 7 | 3 |
| Industry essay (general audience) | 6 | 4 | 7 | 4 |
| Internal documentation | 5 | 0 | 2 | 7 |

These are starting points, not prescriptions. Iterate on the style as you write; most styles need a few articles of use before the values feel right.

## Related

- [Context](/docs/cody-article-writer/writing-styles/context/): co-applied at Phase 4 (title & thesis).
- [Style Guides Overview](/docs/cody-article-writer/writing-styles/overview/): how voice fits into the full style guide.
