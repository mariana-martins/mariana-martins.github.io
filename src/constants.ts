export interface Section {
  id: string;
  label: string;
}

export const SECTIONS: Record<string, Section> = {
  about: { id: 'about-me-heading', label: 'A Little Bit of Everything' },
  experience: { id: 'experience-heading', label: 'Past Chapters' },
  contact: { id: 'contact-info-heading', label: 'Say Hi!' },
  funFacts: { id: 'fun-facts-heading', label: 'A Bit of Trivia' },
  learningShelf: { id: 'learning-shelf-heading', label: 'The Learning Shelf' },
  projects: { id: 'projects-heading', label: 'Crafted with Care' },
};

export const LEARNING_SHELF_LIMIT = 5;

export const MARGOTS_PICKS = {
  label: "Margot's Picks",
  hash: '#shelf',
  /** Focus returns to this button when the drawer closes */
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
