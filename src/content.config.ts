import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * Content collection — loads docs from `src/skills/<skill>/...` (instead of
 * Starlight's default `src/content/docs/`) and prefixes every content ID with
 * `docs/` so all documentation URLs render under `/docs/...`.
 *
 * URL examples:
 *   src/skills/cody-product-builder/index.md
 *     → ID `docs/cody-product-builder`     → URL `/docs/cody-product-builder/`
 *   src/skills/cody-product-builder/getting-started/installation.md
 *     → ID `docs/cody-product-builder/getting-started/installation`
 *     → URL `/docs/cody-product-builder/getting-started/installation/`
 *
 * Pattern matches only `.md` and `.mdx` files, so `skill.ts` (and any other
 * non-markdown sibling files) are naturally excluded.
 */
export const collections = {
  docs: defineCollection({
    loader: glob({
      base: './src/skills',
      pattern: '*/**/*.{md,mdx}',
      generateId: ({ entry }) =>
        `docs/${entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '')}`,
    }),
    schema: docsSchema(),
  }),
};
