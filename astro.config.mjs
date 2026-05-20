// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { availableSkills } from './src/skills';

/**
 * The first **available** skill in the barrel is the default skill — what
 * `/docs/` redirects to. Coming-soon skills are skipped here; they only appear
 * in marketing surfaces (landing page, topbar Skills dropdown).
 */
const defaultSkill = availableSkills[0];

/**
 * Build Starlight's sidebar config from `skills.ts`.
 *
 * v1 has one skill, so a single sidebar covers all `/docs/...` pages. When the
 * second skill is added, we'll migrate to per-route sidebars (likely via
 * `starlight-sidebar-topics`) so the sidebar swaps when the reader switches skills.
 *
 * The sidebar item `slug` in `skill.ts` is relative to the skill's folder
 * (`''` = the skill's overview, `'getting-started/installation'` = a sub-page).
 * Here we expand each to the full Starlight slug (the content collection ID),
 * which is prefixed with `docs/<skill-id>/` to match `content.config.ts`.
 */
const sidebar = defaultSkill.sidebar.map((group) => ({
  label: group.label,
  items: group.items.map((item) => ({
    label: item.label,
    slug:
      item.slug === ''
        ? `docs/${defaultSkill.id}`
        : `docs/${defaultSkill.id}/${item.slug}`,
  })),
}));

// https://astro.build/config
export default defineConfig({
  site: 'https://codyskills.ai',

  // `/docs/` (no trailing skill id) redirects to the default skill's overview.
  // `/` is owned by the marketing landing at `src/pages/index.astro`.
  redirects: {
    '/docs': `/docs/${defaultSkill.id}/`,
  },

  integrations: [
    starlight({
      title: 'Cody Skills',
      description:
        'Documentation for the Cody Skills family of AI agent skills.',
      customCss: ['./src/styles/theme.css'],
      favicon: '/images/cody-skills-logo.png',
      sidebar,
      components: {
        // Custom top bar: brand · SkillSwitcher · GetSkillMenu · search · GitHub · theme
        Header: './src/components/Header.astro',
        // Injects Breadcrumb + VersionBadge above the H1 on docs pages
        PageTitle: './src/components/PageTitle.astro',
        // Replaces the "Auto" dropdown with a single sun/moon icon button
        ThemeSelect: './src/components/ThemeToggle.astro',
      },
      head: [
        // DM Sans (matches iBuildWith.ai brand typography)
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: true,
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap',
          },
        },
        // iOS / Android home-screen icon
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', href: '/images/cody-skills-logo.png' },
        },
        // OpenGraph image (also used by Twitter Cards via summary_large_image).
        // Temporarily reuses the brand logo so link previews render with the
        // right brand. Replace with a proper 1200×630 designed card (see
        // feature-backlog B7) post-v1.
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://codyskills.ai/images/cody-skills-logo.png' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://codyskills.ai/images/cody-skills-logo.png' },
        },
      ],
    }),
  ],
});
