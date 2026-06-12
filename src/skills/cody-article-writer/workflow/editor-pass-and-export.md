---
title: Editor Pass & Export
description: Phases 8–12, covering article approval, the optional editor pass, metadata generation, and the final export to your articles folder.
---

The final five phases of the article workflow. The article is written; now it gets approved, optionally polished, given metadata, and exported as a finished markdown file.

## Phase 8: Article Approval

**Goal:** You read the completed article end-to-end and decide whether it's done.

Cody presents the working draft:

> The article is complete! I've saved it here:
>
> 📄 `cody-projects/article-writer/drafts/<draft-id>.md`
>
> Please review it. Are you satisfied with the article, or would you like to make changes?

- **Approved** → move to Phase 9.
- **Needs changes** → you specify what to change ("in section 2, tighten the conclusion", "swap the example in section 3 for something more recent"). Cody updates the specific section in the JSON, regenerates the draft markdown, and loops back for re-approval.

This loop has no limit, refine as many times as needed.

## Phase 9: Editorial Decision

After approval, Cody offers an optional editor pass:

> Your article is complete! I recommend running an editorial pass to polish it.
>
> The editor will:
> - Suggest contextual examples (tables, diagrams, code snippets) based on your style preferences
> - Apply your visual breaks settings for optimal readability
> - Add strategic bold/italic emphasis following best practices
> - Remove AI writing patterns and tighten prose
> - Ensure tone consistency throughout
>
> This significantly improves article quality. Your original will be preserved as backup.
>
> Would you like me to run the editorial pass? (Recommended)

- **Yes** → Phase 10.
- **Skip** → straight to Phase 11.

## Phase 10: Editor Pass (optional)

**Goal:** Polish formatting, tighten prose, apply the style guide's calibration rules without altering the structure or substance.

The editor pass is governed by the [Editor Style Guide](/docs/cody-article-writer/reference/editor-style-guide/), which defines exactly what gets checked. Two categories of checks:

- **Calibrated to your style**: Visual Breaks, Blockquotes, EM Dashes, Emojis, Tone Consistency. These adapt to whatever settings you picked in your style guide.
- **Always applied**: AI Tell Removal, Prose Tightening, Spelling & Grammar, Flow & Transitions. These run regardless of style.

### How it works

1. Cody reads the approved `drafts/<draft-id>.md`.
2. Applies the editorial checks (with calibration to your style settings).
3. Writes a **new file** at `drafts/<draft-id>-editorpass.md`. The original is preserved as a backup; the editor pass never overwrites it.
4. Outputs a summary of every change to chat:

   ```
   Editorial pass complete! Here's what I updated:

   Formatting:
   - Added 2 bulleted lists
   - Bolded 5 key terms
   - Added 1 pull quote

   Tightening:
   - Removed 3 instances of "Additionally"
   - Replaced 2 em dashes with commas

   📄 Review the edited version: cody-projects/article-writer/drafts/<draft-id>-editorpass.md
   📄 Original preserved at: cody-projects/article-writer/drafts/<draft-id>.md

   Approve the changes, or let me know what to adjust.
   ```

5. **You approve** the edited version, or **iterate** on it ("undo the pull quote in section 3, that one was the right line").

### Citations are untouched

The editor pass **does not modify citation markers** (`[^1]`, `[^2]`, etc.) or the References section. Those live in the writing layer; the editor pass only touches prose and formatting.

## Phase 11: Article Metadata Generation

**Goal:** Produce metadata that goes into the article frontmatter on export.

Cody generates:

- **Title**: confirms or refines the title you approved in Phase 4.
- **Description**: a 150–160 character meta description.
- **Keywords**: an array of relevant tags.

You approve or adjust:

```
Article Metadata:
- Title: "Your Article Title Here"
- Description: "A compelling meta description..."
- Keywords: [keyword1, keyword2, keyword3]

Approve or adjust?
```

Once approved, Cody suggests a filename derived from the title (kebab-case, `.md` extension):

```
Suggested filename: your-article-title-here.md

Use this, or provide your own filename (extension will always be .md):
```

## Phase 12: Export

**Goal:** Generate the final markdown file, optionally with citations, and archive the draft state.

### Citation decision (re-asked at export)

If research was enabled, Cody asks one more time:

> Do you want to include citations in the exported article?
>
> - Yes: Citation markers ([^1], [^2]) and References section will be included
> - No: Citations will be removed, but sources remain archived for potential re-export

This is per-export; it doesn't change the draft state. You can re-export later (see "re-export the X article" in [Triggers & Commands](/docs/cody-article-writer/reference/triggers-and-commands/)) with the opposite choice.

### Export mechanics

1. **Source file:** If the editor pass ran, Cody uses `<draft-id>-editorpass.md`. Otherwise it uses `<draft-id>.md`.
2. **Template:** Cody loads `assets/templates/article_default.md` from the skill and fills in placeholders (`{{title}}`, `{{date}}`, `{{description}}`, `{{keywords}}`, `{{author}}`, `{{content}}`, `{{references}}`).
3. **Citations:**
   - If **yes**: keep `[^N]` markers in content, generate a References section from `citations_used` (only sources that were actually cited), format as `[^1]: Author. "Title." Domain. URL`.
   - If **no**: strip all `[^N]` markers from content, omit the References section entirely (no trailing whitespace).
4. **Final file:** Saved to `cody-projects/article-writer/articles/<filename>.md`.
5. **Archive:** The draft JSON is moved to `cody-projects/article-writer/archive/<draft-id>.json` (preserves all research data for potential re-export). The intermediate `<draft-id>.md` and `<draft-id>-editorpass.md` files are deleted.

### Final message

```
Article exported successfully!
- Article: cody-projects/article-writer/articles/<filename>.md
- Draft archived: cody-projects/article-writer/archive/<draft-id>.json
  (All research sources preserved for potential re-export)
```

## What the article folder looks like after export

```
cody-projects/article-writer/
├── styles/
│   └── professional-linkedin.json
├── drafts/                          ← empty after export
├── articles/
│   └── your-article-title-here.md   ← the final, shareable file
└── archive/
    └── article-id-2026-05-20.json   ← preserved state for re-export
```

For where each piece of data lives (including the full draft JSON schema) see [Storage & Data](/docs/cody-article-writer/reference/storage-and-data/).

## Done

The article workflow is complete. To start a new article, say "I want to write an article about X." To continue a different draft, say "show my drafts" or "continue the X article."
