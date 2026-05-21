import type { AvailableSkill } from '../types';

const skill: AvailableSkill = {
  id: 'cody-article-writer',
  name: 'Cody Article Writer',
  status: 'available',
  tagline:
    'Plan, research, draft, and manage long-form articles end-to-end. Topic ideation through export, with custom writing styles you can save and reuse across pieces. Built for thought leadership, essays, and product writing.',
  illustration: '/skills/cody-article-writer/images/cody-article-writer.svg',
  version: '3.0',
  github: 'https://github.com/ibuildwith-ai/cody-article-writer',

  getSkill: [
    {
      icon: 'zip',
      name: 'Download .zip',
      description: 'Source archive',
      href: '/skills/cody-article-writer/downloads/cody-article-writer.zip',
    },
    {
      icon: 'skill',
      name: 'Download .skill',
      description: 'Skill bundle (drop-in)',
      href: '/skills/cody-article-writer/downloads/cody-article-writer.skill',
    },
  ],

  sidebar: [
    {
      label: 'Getting Started',
      items: [
        // Overview sits visually in Getting Started but routes to the skill root
        // (/docs/cody-article-writer/) — see `src/skills/cody-article-writer/index.md`.
        { label: 'Overview', slug: '' },
        { label: 'Installation', slug: 'getting-started/installation' },
        { label: 'Quick Start', slug: 'getting-started/quick-start' },
      ],
    },
    {
      label: 'Workflow',
      items: [
        { label: 'The Article Workflow', slug: 'workflow/the-article-workflow' },
        { label: 'Topic Ideation & Research', slug: 'workflow/topic-ideation-and-research' },
        { label: 'Style Selection', slug: 'workflow/style-selection' },
        { label: 'Title, Thesis & Outline', slug: 'workflow/title-thesis-and-outline' },
        { label: 'Writing the Article', slug: 'workflow/writing-the-article' },
        { label: 'Editor Pass & Export', slug: 'workflow/editor-pass-and-export' },
      ],
    },
    {
      label: 'Writing Styles',
      items: [
        { label: 'Style Guides Overview', slug: 'writing-styles/overview' },
        { label: 'Voice', slug: 'writing-styles/voice' },
        { label: 'Formatting', slug: 'writing-styles/formatting' },
        { label: 'Structure', slug: 'writing-styles/structure' },
        { label: 'Context', slug: 'writing-styles/context' },
        { label: 'Managing Styles', slug: 'writing-styles/managing-styles' },
      ],
    },
    {
      label: 'Reference',
      items: [
        { label: 'Triggers & Commands', slug: 'reference/triggers-and-commands' },
        { label: 'Editor Style Guide', slug: 'reference/editor-style-guide' },
        { label: 'Storage & Data', slug: 'reference/storage-and-data' },
        { label: 'Changelog', slug: 'reference/changelog' },
      ],
    },
  ],
};

export default skill;
