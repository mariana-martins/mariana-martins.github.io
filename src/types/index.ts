export interface Project {
  id: string;
  title: string;
  description: string;
  summary?: string;
  technologies: string[];
  githubUrl?: string;
  storybookUrl?: string;
  caseStudyPath?: string;
}

export interface Experience {
  id: string;
  company?: string;
  website?: string;
  position: string;
  startDate: string;
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
  /** Closing line of the home page, above the contact links */
  invitation: string;
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
  rating?: PickRating;
  finishedAt?: string;
  note?: string;
  link?: string;
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

export interface Profile {
  title: string;
  pitch: string;
  facts: string[];
}

export interface PortfolioData {
  profile: Profile;
  introduction: string;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  contact: Contact;
  funFacts: FunFact[];
  picks: PickItem[];
}
export interface Section {
  id: string;
  label: string;
}

export type CodeLine = Array<[text: string, color: string]>;

export interface Stat {
  value: string;
  label: string;
}

export interface FigureImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type Paragraph = string;

export interface Era {
  id: string;
  when: string;
  title: string;
  paragraphs: Paragraph[];
  list?: string[];
  stats?: Stat[];
  screenshot?: { src: string; alt: string; when: string };
}

export interface SiteHistory {
  eyebrow: string;
  title: string;
  lead: string;
  eras: Era[];
  details: { title: string; items: string[] };
  repoUrl: string;
}

export interface TokenStep {
  tier: string;
  token: string;
}

export interface RenderingMode {
  page: string;
  how: string;
}

export type GuardrailId = 'tiers' | 'contrast' | 'tokens' | 'axe';

export interface Guardrail {
  id: GuardrailId;
  rule: string;
  check: Paragraph;
}

export interface CaseStudySection {
  id: string;
  title: string;
  paragraphs: Paragraph[];
}

export interface FitMySpaceCaseStudy {
  eyebrow: string;
  title: string;
  lead: string;
  status: { label: string; text: string };
  role: string;
  builtWith: string;
  /** ISO date, e.g. 2026-11-11 */
  updated: string;
  githubUrl: string;
  storybookUrl: string;
  figmaUrl: string;
  tokens: CaseStudySection & {
    steps: TokenStep[];
    flowCaption: Paragraph;
    palette: { caption: string; image: FigureImage };
  };
  types: CaseStudySection & {
    codeCaption: string;
    states: { caption: string; images: FigureImage[] };
    field: { paragraphs: Paragraph[]; caption: string; image: FigureImage };
  };
  guardrails: CaseStudySection & { checks: Guardrail[] };
  rendering: CaseStudySection & { modes: RenderingMode[] };
  quality: CaseStudySection & { stats: Stat[] };
}

export interface NotFoundContent {
  eyebrow: string;
  title: string;
  lead: string;
}
