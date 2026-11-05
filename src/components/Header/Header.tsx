import React from 'react';

import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { SocialLinks } from '@components/SocialLinks/SocialLinks';
import { ArrowDown, Download, Mail } from 'lucide-react';

import { CV, SECTIONS } from '@/constants';
import { data } from '@/data';
import { cn } from '@/lib/cn';

const FACTS = [
  'Melbourne, Australia',
  'NZ citizen with full Australian work rights',
  'Open to roles across Australia',
];

export function Header(): React.JSX.Element {
  return (
    <header
      className={cn(
        'w-full pt-16 md:pt-20 pb-10 flex flex-col items-center text-center',
        'text-text-primary dark:text-text-primary-dark',
      )}
    >
      <h1
        className={cn(
          'text-2xl md:text-4xl lg:text-5xl font-medium font-heading',
          'tracking-[0.25rem] uppercase text-balance',
        )}
      >
        Mariana Martins Menezes
      </h1>
      <p className="mt-2 text-xl lg:text-2xl tracking-widest">
        Frontend &amp; Design Engineer
      </p>
      <p className="mt-5 max-w-[46ch] text-lg/8 text-balance">
        I build accessible, high-performance React and TypeScript interfaces,
        and the design systems behind them.
      </p>
      <ul className="mt-3 flex flex-col items-center lg:flex-row gap-x-2 gap-y-1 text-sm">
        {FACTS.map((fact, index) => (
          <li key={fact} className="flex items-center gap-x-2">
            {index > 0 && (
              <span aria-hidden="true" className="hidden lg:inline">
                &middot;
              </span>
            )}
            {fact}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href={`#${SECTIONS.projects.id}`} icon={ArrowDown}>
          View projects
        </ButtonLink>
        <ButtonLink
          href={CV.href}
          download={CV.fileName}
          variant="secondary"
          icon={Download}
        >
          <span>
            Download CV <span className="font-normal">(PDF)</span>
          </span>
        </ButtonLink>
        <ButtonLink
          href={`mailto:${data.contact.email}`}
          variant="secondary"
          icon={Mail}
        >
          Email me
        </ButtonLink>
        <SocialLinks />
      </div>
    </header>
  );
}
