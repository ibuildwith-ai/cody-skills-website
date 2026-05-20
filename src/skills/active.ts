import { availableSkills } from './index';
import type { AvailableSkill } from './types';

/**
 * Detect the active skill from a URL pathname.
 *
 * Only returns available (shipped) skills — coming-soon skills don't have
 * `/docs/` routes, so they can never be "active." The function searches
 * `availableSkills` only, and falls back to the first available skill when no
 * match is found.
 *
 * Components rendered inside `/docs/` (SkillSwitcher, GetSkillMenu, GitHubLink,
 * VersionBadge, Breadcrumb, PageTitle) call this with `Astro.url.pathname` to
 * render skill-specific content with full type safety on the available-only
 * fields (`version`, `github`, `getSkill`, `sidebar`).
 */
export function getActiveSkill(pathname: string): AvailableSkill {
  const match = pathname.match(/^\/docs\/([^/]+)/);
  if (match) {
    const found = availableSkills.find((s) => s.id === match[1]);
    if (found) return found;
  }
  return availableSkills[0];
}
