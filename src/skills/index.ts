/**
 * Skills barrel — single source of truth for the skills array.
 *
 * To add a new skill:
 *   1. Create `src/skills/<id>/skill.ts` exporting a default `Skill`.
 *      Choose `status: 'available'` (full skill) or `status: 'coming-soon'`
 *      (marketing placeholder, no docs).
 *   2. For available skills, drop in `index.md` (overview) and category folders
 *      with the `.md` files declared by that skill's sidebar.
 *   3. Add `import newSkill from './<id>/skill';` below and append to the array.
 *
 * The first **available** skill in the array is the **default skill** —
 * what `/docs/` redirects to and which sidebar is rendered across `/docs/` pages.
 * Coming-soon skills are skipped by `getActiveSkill` and `astro.config.mjs`'s
 * sidebar / redirect derivation.
 */

import codyProductBuilder from './cody-product-builder/skill';
import codyArticleWriter from './cody-article-writer/skill';
import type { Skill, AvailableSkill } from './types';

/** Every skill, in display order. Used by the marketing landing + Skills dropdown. */
export const skills: readonly Skill[] = [
  codyProductBuilder,
  codyArticleWriter,
];

/** Just the available skills. Used anywhere we need docs routes or sidebars. */
export const availableSkills: readonly AvailableSkill[] = skills.filter(
  (s): s is AvailableSkill => s.status === 'available'
);

/**
 * Single-letter icon for a skill (e.g. "P" for "Cody Product Builder").
 * Pulls the first letter of the second word so we don't end up with "C" for
 * every Cody skill. Falls back to the first letter of the name if there's
 * only one word.
 */
export function getSkillIconLetter(skill: Skill): string {
  return (skill.name.split(' ')[1] ?? skill.name).charAt(0);
}

export type {
  Skill,
  AvailableSkill,
  ComingSoonSkill,
  SkillStatus,
  SkillDownload,
  SidebarGroup,
  SidebarItem,
} from './types';
