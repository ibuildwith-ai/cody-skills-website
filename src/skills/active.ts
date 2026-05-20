import { skills } from './index';
import type { Skill } from './types';

/**
 * Detect the active skill from a URL pathname.
 *
 * - `/docs/cody-product-builder/...` → the matching skill
 * - Anything else → the first (default) skill in the barrel
 *
 * Components in the top bar (SkillSwitcher, GetSkillMenu, GitHubLink,
 * VersionBadge) call this with `Astro.url.pathname` to render
 * skill-specific content.
 */
export function getActiveSkill(pathname: string): Skill {
  const match = pathname.match(/^\/docs\/([^/]+)/);
  if (match) {
    const found = skills.find((s) => s.id === match[1]);
    if (found) return found;
  }
  return skills[0];
}
