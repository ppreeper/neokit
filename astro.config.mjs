// @ts-check
import { defineConfig } from 'astro/config';
import neokit from './src/integration.ts';

// https://astro.build/config
export default defineConfig({
  srcDir: './demo',
  integrations: [
    neokit({
      themes: true,
      fontSize: '13px',
    }),
  ],
});
