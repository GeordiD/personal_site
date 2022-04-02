import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
});
