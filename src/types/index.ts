export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  website?: string;
  position: string;
  /** "YYYY-MM" */
  startDate: string;
  /** "YYYY-MM"; undefined for the current role */
  endDate?: string;
  description: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface Contact {
  name: string;
  email: string;
  linkedIn: string;
  github: string;
  address: string;
}

export interface FunFact {
  id: string;
  question: string;
  fact: string;
}

export type PickStatus = 'planned' | 'in-progress' | 'completed';
export type PickRating = 1 | 2 | 3 | 4 | 5;

interface PickBase {
  id: string;
  title: string;
  status: PickStatus;
  /** Only meaningful when status === 'completed' */
  rating?: PickRating;
  /** "YYYY-MM" when finished; drives the "recent first" sort */
  finishedAt?: string;
  note?: string;
  link?: string;
  /** Shown on the Learning Shelf, up to LEARNING_SHELF_LIMIT */
  featured?: boolean;
}

/** `category` decides which credit fields exist */
export type PickItem =
  | (PickBase & { category: 'book'; author: string })
  | (PickBase & { category: 'audiobook'; author: string })
  | (PickBase & { category: 'course'; author: string; platform?: string })
  | (PickBase & { category: 'movie'; director: string; year?: number })
  | (PickBase & { category: 'series'; creator: string; year?: number });

export type PickCategory = PickItem['category'];

/** The union member for one category, e.g. `PickOfCategory<'book'>` */
export type PickOfCategory<C extends PickCategory> = Extract<
  PickItem,
  { category: C }
>;

export interface PortfolioData {
  introduction: string;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  contact: Contact;
  funFacts: FunFact[];
  picks: PickItem[];
}
