import type {
  Contact,
  Experience,
  FunFact,
  PickItem,
  PortfolioData,
  Project,
  Skill,
} from '@/types';

export const mockIntroduction =
  "Hello, I'm Mariana Martins Menezes, but you can call me Mari! I'm a Frontend Engineer with a passion for building user-friendly and efficient web applications.";

export const mockContact: Contact = {
  address: 'Melbourne, Australia',
  email: 'mariana@example.com',
  linkedIn: 'https://linkedin.com/in/mariana-martins',
  github: 'https://github.com/mariana-martins',
  name: 'Mariana Martins Menezes',
  invitation: 'Email is the quickest way to reach me.',
};

export const mockExperience: Experience[] = [
  {
    id: 'test-1',
    company: 'Test Company',
    position: 'Test Position',
    startDate: '2020-01',
    endDate: '2021-12',
    description: 'Test description with end date',
    technologies: ['React', 'TypeScript'],
  },
  {
    id: 'test-2',
    company: 'Current Company',
    position: 'Current Position',
    startDate: '2022-01',
    endDate: undefined,
    description: 'Test description without end date',
    technologies: ['React'],
  },
];

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Contact App',
    description: 'A single-page contact list application.',
    technologies: ['React', 'JavaScript'],
    githubUrl: 'https://github.com/mariana-martins/contact-app',
  },
  {
    id: 'project-2',
    title: 'Husky Rescue Org. Website',
    description: 'A SPA using React, Bootstrap 4, Sass and Webpack.',
    technologies: ['React', 'Bootstrap 4', 'Sass'],
    githubUrl: 'https://github.com/mariana-martins/husky-rescue',
  },
];

export const mockSkills: Skill[] = [
  {
    name: 'JavaScript',
    level: 'expert',
    category: 'frontend',
  },
  {
    name: 'Python',
    level: 'intermediate',
    category: 'backend',
  },
  {
    name: 'React',
    level: 'expert',
    category: 'frontend',
  },
  {
    name: 'Git',
    level: 'advanced',
    category: 'tools',
  },
  {
    name: 'Figma',
    level: 'advanced',
    category: 'design',
  },
];

export const mockFunFacts: FunFact[] = [
  {
    id: 'fact-1',
    question: 'What pet do I have?',
    fact: 'I love dogs and have a husky named Margot.',
  },
  {
    id: 'fact-2',
    question: 'What do I enjoy in my free time?',
    fact: 'I enjoy reading science fiction novels in my free time.',
  },
  {
    id: 'fact-3',
    question: 'What am I passionate about?',
    fact: "I'm passionate about accessibility in web development.",
  },
];

export const mockPicks: PickItem[] = [
  {
    id: 'pick-book',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'book',
    status: 'completed',
    rating: 4,
    finishedAt: '2023-05',
    note: 'Still argue with chapter 3.',
  },
  {
    id: 'pick-course',
    title: 'React Testing Library',
    author: 'Kent C. Dodds',
    platform: 'Testing JavaScript',
    category: 'course',
    status: 'in-progress',
    link: 'https://testingjavascript.com',
  },
  {
    id: 'pick-movie',
    title: 'Arrival',
    director: 'Denis Villeneuve',
    year: 2016,
    category: 'movie',
    status: 'completed',
    rating: 5,
    finishedAt: '2024-01',
  },
  {
    id: 'pick-series',
    title: 'Severance',
    creator: 'Dan Erickson',
    year: 2022,
    category: 'series',
    status: 'planned',
  },
  {
    id: 'pick-audiobook',
    title: 'The Courage to Be Disliked',
    author: 'Ichiro Kishimi and Fumitake Koga',
    category: 'audiobook',
    status: 'in-progress',
    link: 'https://www.audible.com/pd/B07D5N3CV1',
  },
];

export const mockPortfolioData: PortfolioData = {
  profile: {
    title: 'Frontend & Design Engineer',
    pitch: 'I build accessible interfaces.',
    facts: ['Melbourne, Australia'],
  },
  introduction: mockIntroduction,
  contact: mockContact,
  experience: mockExperience,
  projects: mockProjects,
  skills: mockSkills,
  funFacts: mockFunFacts,
  picks: mockPicks,
};
