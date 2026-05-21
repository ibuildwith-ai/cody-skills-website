---
title: Changelog
description: Every released version of Cody Product Builder, newest first.
---

Every released version of Cody Product Builder, newest first. For the complete release notes — features, enhancements, bug fixes, and other notes — see <a href="https://github.com/ibuildwith-ai/cody-product-builder/blob/main/release-notes.md" target="_blank" rel="noopener noreferrer">release-notes.md</a> in the GitHub repository.

## v2.1.0 · Standards Compliance (2026-05-19)

Brings the skill into compliance with the agentskills.io specification and the Cody Skill Framework. Moves `version` into `metadata.version`, renames `templates/` to `assets/`, and adds a deterministic Python config resolver script.

## v2.0.0 · Migrate to Agent Skill (2026-05-18)

Migrates to the Agent Skill open standard. Cody is now a single, self-contained skill folder with `SKILL.md` at the root; the old `.cody/` framework and per-IDE activation files are removed.

## v1.11.0 · Prototype Command (2026-05-18)

Adds the standalone `:cody prototype` command for throwaway, interactive prototypes that test an idea — independent of the Plan and Build phases.

## v1.10.0 · Configurable Release Notes Path (2026-03-20)

Lets users choose where `release-notes.md` lives (build folder, project root, or a custom path), stored as `releaseNotesPath` in `cody.json`.

## v1.9.0 · Configurable Project Path (2026-03-19)

Replaces the hardcoded `cody-projects/product-builder/` output path with a user-configurable project path. Introduces the root-level `cody.json` (replacing the per-project `project.json`) and migrates legacy projects automatically.

## v1.8.0 · Agent Optimization (2026-03-17)

Optimizes the agent for progressive disclosure: slims `agent.md` from 102 to 53 lines, extracts shared content into a new `references/` folder, and removes pre-loading of all command files on activation.

## v1.7.3 · Activation Restructure (Patch) (2026-03-17)

Renames IDE activation command files to `cody-product-builder` (slash command is now `/cody-product-builder`) and moves `.claude/`, `.cursor/`, `.github/` into a new `activations/` folder.

## v1.7.2 · Consolidate Ideas Into Backlog (Patch) (2026-03-15)

Folds the separate `ideas.md` tracker into the Backlog section of `feature-backlog.md`. `:cody idea` writes directly to the backlog with a Source column distinguishing User vs Agent.

## v1.7.1 · File System Check Safety (Patch) (2026-03-14)

Adds file system safety rules to prevent false negatives when checking for files: always use placeholders, and verify with two methods before concluding a folder is empty.

## v1.7.0 · Idea Tracker (2026-03-14)

Adds `:cody idea [description]` for quick mid-flow idea capture. Captured ideas are offered as starting points when creating new versions or patches.

## v1.6.0 · Unified Build Command (2026-03-14)

Consolidates `:cody build backlog`, `:cody build version`, and `:cody patch` into a single guided `:cody build` command. Reduces the command surface from 6 to 4.

## v1.5.2 · Project Settings File (2026-03-14)

Adds a `project.json` file that tracks project metadata (name, description, version, phase, dates), created during setup and updated after each version or patch.

## v1.5.1 · Patch Workflow Improvements (Patch) (2026-03-13)

Adds named patch titles, an agent verification step before handoff, a user testing confirmation loop, and a closing message that mentions both commit and push.

## v1.5.0 · Patches & Command Restructure (2026-03-12)

Two changes: lightweight patches for quick fixes (skipping the full version build cycle), and a command restructure simplifying from 9 to 6 commands.

## v1.4.0 · Brownfield Project Support (2026-02-26)

Adds support for existing codebases. `:cody refresh` auto-detects brownfield projects, runs an autonomous codebase analysis, and generates the plan phase documents.

## v1.3.0 · Restructure and Improvements (2026-02-23)

Major reorganization: project output moves to a shared `cody-projects/` directory, the internal config folder is flattened, and Cursor IDE support is added.
