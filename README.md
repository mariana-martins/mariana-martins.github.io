# Mariana Martins - Portfolio

A modern, accessible portfolio website built with React, TypeScript, and Tailwind CSS.

🌐 **Live:** [mariana-martins.github.io](https://mariana-martins.github.io)

## ✨ Features

- **Responsive Design** - Fully responsive layout with mobile-first approach
- **Dark/Light Mode** - Theme toggle with persistent user preference
- **Accessibility First** - WCAG compliant with keyboard navigation, and Axe accessibility tests
- **Smooth Animations** - Motion effects with reduced motion support
- **Interactive Components** - FlipCard trivia, accordion sections, and more

## 🛠️ Tech Stack

| Category         | Technologies                    |
| ---------------- | ------------------------------- |
| **Frontend**     | React 19, TypeScript            |
| **Styling**      | Tailwind CSS 4, CSS Variables   |
| **Animations**   | Motion (Framer Motion)          |
| **Components**   | Radix UI (Accordion, Slot)      |
| **Icons**        | Lucide React                    |
| **Build**        | Vite 7                          |
| **Testing**      | Jest, Testing Library, jest-axe |
| **Code Quality** | ESLint, Prettier, Husky         |

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/mariana-martins/mariana-martins.github.io.git
cd mariana-martins.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command                 | Description               |
| ----------------------- | ------------------------- |
| `npm run dev`           | Start development server  |
| `npm run build`         | Build for production      |
| `npm run preview`       | Preview production build  |
| `npm test`              | Run tests                 |
| `npm run test:watch`    | Run tests in watch mode   |
| `npm run test:coverage` | Run tests with coverage   |
| `npm run lint`          | Run ESLint                |
| `npm run lint:fix`      | Fix ESLint issues         |
| `npm run format`        | Format code with Prettier |
| `npm run type-check`    | TypeScript type checking  |
| `npm run deploy`        | Deploy to GitHub Pages    |

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── AboutMe/      # About section
│   ├── Card/         # Reusable card component
│   ├── ContactInfo/  # Contact information
│   ├── Experience/   # Work experience accordion
│   ├── FlipCard/     # Interactive flip card
│   ├── FunFacts/     # Trivia game section
│   ├── Header/       # Header with animated name
│   ├── Projects/     # Projects grid
│   └── ...
├── hooks/            # Custom React hooks
├── contexts/         # React contexts (Theme)
├── styles/           # Global CSS and Tailwind config
├── types/            # TypeScript type definitions
├── data.ts           # Portfolio content data
└── App.tsx           # Main application
```

## 🎨 Design System

The project uses a custom design system with:

- **Colors**: Warm tones, blue/indigo scale, accent colors
- **Typography**: Fredoka (headings), Inter (body)
- **Gradients**: Custom radial gradients for light/dark themes
- **Animations**: Spring-based transitions with reduced motion support

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run accessibility tests (included in test suite)
npm test
```

Tests include:

- Unit tests for components and hooks
- Accessibility tests with jest-axe
- User interaction tests with Testing Library

## 📝 License

ISC © Mariana Martins
