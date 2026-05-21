---
title: Prototypes
description: Throwaway, interactive mockups for testing an idea in a single session. Independent of the Plan and Build phases. Conceptual reference for how prototyping fits the workflow.
---

A prototype is a throwaway, interactive mockup built to test an idea. You build it beginning to end in one session.

Prototyping is independent of the [Plan](/docs/cody-product-builder/workflow/plan-phase/) and [Build](/docs/cody-product-builder/workflow/build-phase/) phases. You can run [:cody prototype](/docs/cody-product-builder/commands/prototype/) anytime, before planning, while planning, before or during a build, or after one. Running it does not change the `phase` value in `cody.json`.

## What a prototype is for

Prototypes exist to answer "would this work?" without committing to it. Some examples:

- Test whether a tricky UI interaction feels right before scoping it into a version.
- Try out a third-party API before designing around it.
- Spike on an unfamiliar tech stack to see if it's worth adopting.
- Validate a layout, animation, or flow with a stakeholder.

The key property: a prototype is **disposable**. You don't owe it long-term care, and Cody is explicit about that. When you're done, you choose to keep it for reference or delete it. Both are valid.

## How a prototype is organized

Each prototype lives in its own self-contained folder under `prototypes/`:

```
<project-path>/
└── prototypes/
    └── <slug>/
        ├── prototype.md          # The captured idea, findings, likes/dislikes
        └── <whatever you built>  # Code, assets, configs
```

The folder name is a slug derived from the prototype name (lowercase, dashes, 30 characters maximum).

### The `prototype.md` document

Every prototype has a `prototype.md` that captures:

| Section | Purpose |
|---------|---------|
| **Prototype name** | Human-readable name. |
| **Created** / **Last Updated** | Dates in `YYYY-MM-DD` format. |
| **The Idea** | The idea being tested and what you hope to learn from it. |
| **What to Test** | The specific things you want to be able to evaluate. |
| **Build Approach** | The form the prototype will take and any tech choices. |
| **Findings Log** | A dated, append-only log of what you learned as you built. |
| **Likes & Dislikes** | What worked, what didn't, what you'd keep, what you'd throw away. |

The Findings Log is append-only on purpose. Earlier entries are never overwritten, so you always see how your understanding evolved.

## How prototypes connect to plan and build

Prototypes do not interrupt other workflows. Both [:cody plan](/docs/cody-product-builder/commands/plan/) and [:cody build](/docs/cody-product-builder/commands/build/) check for existing prototypes and mention them in a single non-blocking line. If you don't want to use one, the flow continues silently.

If you do want to use one, tell Cody to use it. Cody reads its `prototype.md` and factors the findings, likes, and dislikes into the work at hand.

This passive mention pattern is deliberate. Prototypes inform the work, but they never block it.

## Same session vs separate session

A prototype is just files in your project. It does not matter which AI session builds it. What you're really choosing is how much of your conversation the prototype shares with your planning or building work.

**Same session.** Run `:cody prototype` in the session where you're already planning or building. The agent carries that conversation into the prototype, so your discovery answers, the plan you're shaping, and the version you're scoping all inform how the prototype gets built. Use this when the prototype is tightly tied to what you're working on right now.

**Separate session.** Open a new AI session and run `:cody prototype` there. The prototyping conversation stays fully isolated. The prototype is still created in the same project (the files land under `prototypes/` either way). When you go back to planning or building, the agent reads `prototype.md` to pick up the findings. Use this when you want to keep a long exploration out of your main session.

Either way, `prototype.md` is the durable bridge between sessions. In the same session, the agent also has the live conversation; in a separate session, `prototype.md` is the one thing that carries over, which is exactly what it's for.

## Git

Cody ships no `.gitignore` for prototypes and does not manage their git status. When a prototype folder is created, Cody warns you that everything inside it (including `node_modules` for a Node prototype) will be committed if the project uses git, unless you exclude it yourself.

## What's next

To create your first prototype, see [:cody prototype](/docs/cody-product-builder/commands/prototype/) for the step-by-step command reference.
