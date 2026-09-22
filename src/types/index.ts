/**
 * Global type definitions for the portfolio project
 */

/**
 * Represents a portfolio project.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
}

/**
 * Represents a work experience entry.
 * Date strings are in "YYYY-MM" format.
 */
export interface Experience {
  id: string;
  company: string;
  website?: string;
  position: string;
  /** Start date in "YYYY-MM" format */
  startDate: string;
  /** End date in "YYYY-MM" format, undefined if current position */
  endDate?: string;
  /** Short summary of the role, 5-6 lines when rendered */
  description: string;
  technologies: string[];
}

/**
 * Represents a skill with proficiency level.
 */
export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

/**
 * Contact information for the portfolio.
 */
export interface Contact {
  name: string;
  email: string;
  linkedIn: string;
  github: string;
  address: string;
}

/**
 * Fun fact trivia item.
 */
export interface FunFact {
  id: string;
  question: string;
  fact: string;
}

export type PickStatus = 'planned' | 'in-progress' | 'completed';
export type PickRating = 1 | 2 | 3 | 4 | 5;

/**
 * Fields shared by every pick, regardless of category.
 */
interface PickBase {
  id: string;
  title: string;
  status: PickStatus;
  /** Only meaningful when status === 'completed' */
  rating?: PickRating;
  /** "YYYY-MM" when finished; drives the "recent first" sort */
  finishedAt?: string;
  /** One-liner opinion, shown in the drawer only */
  note?: string;
  link?: string;
  /** Shown on the main page's Learning Shelf, up to LEARNING_SHELF_LIMIT */
  featured?: boolean;
}

/**
 * A pick on Margot's shelf: books, audiobooks, courses, movies and series.
 * `category` discriminates which credit fields exist.
 */
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

/**
 * Complete portfolio data structure.
 */
export interface PortfolioData {
  introduction: string;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  contact: Contact;
  funFacts: FunFact[];
  picks: PickItem[];
}
