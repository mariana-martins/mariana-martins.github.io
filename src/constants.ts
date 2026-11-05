import type { Section } from '@/types';

export const SECTIONS: Record<string, Section> = {
  // In page order: the skip navigation lists them as they appear
  about: { id: 'about-me-heading', label: 'A Little Bit of Everything' },
  projects: { id: 'projects-heading', label: 'Crafted with Care' },
  experience: { id: 'experience-heading', label: 'Past Chapters' },
  funFacts: { id: 'fun-facts-heading', label: 'A Bit of Trivia' },
  learningShelf: { id: 'learning-shelf-heading', label: 'The Learning Shelf' },
  contact: { id: 'contact-heading', label: 'Let’s talk' },
};

/** The skip link's target on every page */
export const MAIN_CONTENT_ID = 'main-content';

export const LEARNING_SHELF_LIMIT = 5;

export const MARGOTS_PICKS = {
  label: "Margot's Picks",
  hash: '#shelf',
  triggerId: 'margots-picks-trigger',
  pageSize: 24,
} as const;

export const CV = {
  href: '/Mariana-Martins-Menezes-CV.pdf',
  fileName: 'Mariana-Martins-Menezes-CV.pdf',
} as const;

export const PATHS = {
  home: '/',
  fitMySpace: '/projects/fit-my-space/',
  siteBuild: '/how-this-site-was-built/',
} as const;

export const PROJECTS_CRUMB = {
  label: 'Projects',
  href: `${PATHS.home}#${SECTIONS.projects.id}`,
};
