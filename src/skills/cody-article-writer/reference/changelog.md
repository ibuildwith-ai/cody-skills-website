---
title: Changelog
description: Every released version of Cody Article Writer, newest first.
---

Every released version of Cody Article Writer, newest first. For the complete release notes — features, enhancements, bug fixes, and other notes — see <a href="https://github.com/ibuildwith-ai/cody-article-writer/blob/main/release-notes.md" target="_blank" rel="noopener noreferrer">release-notes.md</a> in the GitHub repository.

## v3.0 · Version System & Humor Slider Fix (2026-03-09)

Adds automatic version migration via `.cody-version`, with a migration chain that handles users who skip versions. Fixes the humor slider direction (now 0 = Serious, 10 = Playful, consistent with the other sliders) and migrates existing style guides automatically.

## v2.0 · Research Workflow (2026-01-05)

Adds research-backed articles with always-on exploratory research, optional comprehensive source gathering (light/medium/heavy), inline citations, and a References section at export. Workflow expands from 9 to 12 phases.

## v1.7 · Structure Settings & Editorial Content Pass (2026-01-05)

Expands structure settings (`visual_breaks`, `examples`, `example_types`), adds a `blockquotes` formatting field, and introduces editorial content enhancement suggestions (tables, code snippets, pull quotes) during the editor pass.

## v1.6 · Writing Mode Choice (2025-12-27)

Adds a choice between section-by-section iteration and full-draft-first writing, plus an explicit Article Approval checkpoint before editor review.

## v1.5.2 · Article Metadata (2025-12-26)

Adds a filename selection step at export and renames "SEO Generation" to "Article Metadata Generation" (title, description, keywords). SEO-specific features deferred to a future dedicated skill.

## v1.5.1 · Constructive AI Feedback (2025-12-25)

Adds anti-sycophancy guidance: the AI now acts as a firm sounding board, providing honest critique and challenging weak ideas instead of agreeing with everything.

## v1.5 · Optional Editor Pass (2025-12-25)

Adds an optional editor pass that polishes the article based on style guide settings — removes AI tells, tightens prose, adds formatting. Working draft files give a clean markdown preview as you write.

## v1.0.1 · Metadata & Versioning (2025-12-25)

Adds version tracking in skill metadata for better release management.

## v1.0 · Initial Release (2025-12-23)

First release. 9-phase guided workflow, customizable style guides with 14 settings across voice/formatting/structure/context, state persistence, draft management, archive system, SEO generation, and markdown export.
