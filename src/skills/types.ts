/**
 * Per-skill metadata types.
 *
 * Each skill is a self-contained folder under `src/skills/<skill-id>/` that
 * exports a `Skill` from its `skill.ts`. The barrel at `src/skills/index.ts`
 * collects them into a `skills` array consumed by `astro.config.mjs`, the
 * marketing landing, and the custom Header components.
 *
 * `Skill` is a discriminated union on the `status` field:
 *   - `'available'`: the skill is shipped. Has docs, a GitHub repo, downloads,
 *     and a sidebar; renders fully throughout the site.
 *   - `'coming-soon'`: a placeholder skill that should appear in marketing
 *     surfaces (landing page, topbar Skills dropdown) but not be clickable.
 */

/** Icon identifier for a downloadable artifact in the Get Skill menu. */
export type SkillDownloadIcon = 'zip' | 'skill';

/** A single download option shown in the Get Skill dropdown. */
export interface SkillDownload {
  /** Identifier the GetSkillMenu component maps to an inline SVG. */
  icon: SkillDownloadIcon;
  /** Display name, e.g. `"Download .zip"`. */
  name: string;
  /** Optional secondary line under the name, e.g. `"Source archive"`. */
  description?: string;
  /** Public URL of the file (typically `/skills/<skill-id>/downloads/<filename>`). */
  href: string;
}

/** A single navigation entry inside a sidebar group. */
export interface SidebarItem {
  /** Text shown to the reader. */
  label: string;
  /**
   * Slug relative to the skill's folder.
   *
   * - `''` (empty string) → the skill's `index.md` (URL: `/docs/<skill-id>/`)
   * - `'<category>/<page>'` → `src/skills/<skill-id>/<category>/<page>.md`
   *   (URL: `/docs/<skill-id>/<category>/<page>/`)
   */
  slug: string;
}

/** A category group of links in the sidebar. */
export interface SidebarGroup {
  /** Group label shown above the items (e.g. `"Getting Started"`). */
  label: string;
  /** Items in this group, in display order. */
  items: SidebarItem[];
}

/** Available/coming-soon discriminator. Drives all "is this thing live?" logic. */
export type SkillStatus = 'available' | 'coming-soon';

/** Shared fields across all skills, available or not. */
interface SkillBase {
  /**
   * URL slug. Becomes the segment after `/docs/` for available skills, and the
   * folder name under `src/skills/` for all skills.
   */
  id: string;

  /** Display name shown in the switcher, cards, version badge, SEO titles. */
  name: string;

  /**
   * Short marketing pitch shown as the body text on the landing-page skill card.
   * Aim for ~2-3 sentences, present tense, second person where natural.
   */
  tagline: string;

  /**
   * Path (under `/`) to the illustration shown on the landing-page skill card.
   * Lives in `public/skills/<skill-id>/images/<skill-id>.svg`. Same image is
   * used by future surfaces (skill detail pages, social cards) so it stays
   * one canonical asset. Co-located with the skill's downloads and any other
   * per-skill public assets under `public/skills/<skill-id>/`.
   */
  illustration: string;

  /** Ship status. Drives the conditional rendering described in the file header. */
  status: SkillStatus;
}

/** A fully shipped skill: has docs, a repo, downloads, and a sidebar. */
export interface AvailableSkill extends SkillBase {
  status: 'available';

  /** Current shipped version (semver string, e.g. `"2.1.0"`). */
  version: string;

  /** Public GitHub repo URL — linked from the GitHub icon in the top bar. */
  github: string;

  /** Download options rendered in the Get Skill dropdown when this skill is active. */
  getSkill: SkillDownload[];

  /** Sidebar groups rendered when the reader is in `/docs/<id>/...`. */
  sidebar: SidebarGroup[];
}

/** A placeholder skill that appears in marketing surfaces but isn't clickable. */
export interface ComingSoonSkill extends SkillBase {
  status: 'coming-soon';
}

/**
 * Per-skill metadata. Discriminated union — narrow with `skill.status` before
 * accessing fields like `version`, `github`, `getSkill`, or `sidebar`.
 */
export type Skill = AvailableSkill | ComingSoonSkill;
