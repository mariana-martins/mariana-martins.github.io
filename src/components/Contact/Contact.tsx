import React from 'react';

import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { SocialLinks } from '@components/SocialLinks/SocialLinks';
import { Mail } from 'lucide-react';

import { SECTIONS } from '@/constants';
import { data } from '@/data';

export function Contact(): React.JSX.Element {
  return (
    <section
      aria-labelledby={SECTIONS.contact.id}
      className="w-full flex flex-col items-center gap-5 px-2 pt-12 text-center text-body"
    >
      <h2
        id={SECTIONS.contact.id}
        tabIndex={-1}
        className="font-heading text-2xl md:text-3xl font-medium"
      >
        {SECTIONS.contact.label}
      </h2>
      <p className="max-w-[52ch] text-base/7 md:text-lg/8 text-balance">
        {data.contact.invitation}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href={`mailto:${data.contact.email}`} icon={Mail}>
          {data.contact.email}
        </ButtonLink>
        <SocialLinks />
      </div>
    </section>
  );
}
