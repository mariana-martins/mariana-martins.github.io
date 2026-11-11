import fillVariants from '@/assets/fitmyspace/fill-variants.webp';
import outlineVariants from '@/assets/fitmyspace/outline-variants.webp';
import pseudoStates from '@/assets/fitmyspace/pseudo-states.webp';
import sagePalette from '@/assets/fitmyspace/sage.webp';
import textFieldError from '@/assets/fitmyspace/textfield-error.webp';
import type { FitMySpaceCaseStudy } from '@/types';

export const fitMySpace: FitMySpaceCaseStudy = {
  eyebrow: 'Case study',
  title: 'Fit My Space',
  lead: 'A search engine for home organisation products across stores, filtered by room and by store, and the design system I am building for it.',
  status: {
    label: 'Work in progress',
    text: 'The search app works end to end; the design system is what I am building now. Its tokens, typography and first components (Button, Input, TextField) are live in Storybook and Figma, more arrive with each release, and the app’s components move onto it next.',
  },
  role: 'Design and frontend, end to end',
  builtWith:
    'Next.js, TypeScript, Tailwind CSS, TanStack Query, Zod, Radix Primitives, Style Dictionary, Storybook, Stylelint, GitHub Actions',
  updated: '2026-11-11',
  githubUrl: 'https://github.com/mariana-martins/FitMySpace',
  storybookUrl:
    'https://mariana-martins.github.io/FitMySpace/?path=/story/design-system-introduction--welcome',
  figmaUrl:
    'https://www.figma.com/design/2vgKu1CEc6b79vwFHLYcFM/FitMySpace-Design-System?node-id=0-1',
  tokens: {
    id: 'tokens',
    title: 'Three tiers of tokens',
    paragraphs: [
      'In the design system every visual decision lives in a token, and references only point one way. Primitives say which values exist, semantic tokens say what a value is for, and component tokens are the component’s own API: what the primary button uses when it is hovered, focused or disabled. I followed Brad Frost’s methodology for the split.',
      'Style Dictionary turns the three tiers of JSON into 731 CSS custom properties. Because it keeps each reference as a `var()`, changing what “brand” means is a one-line change in tier 2, and every component follows.',
      'It also writes every token, with its resolved value, to a JSON file that the Storybook foundation pages are built from: colour, spacing, size, radii, borders, shadow, motion, focus and typography. The documentation cannot fall behind the tokens, because it is the tokens.',
    ],
    steps: [
      { tier: 'Tier 1 · Primitive', token: 'color.sage.700' },
      {
        tier: 'Tier 2 · Semantic',
        token: 'semantic.color.background.brand.base',
      },
      {
        tier: 'Tier 3 · Component',
        token: 'component.button.primary.fill.background.default',
      },
      { tier: 'In use', token: 'Button.module.css' },
    ],
    flowCaption:
      'How one colour reaches the primary button. Each tier only references the one before it, and Style Dictionary keeps those references as `var()` in the generated CSS.',
    palette: {
      caption:
        'Tier 1 in Storybook: the Sage palette, with the 700 that brand points at.',
      image: {
        src: sagePalette,
        alt: 'Storybook page for the Sage brand palette: ten swatches from Sage 50 to Sage 900, light to dark green, each labelled with its CSS variable, from var(--ds-color-sage-50) to var(--ds-color-sage-900).',
        width: 640,
        height: 352,
      },
    },
  },
  types: {
    id: 'types',
    title: 'Accessibility the compiler enforces',
    paragraphs: [
      'Components are composed on Radix primitives rather than taken from a component library. Radix brings the keyboard and screen reader behaviour; the markup, styling and states stay mine.',
      'The Button’s props are a discriminated union. Give it visible text and `aria-label` is optional; make it icon-only and `aria-label` becomes required. Forgetting it is a type error in the editor, not a finding in an audit months later.',
    ],
    codeCaption:
      'Simplified from Button.types.ts, with two usages: the icon-only button without a label does not compile.',
    states: {
      caption:
        'The Button in Storybook: six variants, fill and outline, and its interaction states. A third, ghost appearance came in v0.2.0.',
      images: [
        {
          src: fillVariants,
          alt: 'Fill buttons in six variants: Primary, Secondary, Error, Success, Warning and Information.',
          width: 680,
          height: 73,
        },
        {
          src: outlineVariants,
          alt: 'The same six variants as outline buttons.',
          width: 680,
          height: 73,
        },
        {
          src: pseudoStates,
          alt: 'A primary button in four states: default, hover, active, and focus visible with an outer ring.',
          width: 446,
          height: 73,
        },
      ],
    },
    field: {
      paragraphs: [
        'Forms follow the same rule. A TextField marked `invalid` must be given an `error`, so a field can never turn red without saying what went wrong (WCAG 3.3.1). The field wires its label, hint and error to the native input with `htmlFor` and `aria-describedby`, and a screen reader hears the hint before the error.',
      ],
      caption:
        'The TextField’s error state in Storybook. Its interaction test checks that the input is marked invalid and described by the hint, the error and the unit, in that order.',
      image: {
        src: textFieldError,
        alt: 'A text field labelled Room depth holding -40, with a cm unit and a red border. Below it, the hint “Measure wall to wall.” and, in red with an alert icon, the error “Enter a room depth above 0 cm.”',
        width: 384,
        height: 167,
      },
    },
  },
  guardrails: {
    id: 'guardrails',
    title: 'Rules the pipeline enforces',
    paragraphs: [
      'A rule in a README holds until someone is in a hurry. So each rule of the design system has a check that fails the commit or the CI run, and the Storybook on GitHub Pages only publishes once every CI job has passed.',
    ],
    checks: [
      {
        id: 'tiers',
        rule: 'No component skips a tier',
        check:
          'A test reads the token JSON and fails if a tier-3 token points past tier 2, and Stylelint rejects tier-1 tokens in component CSS.',
      },
      {
        id: 'contrast',
        rule: 'Every state meets WCAG 2.2 AA contrast',
        check:
          'A test resolves the Button, Input and TextField tokens to hex and checks each colour pair in every interactive state: 4.5:1 for text, 3:1 for borders and focus rings. It needs no browser, so it covers the hover and active states axe never sees.',
      },
      {
        id: 'tokens',
        rule: 'Every token exists',
        check:
          'A misspelled `var(--ds-…)` fails silently in the browser. Stylelint checks the CSS, a test checks the TypeScript and MDX, and `tokens:check` fails if tokens.css drifts from the JSON.',
      },
      {
        id: 'axe',
        rule: 'Every story passes axe',
        check:
          'CI runs each story’s interaction tests and accessibility checks in a real browser, with violations set to fail the run.',
      },
    ],
  },
  rendering: {
    id: 'rendering',
    title: 'Rendering chosen per page',
    paragraphs: [
      'Each route renders the way its content changes. API responses are validated at runtime with Zod, and TanStack Query handles caching and loading states.',
    ],
    modes: [
      {
        page: 'Product details',
        how: 'Server-rendered on each request (SSR), with dynamic routes per product.',
      },
      {
        page: 'Recent arrivals',
        how: 'Static, regenerated at most every 60 seconds (ISR).',
      },
      {
        page: 'About',
        how: 'Fully static (SSG): it only changes when I edit it.',
      },
    ],
  },
  quality: {
    id: 'quality',
    title: 'Tested like a product',
    paragraphs: [
      'jest-axe checks cover the atoms, molecules and organisms, and the not-found and error pages, alongside unit and integration tests with MSW standing in for the API. GitHub Actions runs them on every pull request, with formatting, linting, types, the Storybook tests and a production build.',
    ],
    stats: [
      { value: '600', label: 'unit and integration tests' },
      { value: '49', label: 'test suites' },
      { value: '731', label: 'generated CSS tokens' },
      { value: '3', label: 'token tiers' },
    ],
  },
};
