import React from 'react';

import {
  ArticleHeader,
  ArticleSection,
  Paragraphs,
  StatList,
} from '@components/Article/Article';
import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { PageShell } from '@components/PageShell/PageShell';
import { ExternalLink } from 'lucide-react';

import { siteBuild } from '@/data/pages/siteBuild';
import { cn } from '@/lib/cn';
import type { Era } from '@/types';

type ScreenshotProps = NonNullable<Era['screenshot']>;

function Screenshot({ src, alt, when }: ScreenshotProps): React.JSX.Element {
  return (
    <figure className="flex flex-col gap-2">
      <div
        className={cn(
          'overflow-hidden rounded-xl shadow-lg',
          'border border-text-primary/15 dark:border-white/15',
        )}
      >
        <div
          aria-hidden="true"
          className="flex gap-1.5 px-3 py-2 bg-warm-100 dark:bg-indigo-50"
        >
          <span className="size-2.5 rounded-full bg-highlight-red" />
          <span className="size-2.5 rounded-full bg-highlight-yellow" />
          <span className="size-2.5 rounded-full bg-highlight-green" />
        </div>
        <img
          src={src}
          alt={alt}
          width={960}
          height={600}
          loading="lazy"
          className="block w-full h-auto"
        />
      </div>
      <figcaption className="text-sm">The site in {when}</figcaption>
    </figure>
  );
}

export default function SiteBuildPage(): React.JSX.Element {
  const { eras, details } = siteBuild;

  return (
    <PageShell breadcrumbs={[{ label: siteBuild.title }]}>
      <article>
        <ArticleHeader
          eyebrow={siteBuild.eyebrow}
          title={siteBuild.title}
          lead={siteBuild.lead}
          divider={false}
        />

        <ol className="flex flex-col">
          {eras.map((era) => (
            <li
              key={era.id}
              className={cn(
                'relative flex flex-col gap-5 py-10 pl-6 sm:pl-8 md:pl-10',
                'border-l-2 border-dashed border-accent',
              )}
            >
              <p className="relative flex items-center min-h-4 text-sm font-medium tracking-widest uppercase">
                <span
                  aria-hidden="true"
                  className="absolute -left-[33px] sm:-left-[41px] md:-left-[49px] top-1/2 -translate-y-1/2 size-4 rounded-full bg-pink dark:bg-blue-100"
                />
                {era.when}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-balance">
                {era.title}
              </h2>
              <Paragraphs paragraphs={era.paragraphs} />
              {era.list && (
                <ul className="flex flex-col gap-2 max-w-[65ch] text-base/7 md:text-lg/8 list-disc pl-6 marker:text-pink dark:marker:text-blue-100">
                  {era.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {era.stats && <StatList stats={era.stats} />}
              {era.screenshot && <Screenshot {...era.screenshot} />}
            </li>
          ))}
        </ol>

        <ArticleSection id="details" title={details.title}>
          <ul className="flex flex-col gap-3 max-w-[65ch] text-base/7 md:text-lg/8 list-disc pl-6 marker:text-pink dark:marker:text-blue-100">
            {details.items.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink
              href={siteBuild.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={ExternalLink}
            >
              Browse the code and its history on GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          </div>
        </ArticleSection>
      </article>
    </PageShell>
  );
}
