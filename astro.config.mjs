// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://codyskills.ai',
  integrations: [
    starlight({
      title: 'Cody Skills',
      description:
        'Documentation for the Cody Skills family of AI agent skills.',
    }),
  ],
});
