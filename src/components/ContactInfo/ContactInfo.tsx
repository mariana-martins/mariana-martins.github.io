import React, { useState } from "react";

import { AtSign, GitFork, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { TargetAndTransition } from "motion/react";

import { data } from "@/data";

const contactLinkClasses = [
  // Layout
  "flex items-center gap-2",
  // Styling
  "rounded transition-colors",
  // Hover states
  "hover:opacity-80 dark:hover:opacity-100 dark:hover:text-green",
  // Focus states - matching SkipLink colors
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  "focus:ring-[var(--color-pink)]",
  "dark:focus:ring-[var(--color-blue-100)]",
].join(" ");

function ContactInfo(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Animation variants for icon shake effect
  const getIconShakeAnimation = (rowId: string): TargetAndTransition => {
    if (prefersReducedMotion) {
      return {};
    }
    return hoveredRow === rowId
      ? {
          x: [0, -3, 3, -3, 3, 0],
          transition: {
            duration: 0.4,
            ease: "easeInOut" as const,
          },
        }
      : { x: 0 };
  };

  // Animation variants for icon press effect
  const iconPressAnimation: TargetAndTransition = prefersReducedMotion
    ? {}
    : {
        scale: 0.9,
        transition: {
          duration: 0.1,
        },
      };

  return (
    <section
      className="w-full h-fit flex flex-col gap-6 justify-evenly py-8 items-center text-text-primary dark:text-text-primary-dark border-b-dashed-custom border-t-dashed-custom"
      aria-labelledby="contact-info-heading"
    >
      <h3 id="contact-info-heading" className="text-2xl">
        Contact Info
      </h3>
      <div className="flex flex-col gap-6">
        <address
          className="flex items-center gap-2"
          onMouseEnter={() => setHoveredRow("address")}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <motion.span
            className="inline-block"
            animate={getIconShakeAnimation("address")}
            aria-hidden="true"
          >
            <MapPin size={20} aria-hidden="true" />
          </motion.span>
          <p className="text-base">{data.contact.address}</p>
        </address>
        <a
          href={`mailto:${data.contact.email}`}
          aria-label={`Send email to ${data.contact.email}`}
          className={contactLinkClasses}
          onMouseEnter={() => setHoveredRow("email")}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <motion.span
            className="inline-block"
            animate={getIconShakeAnimation("email")}
            whileTap={iconPressAnimation}
            aria-hidden="true"
          >
            <Mail size={20} aria-hidden="true" />
          </motion.span>
          <span className="text-base">{data.contact.email}</span>
        </a>
        <a
          href={data.contact.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Mariana Martins Menezes LinkedIn profile"
          className={contactLinkClasses}
          onMouseEnter={() => setHoveredRow("linkedin")}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <motion.span
            className="inline-block"
            animate={getIconShakeAnimation("linkedin")}
            whileTap={iconPressAnimation}
            aria-hidden="true"
          >
            <AtSign size={20} aria-hidden="true" />
          </motion.span>
          <span className="text-base">Mariana Martins Menezes</span>
        </a>
        <a
          href={data.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit mariana-martins GitHub profile"
          className={contactLinkClasses}
          onMouseEnter={() => setHoveredRow("github")}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <motion.span
            className="inline-block"
            animate={getIconShakeAnimation("github")}
            whileTap={iconPressAnimation}
            aria-hidden="true"
          >
            <GitFork size={20} aria-hidden="true" />
          </motion.span>
          <span className="text-base">mariana-martins</span>
        </a>
      </div>
    </section>
  );
}

export default ContactInfo;
