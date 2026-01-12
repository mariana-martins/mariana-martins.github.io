import type {
  Contact,
  Experience,
  FunFact,
  PortfolioData,
  Project,
  Skill,
} from "@/types";

/**
 * Mock introduction text for testing
 */
export const mockIntroduction = [
  "Hello, I'm Mariana Martins Menezes, but you can call me Mari! I'm a Frontend Engineer with a passion for building user-friendly and efficient web applications.",
];

/**
 * Mock contact information for testing
 */
export const mockContact: Contact = {
  address: "Melbourne, Australia",
  email: "mariana@example.com",
  linkedIn: "https://linkedin.com/in/mariana-martins",
  github: "https://github.com/mariana-martins",
  name: "Mariana Martins Menezes",
};

/**
 * Mock experience array for testing
 */
export const mockExperience: Experience[] = [
  {
    id: "test-1",
    company: "Test Company",
    position: "Test Position",
    startDate: "2020-01",
    endDate: "2021-12",
    description: "Test description with end date",
    technologies: ["React", "TypeScript"],
  },
  {
    id: "test-2",
    company: "Current Company",
    position: "Current Position",
    startDate: "2022-01",
    endDate: undefined,
    description: "Test description without end date",
    technologies: ["React"],
  },
];

/**
 * Mock projects array for testing
 */
export const mockProjects: Project[] = [
  {
    id: "project-1",
    title: "Contact App",
    description: "A single-page contact list application.",
    image: "/images/contact-app.png",
    technologies: ["React", "JavaScript"],
    githubUrl: "https://github.com/mariana-martins/contact-app",
  },
  {
    id: "project-2",
    title: "Husky Rescue Org. Website",
    description: "A SPA using React, Bootstrap 4, Sass and Webpack.",
    image: "/images/husky-rescue.png",
    technologies: ["React", "Bootstrap 4", "Sass"],
    githubUrl: "https://github.com/mariana-martins/husky-rescue",
  },
];

/**
 * Mock skills array for testing
 */
export const mockSkills: Skill[] = [
  {
    name: "JavaScript",
    level: "expert",
    category: "frontend",
  },
  {
    name: "Python",
    level: "intermediate",
    category: "backend",
  },
  {
    name: "React",
    level: "expert",
    category: "frontend",
  },
  {
    name: "Git",
    level: "advanced",
    category: "tools",
  },
  {
    name: "Figma",
    level: "advanced",
    category: "design",
  },
];

/**
 * Mock fun facts array for testing
 */
export const mockFunFacts: FunFact[] = [
  {
    id: "fact-1",
    fact: "I love dogs and have a husky named Margot.",
  },
  {
    id: "fact-2",
    fact: "I enjoy reading science fiction novels in my free time.",
  },
  {
    id: "fact-3",
    fact: "I'm passionate about accessibility in web development.",
  },
];

/**
 * Complete mock portfolio data for testing
 */
export const mockPortfolioData: PortfolioData = {
  introduction: mockIntroduction,
  contact: mockContact,
  experience: mockExperience,
  projects: mockProjects,
  skills: mockSkills,
  funFacts: mockFunFacts,
};

/**
 * Helper function to create mock data with optional overrides
 * @param overrides - Partial portfolio data to override default values
 * @returns Complete PortfolioData object with defaults merged with overrides
 * @example
 * ```ts
 * // Use default mock data
 * const data = createMockData();
 *
 * // Override only introduction
 * const data = createMockData({ introduction: "Custom intro" });
 *
 * // Override multiple fields
 * const data = createMockData({
 *   introduction: "Custom intro",
 *   contact: { ...mockContact, email: "custom@example.com" }
 * });
 * ```
 */
export function createMockData(
  overrides?: Partial<PortfolioData>,
): PortfolioData {
  return {
    ...mockPortfolioData,
    ...overrides,
    // Deep merge for nested objects
    contact: overrides?.contact
      ? { ...mockContact, ...overrides.contact }
      : mockContact,
    experience: overrides?.experience ?? mockExperience,
    projects: overrides?.projects ?? mockProjects,
    skills: overrides?.skills ?? mockSkills,
    funFacts: overrides?.funFacts ?? mockFunFacts,
  };
}
