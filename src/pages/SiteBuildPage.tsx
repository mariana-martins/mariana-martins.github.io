import React from 'react';

import {
  ArticleHeader,
  ArticleSection,
  Code,
  Prose,
  type Stat,
  StatList,
} from '@components/Article/Article';
import { ButtonLink } from '@components/ButtonLink/ButtonLink';
import { PageShell } from '@components/PageShell/PageShell';
import { ExternalLink } from 'lucide-react';

import { SECTIONS } from '@/constants';

const REPO_URL = 'https://github.com/mariana-martins/mariana-martins.github.io';

const HEADLINE_STATS: Stat[] = [
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
  'Ratings are counted in Margots: an SVG of my “M” with her paw, and sparkles for a perfect five.',
  'Where the browser supports it, the ticket corners use corner-shape: squircle.',
  'Every animation respects reduced motion, from the scroll reveals to the fun fact cards.',
];

export default function SiteBuildPage(): React.JSX.Element {
  return (
    <PageShell>
      <article>
        <ArticleHeader
          eyebrow="Behind the scenes"
          title="How this site was built"
          lead="This portfolio is a project too. The parts worth a closer look are the ones you cannot see: how accessibility is checked, how the pages are rendered, and how little they ask your connection to download."
        >
          <StatList stats={HEADLINE_STATS} />
        </ArticleHeader>

        <ArticleSection
          id="accessibility"
          title="Accessibility, measured on pixels"
        >
          <Prose>
            <p>
              Automated checks usually run axe in jsdom, which has no layout and
              no colours, so contrast is never checked at all. Even in a real
              browser, axe gave up on 120 of the 141 text elements here:
              gradients, background blur and pseudo-element borders leave it
              unable to tell what is behind the text.
            </p>
            <p>
              So the tests measure what is painted. They hide the text, take a
              screenshot, and compare each text colour with the real pixels
              behind it. Focus is checked the same way: every Tab stop has to
              change the screen by at least 3:1. They run in light and dark
              mode, on desktop and mobile, and they caught a pink focus ring at
              2.1:1 and secondary text at 3:1 that every other check had passed.
            </p>
          </Prose>
        </ArticleSection>

        <ArticleSection
          id="prerendering"
          title="React, prerendered without a framework"
        >
          <Prose>
            <p>
              Each page is rendered to HTML at build time and hydrated in the
              browser, so the content arrives before any JavaScript does, for
              visitors, search engines and link previews alike.
            </p>
            <p>
              Anything that depends on the visitor (the theme, the URL hash,
              today&rsquo;s date) is read through{' '}
              <Code>useSyncExternalStore</Code>, so the first render matches the
              HTML exactly. A few lines of inline script set the theme before
              the first paint, so dark mode never flashes light, and a test
              fails if a component reads the browser while rendering.
            </p>
          </Prose>
        </ArticleSection>

        <ArticleSection id="performance" title="A third less to download">
          <Prose>
            <p>
              An animation library made up 122 kB of the bundle for three
              effects. They are now CSS transitions and the browser&rsquo;s own
              Web Animations API, with the same timings. Margot&rsquo;s Picks
              only loads when someone opens it, and starts downloading as soon
              as the pointer reaches its button.
            </p>
            <p>
              The fonts are self-hosted variable files, preloaded by a small
              Vite plugin, so no request leaves this site. A size budget in CI
              fails the build if a first visit grows.
            </p>
          </Prose>
        </ArticleSection>

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
              Browse the code on GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
            <ButtonLink href={`/#${SECTIONS.projects.id}`} variant="secondary">
              See the projects
            </ButtonLink>
          </div>
        </ArticleSection>
      </article>
    </PageShell>
  );
}
