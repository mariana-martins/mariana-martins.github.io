import fillVariants from '@/assets/fitmyspace/fill-variants.webp';
import outlineVariants from '@/assets/fitmyspace/outline-variants.webp';
import pseudoStates from '@/assets/fitmyspace/pseudo-states.webp';
import sagePalette from '@/assets/fitmyspace/sage.webp';
import type { FitMySpaceCaseStudy } from '@/types';

export const fitMySpace: FitMySpaceCaseStudy = {
  eyebrow: 'Case study',
  title: 'Fit My Space',
  lead: 'A search engine for home organisation products across stores, filtered by room and by store, and the design system I built underneath it.',
  role: 'Design and frontend, end to end',
  builtWith:
    'Next.js, TypeScript, Tailwind CSS, TanStack Query, Zod, Radix Primitives, Style Dictionary, Storybook',
  githubUrl: 'https://github.com/mariana-martins/FitMySpace',
  figmaUrl:
    'https://www.figma.com/design/2vgKu1CEc6b79vwFHLYcFM/FitMySpace-Design-System?node-id=0-1',
  tokens: {
    id: 'tokens',
    title: 'Three tiers of tokens',
    paragraphs: [
      'Every visual decision lives in a token, and references only point one way. Primitives say which values exist, semantic tokens say what a value is for, and component tokens are the component’s own API: what the primary button uses when it is hovered, focused or disabled. I followed Brad Frost’s methodology for the split.',
      'Style Dictionary turns the three tiers of JSON into 477 CSS custom properties. Because it keeps each reference as a `var()`, changing what “brand” means is a one-line change in tier 2, and every component follows.',
    ],
    // Real names from the project's token files; their CSS is in ./snippets.generated.ts
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
      'Components are composed on Radix primitives rather than taken from a component library, so semantics, interaction states, dark mode and motion stay owned and consistent.',
      'The Button’s props are a discriminated union. Give it visible text and `aria-label` is optional; make it icon-only and `aria-label` becomes required. Forgetting it is a type error in the editor, not a finding in an audit months later.',
    ],
    codeCaption:
      'From Button.types.ts, with two usages: the icon-only button without a label does not compile.',
    states: {
      caption:
        'The Button in Storybook: six variants, fill and outline, and its interaction states.',
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
      'Atoms, molecules, organisms and pages each have jest-axe checks alongside their unit tests, with MSW standing in for the API. Storybook documents the tokens (colour, spacing, radii), the typography and the Button.',
    ],
    stats: [
      { value: '292', label: 'tests' },
      { value: '34', label: 'test suites' },
      { value: '477', label: 'generated CSS tokens' },
      { value: '3', label: 'token tiers' },
    ],
  },
};
