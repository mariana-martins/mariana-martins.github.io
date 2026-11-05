# Portfolio conventions

Mariana Martins Menezes's portfolio: React 19, TypeScript, Vite and Tailwind CSS
4, prerendered to HTML at build time and hydrated in the browser, deployed to
GitHub Pages. See README.md for the architecture and scripts.

## Data, model, view

Keep content, types and components apart, as close to data / model / view as
React allows.

- **Data (`src/data/`)**: everything a visitor reads as content: copy, lists,
  stats, URLs, image imports with their alt text.
  - Home page content goes through the `data` object in `src/data/index.ts`.
  - Content for a lazy-loaded page lives in `src/data/pages/` and is imported
    by that page only. Never add it to `data`: it would move into the main
    bundle.
  - Inline code in a paragraph is written with backticks
    (``'a `var()` reference'``) and rendered by `InlineText` / `Paragraphs`.
  - Short interface labels (button text, `aria-label`s) stay in components.
- **Model (`src/types/`)**: types for the data. Props types stay next to their
  component.
- **View (`src/components/`, `src/pages/`)**: layout and behaviour only.
- **Constants (`src/constants.ts`)**: values shared by more than one file
  (section ids, paths, the CV, the main content id). A tuning value used by one
  component (a duration, a max count) stays at the top of that component.

## Code style

- Prettier decides formatting (`config/.prettierrc`): 2 spaces, semicolons,
  single quotes, trailing commas, sorted imports. Run `npm run format`.
- ESLint must pass with zero warnings: explicit return types, `type` imports,
  no `any`, strict equality, curly braces always. Browser globals in effects go
  through `window.` (e.g. `window.requestAnimationFrame`).
- Components: function declarations, PascalCase folders and files
  (`components/PickCard/PickCard.tsx`), tests next to them. Avoid two files whose
  names differ only by case: macOS does not tell them apart.
- Classes go through `cn()` from `@/lib/cn`. Use the design tokens in
  `src/styles/index.css`; never hardcode colours in components.
- Don't repeat class lists. When the same set of classes appears in more than
  one place, make it an `@utility` in `src/styles/index.css`. Check
  the existing ones first: `text-body`, `focus-ring`, `link-underline`,
  `bg-soft`, `border-soft`, `border-accent`, `glass-panel`, `dashed-action`. When it varies by props, make it a
  component with a variants map (like `ButtonLink`). Don't create a file just
  to export a class string.
- Comments: one line, only for the non-obvious why (a gotcha, a platform
  constraint, a value that must stay in sync). No comments that restate the
  code, no JSDoc that repeats the types. Long reasoning goes in the commit
  message.

## Content

- Site copy is in Australian English: colour, organisation, centre.
- Claims about other projects (Fit My Space and others) must match their code.
  Check the repository (Fit My Space is at `../FitMySpace`) before writing a
  number or a feature, and keep "work in progress" honest.
- The public CV (`public/Mariana-Martins-Menezes-CV.pdf`) never includes a phone
  number.
- Highlighted code samples are generated: edit them in
  `scripts/highlight-snippets.mjs`, then run `npm run snippets`.

## Rendering

- Never read `window`, storage, the URL or today's date during render: the
  prerendered HTML must match the first client render. Use
  `useSyncExternalStore` with a server snapshot, or `useHasHydrated`.
- New pages: add the route to `src/routes.ts` and its path to `PATHS` in
  `src/constants.ts`, and add it to the page lists in `e2e/`. Unknown URLs get
  `404.html` (the not-found route), and `ErrorBoundary` in `Root` catches render
  errors.

## Analytics

GoatCounter is the only third-party request, in `index.html`. It loads a
versioned file (`count.v5.js`) pinned by `integrity`: to update it, change the
version and recompute the hash
(`curl -s <url> | openssl dgst -sha384 -binary | openssl base64 -A`). The
Playwright specs import `test` from `e2e/fixtures.ts`, which blocks it.

## Accessibility (WCAG 2.2 AA)

- Semantic HTML first; ARIA only when no element fits.
- Text contrast 4.5:1, UI and focus indicators 3:1, in both themes. Focus rings
  use the `focus-ring` utility.
- Touch targets at least 44px tall.
- Every motion respects `prefers-reduced-motion` (`motion-safe:` /
  `motion-reduce:` or `prefersReducedMotion()` in JavaScript).
- Links that open a new tab say so to screen readers.
- The visible label is part of the accessible name.

## Checks

- `npm run build:check`: types, lint and unit tests.
- `npm run test:e2e`: builds, then measures contrast, focus, overflow and
  hydration in a real browser, on desktop and mobile. Run it for any visual or
  accessibility change: jsdom never sees colour.
- `npm run size`: the gzipped budgets for HTML, JavaScript, CSS and fonts.

## Git

- Branch from `origin/master` (`git fetch` first), not from the current branch.
- Do not commit or push until asked.
- Conventional commit messages (`feat:`, `fix:`, `chore:`, ...).
- `.npmrc` keeps `legacy-peer-deps=true`: eslint-plugin-react does not support
  ESLint 10 yet. TypeScript stays on 6.x until @typescript-eslint and ts-jest
  support 7.
