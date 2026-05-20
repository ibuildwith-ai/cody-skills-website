/**
 * Skills barrel — single source of truth for the skills array.
 *
 * To add a new skill:
 *   1. Create `src/skills/<id>/skill.ts` exporting a default `Skill`.
 *   2. Drop in `index.md` (overview) and category folders with the `.md` files
 *      declared by that skill's sidebar.
 *   3. Add `import newSkill from './<id>/skill';` below and append to the array.
 *
 * The first skill in the array is the **default skill** — what `/docs/`
 * redirects to and (in v1) which sidebar is rendered across all `/docs/` pages.
 */

import codyProductBuilder from './cody-product-builder/skill';
import type { Skill } from './types';

export const skills: readonly Skill[] = [codyProductBuilder];

export type { Skill, SkillDownload, SidebarGroup, SidebarItem } from './types';
