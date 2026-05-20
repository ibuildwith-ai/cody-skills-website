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
      customCss: ['./src/styles/theme.css'],
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
