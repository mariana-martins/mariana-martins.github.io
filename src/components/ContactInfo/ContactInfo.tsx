import * as React from "react";

import { AtSign, GitFork, Mail, MapPin } from "lucide-react";

import { data } from "../../data";

function ContactInfo(): React.JSX.Element {
  return (
    <section
      className="col-2 text-text-primary dark:text-text-primary-dark border-b-dashed-custom border-b-dashed-custom-left-24 h-fit pl-8 pb-8"
      aria-labelledby="contact-info-heading"
    >
      <h3 id="contact-info-heading" className="text-2xl mb-4">
        Contact Info
      </h3>
      <address className="flex flex-col gap-6 not-italic">
        <div className="flex items-center gap-2">
          <MapPin size={20} aria-hidden="true" />
          <p className="text-base">{data.contact.address}</p>
        </div>
        <a
          href={`mailto:${data.contact.email}`}
          aria-label={`Send email to ${data.contact.email}`}
          className="flex items-center gap-2 hover:opacity-80 dark:hover:opacity-100 dark:hover:text-green transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          <Mail size={20} aria-hidden="true" />
          <span className="text-base">{data.contact.email}</span>
        </a>
        <a
          href={data.contact.linkedIn}
          aria-label="Visit Mariana Martins Menezes LinkedIn profile"
          className="flex items-center gap-2 hover:opacity-80 dark:hover:opacity-100 dark:hover:text-green transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          <AtSign size={20} aria-hidden="true" />
          <span className="text-base">Mariana Martins Menezes</span>
        </a>
        <a
          href={data.contact.github}
          aria-label="Visit mariana-martins GitHub profile"
          className="flex items-center gap-2 hover:opacity-80 dark:hover:opacity-100 dark:hover:text-green transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          <GitFork size={20} aria-hidden="true" />
          <span className="text-base">mariana-martins</span>
        </a>
      </address>
    </section>
  );
}

export default ContactInfo;
