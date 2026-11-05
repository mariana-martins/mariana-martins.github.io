import React from 'react';

import {
  ArticleHeader,
  ArticleSection,
  Prose,
  type Stat,
  StatList,
} from '@components/Article/Article';
import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { PageShell } from '@components/PageShell/PageShell';
import { ExternalLink } from 'lucide-react';

import shot2016 from '@/assets/history/2016.webp';
import shot2017 from '@/assets/history/2017.webp';
import shot2022 from '@/assets/history/2022.webp';
import shot2025 from '@/assets/history/2025.webp';
import shot2026 from '@/assets/history/2026.webp';
import { cn } from '@/lib/cn';

const REPO_URL = 'https://github.com/mariana-martins/mariana-martins.github.io';

interface Era {
  id: string;
  when: string;
  title: string;
  body: React.ReactNode;
  screenshot?: { src: string; alt: string };
}

const ERAS: Era[] = [
  {
    id: 'bootstrap',
    when: '2016',
    title: 'A Bootstrap page and a PDF',
    body: (
      <p>
        I started studying software development in Brazil between 2015 and 2016.
        The first version of this site was a single Bootstrap 3 page: a photo,
        the online courses I had taken, and my résumé as a PDF. A few months
        later, in May 2016, I moved to New Zealand barely speaking English.
      </p>
    ),
    screenshot: {
      src: shot2016,
      alt: 'The 2016 version: a teal banner with a round photo of me and the tagline “Front-End Developer, Historian, Freelancer”, above a list of online courses.',
    },
  },
  {
    id: 'jquery',
    when: '2017',
    title: 'jQuery, bundled with webpack',
    body: (
      <p>
        After three months of English classes I started a frontend nanodegree at
        Udacity, and began choosing a direction. The site was rebuilt with
        jQuery and webpack: a full-screen gradient, a navigation bar for every
        section and a big &ldquo;Let&rsquo;s talk!&rdquo; button.
      </p>
    ),
    screenshot: {
      src: shot2017,
      alt: 'The 2017 version: a bright blue gradient with “Mariana” in large white letters, a navigation bar and two buttons, “Learn more” and “Let’s talk!”.',
    },
  },
  {
    id: 'gatsby',
    when: '2019 – 2022',
    title: 'Gatsby and React',
    body: (
      <p>
        My first frontend job, at Kathmandu, made me sure frontend was what I
        wanted. At Phocas I chose React and fell in love with designing
        interfaces and working closely with designers. The site moved to Gatsby
        in 2019 and was updated with each new role until 2022. It also
        introduced the light-blue &ldquo;M&rdquo; that still sits behind Margot
        in today&rsquo;s logo.
      </p>
    ),
    screenshot: {
      src: shot2022,
      alt: 'The Gatsby version: a purple gradient with a round “M” logo, the title “Frontend Developer”, tabs for introduction, projects, experience and skills, and a photo of me.',
    },
  },
  {
    id: 'rebuild',
    when: '2025',
    title: 'Starting again from scratch',
    body: (
      <p>
        In September 2025 I started again with Vite, React, TypeScript and
        Tailwind CSS. The &ldquo;M&rdquo; became a logo with Margot at a laptop,
        and the site found the soft gradients, glass panels and dashed dividers
        it still has.
      </p>
    ),
    screenshot: {
      src: shot2025,
      alt: 'December 2025: the logo of Margot at a laptop beside my name, and a glass panel with About Me, Experience and Contact Info sections.',
    },
  },
  {
    id: 'edits',
    when: '2025 – 2026',
    title: 'Edited, not just added to',
    body: (
      <>
        <p>
          Most of the work since has been changing my mind, one commit at a
          time:
        </p>
        <ul className="flex flex-col gap-2 list-disc pl-6 marker:text-pink dark:marker:text-blue-100">
          <li>
            The colour system was reorganised three times: functional names,
            then HSL with a dark theme, then a numbered scale.
          </li>
          <li>
            Tailwind CSS moved to version 4, with the design tokens defined in
            CSS.
          </li>
          <li>
            A Skills section arrived in November 2025 and was gone early in
            2026.
          </li>
          <li>
            Experience went into an accordion, then back out, with every role
            open.
          </li>
          <li>
            The Learning Shelf grew into Margot&rsquo;s Picks: more than a
            hundred books, courses and films, rated in Margots.
          </li>
          <li>
            An animation library came in for scroll and hover effects, and later
            made way for CSS and the browser&rsquo;s Web Animations API.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'today',
    when: 'Today',
    title: 'Measured, not assumed',
    body: (
      <p>
        The latest chapter is about checking the work rather than trusting it.
        Contrast and focus are measured on the rendered pixels in a real
        browser, in both themes and on mobile, because automated checks in jsdom
        never see colour at all. Every page is prerendered to HTML and hydrated
        without mismatches, and a first visit downloads a third less JavaScript
        than before.
      </p>
    ),
    screenshot: {
      src: shot2026,
      alt: 'Today: my name and title centred above buttons for projects, the CV and email, with the About section below.',
    },
  },
];

const TODAY_STATS: Stat[] = [
  {
    value: '100 kB',
    label: 'of JavaScript on a first visit, gzipped (was 163)',
  },
  { value: '97+', label: 'Lighthouse performance on mobile' },
  { value: '5.5:1', label: 'focus ring contrast (was 2.1:1)' },
  { value: '0', label: 'requests to third-party servers' },
];

const DETAILS = [
  'The Learning Shelf cards are cut like cinema tickets with a CSS mask, and the notches move when the card changes layout.',
  'Ratings are counted in Margots: an “M” with her paw on it, and sparkles for a perfect five.',
  'Where the browser supports it, the ticket corners use corner-shape: squircle.',
  'Every animation respects reduced motion, from the scroll reveals to the fun fact cards.',
];

function Screenshot({
  src,
  alt,
  when,
}: {
  src: string;
  alt: string;
  when: string;
}): React.JSX.Element {
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
  return (
    <PageShell breadcrumbs={[{ label: 'How this site was built' }]}>
      <article>
        <ArticleHeader
          eyebrow="Since 2016"
          title="How this site was built"
          lead="This portfolio has grown alongside my career. Every version is still in its Git history, so here they all are: what I was learning at the time, and what changed."
          divider={false}
        />

        <ol className="flex flex-col">
          {ERAS.map((era) => (
            <li
              key={era.id}
              className={cn(
                'relative flex flex-col gap-5 py-10 pl-6 sm:pl-8 md:pl-10',
                'border-l-2 border-dashed border-pink/60 dark:border-blue-100/50',
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
              <Prose>{era.body}</Prose>
              {era.id === 'today' && <StatList stats={TODAY_STATS} />}
              {era.screenshot && (
                <Screenshot
                  src={era.screenshot.src}
                  alt={era.screenshot.alt}
                  when={era.when === 'Today' ? 'November 2026' : era.when}
                />
              )}
            </li>
          ))}
        </ol>

        <ArticleSection id="details" title="The small things">
          <ul className="flex flex-col gap-3 max-w-[65ch] text-base/7 md:text-lg/8 list-disc pl-6 marker:text-pink dark:marker:text-blue-100">
            {DETAILS.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink
              href={REPO_URL}
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
