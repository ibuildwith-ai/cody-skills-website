import type { Skill } from '../types';

const skill: Skill = {
  id: 'cody-product-builder',
  name: 'Cody Product Builder',
  version: '2.1.0',
  github: 'https://github.com/ibuildwith-ai/cody-product-builder',

  getSkill: [
    {
      icon: 'zip',
      name: 'Download .zip',
      description: 'Source archive',
      href: '/downloads/cody-product-builder/cody-product-builder.zip',
    },
    {
      icon: 'skill',
      name: 'Download .skill',
      description: 'Skill bundle (drop-in)',
      href: '/downloads/cody-product-builder/cody-product-builder.skill',
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
        { label: 'Prototypes', slug: 'reference/prototypes' },
        { label: 'Project Settings', slug: 'reference/project-settings' },
        { label: 'Changelog', slug: 'reference/changelog' },
      ],
    },
  ],
};

export default skill;
