import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// NOTE: This is the default Starlight content config for Phase 1 scaffolding.
// In Phase 3 (task 3.4) this is replaced with a custom `glob` loader that:
//   - points at ./src/skills instead of the default ./src/content/docs
//   - prefixes every content ID with `docs/` so URLs render under /docs/...
export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
