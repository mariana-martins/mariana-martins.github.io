# Mariana Martins Menezes — Portfolio

Personal site of a Frontend & Design Engineer in Melbourne.

**Live:** [mariana-martins.github.io](https://mariana-martins.github.io) ·
**How it was built:** [mariana-martins.github.io/how-this-site-was-built/](https://mariana-martins.github.io/how-this-site-was-built/)

![Link preview of the site](public/og-image.jpg)

## Highlights

- **Prerendered React without a framework.** Every route is rendered to HTML
  at build time and hydrated in the browser. Browser-only values (theme, URL
  hash, today's date) go through `useSyncExternalStore`, and a test fails on
  any hydration mismatch.
- **Accessibility measured, not assumed.** Playwright checks every page in
  light and dark mode, on desktop and mobile: axe, text contrast measured on
  the rendered pixels, and a 3:1 change for every focus indicator.
- **Small first visit.** About 100 kB of JavaScript (gzipped), self-hosted
  variable fonts, Margot's Picks loaded on demand, and a size budget in CI.
- **No animation library.** CSS transitions and the Web Animations API, all
  respecting `prefers-reduced-motion`.
- **Analytics without cookies.** GoatCounter, loaded async and pinned by its
  integrity hash; it ignores localhost, and the tests never reach it.
- **Code highlighted at build time.** Shiki runs in a script, so no highlighter
  ships to the browser.

## Stack

| Area    | Tools                                                    |
| ------- | -------------------------------------------------------- |
| UI      | React 19, TypeScript 6, Tailwind CSS 4, Radix Primitives |
| Build   | Vite 8, prerendering with `react-dom/server`             |
| Tests   | Jest, Testing Library, jest-axe, Playwright, axe-core    |
| Quality | ESLint, Prettier, Husky                                  |
| Hosting | GitHub Pages, deployed by GitHub Actions                 |

## Getting started

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

## Scripts

| Command                 | What it does                                             |
| ----------------------- | -------------------------------------------------------- |
| `npm run dev`           | Development server (client-rendered)                     |
| `npm run build`         | Type-check, build, then prerender every route to `dist/` |
| `npm run preview`       | Serve the production build                               |
| `npm test`              | Unit and component tests                                 |
| `npm run test:e2e`      | Build, then run the Playwright suite                     |
| `npm run build:check`   | Type-check, lint and unit tests                          |
| `npm run size`          | Gzipped size budget for a first visit (run after build)  |
| `npm run snippets`      | Regenerate the highlighted code samples (Shiki)          |
| `npm run social-images` | Regenerate the link preview and home-screen icon         |
| `npm run lint`          | ESLint                                                   |
| `npm run format`        | Prettier                                                 |

## How it fits together

```
src/
├── routes.ts            # paths, titles and descriptions for every page
├── main.tsx             # client entry: hydrates the prerendered HTML
├── entry-server.tsx     # build-time render, used by scripts/prerender.mjs
├── Root.tsx             # theme provider and error boundary around each page
├── App.tsx              # home page
├── pages/               # other pages, each loaded as its own chunk
├── components/          # one folder per component, tests alongside
├── data/                # content: experience, projects, picks…
│   └── pages/           # content for the other pages, kept in their chunks
├── types/               # types for the content
├── constants.ts         # values shared across files: section ids, paths
├── hooks/  lib/         # shared logic
└── styles/index.css     # design tokens and utilities
e2e/                     # Playwright: accessibility, SEO, responsive, interactions
scripts/                 # prerender, size budget, code highlighting, social images
```

Content lives in `src/data/` and its types in `src/types/`; components only
lay it out, so most updates never touch a component. To add a page, add it to
`src/routes.ts` and `PATHS` in `src/constants.ts`; the build prerenders it with
its own title and link preview. Unknown addresses get a prerendered
`404.html`, which GitHub Pages serves with a 404 status.

Conventions for people and coding agents are in [AGENTS.md](AGENTS.md)
(`CLAUDE.md` imports it).

## Deployment

Every push to `master` runs `.github/workflows/deploy.yml`: checks, build,
size budget and the Playwright suite, then publishes `dist/` to the
`gh-pages` branch.

## License

ISC © Mariana Martins Menezes
