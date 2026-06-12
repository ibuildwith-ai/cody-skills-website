import type { AvailableSkill } from '../types';

const skill: AvailableSkill = {
  id: 'cody-product-builder',
  name: 'Cody Product Builder',
  status: 'available',
  tagline:
    'Take an idea from raw concept to shipped product with a structured two-phase workflow. Plan, build, and ship versions in any AI coding environment. Capture ideas mid-flow, prototype risky bits, and keep the work shippable as it grows.',
  illustration: '/skills/cody-product-builder/images/cody-product-builder.svg',
  version: '2.2.0',
  github: 'https://github.com/ibuildwith-ai/cody-product-builder',

  getSkill: [
    {
      icon: 'zip',
      name: 'Download .zip',
      description: 'Source archive',
      href: '/skills/cody-product-builder/downloads/cody-product-builder.zip',
    },
    {
      icon: 'skill',
      name: 'Download .skill',
      description: 'Skill bundle (drop-in)',
      href: '/skills/cody-product-builder/downloads/cody-product-builder.skill',
    },
  ],

  sidebar: [
    {
      label: 'Getting Started',
      items: [
        // Overview sits visually in Getting Started but routes to the skill root
        // (/docs/cody-product-builder/) — see `src/skills/cody-product-builder/index.md`.
        { label: 'Overview', slug: '' },
        { label: 'Installation', slug: 'getting-started/installation' },
        { label: 'Quick Start', slug: 'getting-started/quick-start' },
      ],
    },
    {
      label: 'Workflow',
      items: [
        { label: 'The Plan Phase', slug: 'workflow/plan-phase' },
        { label: 'The Build Phase', slug: 'workflow/build-phase' },
        { label: 'Versions & Patches', slug: 'workflow/versions-and-patches' },
      ],
    },
    {
      label: 'Commands',
      items: [
        { label: ':cody plan', slug: 'commands/plan' },
        { label: ':cody build', slug: 'commands/build' },
        { label: ':cody prototype', slug: 'commands/prototype' },
        { label: ':cody idea', slug: 'commands/idea' },
        { label: ':cody refresh', slug: 'commands/refresh' },
        { label: ':cody help', slug: 'commands/help' },
      ],
    },
    {
      label: 'Reference',
      items: [
        { label: 'Best Practices', slug: 'reference/best-practices' },
        { label: 'Prototypes', slug: 'reference/prototypes' },
        { label: 'Project Settings', slug: 'reference/project-settings' },
        { label: 'Changelog', slug: 'reference/changelog' },
      ],
    },
  ],
};

export default skill;
