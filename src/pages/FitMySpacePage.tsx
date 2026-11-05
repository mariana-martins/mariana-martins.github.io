import React from 'react';

import {
  ArticleHeader,
  ArticleSection,
  Code,
  CodeBlock,
  HighlightedCode,
  ImageFigure,
  Prose,
  type Stat,
  StatList,
} from '@components/Article/Article';
import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { PageShell } from '@components/PageShell/PageShell';
import { ArrowDown, ExternalLink } from 'lucide-react';

import fillVariants from '@/assets/fitmyspace/fill-variants.webp';
import outlineVariants from '@/assets/fitmyspace/outline-variants.webp';
import pseudoStates from '@/assets/fitmyspace/pseudo-states.webp';
import sagePalette from '@/assets/fitmyspace/sage.webp';
import { PROJECTS_CRUMB } from '@/constants';
import { data } from '@/data';
import { cn } from '@/lib/cn';

import { buttonTypes, tokenOutputs } from './snippets.generated';

const project = data.projects.find(({ id }) => id === 'fit-my-space');
const GITHUB_URL =
  project?.githubUrl ?? 'https://github.com/mariana-martins/FitMySpace';
const FIGMA_URL =
  'https://www.figma.com/design/2vgKu1CEc6b79vwFHLYcFM/FitMySpace-Design-System?node-id=0-1';

interface TokenStep {
  tier: string;
  token: string;
}

// Real names from the project's token files; their CSS is in snippets.generated.ts
const TOKEN_STEPS: TokenStep[] = [
  {
    tier: 'Tier 1 · Primitive',
    token: 'color.sage.700',
  },
  {
    tier: 'Tier 2 · Semantic',
    token: 'semantic.color.background.brand.base',
  },
  {
    tier: 'Tier 3 · Component',
    token: 'component.button.primary.fill.background.default',
  },
  {
    tier: 'In use',
    token: 'Button.module.css',
  },
];

const QUALITY_STATS: Stat[] = [
  { value: '292', label: 'tests' },
  { value: '34', label: 'test suites' },
  { value: '477', label: 'generated CSS tokens' },
  { value: '3', label: 'token tiers' },
];

function TokenFlow(): React.JSX.Element {
  return (
    <figure className="flex flex-col gap-3">
      <ol className="flex flex-col gap-2">
        {TOKEN_STEPS.map((step, index) => (
          <li key={step.tier} className="flex flex-col items-center gap-2">
            {index > 0 && (
              <ArrowDown size={18} aria-hidden="true" className="opacity-70" />
            )}
            <div
              className={cn(
                'w-full flex flex-col gap-1.5 p-4 rounded-xl',
                'bg-warm-100/60 dark:bg-indigo-50/40',
                'border border-pink/40 dark:border-blue-100/30',
              )}
            >
              <p className="text-xs font-medium tracking-widest uppercase">
                {step.tier}
              </p>
              <p className="flex items-center gap-2 font-medium break-all">
                {index === 0 && (
                  <span
                    aria-hidden="true"
                    className="size-4 shrink-0 rounded-full bg-[#335f3f] ring-1 ring-black/10 dark:ring-white/30"
                  />
                )}
                {step.token}
              </p>
              <code className="block px-3 py-2 rounded-md text-sm break-all bg-code-bg text-code-text">
                <HighlightedCode lines={[tokenOutputs[index]]} />
              </code>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="text-sm">
        How one colour reaches the primary button. Each tier only references the
        one before it, and Style Dictionary keeps those references as{' '}
        <code>var()</code> in the generated CSS.
      </figcaption>
    </figure>
  );
}

export default function FitMySpacePage(): React.JSX.Element {
  return (
    <PageShell breadcrumbs={[PROJECTS_CRUMB, { label: 'Fit My Space' }]}>
      <article>
        <ArticleHeader
          eyebrow="Case study"
          title="Fit My Space"
          lead="A search engine for home organisation products across stores, filtered by room and by store, and the design system I built underneath it."
        >
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[auto_1fr] text-base">
            <dt className="font-medium">Role</dt>
            <dd>Design and frontend, end to end</dd>
            <dt className="font-medium">Built with</dt>
            <dd>
              Next.js, TypeScript, Tailwind CSS, TanStack Query, Zod, Radix
              Primitives, Style Dictionary, Storybook
            </dd>
          </dl>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              icon={ExternalLink}
            >
              View the code on GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
            <ButtonLink
              href={FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={ExternalLink}
            >
              <span>
                Design system in Figma{' '}
                <span className="font-normal">(work in progress)</span>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          </div>
        </ArticleHeader>

        <ArticleSection id="tokens" title="Three tiers of tokens">
          <Prose>
            <p>
              Every visual decision lives in a token, and references only point
              one way. Primitives say which values exist, semantic tokens say
              what a value is for, and component tokens are the
              component&rsquo;s own API: what the primary button uses when it is
              hovered, focused or disabled. I followed Brad Frost&rsquo;s
              methodology for the split.
            </p>
            <p>
              Style Dictionary turns the three tiers of JSON into 477 CSS custom
              properties. Because it keeps each reference as a{' '}
              <Code>var()</Code>, changing what &ldquo;brand&rdquo; means is a
              one-line change in tier 2, and every component follows.
            </p>
          </Prose>
          <TokenFlow />
          <ImageFigure
            caption="Tier 1 in Storybook: the Sage palette, with the 700 that brand points at."
            images={[
              {
                src: sagePalette,
                alt: 'Storybook page for the Sage brand palette: ten swatches from Sage 50 to Sage 900, light to dark green, each labelled with its CSS variable, from var(--ds-color-sage-50) to var(--ds-color-sage-900).',
                width: 640,
                height: 352,
              },
            ]}
          />
        </ArticleSection>

        <ArticleSection id="types" title="Accessibility the compiler enforces">
          <Prose>
            <p>
              Components are composed on Radix primitives rather than taken from
              a component library, so semantics, interaction states, dark mode
              and motion stay owned and consistent.
            </p>
            <p>
              The Button&rsquo;s props are a discriminated union. Give it
              visible text and <Code>aria-label</Code> is optional; make it
              icon-only and <Code>aria-label</Code> becomes required. Forgetting
              it is a type error in the editor, not a finding in an audit months
              later.
            </p>
          </Prose>
          <CodeBlock
            caption="From Button.types.ts, with two usages: the icon-only button without a label does not compile."
            lines={buttonTypes}
          />
          <ImageFigure
            caption="The Button in Storybook: six variants, fill and outline, and its interaction states."
            images={[
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
            ]}
          />
        </ArticleSection>

        <ArticleSection id="rendering" title="Rendering chosen per page">
          <Prose>
            <p>
              Each route renders the way its content changes. API responses are
              validated at runtime with Zod, and TanStack Query handles caching
              and loading states.
            </p>
          </Prose>
          <ul className="grid gap-3 md:grid-cols-3">
            {[
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
            ].map(({ page, how }) => (
              <li
                key={page}
                className={cn(
                  'flex flex-col gap-1 p-4 rounded-xl',
                  'bg-warm-100/50 dark:bg-indigo-50/30',
                  'border border-pink/30 dark:border-blue-100/30',
                )}
              >
                <p className="font-medium">{page}</p>
                <p className="text-sm/6">{how}</p>
              </li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleSection id="quality" title="Tested like a product">
          <StatList stats={QUALITY_STATS} />
          <Prose>
            <p>
              Atoms, molecules, organisms and pages each have jest-axe checks
              alongside their unit tests, with MSW standing in for the API.
              Storybook documents the tokens (colour, spacing, radii), the
              typography and the Button.
            </p>
          </Prose>
        </ArticleSection>
      </article>
    </PageShell>
  );
}
