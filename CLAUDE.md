# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check then build for production (tsc -b && vite build)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `src/index.css` and integrated through `@tailwindcss/vite`
- No test framework is configured yet

## Architecture

This is a single-page portfolio app. Entry point: `index.html` → `src/main.tsx` → `src/App.tsx`.

- `src/index.css` — global styles, imports Tailwind
- `src/App.css` — component-scoped styles for `App.tsx` using CSS nesting and CSS custom properties (e.g. `--accent`, `--border`, `--shadow`)
- `public/icons.svg` — SVG sprite; icons are referenced via `<use href="/icons.svg#<id>" />`
- `public/favicon.svg` — site favicon

CSS uses modern nesting syntax (`&:hover`, nested `@media`) and CSS custom properties for theming. Tailwind utility classes and these hand-crafted styles coexist — prefer Tailwind for new layout/spacing work.
