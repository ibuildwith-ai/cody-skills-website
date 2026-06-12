---
title: Context
description: Who you are, who your audience is, and the relationship between you, so every article lands at the right level.
---

The **Context** category of a style guide. Five fields that define the human dimensions of the writing: who the author is, who the audience is, and the authority dynamic between them. Context (together with [Voice](/docs/cody-article-writer/writing-styles/voice/)) is applied in Phase 4 of the article workflow to shape title and thesis framing.

## The five fields

| Field | Type | Range / Format |
|-------|------|----------------|
| **Author Role** | String | Free text, e.g., "AI Educator", "Startup Founder", "Product Manager" |
| **Author Topic Knowledge** | Integer | 0 (Learning) ↔ 10 (Expert) |
| **Audience Role** | String | Free text, e.g., "Enterprise PMs", "Indie Hackers", "Technical Leaders" |
| **Audience Topic Knowledge** | Integer | 0 (Learning) ↔ 10 (Expert) |
| **Author Relationship to Audience** | Integer | 0 (Peer) ↔ 10 (Expert) |

## Author Role

Free-text description of how you want to be positioned in the piece.

Examples:

- "AI Educator and Startup Founder"
- "Senior Product Manager at a SaaS company"
- "Independent technical writer"
- "Former engineering leader, now investor"

This shapes the implicit identity from which the article speaks, not by inserting it as a byline, but by informing the voice's confidence and the type of evidence/experience the piece can draw on.

## Author Topic Knowledge (0–10)

How deeply the author understands this specific topic.

- **0–3**: Learning alongside the reader. The article frames itself as exploration ("I've been digging into X and here's what I've found").
- **4–6**: Working knowledge, not the world's expert. Authoritative on the basics, appropriately humble on the edges.
- **7–10**: Established expert. Speaks with definitive authority, references prior experience without caveats.

This is **per-topic**, not "are you an expert overall". The same author writing about Topic A might be an 8 and Topic B might be a 3.

## Audience Role

Free-text description of who you're writing for.

Examples:

- "Enterprise Product Managers"
- "Solo founders and indie hackers"
- "Senior engineering leaders evaluating new tools"
- "Anyone curious about the topic, no prior context assumed"

This shapes vocabulary, what gets explained versus assumed, what trade-offs feel resonant, and what kind of evidence lands ("here's a graph from Gartner" vs "here's what I noticed in my codebase last week").

## Audience Topic Knowledge (0–10)

How deeply the audience already understands the topic.

- **0–3**: New to the topic. Cody explains jargon, defines terms, uses analogies.
- **4–6**: Familiar with the basics. Cody uses standard vocabulary without explaining; goes deeper into nuance.
- **7–10**: Deep expertise. Cody assumes the audience knows everything the author knows; the article makes a contribution to existing practice rather than introducing concepts.

This pairs with [Voice](/docs/cody-article-writer/writing-styles/voice/) `technical` slider, `technical: 9` plus `audience_topic_knowledge: 2` would produce explained-jargon technical depth; `technical: 9` plus `audience_topic_knowledge: 9` would produce dense practitioner content.

## Author Relationship to Audience (0–10)

The authority dynamic between author and audience.

- **0–3**: Peer. Author and audience are on equal footing, exploring or sharing observations.
- **4–6**: Slight asymmetry. Author has perspective worth offering, but the relationship is collegial.
- **7–10**: Expert teaching. Author is the authority; audience is learning. Direct claims, fewer hedges, clearer recommendations.

This combines with the knowledge fields above. `Author Knowledge: 8`, `Audience Knowledge: 4`, `Relationship: 7` produces "expert speaking to a less-expert audience with confidence." `Author Knowledge: 6`, `Audience Knowledge: 8`, `Relationship: 3` produces "informed peer offering a perspective to a deeper-expert audience", appropriately humble.

## How context is applied

In **Phase 4** (Title & Thesis), Cody reads all five fields and uses them to shape:

- **Audience framing in the thesis.** Who is being addressed determines how the central claim is phrased.
- **What knowledge gets assumed.** Audience topic knowledge controls what jargon to explain in the thesis statement vs. use bare.
- **How direct the recommendations are.** The relationship field calibrates how forcefully the article tells the reader what to think or do.
- **Where the author's authority is implicit.** Author role and knowledge shape what's said with confidence vs. acknowledged as observation.

Context flows forward through the rest of the workflow via the thesis: the outline, writing, and editor pass all build on the thesis Cody crafted with context in mind.

## What's stored

```json
{
  "context": {
    "author_role": "AI Educator and Startup Founder",
    "author_topic_knowledge": 8,
    "audience_role": "Enterprise Product Managers",
    "audience_topic_knowledge": 4,
    "author_relationship_to_audience": 7
  }
}
```

`author_role` and `audience_role` must be non-empty strings. The three integer fields must be 0–10 inclusive.

## Picking values

Some examples:

| Style purpose | Author Role | Author Know. | Audience Role | Audience Know. | Relationship |
|---------------|-------------|--------------|---------------|----------------|--------------|
| Thought leadership | "Industry strategist" | 8 | "Senior decision-makers" | 5 | 7 |
| Tutorial for beginners | "Practitioner" | 9 | "People new to the topic" | 1 | 8 |
| Peer essay | "Practitioner" | 6 | "Other practitioners" | 7 | 4 |
| Internal documentation | "Team lead" | 8 | "Engineers on the team" | 6 | 5 |
| Investor letter | "Founder" | 9 | "LPs and prospective LPs" | 4 | 6 |

## A note on the future

The current model has author and audience embedded directly in the style guide. A future version may split author profiles out as their own reusable artifact (so the same author profile can attach to multiple style guides with different audiences). That's not how it works today; every style guide owns its own context. See the [Cody Article Writer changelog](/docs/cody-article-writer/reference/changelog/) for the latest.

## Related

- [Voice](/docs/cody-article-writer/writing-styles/voice/): co-applied at Phase 4 (title & thesis).
- [Style Guides Overview](/docs/cody-article-writer/writing-styles/overview/): how context fits into the full style guide.
