import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'fit-my-space',
    title: 'Fit My Space',
    description:
      'A search engine for home organisation products, inspired by The Home Edit: find organisers across stores like IKEA and Target, filtered by room and store, with the search state kept in the URL. Designed end to end, from problem framing and visual design in Penpot and Figma to a Next.js App Router build. Underneath sits its own design system: a three-tier token architecture (primitive, semantic, component) generated with Style Dictionary, and custom components on Radix Primitives documented in Storybook, with accessibility enforced by the types and tested with jest-axe.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'TanStack Query',
      'Zod',
      'Radix Primitives',
      'Style Dictionary',
      'Storybook',
      'Atomic Design',
      'Jest',
      'Vitest',
      'React Testing Library',
      'MSW',
      'Axe',
    ],
    githubUrl: 'https://github.com/mariana-martins/FitMySpace',
  },
  {
    id: 'frontend-practice-abstract',
    title: 'Frontend Practice Abstract',
    description:
      'A responsive, pixel-perfect recreation of the Abstract help centre design from Frontend Practice, with a modular component architecture and a working search interface with validation, from a five-column desktop layout down to a single-column mobile one.',
    technologies: [
      'React',
      'JavaScript',
      'Vite',
      'Styled Components',
      'Jest',
      'React Testing Library',
      'Radix Primitives',
    ],
    githubUrl: 'https://github.com/mariana-martins/frontend-practice-abstract',
  },
  {
    id: 'contact-app',
    title: 'Contact App',
    description:
      'An accessible address book: add and edit contacts with real-time validation, mark favourites and filter by them, and keep everything in local storage. The layout switches from a data table on larger screens to a card list on mobile, and destructive actions confirm through a Radix AlertDialog that restores focus afterwards.',
    technologies: [
      'React',
      'JavaScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Radix Primitives',
      'Vitest',
      'React Testing Library',
    ],
    githubUrl: 'https://github.com/mariana-martins/contact-app',
  },
];
