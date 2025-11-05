// Global type definitions for the portfolio project

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | undefined;
  description: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "frontend" | "backend" | "tools" | "design";
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Contact {
  name: string;
  email: string;
  linkedIn: string;
  github: string;
  address: string;
}

export interface PortfolioData {
  introduction: string;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  contact: Contact;
}
