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

/** How many picks the main page shows before pointing to the drawer */
export const LEARNING_SHELF_LIMIT = 5;

export const MARGOTS_PICKS = {
  label: "Margot's Picks",
  /** URL hash that opens the drawer, so it is linkable and survives reload */
  hash: '#shelf',
  /** How many picks the drawer reveals per "Show more" */
  pageSize: 24,
} as const;
