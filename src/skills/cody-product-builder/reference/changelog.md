---
title: Changelog
description: Every released version of Cody Product Builder, newest first.
---

Selected releases of Cody Product Builder. For the complete history, see [`release-notes.md`](https://github.com/ibuildwith-ai/cody-product-builder/blob/main/release-notes.md) in the GitHub repository.

## v2.1.0 · Standards Compliance (2026-05-19)

Brings Cody Product Builder into compliance with the agentskills.io specification and the Cody Skill Framework, and applies instruction-quality fixes surfaced by a full skill audit.

- **Spec-compliant frontmatter.** The skill `version` moves from a top-level frontmatter field into `metadata.version`, where the agentskills.io spec expects non-standard fields.
- **`assets/` folder.** The `templates/` folder is renamed to `assets/` to match the Cody Skill Framework convention.
- **Config resolution script.** A new `scripts/resolve-config.py` resolves the dynamic placeholder paths from `cody.json` deterministically.
- Duplicated instruction blocks extracted into shared references.
- Brief "why" rationale added to consequential steps across the command files.

## v2.0.0 · Migrate to Agent Skill (2026-05-18)

Cody Product Builder migrates to the Agent Skill open standard. The framework is now a single, self-contained skill folder with a `SKILL.md` at its root.

- **`SKILL.md`.** Agent instructions and activation steps merged into a single file at the skill root, with YAML frontmatter (`name`, `description`, `version`).
- **Single skill folder.** Cody is now one portable folder, installed by copying it into your agent's skills directory.
- **Triggering description.** The frontmatter `description` lets the skill activate from natural language as well as the explicit `/cody-product-builder` command.

## v1.11.0 · Prototype Command (2026-05-18)

Added the standalone `:cody prototype` command for building throwaway, interactive prototypes that test an idea. Prototyping is independent of the Plan and Build phases.

- **`:cody prototype` command.** Runs the whole prototype workflow in a single file.
- **Independent of the phases.** Never changes the `phase` value in `cody.json`.
- **`prototype.md` document.** Captures the idea being tested, what to test, build approach, an iterative findings log, and likes and dislikes.
- **Passive mention in plan and build.** `:cody plan` and `:cody build` mention available prototypes in a single non-blocking line.

## v1.10.0 · Configurable Release Notes Path (2026-03-20)

Added a configurable release notes location. Users can now choose where `release-notes.md` is stored: the build folder, the project root, or a custom path. Stored as `releaseNotesPath` in `cody.json`.

## v1.9.0 · Configurable Project Path (2026-03-19)

Replaced the hardcoded `cody-projects/product-builder/` output path with a user-configurable project path. Introduced the root-level `cody.json` file structured for multi-skill support, replacing the older `project.json`.

## v1.8.0 · Agent Optimization (2026-03-17)

Optimized for progressive disclosure, reducing the token footprint on activation. Shared content extracted into reusable reference files. Activation flow redesigned to eliminate unnecessary file reads.

## v1.7.0 · Idea Tracker (2026-03-14)

Added the quick-capture idea tracker so users can log ideas mid-flow without disrupting their current work. Introduced the `:cody idea` command.

## v1.6.0 · Unified Build Command (2026-03-14)

Consolidated `:cody build backlog`, `:cody build version`, and `:cody patch` into a single guided `:cody build` command. Reduced the command surface from 6 to 4.

## v1.5.0 · Patches & Command Restructure (2026-03-12)

Added lightweight patches for quick fixes that skip the full version build cycle. Restructured commands to simplify the command surface from 9 down to 6.

## v1.4.0 · Brownfield Project Support (2026-02-26)

Added support for brownfield projects. `:cody refresh` now auto-detects existing codebases without Cody documents, performs an autonomous codebase analysis, asks targeted questions, and auto-generates all Plan phase documents.

---

For the complete release history including every patch and earlier versions, see [`release-notes.md`](https://github.com/ibuildwith-ai/cody-product-builder/blob/main/release-notes.md) in the GitHub repository.
