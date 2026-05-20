---
title: ":cody prototype"
description: Build a throwaway, interactive prototype to test an idea. Independent of the Plan and Build phases, so you can run it anytime.
---

`:cody prototype` builds a throwaway, interactive mockup to test an idea. It runs the full prototype workflow in one session: name it, scaffold it, build it, iterate, then keep or delete.

## When to use it

Prototyping is independent of the Plan and Build phases. Run `:cody prototype` anytime:

- Before planning, to test the core idea.
- While planning, to validate an assumption.
- Before or during a build, to de-risk a tricky version.
- After a build, to explore the next thing.

The command does not change the `phase` value in `cody.json`. It does not unlock or lock any other workflow.

## What it does

When you run `:cody prototype`, Cody walks through this flow:

1. **Name the prototype.** Cody asks what you want to call it and derives a slug (lowercase, dashes, 30 chars max).
2. **Create the folder.** Cody creates `<project-path>/prototypes/<slug>/`. It also reminds you that prototype folders are not gitignored, so anything you create in there (including `node_modules`) will be committed unless you exclude it yourself.
3. **Discover the idea.** Cody asks what idea you want to test and what you hope to learn. It asks follow-ups to get clear on scope.
4. **Scaffold `prototype.md`.** Cody copies the prototype template into the folder and fills in the name, the idea, what to test, and the build approach.
5. **Build and iterate.** You and Cody build the prototype inside the prototype folder. As you go, Cody keeps `prototype.md` updated:
   - Each new finding gets appended to the **Findings Log** with a date. Earlier entries are never overwritten.
   - Likes, dislikes, and opinions get recorded in the **Likes & Dislikes** section.
6. **Wrap up.** When you're done, Cody reviews the prototype against the original purpose and confirms you tested what you set out to test.
7. **Keep or delete.** Cody asks whether to keep the prototype folder for future reference or delete it. Both are valid. A prototype is a throwaway by design.

## Output

A prototype lives in its own self-contained folder:

```
<project-path>/prototypes/<slug>/
├── prototype.md              # The captured idea, findings, likes/dislikes
└── <whatever you built>      # Code, assets, configs, etc.
```

## Same session or separate session?

A prototype is just files in your project. It doesn't matter which AI session builds it. What you're really choosing is how much of your conversation the prototype shares with your planning or building work.

- **Same session.** Run `:cody prototype` in the session where you're already planning or building. The agent carries that context into the prototype.
- **Separate session.** Open a new AI session and run `:cody prototype` there. The conversation stays isolated. When you go back to planning or building, the agent reads `prototype.md` to pick up the findings.

Either way, `prototype.md` is the durable bridge between sessions.

## Using a prototype later

`:cody plan` and `:cody build` both check for existing prototypes and mention them in a single non-blocking line. If you want to pull one into the work at hand, tell Cody to use it. Cody reads its `prototype.md` and factors it in.

## What's next

For the conceptual overview, see [Prototypes](/docs/cody-product-builder/reference/prototypes/).
