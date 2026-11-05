import React from 'react';

import { CountUp } from '@components/CountUp/CountUp';

import { cn } from '@/lib/cn';
import type { CodeLine } from '@/types';

export function ArticleHeader({
  eyebrow,
  title,
  lead,
  divider = true,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  divider?: boolean;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 pb-10',
        divider && 'border-b-dashed-custom',
      )}
    >
      <p className="text-sm font-medium tracking-widest uppercase">{eyebrow}</p>
      <h1 className="font-heading text-4xl md:text-5xl font-medium text-balance">
        {title}
      </h1>
      <p className="text-lg/8 md:text-xl/9 max-w-[60ch] text-pretty">{lead}</p>
      {children}
    </div>
  );
}

export function ArticleSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}): React.JSX.Element {
  const headingId = `${id}-heading`;
  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col gap-5 py-10 border-b-dashed-custom last:after:hidden last:pb-0"
    >
      <h2
        id={headingId}
        className="font-heading text-2xl md:text-3xl font-medium text-balance"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Prose({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 max-w-[65ch] text-base/7 md:text-lg/8 text-pretty">
      {children}
    </div>
  );
}

export interface Stat {
  value: string;
  label: string;
}

export function StatList({ stats }: { stats: Stat[] }): React.JSX.Element {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <li
          key={stat.label}
          className={cn(
            'flex flex-col items-center justify-center gap-1 p-4 rounded-xl text-center',
            'bg-warm-100/50 dark:bg-indigo-50/30',
            'border border-pink/30 dark:border-blue-100/30',
          )}
        >
          <span className="font-heading text-xl sm:text-2xl md:text-3xl font-medium tabular-nums whitespace-nowrap">
            <CountUp value={stat.value} />
          </span>{' '}
          <span className="text-xs sm:text-sm text-pretty">{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Highlighted code from scripts/highlight-snippets.mjs. Keys are character
 * offsets: the code is static, and they stay unique and stable.
 */
export function HighlightedCode({
  lines,
}: {
  lines: CodeLine[];
}): React.JSX.Element {
  let offset = 0;
  return (
    <>
      {lines.map((line, lineNumber) => {
        const lineKey = offset;
        const tokens = line.map(([text, color]) => {
          const key = offset;
          offset += text.length;
          return (
            <span key={key} style={{ color }}>
              {text}
            </span>
          );
        });
        offset += 1;
        return (
          <React.Fragment key={lineKey}>
            {tokens}
            {lineNumber < lines.length - 1 && '\n'}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function CodeBlock({
  caption,
  lines,
}: {
  caption: string;
  lines: CodeLine[];
}): React.JSX.Element {
  return (
    <figure className="flex flex-col gap-2">
      {/* Scrollable region: focusable so keyboard users can scroll it */}
      <pre
        tabIndex={0}
        className={cn(
          'overflow-x-auto p-5 rounded-xl text-sm/6',
          'bg-code-bg text-code-text',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus',
        )}
      >
        <code>
          <HighlightedCode lines={lines} />
        </code>
      </pre>
      <figcaption className="text-sm">{caption}</figcaption>
    </figure>
  );
}

export interface FigureImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function ImageFigure({
  images,
  caption,
}: {
  images: FigureImage[];
  caption: string;
}): React.JSX.Element {
  return (
    <figure className="flex flex-col gap-2">
      <div
        className={cn(
          'flex flex-col items-start gap-2 p-3 rounded-xl overflow-hidden bg-white',
          'border border-text-primary/15 dark:border-white/15',
        )}
      >
        {images.map((image) => (
          <img
            key={image.alt}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            className={cn(
              'block max-w-full h-auto',
              images.length === 1 && 'w-full',
            )}
          />
        ))}
      </div>
      <figcaption className="text-sm">{caption}</figcaption>
    </figure>
  );
}

export function Code({ children }: { children: string }): React.JSX.Element {
  return (
    <code className="px-1.5 py-0.5 rounded-md text-[0.9em] break-words bg-warm-100 dark:bg-indigo-50/60">
      {children}
    </code>
  );
}
