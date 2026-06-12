# Version Retrospective – v1.2.0 — Cody Product Builder Best Practices
This document reflects on what worked, what didn't, and how future versions can be improved.

## Version Summary

Documented the **Best Practices** functionality (added in Cody Product Builder skill v2.2.0) on the documentation site. A content-and-metadata diff against the existing, already-published Cody Product Builder docs, not a new skill. Shipped: one new Reference page (`reference/best-practices.md`), the skill version bumped 2.1.0 to 2.2.0 in `skill.ts` with a "Best Practices" sidebar entry placed first under Reference, a `v2.2.0` changelog entry, and a consistency pass across the four pages the feature touches (Build Phase, Versions & Patches, `:cody refresh`, `:cody build`) plus a one-line folder mention in the Overview.

Mid-build, the user invoked the very feature being documented: an on-demand best-practices capture ("never use em-dashes; add this to our best practices"). That rule was recorded to `project-best-practices.md` and applied across all v1.2.0 content.

## What Went Well

- **The skills.ts single-source-of-truth held up.** Bumping one `version` field updated the VersionBadge and the landing card automatically; adding one sidebar entry registered the new page in navigation. No shell changes needed, exactly as the architecture promised.
- **Scoping discussion up front paid off.** Confirming IA placement (new Reference page) and update depth (full consistency pass) before writing meant no rework on structure. Both open questions in the design were resolved by the user before drafting.
- **Drafting from the real skill source** (`references/best-practices-capture.md`, `best-practices-consult.md`, `phases.md`, the template) kept the page accurate rather than inventing behavior.
- **Phase structure without per-phase commit gates** (per user preference) kept momentum; a single editorial review at the end was sufficient because the content was scoped and the build verified at each phase.
- **The build caught nothing broken** because internal links followed the established `/docs/cody-product-builder/...` convention.

## What Could Have Gone Better

- **Stale-cache duplicate-id warnings caused a false alarm.** Incremental `npm run build` runs emitted "Duplicate id" warnings for exactly the files edited that session. It took two clean rebuilds to confirm the warnings live in `node_modules/.astro` / `.vite`, not the content. Knowing this upfront would have saved an investigation.
- **A naive status-update regex over-matched.** A `perl` substitution meant to flip Phase 1 task statuses also matched the "1.1" dependency cells in Phase 2 rows, flipping those to Completed prematurely. Caught and reverted, but a line-anchored pattern should have been used from the start.
- **On-demand-capture behavior wasn't in the skill's reference files.** It was documented on the user's authority. Fine, but worth confirming against the skill's actual implementation when convenient.

## Lessons Learned

- **Astro glob-loader "Duplicate id" warnings on incremental builds are a local cache artifact, not a content problem.** A clean checkout (CI) never sees them; clearing `node_modules/.astro` and `node_modules/.vite` clears them locally.
- **`skill.ts` is the lever for skill-version doc updates** — version, sidebar registration, and landing card all derive from it.
- **House style now bans em-dashes.** Replace with commas, parentheses, colons, or restructured sentences. Captured as a project best practice.
- **When flipping task/version statuses programmatically, anchor the pattern to the line/column** so dependency cells containing task IDs aren't caught.

## Action Items

- Carry the em-dash ban into all future content (now a best practice; Cody reads it on every build/refresh).
- Consider a follow-up patch to sweep pre-existing em-dashes from older content (v1.0.0 / v1.1.0 pages, e.g. `changelog.md` lines 6 and 22) so the whole site honors the new rule. Out of scope for v1.2.0 to keep the diff tight.
- Remaining backlog after this version: B2 (Cody Skill Auditor docs), B6 (marketing landing review), B7 (designed OG image), B8 (favicon suite).
