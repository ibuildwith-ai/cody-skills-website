// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { skills } from './src/skills';

/**
 * The first skill in the barrel is the default skill — what `/docs/` (and `/`
 * until Phase 7 ships the marketing landing) redirects to.
 */
const defaultSkill = skills[0];

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

  // `/docs/` and `/` both redirect to the default skill's overview.
  // The `/` redirect is temporary — removed in Phase 7 when `src/pages/index.astro`
  // (the marketing landing) is added; Astro page routes take precedence over redirects.
  redirects: {
    '/': `/docs/${defaultSkill.id}/`,
    '/docs': `/docs/${defaultSkill.id}/`,
  },

  integrations: [
    starlight({
      title: 'Cody Skills',
      description:
        'Documentation for the Cody Skills family of AI agent skills.',
      customCss: ['./src/styles/theme.css'],
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
      ],
    }),
  ],
});
