---
title: Managing Styles
description: List, edit, and delete your saved writing styles.
---

Style guides live as JSON files in `cody-projects/article-writer/styles/`. Three commands let you manage them. All are plain-language phrases — Cody Article Writer has no `:cody`-prefixed commands.

## List

**Trigger:** "list my writing styles" / "show my styles"

Cody reads every JSON file in `cody-projects/article-writer/styles/` and lists them by name + description:

```
You have these saved styles:

1. Professional LinkedIn
   For thought leadership articles targeting enterprise product managers

2. Casual Newsletter
   Conversational tone for weekly subscriber updates

3. Technical Tutorial
   Step-by-step explainers for engineering audiences
```

The list is alphabetical by filename. There's no concept of a "default" style — every article's Phase 3 ([Style Selection](/docs/cody-article-writer/workflow/style-selection/)) asks you to pick one.

## Edit

**Trigger:** "edit my X style" (where X is the style name)

Cody:

1. Loads the JSON for `X`.
2. Shows the current configuration in the same format as the style creation Review phase.
3. Asks what to change.
4. Updates the requested fields and re-validates.
5. Saves back to `styles/<X>.json`.

You can iterate as many times as needed. Cody won't change anything you don't explicitly ask for — if you say "increase humor to 5", only humor changes; tone, opinion, technical all stay where they were.

### What you can change

Every field except the filename. Voice sliders, formatting fields, structure arrays, context strings and numbers — all editable. Editing the **name** changes the description string in the JSON but **does not rename the file** (filename stays kebab-case from the original name).

If you want to rename the file too, delete the style and re-create it with the new name. There's no rename command.

### Edits propagate forward, not backward

Style edits affect **future** articles, not past ones. If you edit `professional-linkedin.json` after exporting an article that used it, the exported article and its archived JSON are unchanged. The next article that picks `professional-linkedin` will use the updated settings.

This matters when you're tuning a style over time — your already-shipped articles are pinned to whatever settings they used at write time. Re-export from archive will use the **current** style settings.

## Delete

**Trigger:** "delete the X style"

Cody asks for explicit confirmation:

> Are you sure you want to delete "X"? This cannot be undone.

On "yes", the JSON file is removed from `styles/`. No backup is kept.

### What gets affected

- **Future articles** can't pick this style in Phase 3 — it's gone from the list.
- **Past articles** are unaffected. The exported `.md` files are static; the archived draft JSONs still reference the style by filename slug but don't store its content, so a re-export of a past article that used a deleted style will fail (or fall back to a default — current behavior is to fail and prompt you to pick a different style).

If you're cleaning up old styles, take a moment first to check whether you have archived drafts that referenced them via "show my archive" — there's no automated check.

## Direct file edits

You can also edit style JSONs directly in your editor — they're plain JSON, validated by the schema in [Storage & Data](/docs/cody-article-writer/reference/storage-and-data/). Direct edits skip Cody's validation flow, so:

- Make sure required fields stay present (everything covered in the per-category pages).
- Slider values must be integers 0–10.
- `blockquotes`, `visual_breaks`, `examples` must use the exact enum strings.
- `opening`, `closing`, `example_types` are arrays with at least one valid value.

If validation fails when an article tries to use the style, Cody surfaces the error and prompts you to fix it.

## Related

- [Style Guides Overview](/docs/cody-article-writer/writing-styles/overview/) — how styles are structured and created.
- [Storage & Data](/docs/cody-article-writer/reference/storage-and-data/) — the JSON schema and where files live on disk.
