// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'Unfold.js',
          description: 'A modern library for beautiful page-turn animations',
          social: [
              { icon: 'github', label: 'GitHub', href: 'https://github.com/jhlabs/unfold' }
          ],
          sidebar: [
              {
                  label: 'Getting Started',
                  items: [
                      { label: 'Introduction', slug: 'getting-started/introduction' },
                      { label: 'Installation', slug: 'getting-started/installation' },
                      { label: 'Quick Start', slug: 'getting-started/quick-start' },
                  ],
              },
              {
                  label: 'Examples',
                  items: [
                      { label: 'Basic Book', slug: 'examples/basic-book' },
                      { label: 'Magazine Layout', slug: 'examples/magazine' },
                      { label: 'Interactive Demo', slug: 'examples/interactive' },
                  ],
              },
              {
                  label: 'API Reference',
                  autogenerate: { directory: 'api' },
              },
              {
                  label: 'Guides',
                  items: [
                      { label: 'Styling', slug: 'guides/styling' },
                      { label: 'Events', slug: 'guides/events' },
                      { label: 'Responsive Design', slug: 'guides/responsive' },
                  ],
              },
          ],
          customCss: [
              './src/styles/global.css',
          ],
      }),
    ],

  adapter: cloudflare({
      platformProxy: {
          enabled: true
      }
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});