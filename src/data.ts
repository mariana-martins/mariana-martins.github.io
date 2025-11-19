// Portfolio data template
// Update this file with your actual portfolio information
import type { PortfolioData } from "@/types";

export const data: PortfolioData = {
  introduction:
    "Hello, I'm Mariana Martins Menezes, but you can call me Mari! I'm a Frontend Engineer with a passion for building user-friendly and efficient web applications. I'm currently based in Melbourne, Australia, and I'm always looking for new challenges and opportunities to grow my skills.",
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
      id: "remote-frontend-engineer",
      company: "Remote",
      position: "Frontend Engineer",
      startDate: "2021-07",
      endDate: "2024-04", // ongoing
      description:
        "Working on the Onboarding team, focused on providing the best experience for new users on Remote. Our team is fully async and distributed across the world. A few highlights I contributed are: the rework of how Remote prices its customers, ensuring the process aligns with different countries' legislation, and refactoring code for better code practices and components reusability. I also support our design system, which is widely used on our systems.",
      technologies: [
        "React",
        "React Query",
        "Jest",
        "React Testing Library",
        "Styled Components",
      ],
    },
    {
      id: "phocas-software-developer",
      company: "Phocas",
      position: "Software Developer (Frontend Dev)",
      startDate: "2021-02",
      endDate: "2021-06",
      description:
        "Working on web development using jQuery, React, Typescript, Redux, Sass, Enzyme, and Bootstrap. I am designing the new grid layout for the main finance product in collaboration with the design team. I am also involved in creating a Design System using Figma and Storybook. I am following Scrum rules and working in a remote team across NZ, AUS, and the UK.",
      technologies: [
        "jQuery",
        "React",
        "TypeScript",
        "Redux",
        "Sass",
        "Enzyme",
        "Bootstrap",
        "Figma",
        "Storybook",
      ],
    },
    {
      id: "phocas-junior-software-developer",
      company: "Phocas",
      position: "Junior Software Developer (Frontend Dev)",
      startDate: "2020-03",
      endDate: "2021-01",
      description:
        "Worked on web development using React, Redux, Mobx, Typescript, Material UI, Jest and React Testing Library. Also, my responsibilities were to define and implement the layout for the project in collaboration with Phocas designers. We followed Scrumban rules and interacted with remote teams, including designers and other developers.",
      technologies: [
        "React",
        "Redux",
        "Mobx",
        "TypeScript",
        "Material UI",
        "Jest",
        "React Testing Library",
      ],
    },
    {
      id: "kathmandu-junior-frontend",
      company: "Kathmandu",
      position: "Junior Frontend Developer",
      startDate: "2018-10",
      endDate: "2020-03",
      description:
        "As a member of the Web Development team, my main role was to code highly efficient and scalable software to maintain, extend and enhance Kathmandu's eCommerce website. I worked on web development using HTML5, CSS3, Javascript, jQuery, Figma and Magento 2. I was also responsible for development code review of tags on Google Tag Manager.",
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
    {
      id: "chingu-frontend-developer",
      company: "Chingu Cohorts Journey",
      position: "Frontend Developer",
      startDate: "2017-12",
      endDate: "2018-01",
      description:
        "My main role was Frontend developer but also acted as Project Manager. As a Frontend Developer, I designed and implemented the Husky Rescue webpage. Its design was created using Adobe Photoshop. It was developed using React, Bootstrap 4, SASS and Webpack. On this project, I worked remotely with a mixed level team using tools like Slack, Trello and Github.",
      technologies: [
        "React",
        "Bootstrap 4",
        "SASS",
        "Webpack",
        "Adobe Photoshop",
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
      level: "advanced",
      category: "frontend",
    },
    {
      name: "Redux",
      level: "advanced",
      category: "frontend",
    },
    {
      name: "Gatsby",
      level: "beginner",
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
      name: "GraphQL",
      level: "beginner",
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
      name: "Magento 2",
      level: "beginner",
      category: "frontend",
    },
  ],
  funFacts: [
    {
      id: "fun-fact-1",
      fact: "🪻 I'm a big fan of the TV show The Office.",
    },
    {
      id: "fun-fact-2",
      fact: "🎮 I'm a big fan of the TV show The Office.",
    },
    {
      id: "fun-fact-3",
      fact: "🇧🇷 I'm a big fan of the TV show The Office.",
    },
    {
      id: "fun-fact-4",
      fact: "🍕 I'm a big fan of the TV show The Office.",
    },
    {
      id: "fun-fact-5",
      fact: "🎵 I'm a big fan of the TV show The Office.",
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
