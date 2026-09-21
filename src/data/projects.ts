import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'fit-my-space',
    title: 'Fit My Space',
    description:
      "Developed a sleek and intuitive single-page application that serves as a complete digital address book. The project focuses on a smooth user experience, allowing you to easily add new contacts, favorite the people you talk to most, and keep your entire list organized with full update and display capabilities. To support the project's long-term scalability, I am also engineering an ongoing, custom Core Design System built from the ground up. This system bridges design tokens via Style Dictionary with accessible primitives, ensuring WCAG compliance without compromising the product's clean aesthetics.",
    technologies: [
      'React',
      'Typescript',
      'Tailwind CSS',
      'Next.js',
      'TanStack Query',
      'Jest',
      'Vitest',
      'React Testing Library',
      'Atomic Design',
      'Axe',
      'Radix Primitives',
      'Style Dictionary',
      'Storybook',
    ],
    githubUrl: 'https://github.com/mariana-martins/FitMySpace',
  },
  {
    id: 'frontend-practice-abstract',
    title: 'Frontend Practice Abstract',
    description:
      "It is a fully responsive, pixel-perfect implementation of the original Abstract design. It features a clean, modular component architecture and a functional search interface, ensuring a seamless experience whether you're on a desktop or a mobile phone.",
    technologies: [
      'React',
      'Vite',
      'Styled Components',
      'Jest',
      'React Testing Library',
      'Axe',
      'Radix Primitives',
    ],
    githubUrl: 'https://github.com/mariana-martins/frontend-practice-abstract',
  },
  {
    id: 'contact-app',
    title: 'Contact App',
    description:
      'The goal here is to implement an App to lets a user play the Would You Rather? game. A question is displayed and a user needs answer it. It was developed using React, Redux and Material UI.',
    technologies: ['React', 'Javascript', 'React Router', 'Material UI'],
    githubUrl: 'https://github.com/mariana-martins/contact-app',
  },
];
