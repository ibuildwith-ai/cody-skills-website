# Project Best Practices
The project's living record of best practices learned while building it. Cody writes to this file after every build (version or patch) and reads it during every build, so the project follows its own standards as it grows.

_How to use this file (for the **AGENT**):_
- _Each entry is a single rule plus a one-line why, e.g. `- Keep command files short. **Why:** long files get skimmed and steps skipped.`_
- _Keep it lean and current. When a new learning contradicts an existing rule, change or remove the old rule rather than appending a second one. This file is the project's bible, not an append-only log._
- _Categories below are a starter set, not a fixed schema. Add categories the project needs and remove starter categories that stay empty or do not apply._
- _No version tags on entries._

## Architecture
_Structural decisions and patterns to follow (e.g. layering, module boundaries, how the pieces fit)._

- `src/skills/<skill>/skill.ts` is the single source of truth for a skill. **Why:** the `version` field drives the VersionBadge and the landing card, and the `sidebar` array drives navigation; documenting a new skill version is mostly a `skill.ts` edit plus content pages, no shell changes.
- A sidebar entry whose `slug` has no matching content file fails the Astro build. **Why:** create the `.md` page and add the sidebar slug together, or the build breaks.

## Code & Style
_Naming, formatting, idioms, and conventions specific to this project._

- Never use em-dashes (—) in site content or docs. **Why:** house style; replace with commas, parentheses, colons, or by restructuring the sentence.

## Testing
_How this project tests: what to test, where tests live, what "done" means._

**[AI AGENT TODO: Add rules here as they are learned, or leave empty.]**

## Tooling & Dependencies
_Build tools, libraries, versions, and how the project manages them._

**[AI AGENT TODO: Add rules here as they are learned, or leave empty.]**

## Workflow & Process
_How work moves through the project: commits, reviews, releases, checkpoints._

- Closing a version: mark it complete in `feature-backlog.md`, write the retrospective, capture best practices, bump `version` + `updatedAt` in `cody.json`, update the root `release-notes.md`, update `README.md` (version badge), then commit, push `main`, and tag `vX.Y.Z`. **Why:** this is the project's full close-out checklist; release notes live at the repo root, the changelog page is separate per-skill content.
- Deploy is automatic on push to `main` via GitHub Actions to GitHub Pages; commit directly to `main`. **Why:** the project's established convention (every prior version shipped this way) and the deploy trigger.

## Gotchas
_Traps, surprises, and hard-won lessons to avoid repeating._

- Astro "Duplicate id" warnings on incremental `npm run build` are a stale local cache, not a content problem. **Why:** they name only recently-edited files; clear `node_modules/.astro` and `node_modules/.vite` for a clean build. CI (fresh checkout) never sees them.
- When flipping task/version statuses with a regex, anchor to the line/status column. **Why:** a loose pattern also matches task IDs in the Dependencies column and flips the wrong rows.
