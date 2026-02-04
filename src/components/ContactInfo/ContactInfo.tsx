import React from 'react';

import { AtSign, GitFork, Mail, MapPin } from 'lucide-react';

import { data } from '@/data';

import { ContactItem } from './ContactItem';

function ContactInfo(): React.JSX.Element {
  return (
    <section
      className="w-full flex-1 flex flex-col justify-center gap-6 py-4 md:py-8 items-center border-b-dashed-custom"
      aria-labelledby="contact-info-heading"
    >
      <h3
        id="contact-info-heading"
        className="text-xl text-text-primary dark:text-text-primary-dark font-semibold mb-2"
      >
        Say Hi!
      </h3>

      <ul className="w-full max-w-sm flex flex-col gap-2">
        <ContactItem
          icon={MapPin}
          label="Location"
          value={data.contact.address}
        />
        <ContactItem
          icon={Mail}
          label="Email"
          value={data.contact.email}
          href={`mailto:${data.contact.email}`}
          ariaLabel={`Send email to ${data.contact.email}`}
          valueClassName="break-all"
        />
        <ContactItem
          icon={AtSign}
          label="LinkedIn"
          value="Mariana Martins Menezes"
          href={data.contact.linkedIn}
          ariaLabel="Visit LinkedIn profile"
          isExternal
          valueClassName="truncate"
        />
        <ContactItem
          icon={GitFork}
          label="GitHub"
          value="mariana-martins"
          href={data.contact.github}
          ariaLabel="Visit GitHub profile"
          isExternal
        />
      </ul>
    </section>
  );
}

export default ContactInfo;
