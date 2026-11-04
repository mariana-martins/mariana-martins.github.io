import React from 'react';

import { cn } from '@/lib/cn';

export function ArticleHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 pb-10 border-b-dashed-custom">
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
    <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            'flex flex-col-reverse gap-1 p-4 rounded-xl',
            'bg-warm-100/50 dark:bg-indigo-50/30',
            'border border-pink/30 dark:border-blue-100/30',
          )}
        >
          <dt className="text-sm text-pretty">{stat.label}</dt>
          <dd className="font-heading text-2xl md:text-3xl font-medium tabular-nums">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CodeBlock({
  caption,
  code,
}: {
  caption: string;
  code: string;
}): React.JSX.Element {
  return (
    <figure className="flex flex-col gap-2">
      {/* Scrollable region: focusable so keyboard users can scroll it */}
      <pre
        tabIndex={0}
        className={cn(
          'overflow-x-auto p-5 rounded-xl text-sm/6',
          'bg-blue-300 text-warm-50 dark:bg-black/40',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus',
        )}
      >
        <code>{code}</code>
      </pre>
      <figcaption className="text-sm">{caption}</figcaption>
    </figure>
  );
}

/** Inline code */
export function Code({ children }: { children: string }): React.JSX.Element {
  return (
    <code className="px-1.5 py-0.5 rounded-md text-[0.9em] break-words bg-warm-100 dark:bg-indigo-50/60">
      {children}
    </code>
  );
}
