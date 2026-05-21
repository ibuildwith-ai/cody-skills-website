---
title: The Article Workflow
description: A visual tour of the twelve-phase article workflow, from raw topic to exported article.
---

Every article Cody Article Writer produces moves through the same twelve-phase workflow. Each phase has an **iteration loop** — you and Cody converge on the output before moving on. Research is woven in at six points, optional or mandatory depending on the phase. The workflow is the same whether you write your first article or your fiftieth.

## The full workflow

```
                              ┌─────────────────┐
                              │   1. Topic      │
                              │   Ideation      │
       Start  ────────────────│  + Exploratory  │
                              │   Research      │
                              │  (always on)    │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Ready to form  │   No
                              │   a thesis?     │──────┐
                              └────────┬────────┘      │
                                       │ Yes           │
                                       ▼               │
                              ┌─────────────────┐      │
                              │   Iterate with  │──────┘
                              │       AI        │
                              └─────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  2. Research    │
                              │   Planning      │
                              │  (yes / no?)    │
                              └────────┬────────┘
                                       │
                            Yes ◀──────┴──────▶ No
                             │                  │
                             ▼                  │
                  ┌──────────────────┐          │
                  │  Comprehensive   │          │
                  │  research:       │          │
                  │  depth, sources, │          │
                  │  citations       │          │
                  └────────┬─────────┘          │
                           │                    │
                           └──────────┬─────────┘
                                      ▼
                            ┌──────────────────┐
                            │  3. Style        │
                            │     Selection    │
                            │  (pick / create) │
                            └─────────┬────────┘
                                      │
                                      ▼
                            ┌──────────────────┐
                            │  4. Title &      │
                            │     Thesis       │  ← uses voice + context
                            │   (+ research)   │     from style
                            └─────────┬────────┘
                                      │ iterate until approved
                                      ▼
                            ┌──────────────────┐
                            │  5. Outline      │  ← uses structure
                            │   (+ research)   │     from style
                            └─────────┬────────┘
                                      │ iterate until approved
                                      ▼
                            ┌──────────────────┐
                            │  6. Section      │
                            │   Confirmation   │
                            └─────────┬────────┘
                                      │
                                      ▼
                            ┌──────────────────┐
                            │  7. Write        │  ← uses formatting
                            │   Article        │     from style
                            │   (+ research +  │
                            │    citations)    │
                            │  ┌─────────────┐ │
                            │  │ Section-by- │ │
                            │  │  section    │ │
                            │  │     OR      │ │
                            │  │ Full draft  │ │
                            │  └─────────────┘ │
                            └─────────┬────────┘
                                      │
                                      ▼
                            ┌──────────────────┐
                            │  8. Article      │   Not yet
                            │   Approval       │──────────┐
                            └────────┬─────────┘          │
                                     │ Approved           │ iterate
                                     ▼                    │
                            ┌──────────────────┐          │
                            │  9. Editorial    │          │
                            │    Decision      │          │
                            └────────┬─────────┘          │
                                     │                    │
                          Yes  ◀─────┴─────▶  Skip        │
                           │                  │           │
                           ▼                  │           │
                ┌──────────────────┐          │           │
                │  10. Editor Pass │  Not yet │           │
                │   (optional)     │──────────┼───────────┤
                └────────┬─────────┘  iterate │           │
                         │ Approved           │           │
                         └──────────┬─────────┘           │
                                    ▼                     │
                            ┌──────────────────┐          │
                            │  11. Article     │          │
                            │     Metadata     │          │
                            │   (title, desc,  │          │
                            │    keywords)     │          │
                            └─────────┬────────┘          │
                                      │                   │
                                      ▼                   │
                            ┌──────────────────┐          │
                            │  12. Export      │          │
                            │   (citations?)   │          │
                            │   → articles/    │          │
                            │   → archive/     │          │
                            └─────────┬────────┘          │
                                      │                   │
                                      ▼                   │
                                  Finished  ◀─────────────┘
```

## The four key ideas

**Iteration at every phase.** Cody never writes-and-moves-on. Every phase ends with a check — "Ready for outline?", "Approve the title?", "Article approved?" — and loops back if you want to refine. The workflow's job is to give you and Cody natural points to converge.

**Style guide drives the writing.** A reusable style guide controls **voice** (informs thesis), **context** (informs thesis), **structure** (shapes outline), and **formatting** (shapes the writing itself). Settings get applied progressively — voice and context first, structure next, formatting last — so each phase has the right inputs at the right time. See [Style Guides Overview](/docs/cody-article-writer/writing-styles/overview/).

**Research is integrated, not bolted on.** Six research integration points across the workflow:

1. **Exploratory research** during topic ideation (always on, uses WebSearch).
2. **Research planning question** — do you want comprehensive research for this article?
3. **Research configuration** — depth (light/medium/heavy), source approval, citation preferences.
4. **Sources during thesis** — required sources shape the thesis claim.
5. **Sources during outline** — sections planned around evidence.
6. **Sources + inline citations during writing** — `[^1]` markers inserted as the article is drafted.

If you skip comprehensive research (point 2 = no), points 3–6 are skipped and the exploratory research from point 1 still informs ideation. See [Topic Ideation & Research](/docs/cody-article-writer/workflow/topic-ideation-and-research/).

**Drafts and archive preserve everything.** As Cody writes, the draft state (research, sources, decisions, sections, citations) is saved to `cody-projects/article-writer/drafts/<draft-id>.json`. On export, the JSON moves to `archive/` — you can re-export any past article later, optionally with a different template, with all the original research intact. See [Storage & Data](/docs/cody-article-writer/reference/storage-and-data/).

## The workflow split into pages

For depth on each step:

| Step | Page |
|------|------|
| Phases 1–2 | [Topic Ideation & Research](/docs/cody-article-writer/workflow/topic-ideation-and-research/) |
| Phase 3 | [Style Selection](/docs/cody-article-writer/workflow/style-selection/) |
| Phases 4–6 | [Title, Thesis & Outline](/docs/cody-article-writer/workflow/title-thesis-and-outline/) |
| Phase 7 | [Writing the Article](/docs/cody-article-writer/workflow/writing-the-article/) |
| Phases 8–12 | [Editor Pass & Export](/docs/cody-article-writer/workflow/editor-pass-and-export/) |
