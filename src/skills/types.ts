/**
 * Per-skill metadata types.
 *
 * Each skill is a self-contained folder under `src/skills/<skill-id>/` that
 * exports a `Skill` from its `skill.ts`. The barrel at `src/skills/index.ts`
 * collects them into a `skills` array consumed by `astro.config.mjs` and the
 * custom Header components.
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
  /** Public URL of the file (typically `/downloads/<skill-id>/<filename>`). */
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

/** Per-skill metadata — one `Skill` object lives in each skill's `skill.ts`. */
export interface Skill {
  /**
   * URL slug. Becomes the segment after `/docs/`.
   * Must match the skill's folder name under `src/skills/`.
   */
  id: string;

  /** Display name shown in the switcher, version badge, and SEO titles. */
  name: string;

  /** Current shipped version (semver string, e.g. `"2.1.0"`). */
  version: string;

  /** Public GitHub repo URL — linked from the GitHub icon in the top bar. */
  github: string;

  /** Download options rendered in the Get Skill dropdown when this skill is active. */
  getSkill: SkillDownload[];

  /** Sidebar groups rendered when the reader is in `/docs/<id>/...`. */
  sidebar: SidebarGroup[];
}
