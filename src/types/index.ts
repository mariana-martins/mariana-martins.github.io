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
  description: string[];
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

/**
 * Learning shelf item (book or course).
 */
export interface LearningItem {
  id: string;
  title: string;
  author: string;
  category: 'book' | 'course';
  status: 'planned' | 'in-progress' | 'completed';
  link?: string;
}

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
  learningShelf: LearningItem[];
}
