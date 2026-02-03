import React from 'react';

import { AtSign, GitFork, Mail, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { TargetAndTransition } from 'motion/react';

import { data } from '@/data';

const itemClasses = [
  'w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300',
  'bg-transparent hover:bg-warm-100/50 dark:hover:bg-white/5',
  'text-text-primary dark:text-text-primary-dark',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'focus-visible:ring-pink dark:focus-visible:ring-blue-100',
  'group cursor-pointer',
].join(' ');

const iconContainerClasses = [
  'flex items-center justify-center p-2 rounded-lg transition-colors',
  'bg-white/50 dark:bg-white/5',
  'group-hover:bg-white group-hover:shadow-sm dark:group-hover:bg-white/10',
].join(' ');

function ContactInfo(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  const iconAnimation: TargetAndTransition = prefersReducedMotion
    ? {}
    : {
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
        },
      };

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
        {/* Address */}
        <li>
          <address
            className={`${itemClasses} cursor-default hover:bg-transparent dark:hover:bg-transparent not-italic`}
          >
            <div className={iconContainerClasses}>
              <MapPin
                size={22}
                className="text-pink dark:text-blue-100"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-primary/60 dark:text-text-primary-dark/60 font-medium">
                Location
              </span>
              <span className="text-base font-medium">
                {data.contact.address}
              </span>
            </div>
          </address>
        </li>

        {/* Email */}
        <li>
          <motion.a
            href={`mailto:${data.contact.email}`}
            className={itemClasses}
            whileHover={prefersReducedMotion ? {} : { x: 4 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            aria-label={`Send email to ${data.contact.email}`}
          >
            <motion.div
              className={iconContainerClasses}
              whileHover={iconAnimation}
            >
              <Mail
                size={22}
                className="text-pink dark:text-blue-100"
                aria-hidden="true"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xs text-text-primary/60 dark:text-text-primary-dark/60 font-medium">
                Email
              </span>
              <span className="text-base font-medium break-all">
                {data.contact.email}
              </span>
            </div>
          </motion.a>
        </li>

        {/* LinkedIn */}
        <li>
          <motion.a
            href={data.contact.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className={itemClasses}
            whileHover={prefersReducedMotion ? {} : { x: 4 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            aria-label="Visit LinkedIn profile"
          >
            <motion.div
              className={iconContainerClasses}
              whileHover={iconAnimation}
            >
              <AtSign
                size={22}
                className="text-pink dark:text-blue-100"
                aria-hidden="true"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xs text-text-primary/60 dark:text-text-primary-dark/60 font-medium">
                LinkedIn
              </span>
              <span className="text-base font-medium truncate">
                Mariana Martins Menezes
              </span>
            </div>
          </motion.a>
        </li>

        {/* GitHub */}
        <li>
          <motion.a
            href={data.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className={itemClasses}
            whileHover={prefersReducedMotion ? {} : { x: 4 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            aria-label="Visit GitHub profile"
          >
            <motion.div
              className={iconContainerClasses}
              whileHover={iconAnimation}
            >
              <GitFork
                size={22}
                className="text-pink dark:text-blue-100"
                aria-hidden="true"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xs text-text-primary/60 dark:text-text-primary-dark/60 font-medium">
                GitHub
              </span>
              <span className="text-base font-medium">mariana-martins</span>
            </div>
          </motion.a>
        </li>
      </ul>
    </section>
  );
}

export default ContactInfo;
