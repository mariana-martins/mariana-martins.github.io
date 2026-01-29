import type { PortfolioData } from "@/types";

export const data: PortfolioData = {
  introduction:
    "I’m a Frontend Engineer who recently moved to Melbourne and is currently on a very serious quest for the city’s best tiramisu, usually accompanied by my dog Margot, a Japanese Spitz with a lot of personality. My background in History trained me to research, question, and organize chaos, and now I use those same skills in frontend engineering, turning “what on earth is going on here?” into “oh, this makes sense.” If you want to talk about frontend techniques, tiramisu, or the best dog-friendly coffee spots in Melbourne, 🩷 I’d love to connect!",
  projects: [
    {
      id: "fit-my-space",
      title: "Fit My Space",
      description:
        "Developed a sleek and intuitive single-page application that serves as a complete digital address book. The project focuses on a smooth user experience, allowing you to easily add new contacts, favorite the people you talk to most, and keep your entire list organized with full update and display capabilities.",
      technologies: [
        "React",
        "Typescript",
        "Tailwind CSS",
        "Next.js",
        "React Query",
        "Jest",
        "React Testing Library",
        "Atomic Design",
        "Axe",
        "Radix Primitives",
      ],
      githubUrl: "https://github.com/mariana-martins/FitMySpace",
    },
    {
      id: "frontend-practice-abstract",
      title: "Frontend Practice Abstract",
      description:
        "It is a fully responsive, pixel-perfect implementation of the original Abstract design. It features a clean, modular component architecture and a functional search interface, ensuring a seamless experience whether you're on a desktop or a mobile phone.",
      technologies: [
        "React",
        "Vite",
        "Styled Components",
        "Jest",
        "React Testing Library",
        "Axe",
        "Radix Primitives",
      ],
      githubUrl:
        "https://github.com/mariana-martins/frontend-practice-abstract",
    },
    {
      id: "contact-app",
      title: "Contact App",
      description:
        "The goal here is to implement an App to lets a user play the Would You Rather? game. A question is displayed and a user needs answer it. It was developed using React, Redux and Material UI.",
      technologies: ["React", "Javascript", "React Router", "Material UI"],
      githubUrl: "https://github.com/mariana-martins/contact-app",
    },
  ],
  experience: [
    {
      id: "health-and-well-being-career-break",
      company: "Career Break",
      position: "Health and well-being",
      startDate: "2024-04",
      endDate: undefined, // ongoing
      description: [
        "Took time away from full-time work for health recovery while maintaining active technical development through structured study and hands-on projects in modern frontend technologies.",
        "Built and maintained personal projects to apply updated patterns, tooling, and frontend architecture practices, keeping production-level engineering skills current.",
      ],
      technologies: [
        "React",
        "React Query",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
        "Vite",
        "Next.js",
        "Atomic Design",
      ],
    },
    {
      id: "remote-frontend-engineer",
      company: "Remote",
      website: "https://remote.com",
      position: "Frontend Engineer",
      startDate: "2021-07",
      endDate: "2024-04", // ongoing
      description: [
        "Developed and implemented essential onboarding features utilizing React, React Query, and Styled Components within a large, global, remote-first, and asynchronous platform.",
        "Core contributor to the Accessibility (A11y) team, auditing and improving components across the platform to meet WCAG standards and improve inclusive UX.",
        "Modernized legacy form infrastructure by migrating from hard-coded flows to a scalable JSON-driven architecture, improving delivery speed and maintainability.",
        "Contributed to the company Design System using Storybook, improving UI consistency, component reuse, and cross-team development velocity.",
      ],
      technologies: [
        "React",
        "React Query",
        "Storybook",
        "Cypress",
        "Styled Components",
        "Jest",
        "React Testing Library",
      ],
    },
    {
      id: "phocas-software-developer",
      company: "Phocas",
      website: "https://www.phocassoftware.com/",
      position: "Frontend Developer",
      startDate: "2021-01",
      endDate: "2021-06",
      description: [
        "Promoted to Frontend Developer within 10 months due to high performance and significant contributions to the core product UI.",
        "Spearheaded the UI architecture for a new grid layout within the flagship Finance product, collaborating deeply with the design team to ensure high performance and usability.",
        "Pioneered the initial architecture and development of a new company-wide Design System using Figma and Storybook, establishing the foundation for UI consistency across multiple products.",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Mobx",
        "Material UI",
        "Jest",
        "React Testing Library",
        "Figma",
      ],
    },
    {
      id: "phocas-junior-software-developer",
      company: "Phocas",
      website: "https://www.phocassoftware.com/",
      position: "Junior Frontend Developer",
      startDate: "2020-03",
      endDate: "2021-01",
      description: [
        "Built and maintained responsive UI components using React, TypeScript, and Material UI, with a strong focus on clean code, usability, and design consistency.",
        "Strengthened the team’s testing culture by writing comprehensive unit and integration tests with Jest and React Testing Library, contributing to a noticeable reduction in production issues.",
        "Worked with complex state management using Redux and MobX, developing a strong understanding of frontend architecture, data flow, and application scalability.",
      ],
      technologies: [
        "React",
        "Redux",
        "Mobx",
        "TypeScript",
        "Material UI",
        "Jest",
        "React Testing Library",
        "Figma",
      ],
    },
    {
      id: "kathmandu-junior-frontend",
      company: "Kathmandu",
      website: "https://www.kathmandu.co.nz/",
      position: "Junior Frontend Developer",
      startDate: "2018-10",
      endDate: "2020-03",
      description: [
        "Engineered high-performance e-commerce interfaces for a leading AU/UK/NZ retail platform (Magento 2), focusing on enhancing the customer journey and driving conversion rates.",
        "Developed responsive front-end components using HTML5, CSS3, and JavaScript (jQuery), ensuring 100% cross-browser compatibility and mobile-first performance.",
        "Collaborated with cross-functional teams to implement UI enhancements that directly improved site speed and Core Web Vitals.",
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "jQuery",
        "Figma",
        "Magento 2",
        "Google Tag Manager",
      ],
    },
  ],
  skills: [
    {
      name: "HTML5",
      level: "expert",
      category: "frontend",
    },
    {
      name: "CSS3",
      level: "expert",
      category: "frontend",
    },
    {
      name: "JavaScript",
      level: "expert",
      category: "frontend",
    },
    {
      name: "React",
      level: "expert",
      category: "frontend",
    },
    {
      name: "TypeScript",
      level: "intermediate",
      category: "frontend",
    },
    {
      name: "Redux",
      level: "intermediate",
      category: "frontend",
    },
    {
      name: "Sass",
      level: "intermediate",
      category: "frontend",
    },
    {
      name: "Bootstrap",
      level: "intermediate",
      category: "frontend",
    },
    {
      name: "Material UI",
      level: "advanced",
      category: "frontend",
    },
    {
      name: "Styled Components",
      level: "advanced",
      category: "frontend",
    },
    {
      name: "jQuery",
      level: "intermediate",
      category: "frontend",
    },
    {
      name: "Mobx",
      level: "intermediate",
      category: "frontend",
    },
    {
      name: "React Query",
      level: "intermediate",
      category: "frontend",
    },
    {
      name: "Jest",
      level: "intermediate",
      category: "tools",
    },
    {
      name: "React Testing Library",
      level: "intermediate",
      category: "tools",
    },
    {
      name: "Enzyme",
      level: "beginner",
      category: "tools",
    },
    {
      name: "Webpack",
      level: "beginner",
      category: "tools",
    },
    {
      name: "Figma",
      level: "intermediate",
      category: "design",
    },
    {
      name: "Adobe Photoshop",
      level: "beginner",
      category: "design",
    },
    {
      name: "Storybook",
      level: "intermediate",
      category: "tools",
    },
    {
      name: "Tailwind CSS",
      level: "beginner",
      category: "frontend",
    },
    {
      name: "Motion",
      level: "beginner",
      category: "frontend",
    },
    {
      name: "Vite",
      level: "beginner",
      category: "tools",
    },
    {
      name: "Next.js",
      level: "intermediate",
      category: "frontend",
    },
    {
      name: "Atomic Design",
      level: "intermediate",
      category: "design",
    },
    {
      name: "Radix Primitives",
      level: "beginner",
      category: "frontend",
    },
    {
      name: "Axe",
      level: "beginner",
      category: "tools",
    },
    {
      name: "React Router",
      level: "beginner",
      category: "frontend",
    },
  ],
  funFacts: [
    {
      id: "fun-fact-1",
      question: 'How many countries have I called "home" so far?',
      fact: "Three! Brazil, New Zealand, and now Australia. I’m basically collecting countries like side quests and XP.",
    },
    {
      id: "fun-fact-2",
      question: "What is my quirky collection hobby?",
      fact: "Gel pens! I have one for every mood, occasion, and minor life crisis. Digital code is great, but physical ink is a vibe.",
    },
    {
      id: "fun-fact-3",
      question:
        'What is my favorite way to "build" things when I’m away from a computer screen?',
      fact: "My shelves are home to a wild mix including the Simpsons House, the Yellow Submarine, and Rivendell. Up next? Conquering Sauron’s Tower and Bag End brick by brick.",
    },
    {
      id: "fun-fact-4",
      question:
        'Which movie franchise have I watched an "unreasonable" number of times?',
      fact: "The Lord of the Rings! (Extended editions only, obviously). I can navigate the path to Mount Doom better than a GPS.",
    },
    {
      id: "fun-fact-5",
      question: "What book changed my perspective on life?",
      fact: "Which book serves as my personal manual for living authentically?",
    },
    {
      id: "fun-fact-6",
      question: "How do I stay grounded between intense coding sessions?",
      fact: 'Tai Chi! It’s my favorite way to slow down and find my "zen" when life gets a little too fast.',
    },
  ],
  contact: {
    name: "Mariana Martins Menezes",
    email: "marianamartinsmenezes@gmail.com",
    linkedIn: "https://www.linkedin.com/in/marianamenezes/",
    github: "https://github.com/mariana-martins", // TODO: Verify GitHub URL
    address: "Melbourne, Australia",
  },
};
