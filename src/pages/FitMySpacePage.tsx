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
import {
  Accessibility,
  ArrowDown,
  Braces,
  Contrast,
  ExternalLink,
  Layers,
  type LucideIcon,
} from 'lucide-react';

import { PROJECTS_CRUMB } from '@/constants';
import { fitMySpace } from '@/data/pages/fitMySpace';
import { buttonTypes, tokenOutputs } from '@/data/pages/snippets.generated';
import { cn } from '@/lib/cn';
import type { Guardrail, GuardrailId } from '@/types';

const { tokens, types, guardrails, rendering, quality } = fitMySpace;

// UTC, so the server and the browser print the same day
const UPDATED_FORMAT = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const guardrailIcons: Record<GuardrailId, { icon: LucideIcon; tile: string }> =
  {
    tiers: { icon: Layers, tile: 'bg-blue-50' },
    contrast: { icon: Contrast, tile: 'bg-warm-400' },
    tokens: { icon: Braces, tile: 'bg-green-50' },
    axe: { icon: Accessibility, tile: 'bg-purple-50' },
  };

function GuardrailCards({
  checks,
}: {
  checks: Guardrail[];
}): React.JSX.Element {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {checks.map(({ id, rule, check }) => {
        const { icon: Icon, tile } = guardrailIcons[id];
        return (
          <li
            key={id}
            className="flex flex-col gap-3 p-5 rounded-xl bg-soft border border-soft"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  'grid place-items-center size-11 shrink-0 rounded-xl text-text-primary',
                  tile,
                )}
              >
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="font-semibold text-base/6 text-balance">{rule}</h3>
            </div>
            <p className="text-sm/6">
              <InlineText text={check} />
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function NoteCards({
  notes,
  className,
}: {
  notes: Array<{ title: string; text: string }>;
  className?: string;
}): React.JSX.Element {
  return (
    <ul className={cn('grid gap-3', className)}>
      {notes.map(({ title, text }) => (
        <li
          key={title}
          className="flex flex-col gap-1 p-4 rounded-xl bg-soft border border-soft"
        >
          <p className="font-medium">{title}</p>
          <p className="text-sm/6">
            <InlineText text={text} />
          </p>
        </li>
      ))}
    </ul>
  );
}

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
          <p
            className={cn(
              'max-w-[65ch] p-4 rounded-xl text-base/7 text-pretty',
              'border-2 border-dashed border-accent',
            )}
          >
            <strong className="font-semibold">
              {fitMySpace.status.label}.
            </strong>{' '}
            {fitMySpace.status.text}
          </p>
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[auto_1fr] text-base">
            <dt className="font-medium">Role</dt>
            <dd>{fitMySpace.role}</dd>
            <dt className="font-medium">Built with</dt>
            <dd>{fitMySpace.builtWith}</dd>
            <dt className="font-medium">Last updated</dt>
            <dd>
              <time dateTime={fitMySpace.updated}>
                {UPDATED_FORMAT.format(new Date(fitMySpace.updated))}
              </time>
            </dd>
          </dl>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink
              href={fitMySpace.storybookUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={ExternalLink}
            >
              Explore the live Storybook
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
            <ButtonLink
              href={fitMySpace.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
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
              Design system in Figma
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
          <Paragraphs paragraphs={types.field.paragraphs} />
          <ImageFigure
            caption={types.field.caption}
            images={[types.field.image]}
          />
        </ArticleSection>

        <ArticleSection id={guardrails.id} title={guardrails.title}>
          <Paragraphs paragraphs={guardrails.paragraphs} />
          <GuardrailCards checks={guardrails.checks} />
        </ArticleSection>

        <ArticleSection id={rendering.id} title={rendering.title}>
          <Paragraphs paragraphs={rendering.paragraphs} />
          <NoteCards
            notes={rendering.modes.map(({ page, how }) => ({
              title: page,
              text: how,
            }))}
            className="md:grid-cols-3"
          />
        </ArticleSection>

        <ArticleSection id={quality.id} title={quality.title}>
          <StatList stats={quality.stats} />
          <Paragraphs paragraphs={quality.paragraphs} />
        </ArticleSection>
      </article>
    </PageShell>
  );
}
