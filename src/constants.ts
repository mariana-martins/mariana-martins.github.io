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
