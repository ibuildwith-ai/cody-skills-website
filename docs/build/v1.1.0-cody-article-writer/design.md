# Version Design Document : v1.1.0
Technical implementation and design guide for the upcoming version.

## 1. Features Summary
_Overview of features included in this version._

v1.1.0 adds **Cody Article Writer** as the second fully-documented skill on the site. Three logical groupings of the 15 backlog items:

- **Data flip (1.1.1–1.1.2)** — convert `src/skills/cody-article-writer/skill.ts` from `ComingSoonSkill` to `AvailableSkill` (version 3.0, github URL, real getSkill URLs, full 19-page sidebar), then verify Astro auto-derives the per-route sidebar from the skills barrel.
- **Content drafting (1.1.3–1.1.7)** — scaffold the per-skill content folder under `src/skills/cody-article-writer/`, then draft 19 pages organized by sidebar category (Getting Started ×3, Workflow ×6, Writing Styles ×6, Reference ×4). Every page is drafted by Cody from the real skill source at `~/.claude/skills/cody-article-writer/` and from the Cody Article Writer FigJam.
- **Site-shell verification & deploy (1.1.8–1.1.15)** — confirm the existing v1.0.0 shell handles the new skill automatically: marketing landing flips the card from "coming soon" to "available", skill switcher includes it, GitHub icon points to its repo, Get Skill dropdown shows its downloads, Pagefind indexes the new content, all three breakpoints behave; then editorial pass and deploy.

**No shell changes, no new components, no new npm dependencies.** This is the first real test of the PRD's claim that "adding the next skill is a content-only diff."

## 2. Technical Architecture Overview
_High-level technical structure that supports all features in this version._

**Reuses everything from v1.0.0.** Astro 5 + Starlight + Pagefind + the custom Header components + the per-skill folder convention + the `glob` content loader + the sidebar auto-derivation in `astro.config.mjs` + the GitHub Actions deploy workflow — all unchanged.

**The touch surface for v1.1.0 is two paths:**

| What changes | Where |
|---|---|
| One TypeScript file rewritten (the `ComingSoonSkill` → `AvailableSkill` flip) | `src/skills/cody-article-writer/skill.ts` |
| 20 Markdown files created (1 Overview + 19 sidebar pages) | `src/skills/cody-article-writer/{index.md, getting-started/*.md, workflow/*.md, writing-styles/*.md, reference/*.md}` |

**Files that are NOT touched** but still consumed by this version:

- `src/skills/index.ts` — the barrel already imports `codyArticleWriter`. Once `status` flips to `'available'`, the existing `availableSkills` filter picks it up automatically, which means sidebar derivation and content-collection mounting both follow without code changes.
- `src/skills/types.ts` — both `AvailableSkill` and `ComingSoonSkill` are already defined; the flip just swaps the interface.
- `public/skills/cody-article-writer/downloads/{cody-article-writer.zip, cody-article-writer.skill}` — already present (pre-placed during v1.0.0 task 8.6). Real hrefs go in `skill.ts`, no `#` placeholders needed.
- `public/skills/cody-article-writer/images/cody-article-writer.svg` — illustration already present, used by the landing card.
- `astro.config.mjs`, `content.config.ts`, `src/pages/index.astro`, `src/components/*` — all unchanged. The per-route sidebar derivation, the marketing landing's `<SkillCard>` loop, the topbar's `getActiveSkill`-driven components all key off the same data.

**Repo additions this version produces:**

```
cody-skills-website/
└── src/
    └── skills/
        └── cody-article-writer/
            ├── skill.ts                          ← REWRITTEN (CommingSoon → Available)
            ├── index.md                          ← NEW — Overview (URL: /docs/cody-article-writer/)
            ├── getting-started/
            │   ├── installation.md               ← NEW
            │   └── quick-start.md                ← NEW
            ├── workflow/
            │   ├── the-article-workflow.md       ← NEW
            │   ├── topic-ideation-and-research.md ← NEW
            │   ├── style-selection.md            ← NEW
            │   ├── title-thesis-and-outline.md   ← NEW
            │   ├── writing-the-article.md        ← NEW
            │   └── editor-pass-and-export.md     ← NEW
            ├── writing-styles/
            │   ├── overview.md                   ← NEW
            │   ├── voice.md                      ← NEW
            │   ├── formatting.md                 ← NEW
            │   ├── structure.md                  ← NEW
            │   ├── context.md                    ← NEW
            │   └── managing-styles.md            ← NEW
            └── reference/
                ├── triggers-and-commands.md      ← NEW
                ├── editor-style-guide.md         ← NEW
                ├── storage-and-data.md           ← NEW
                └── changelog.md                  ← NEW
```

**URL mapping** (follows v1.0.0's `/docs/<skill-id>/...` convention):

| File on disk | Public URL |
|---|---|
| `src/skills/cody-article-writer/index.md` | `/docs/cody-article-writer/` |
| `src/skills/cody-article-writer/getting-started/installation.md` | `/docs/cody-article-writer/getting-started/installation/` |
| `src/skills/cody-article-writer/workflow/topic-ideation-and-research.md` | `/docs/cody-article-writer/workflow/topic-ideation-and-research/` |
| `src/skills/cody-article-writer/reference/changelog.md` | `/docs/cody-article-writer/reference/changelog/` |

**Default skill is unchanged.** Cody Product Builder is still index `[0]` in the barrel, so `/docs/` still redirects to it. Cody Article Writer is reachable via the marketing landing card, the skill switcher dropdown, or its direct URL.

## 3. Implementation Notes
_Shared technical considerations across all features in this version._

**Sidebar tree to drop into `skill.ts`** (the 19-page IA approved during planning):

```ts
sidebar: [
  { label: 'Getting Started', items: [
      { label: 'Overview',         slug: '' },                              // /docs/cody-article-writer/
      { label: 'Installation',     slug: 'getting-started/installation' },
      { label: 'Quick Start',      slug: 'getting-started/quick-start' },
  ]},
  { label: 'Workflow', items: [
      { label: 'The Article Workflow',         slug: 'workflow/the-article-workflow' },
      { label: 'Topic Ideation & Research',    slug: 'workflow/topic-ideation-and-research' },
      { label: 'Style Selection',              slug: 'workflow/style-selection' },
      { label: 'Title, Thesis & Outline',      slug: 'workflow/title-thesis-and-outline' },
      { label: 'Writing the Article',          slug: 'workflow/writing-the-article' },
      { label: 'Editor Pass & Export',         slug: 'workflow/editor-pass-and-export' },
  ]},
  { label: 'Writing Styles', items: [
      { label: 'Style Guides Overview', slug: 'writing-styles/overview' },
      { label: 'Voice',                 slug: 'writing-styles/voice' },
      { label: 'Formatting',            slug: 'writing-styles/formatting' },
      { label: 'Structure',             slug: 'writing-styles/structure' },
      { label: 'Context',               slug: 'writing-styles/context' },
      { label: 'Managing Styles',       slug: 'writing-styles/managing-styles' },
  ]},
  { label: 'Reference', items: [
      { label: 'Triggers & Commands',  slug: 'reference/triggers-and-commands' },
      { label: 'Editor Style Guide',   slug: 'reference/editor-style-guide' },
      { label: 'Storage & Data',       slug: 'reference/storage-and-data' },
      { label: 'Changelog',            slug: 'reference/changelog' },
  ]},
]
```

**getSkill array** — both downloads already exist at the referenced paths, no placeholders:

```ts
getSkill: [
  { icon: 'zip',   name: 'Download .zip',   description: 'Source archive',   href: '/skills/cody-article-writer/downloads/cody-article-writer.zip' },
  { icon: 'skill', name: 'Download .skill', description: 'Single-file skill bundle', href: '/skills/cody-article-writer/downloads/cody-article-writer.skill' },
],
```

**Skill version field.** `skill.ts` declares `version: '3.0'` — pulled from the `metadata.version` field in the real skill's `~/.claude/skills/cody-article-writer/SKILL.md` frontmatter. The site's `VersionBadge` will render `3.0` (Cody Product Builder's badge shows `2.1.0` for comparison). This is the skill's own version, NOT the docs-site version (v1.1.0).

**Content drafting strategy.** Each of the 19 content pages has a primary source in the real skill folder. Mapping:

| Doc page | Primary source(s) |
|---|---|
| Overview | `SKILL.md` (intro, capability table) |
| Installation | `SKILL.md` (Directory Setup, Version Check) + per-agent install paths (cross-ref CPB's Installation for table format) |
| Quick Start | `SKILL.md` (Command Reference) + `references/article-workflow.md` (Phase 1 entry) |
| The Article Workflow | `SKILL.md` (Article Workflow Overview) + the FigJam (embed as Mermaid) |
| Topic Ideation & Research | `references/article-workflow.md` (Phases 1–2) + `references/research-workflow.md` (Points 1–3) |
| Style Selection | `references/article-workflow.md` (Phase 3) |
| Title, Thesis & Outline | `references/article-workflow.md` (Phases 4–6) + `references/research-workflow.md` (Points 4–5) |
| Writing the Article | `references/article-workflow.md` (Phase 7, both modes) + `references/research-workflow.md` (Point 6, citations) |
| Editor Pass & Export | `references/article-workflow.md` (Phases 8–12) + `references/editor-style-guide.md` (high-level only — full ruleset goes in Reference) |
| Style Guides Overview | `SKILL.md` (Style Guide System) + `references/style-workflow.md` (Phase 1 sequence) |
| Voice | `references/style-schema.md` (Voice table) + `references/style-workflow.md` (Voice section) |
| Formatting | `references/style-schema.md` (Formatting table) + `references/style-workflow.md` (Formatting section) |
| Structure | `references/style-schema.md` (Structure table) + `references/style-workflow.md` (Structure section) |
| Context | `references/style-schema.md` (Context table) + `references/style-workflow.md` (Context section) |
| Managing Styles | `references/style-workflow.md` (Style Management Commands section) |
| Triggers & Commands | `SKILL.md` (Command Reference table) — list each trigger phrase with what it does |
| Editor Style Guide | `references/editor-style-guide.md` (full file) + the FigJam's Editor Style Guide section (5 user-style-calibrated + 4 always-applied checks) |
| Storage & Data | `SKILL.md` (Directory Setup, Draft State, Export sections) — folder layout + draft JSON schema |
| Changelog | `~/.claude/skills/cody-article-writer/` git log + each version's behavior changes; condensed CPB-style |

**FigJam → Mermaid translation for "The Article Workflow" page.** The FigJam diagram is the canonical visual model. We re-render it as a Mermaid `flowchart` so it lives natively in Markdown (Starlight has Mermaid support via remark plugins, but if not enabled by default we render as an ASCII boxes-and-arrows fallback). The diagram includes: Start → Topic Idea → Iterate (with exploratory research loop) → "Ready to form thesis?" → "Gather comprehensive sources?" → Style Selection → voice+context → Title/Thesis → "Ready for outline?" → structure → Outline → "Start writing?" → formatting → Write Article (with the section-by-section vs full-draft branch) → "Article approved?" → "Editor review?" → optional Editor Pass loop → Metadata → Export → Finished. Future-state stickies from the FigJam ("Add research mode", "Decouple author guides", etc.) are NOT documented — they're explicitly future scope.

**Content authoring uses the same workflow as v1.0.0 task 6.x.** Cody drafts every page from the source files listed above. User reviews each page in task 1.1.14 (editorial pass) once all drafting tasks are complete. Same "page is done only when user signs off" convention.

**Pagefind re-indexes automatically on build.** No tuning expected; if any of the new pages rank poorly for obvious queries (`"writing style"`, `"editor pass"`, `"thesis"`), tune via page frontmatter or section headings — same approach as v1.0.0 task 1.11.

## 4. Other Technical Considerations
_Shared any other technical information that might be relevant to building this version._

- **Version policy (≥ 3-month soak) does not apply** — no new npm dependencies. The existing pinned versions (Astro 5.17.3, Starlight 0.37.6, etc.) are reused as-is.
- **Marketing-landing card flip is automatic** — `src/pages/index.astro` maps over `skills` from the barrel and renders `<SkillCard>` per entry. `SkillCard.astro` branches on `skill.status`. Once `cody-article-writer/skill.ts` flips to `status: 'available'`, the card automatically gains the "Open the docs →" CTA, version pill, and gradient hover border. No edit to the landing page needed. Task 1.1.8 verifies this; no implementation work expected.
- **Skill switcher inclusion is automatic** — `SkillSwitcher.astro` (updated in v1.0.0 task 7.2c) already renders available skills as clickable `<a>` items and coming-soon as muted `<div>` items. Flipping status moves CAW from one branch to the other automatically. Task 1.1.9 verifies.
- **GetActiveSkill type safety.** `getActiveSkill()` returns `AvailableSkill` (not `Skill`), so any docs-page component that reads from it automatically gains access to `version`, `github`, `getSkill`, `sidebar` once CAW is available. No type errors expected.
- **Lighthouse re-check is optional.** v1.0.0 hit 99–100 across the board (task 9.2). Adding 19 static pages doesn't materially affect per-page Lighthouse scores. Skip unless visual regressions surface.
- **Accessibility — same standards as v1.0.0.** All new content follows the same heading hierarchy, semantic Markdown, alt text for any images. No new interactive components, so no new ARIA work.
- **Deployment is automatic on push to `main`** — same GitHub Actions workflow. Task 1.1.15 is "push, watch, verify."
- **Release notes follow CPB template.** Append a v1.1.0 entry to `release-notes.md` at project root (per `cody.json > releaseNotesPath: "{{projectRoot}}"`).

## 5. Open Questions
_Unresolved technical or product questions affecting this version._

- **Mermaid support in Starlight.** Need to verify whether Starlight 0.37.6 renders Mermaid in `.md` files out of the box, or whether we need to enable a remark plugin (`@astrojs/mdx` + `rehype-mermaid` or similar). If enabling adds dependencies, those need to clear the version policy. **Fallback if non-trivial:** render the workflow diagram as ASCII art using the same box-and-arrow style as v1.0.0 design.md's architecture diagram. To resolve before task 1.1.5.
- **Visual treatment of the marketing-landing card after the flip.** Cody Product Builder is the only "available" card in production today; need to spot-check that CAW's "available" card visually parallels it (same illustration scale, same alternating left/right rhythm via the `reverse` prop, same gradient hover border). Trivial visual check — no design changes expected. Resolved in task 1.1.8.
- **Whether "Migrations" content gets folded into Changelog or omitted entirely.** Decided during planning to omit — the skill is new and few users have data on disk that would need migrating. Revisit when the skill has been live long enough to have a migration story worth documenting. Recorded here so future contributors don't re-litigate.
- **CAW SKILL.md description block.** The real skill's frontmatter `description` field is the multi-line trigger-detection prose Claude uses to decide when to activate the skill. The docs-site Overview page should NOT copy this verbatim — readers don't need trigger phrases in the lede. Instead, paraphrase the skill's purpose in the Overview and cite the activation triggers under "Triggers & Commands" (reference page).

**Resolved during planning:**
- Version number → **v1.1.0** (minor bump — content-only diff, no shell change, per PRD framing).
- Folder name → `v1.1.0-cody-article-writer`.
- Sidebar IA → 19 pages locked (Getting Started ×3, Workflow ×6, Writing Styles ×6, Reference ×4). FigJam-informed refinements vs the mockup sidebar: Editor Style Guide promoted to its own Reference page; Voice/Formatting/Structure/Context broken out as separate pages; Migrations dropped.
- GitHub URL → `https://github.com/ibuildwith-ai/cody-article-writer`.
- Download artifact placement → pre-staged at `public/skills/cody-article-writer/downloads/` during v1.0.0 task 8.6; real hrefs go in `skill.ts`.
- Illustration → `public/skills/cody-article-writer/images/cody-article-writer.svg` (already present).
- Skill version on the badge → `3.0` (from the real skill's `SKILL.md` frontmatter).
- Editorial review pattern → same as v1.0.0 task 6.16: user reviews every page end-to-end after all drafting is complete (task 1.1.14).
- Backlog item B1 → absorbed into this version, removed from Backlog section.
- Backlog items B3 (custom domain), B4 (Edit-on-GitHub), B5 (analytics) → removed during planning; out of v1.1.0 scope and removed from the backlog entirely.
