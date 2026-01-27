import type { PortfolioData } from "@/types";

export const data: PortfolioData = {
  introduction:
    "I’m a Frontend Engineer who recently moved to Melbourne and is currently on a very serious quest for the city’s best tiramisu, usually accompanied by my dog Margot, a Japanese Spitz with a lot of personality. My background in History trained me to research, question, and organize chaos, and now I use those same skills in frontend engineering, turning “what on earth is going on here?” into “oh, this makes sense.” I believe the best products are built with empathy, curiosity, and a healthy obsession with details. If you want to talk about frontend techniques, tiramisu, or the best dog-friendly coffee spots in Melbourne, 🩷 I’d love to connect!",
  projects: [
    {
      id: "contact-app",
      title: "Contact App",
      description:
        "Developed a single-page application that is a Contact List. Main features are to add a new contact on the list, favorite a contact, display the contact list and update the contact information.",
      image: "/images/contact-app.png", // TODO: Add actual image path
      technologies: ["React", "JavaScript"],
      githubUrl: "https://github.com/mariana-martins",
    },
    {
      id: "husky-rescue",
      title: "Husky Rescue Org. Website",
      description:
        "It was SPA using React, Bootstrap 4, Sass and Webpack. I also developed the new website mockups using Photoshop. It was a proposing to replace the old Husky Rescue website.",
      image: "/images/husky-rescue.png", // TODO: Add actual image path
      technologies: ["React", "Bootstrap 4", "Sass", "Webpack", "Photoshop"],
      githubUrl: "https://github.com/mariana-martins",
    },
    {
      id: "would-you-rather",
      title: "Would You Rather?",
      description:
        "The goal here is to implement an App to lets a user play the Would You Rather? game. A question is displayed and a user needs answer it. It was developed using React, Redux and Material UI.",
      image: "/images/would-you-rather.png", // TODO: Add actual image path
      technologies: ["React", "Redux", "Material UI"],
      githubUrl: "https://github.com/mariana-martins",
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
        "Framer Motion",
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
      name: "Framer Motion",
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
      level: "beginner",
      category: "design",
    },
  ],
  funFacts: [
    {
      id: "fun-fact-1",
      fact: "🗺️ I’ve lived in three countries so far: Brazil, New Zealand, and Australia. I collect countries like side quests and XP.",
    },
    {
      id: "fun-fact-2",
      fact: "🖊️ I have a soft spot for collecting gel pens. At this point, I own a pen for every mood, occasion, and minor life crisis.",
    },
    {
      id: "fun-fact-3",
      fact: '👩‍🎓 I have a degree in History, which means I treat "legacy code" like an ancient archaeological site. I’ll carefully dust off the layers of the past before I start building the future!',
    },
    {
      id: "fun-fact-4",
      fact: "🎬 I’ve watched the Lord of the Rings extended editions so many times that I could probably navigate the path to Mount Doom better than a GPS.",
    },
    {
      id: "fun-fact-5",
      fact: '📚 My reading list is as diverse as a JavaScript library catalog. I’ll dip into almost anything, but my soul-book is Untamed. It taught me to be a "wild" engineer who isn’t afraid to question the status quo (or the legacy code).',
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
