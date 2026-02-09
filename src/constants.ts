export interface Section {
  id: string;
  label: string;
}

export const SECTIONS: Section[] = [
  { id: 'about-me-heading', label: 'A Little Bit of Everything' },
  { id: 'experience-heading', label: 'Past Chapters' },
  { id: 'contact-info-heading', label: 'Say Hi!' },
  { id: 'fun-facts-heading', label: 'A Bit of Trivia' },
  { id: 'learning-shelf-heading', label: 'The Learning Shelf' },
  { id: 'projects-heading', label: 'Crafted with Care' },
];
