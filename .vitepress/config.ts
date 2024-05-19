import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Geordi Dosher",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/geordid' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/geordid' }
    ]
  }
});
