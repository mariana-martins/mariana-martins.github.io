import React from 'react';

import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { ArrowDown, Download, Mail } from 'lucide-react';

import logo from '@/assets/logo.webp';
import { CV, SECTIONS } from '@/constants';
import { data } from '@/data';
import { cn } from '@/lib/cn';

const FACTS = [
  'Melbourne, Australia',
  'NZ citizen with full Australian work rights',
  'Open to roles across Australia',
];

export function Header(): React.JSX.Element {
  const name = 'Mariana Martins Menezes';

  return (
    <header
      className={cn(
        'w-full pt-12 pb-8 gap-x-8 self-center relative',
        'flex flex-col lg:flex-row items-center justify-center',
      )}
    >
      <div
        className={cn(
          'relative max-w-24 max-h-24 md:max-w-36 md:max-h-36',
          'bg-warm-300 border-4 border-pink rounded-md',
          'px-1 py-4 mb-8 lg:mb-0',
          'dark:bg-transparent dark:border-blue-100',
          'dark:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_8px_var(--color-blue-100),0_0_15px_var(--color-blue-100),0_0_30px_var(--color-blue-100)]',
        )}
      >
        {/* Decorative: the h1 says the name */}
        <img
          src={logo}
          alt=""
          width={272}
          height={197}
          className="w-fit object-scale-down"
        />
      </div>

      <div className="flex flex-col items-center lg:items-start text-text-primary dark:text-text-primary-dark">
        <h1
          className={cn(
            'text-2xl lg:text-5xl font-medium font-heading',
            'tracking-[0.25rem] uppercase',
            'lg:text-left text-center',
            'max-w-[300px] md:max-w-[900px]',
          )}
        >
          {name}
        </h1>
        <p
          className={cn(
            'mt-2 text-xl lg:text-2xl tracking-widest',
            'lg:text-left text-center',
          )}
        >
          Frontend &amp; Design Engineer
        </p>
        <p className="mt-5 max-w-[46ch] text-lg/8 text-balance lg:text-left text-center">
          I build accessible, high-performance React and TypeScript interfaces,
          and the design systems behind them.
        </p>
        <ul className="mt-3 flex flex-col items-center lg:flex-row lg:items-start gap-x-2 gap-y-1 text-sm">
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
        <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
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
        </div>
      </div>
    </header>
  );
}
