import shot2016 from '@/assets/history/2016.webp';
import shot2017 from '@/assets/history/2017.webp';
import shot2022 from '@/assets/history/2022.webp';
import shot2025 from '@/assets/history/2025.webp';
import shot2026 from '@/assets/history/2026.webp';
import type { SiteHistory } from '@/types';

export const siteBuild: SiteHistory = {
  eyebrow: 'Since 2016',
  title: 'How this site was built',
  lead: 'This portfolio has grown alongside my career. Every version is still in its Git history, so here they all are: what I was learning at the time, and what changed.',
  repoUrl: 'https://github.com/mariana-martins/mariana-martins.github.io',
  eras: [
    {
      id: 'bootstrap',
      when: '2016',
      title: 'A Bootstrap page and a PDF',
      paragraphs: [
        'I started studying software development in Brazil between 2015 and 2016. The first version of this site was a single Bootstrap 3 page: a photo, the online courses I had taken, and my résumé as a PDF. A few months later, in May 2016, I moved to New Zealand barely speaking English.',
      ],
      screenshot: {
        src: shot2016,
        when: '2016',
        alt: 'The 2016 version: a teal banner with a round photo of me and the tagline “Front-End Developer, Historian, Freelancer”, above a list of online courses.',
      },
    },
    {
      id: 'jquery',
      when: '2017',
      title: 'jQuery, bundled with webpack',
      paragraphs: [
        'After three months of English classes I started a frontend nanodegree at Udacity, and began choosing a direction. The site was rebuilt with jQuery and webpack: a full-screen gradient, a navigation bar for every section and a big “Let’s talk!” button.',
      ],
      screenshot: {
        src: shot2017,
        when: '2017',
        alt: 'The 2017 version: a bright blue gradient with “Mariana” in large white letters, a navigation bar and two buttons, “Learn more” and “Let’s talk!”.',
      },
    },
    {
      id: 'gatsby',
      when: '2019 – 2022',
      title: 'Gatsby and React',
      paragraphs: [
        'My first frontend job, at Kathmandu, made me sure frontend was what I wanted. At Phocas I chose React and fell in love with designing interfaces and working closely with designers. The site moved to Gatsby in 2019 and was updated with each new role until 2022. It also introduced the light-blue “M” that still sits behind Margot in today’s logo.',
      ],
      screenshot: {
        src: shot2022,
        when: '2019 – 2022',
        alt: 'The Gatsby version: a purple gradient with a round “M” logo, the title “Frontend Developer”, tabs for introduction, projects, experience and skills, and a photo of me.',
      },
    },
    {
      id: 'rebuild',
      when: '2025',
      title: 'Starting again from scratch',
      paragraphs: [
        'In September 2025 I started again with Vite, React, TypeScript and Tailwind CSS. The “M” became a logo with Margot at a laptop, and the site found the soft gradients, glass panels and dashed dividers it still has.',
      ],
      screenshot: {
        src: shot2025,
        when: '2025',
        alt: 'December 2025: the logo of Margot at a laptop beside my name, and a glass panel with About Me, Experience and Contact Info sections.',
      },
    },
    {
      id: 'edits',
      when: '2025 – 2026',
      title: 'Edited, not just added to',
      paragraphs: [
        'Most of the work since has been changing my mind, one commit at a time:',
      ],
      list: [
        'The colour system was reorganised three times: functional names, then HSL with a dark theme, then a numbered scale.',
        'Tailwind CSS moved to version 4, with the design tokens defined in CSS.',
        'A Skills section arrived in November 2025 and was gone early in 2026.',
        'Experience went into an accordion, then back out, with every role open.',
        'The Learning Shelf grew into Margot’s Picks: more than a hundred books, courses and films, rated in Margots.',
        'An animation library came in for scroll and hover effects, and later made way for CSS and the browser’s Web Animations API.',
      ],
    },
    {
      id: 'today',
      when: 'Today',
      title: 'Measured, not assumed',
      paragraphs: [
        'The latest chapter is about checking the work rather than trusting it. Contrast and focus are measured on the rendered pixels in a real browser, in both themes and on mobile, because automated checks in jsdom never see colour at all. Every page is prerendered to HTML and hydrated without mismatches, and a first visit downloads a third less JavaScript than before.',
      ],
      stats: [
        {
          value: '100 kB',
          label: 'of JavaScript on a first visit, gzipped (was 163)',
        },
        { value: '97+', label: 'Lighthouse performance on mobile' },
        { value: '5.5:1', label: 'focus ring contrast (was 2.1:1)' },
        { value: '0', label: 'requests to third-party servers' },
      ],
      screenshot: {
        src: shot2026,
        when: 'November 2026',
        alt: 'Today: my name and title centred above buttons for projects, the CV and email, with the About section below.',
      },
    },
  ],
  details: {
    title: 'The small things',
    items: [
      'The Learning Shelf cards are cut like cinema tickets with a CSS mask, and the notches move when the card changes layout.',
      'Ratings are counted in Margots: an “M” with her paw on it, and sparkles for a perfect five.',
      'Where the browser supports it, the ticket corners use corner-shape: squircle.',
      'Every animation respects reduced motion, from the scroll reveals to the fun fact cards.',
    ],
  },
};
