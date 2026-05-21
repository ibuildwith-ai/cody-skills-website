# Version Retrospective – v1.1.0 (Cody Article Writer)

## Version Summary

v1.1.0 added Cody Article Writer as the second documented skill on the site. Scope: flip the existing `ComingSoonSkill` placeholder to `AvailableSkill` in `src/skills/cody-article-writer/skill.ts`, ship 19 documentation pages drafted from the real skill source, and verify the v1.0.0 shell handles the new skill with no rebuild. The release also resolved a v1.0.0 architectural debt (single global sidebar → per-route sidebar) and unified the Changelog format across both skills.

Shipped 34 tasks across 4 phases (originally scoped to 15 backlog items; expanded to 34 once the FigJam informed the sidebar design and the sidebar-swap blocker was identified during build).

## What Went Well

- **The PRD's "content-only diff" promise mostly held.** Adding the skill required one TypeScript file rewrite (`skill.ts`), 20 new Markdown files, plus one new component (`Sidebar.astro`) to resolve a v1.0.0 known debt. The marketing landing, skill switcher, GitHub link, Get Skill menu, and search index all auto-handled the new skill with zero per-page configuration. The data-driven architecture earned its keep on its first real test.
- **The FigJam was load-bearing for the docs design.** The user's FigJam diagram of the Article Writer workflow surfaced multiple things the mockup sidebar (and even the SKILL.md) didn't communicate: the Editor Style Guide as a distinct artifact, the two approval loops (after writing + after editor pass), the four research integration points beyond Phase 2, the calibrated-vs-always-applied editor split. The sidebar grew from 6 mockup pages to 19 final pages because of what the FigJam revealed.
- **The Sidebar override stayed DRY.** Each skill's `skill.ts` is still the single source of truth — the override iterates over whatever's there (N groups, M items). Future skills require zero changes to the Sidebar component. Validated by user concern ("nothing is hard coded right?") which was a useful check.
- **One blocker, one fix.** The collapsed-by-default bug in the Sidebar override was caught by the user on first review and fixed in one line. No other regressions surfaced during the editorial pass.
- **Changelog cleanup unified both skills.** What started as a small CAW changelog draft turned into a format alignment across both skills, with every version and patch from each skill's `release-notes.md` (16 for CPB, 9 for CAW) condensed to 1–2 sentences. The Changelog page now serves as a true at-a-glance history rather than a partial summary.

## What Could Have Gone Better

- **The sidebar architecture blocker should have been caught in v1.0.0.** v1.0.0's design.md explicitly noted "v1 uses one global sidebar; multi-skill swap migrates to starlight-sidebar-topics plugin in v2." The hand-off into v1.1.0 inherited this debt without explicit acknowledgment, so I discovered it after flipping `skill.ts` and seeing CPB's sidebar render on CAW pages. The fix was small (~50 lines for the override) but added two unplanned tasks (1.2a, 1.2b) mid-Phase 1. Better v1.0.0 backlog hygiene would have surfaced this as a v1.1.0 prerequisite during planning, not at execution time.
- **The collapsed-by-default bug in the Sidebar override was a silent failure.** The build succeeded, the page rendered, and the active group's items showed up correctly — the bug was only visible when the active page wasn't in a group with multiple items. My structural verification in Phase 3 (grep of rendered HTML) confirmed all expected items were present in the DOM, so I missed that they were hidden by `<details>` being closed. A simple "render a CAW page in a browser, eyeball the sidebar" would have caught it before user review.
- **The `[\`text\`](url)` styling issue had been in production since v1.0.0** and was only caught now. The small monospace rendering of `:cody command` links has been visible across CPB pages since launch. This was a content review gap from v1.0.0, not a v1.1.0 issue, but it shows the value of cross-page visual consistency reviews — easy to miss when individual pages look fine in isolation.
- **The system reminder about TaskCreate fired many times** during this build and was repeatedly ignored. The skill's tasklist.md was the right tracker for this work (per the Cody workflow), and the parallel TaskCreate system was redundant. Quieter signal would have been useful, but ignoring it was correct.

## Lessons Learned

- **Validate "content-only diff" claims by actually executing them.** The PRD's promise that adding a new skill requires no shell changes was largely true, but the one exception (the sidebar) was structurally significant. Whenever a future version makes an architectural claim like this, the next version's planning should re-test it against current code state, not just trust the original design doc.
- **Probe-first for capabilities the design depends on.** The Mermaid question was probed early (task 1.4) before any content was drafted that relied on it. That worked well — the fallback to ASCII art was decided before the workflow diagram page was written. Same pattern should apply to any future "does Starlight do X natively?" question.
- **The FigJam (or any visual source of truth from the skill author) is more reliable than the skill's own SKILL.md** for documentation structure. SKILL.md is written for an AI to execute; the FigJam is written for a human to understand. Use both. Lean on the visual one for sidebar IA decisions.
- **Browser-eye verification beats DOM grep for visual bugs.** Phase 3's structural checks (grep of rendered HTML) caught most things but missed the collapsed-by-default sidebar. Any future version with a UI-touching change should include at least one "open in browser, look at it" task before handing off to user editorial pass.
- **Keep cross-version visual consistency on the radar during multi-version projects.** The `[\`text\`](url)` styling issue was a v1.0.0 content choice that became visible as a problem when v1.1.0 unified Changelog format made the small monospace look out-of-place. Earlier visual audits — even informal ones — would have surfaced this before user reviewed Changelog page.

## Action Items

- **Add a "browser-eye check" task to every UI-touching version's tasklist.** Specifically: render one page from each skill in the dev server and visually inspect at least the sidebar, top bar, content, and one cross-link. Catches the class of bug where DOM is correct but rendering is wrong.
- **When inheriting known-debt items from a previous version, list them explicitly in the new version's design.md §5 (Open Questions).** v1.0.0's "v2 needs starlight-sidebar-topics" note should have been a v1.1.0 open question, not discovered at task 1.2.
- **Sweep all skill pages for visual consistency before each release.** Specifically check: link styling (no orphan code-in-links), tone alignment with the latest written pages, dead cross-links. Even a 10-minute spot check would catch most issues.
- **When proposing UI changes mid-flight (like the Sidebar override), tell the user the implementation will be N tasks before doing it.** I added 1.2a and 1.2b to the tasklist as I went; explicitly proposing the scope expansion before implementing would have given the user a chance to push back if Option B (`starlight-sidebar-topics` plugin) was preferred.
- **For multi-page content drafting, batch the task-completion updates by page-completion event, not phase-completion event.** User requested this mid-flight; held going forward. Single-page completion → single tasklist update → next page. Smaller working chunks, faster recovery if something goes wrong.

## Notable Decisions Recorded Elsewhere

- Sidebar swap implementation: **Option A** (custom override, no new dependencies) chosen over Option B (`starlight-sidebar-topics` plugin) for DRY-ness and dependency minimization. Documented in conversation; reasoning preserved in `design.md` Implementation Notes.
- Mermaid: not supported natively in Starlight 0.37.6. **ASCII flowchart** chosen for the workflow diagram. Documented in `design.md` Open Questions.
- Migrations page: **dropped** from the sidebar per user input. Migration logic now lives only in the Changelog entry for v3.0. Documented in `design.md` Open Questions.
- Version number: **v1.1.0** chosen over v2.0.0. Minor bump aligns with the PRD's framing of new skills as content-only diffs and the actual minimal shell change (one component added).
- Editor Pass page split: kept Phases 8–12 as one page (`Editor Pass & Export`) rather than splitting Article Approval / Editor Pass / Metadata / Export into separate pages. Optimized for reader's mental model (the "final stretch after writing") over the workflow's phase boundaries.
