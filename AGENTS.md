# AGENTS.md

## Project overview

This is a small, statically generated personal website built with Astro, TypeScript, and Tailwind CSS. It contains a homepage, resume, software blog, and an “IRL” project collection. The production site is configured for `https://geordid.com` and deploys to GitHub Pages.

## Working in the repository

- Use **pnpm**; `pnpm-lock.yaml` is authoritative.
- Run `pnpm dev` for local development.
- Run `pnpm build` before finishing changes. This runs both `astro check` and the production build.
- There is currently no separate test or lint command.
- Do not edit generated or local-only directories such as `dist/`, `.astro/`, or `node_modules/`.

## Code and content conventions

- Pages live in `src/pages`, shared UI in `src/components`, layouts in `src/layouts`, and global styles in `src/styles`.
- `BaseHead.astro` loads the global CSS and owns shared metadata; reuse the existing header, footer, layouts, and site constants where appropriate.
- Prefer Astro components and static rendering. Keep client-side JavaScript to a minimum unless a feature genuinely requires it.
- Styling uses a mix of Tailwind utilities and component/global CSS. Preserve the existing responsive layout, light/dark color variables, typography, and accessible semantic markup.
- Blog and IRL entries are Markdown content collections under `src/content`. Their frontmatter must match the schemas in `src/content/config.ts`.
- Public assets use root-relative URLs (for example, `/imgs/...`). IRL project pages expect project images under `public/imgs/irl/<slug>/` and commonly use `-rs` resized variants.

## Change guidance

Keep changes focused and consistent with the site's simple visual style. When adding a page or post, verify navigation, metadata, image alt text, responsive behavior, and the full production build.
