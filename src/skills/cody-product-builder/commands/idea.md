---
title: ":cody idea"
description: Capture a quick idea to the feature backlog without breaking your flow, or view current backlog items.
---

`:cody idea` is the fast lane for capturing thoughts that come up mid-build, both yours and the agent's, without context-switching out of whatever you're doing. With no arguments, it shows the current backlog.

## When to use it

Use `:cody idea` when:

- You're mid-build and an idea pops up you don't want to forget.
- The agent suggests something interesting that you want to evaluate later, not now.
- You want to see what's already sitting in the backlog before starting a new version.

The point is to capture and move on. No follow-up questions, no workflow disruption.

## Capture an idea

Type `:cody idea` followed by a short description:

```
:cody idea add dark mode toggle
```

Cody does the following silently:

1. Reads the **Backlog** section of `feature-backlog.md` and figures out the next sequence number.
2. Derives a short feature name from your description (2 to 4 words, title case).
3. Adds a new row to the Backlog table with `#`, `Feature`, `Description`, and `Source = User`.
4. Tells you: `Idea #<n> captured in the backlog.`

That's it. No questions, no banner, no further interaction. You go right back to what you were doing.

If `feature-backlog.md` doesn't exist yet, Cody creates it from the template before adding the idea.

## View the backlog

Type `:cody idea` with no arguments:

```
:cody idea
```

Cody reads the **Backlog** section of `feature-backlog.md` and shows it to you as a table.

If no backlog exists yet, Cody tells you so and reminds you that `:cody idea <description>` creates one.

## How captured ideas get used

Backlog items captured via `:cody idea` show up automatically when you start a new version or patch via `:cody build`. Cody offers them as starting points so good thoughts aren't lost.

The **Backlog** section is also where Cody itself logs ideas it suggests during planning and build, with `Source = Agent`. The Source column tells you who proposed what.

Backlog items are removed when they're picked up and written into a version or a patch.

## What's next

See [`:cody build`](/docs/cody-product-builder/commands/build/) for how backlog items flow into a new version or patch. See [The Build Phase](/docs/cody-product-builder/workflow/build-phase/) for the conceptual overview.
