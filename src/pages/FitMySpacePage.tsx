import React from 'react';

import {
  ArticleHeader,
  ArticleSection,
  CodeBlock,
  HighlightedCode,
  ImageFigure,
  InlineText,
  Paragraphs,
  StatList,
} from '@components/Article/Article';
import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { PageShell } from '@components/PageShell/PageShell';
import { ArrowDown, ExternalLink } from 'lucide-react';

import { PROJECTS_CRUMB } from '@/constants';
import { fitMySpace } from '@/data/pages/fitMySpace';
import { buttonTypes, tokenOutputs } from '@/data/pages/snippets.generated';
import { cn } from '@/lib/cn';

const { tokens, types, rendering, quality } = fitMySpace;

function TokenFlow(): React.JSX.Element {
  return (
    <figure className="flex flex-col gap-3">
      <ol className="flex flex-col gap-2">
        {tokens.steps.map((step, index) => (
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
        <InlineText text={tokens.flowCaption} />
      </figcaption>
    </figure>
  );
}

export default function FitMySpacePage(): React.JSX.Element {
  return (
    <PageShell breadcrumbs={[PROJECTS_CRUMB, { label: fitMySpace.title }]}>
      <article>
        <ArticleHeader
          eyebrow={fitMySpace.eyebrow}
          title={fitMySpace.title}
          lead={fitMySpace.lead}
        >
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[auto_1fr] text-base">
            <dt className="font-medium">Role</dt>
            <dd>{fitMySpace.role}</dd>
            <dt className="font-medium">Built with</dt>
            <dd>{fitMySpace.builtWith}</dd>
          </dl>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink
              href={fitMySpace.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={ExternalLink}
            >
              View the code on GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
            <ButtonLink
              href={fitMySpace.figmaUrl}
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

        <ArticleSection id={tokens.id} title={tokens.title}>
          <Paragraphs paragraphs={tokens.paragraphs} />
          <TokenFlow />
          <ImageFigure
            caption={tokens.palette.caption}
            images={[tokens.palette.image]}
          />
        </ArticleSection>

        <ArticleSection id={types.id} title={types.title}>
          <Paragraphs paragraphs={types.paragraphs} />
          <CodeBlock caption={types.codeCaption} lines={buttonTypes} />
          <ImageFigure
            caption={types.states.caption}
            images={types.states.images}
          />
        </ArticleSection>

        <ArticleSection id={rendering.id} title={rendering.title}>
          <Paragraphs paragraphs={rendering.paragraphs} />
          <ul className="grid gap-3 md:grid-cols-3">
            {rendering.modes.map(({ page, how }) => (
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

        <ArticleSection id={quality.id} title={quality.title}>
          <StatList stats={quality.stats} />
          <Paragraphs paragraphs={quality.paragraphs} />
        </ArticleSection>
      </article>
    </PageShell>
  );
}
