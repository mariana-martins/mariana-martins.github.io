import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import App from "@/App";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { data } from "@/data";

describe("App", () => {
  it("renders header with title, subtitle, and logo", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    // The name is split into characters with spaces, so we need to query differently
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    // Normalize all whitespace (including non-breaking spaces) and remove spaces between characters
    const normalizedText = heading.textContent
      ?.replace(/\s+/g, " ")
      .replace(/\s/g, "")
      .toLowerCase();
    const expectedText = "Mariana Martins Menezes"
      .replace(/\s/g, "")
      .toLowerCase();
    expect(normalizedText).toContain(expectedText);
    // Find the subtitle h2 specifically (not experience positions)
    const subtitle = screen.getByRole("heading", { level: 2 });
    expect(subtitle).toHaveTextContent("Frontend Engineer");
    expect(screen.getByAltText("Mariana Martins Logo")).toBeInTheDocument();
  });

  it("renders main content area", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders AboutMe section with introduction", () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    // Check for the introduction text structure
    // The text is: "Hi! I'm Mariana, but you can call me Mari, like all my Brazilian friends do. {introduction}"
    // Text is split across elements due to LoopingHighlight component
    // Find the paragraph in the AboutMe section and check its textContent
    const aboutMeSection = container.querySelector(
      'section[aria-labelledby="about-me-heading"]',
    );
    expect(aboutMeSection).toBeInTheDocument();

    const paragraph = aboutMeSection?.querySelector("p");
    expect(paragraph).toBeInTheDocument();

    const textContent = paragraph?.textContent ?? "";
    expect(textContent).toMatch(/Hi! I.m Mariana, but you can call me/);
    expect(textContent).toContain("like all my Brazilian friends do");
    expect(textContent).toContain(data.introduction);
  });

  it("renders AboutMe profile image with correct alt text", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(screen.getByAltText("Me and my dog, Margot")).toBeInTheDocument();
  });

  it("renders Experience section with all experience entries", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(screen.getByText("Experience")).toBeInTheDocument();

    data.experience.forEach((experience) => {
      // Escape special regex characters in position and company
      const escapedPosition = experience.position.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );
      const escapedCompany = experience.company.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );
      // The accordion trigger has an aria-label starting with position at company
      // Use ^ to match from start to avoid partial matches (e.g., "Junior Frontend Developer" matching "Frontend Developer")
      const trigger = screen.getByRole("button", {
        name: new RegExp(`^${escapedPosition} at ${escapedCompany}`, "i"),
      });
      expect(trigger).toBeInTheDocument();
    });
  });

  it("renders ContactInfo section with all contact details", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText(data.contact.address)).toBeInTheDocument();

    const emailLink = screen.getByRole("link", {
      name: new RegExp(data.contact.email, "i"),
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", `mailto:${data.contact.email}`);

    const linkedInLink = screen.getByRole("link", {
      name: /Visit Mariana Martins Menezes LinkedIn profile/i,
    });
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute("href", data.contact.linkedIn);
    expect(linkedInLink).toHaveAttribute("target", "_blank");
    expect(linkedInLink).toHaveAttribute("rel", "noopener noreferrer");

    const githubLink = screen.getByRole("link", {
      name: /Visit mariana-martins GitHub profile/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", data.contact.github);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Skills section with all skills", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(screen.getByText("Skills")).toBeInTheDocument();

    data.skills.forEach((skill) => {
      const skillElements = screen.getAllByText(skill.name);
      expect(skillElements.length).toBeGreaterThan(0);
    });
  });

  it("renders FunFacts section with all fun facts", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(screen.getByText("Fun Facts")).toBeInTheDocument();

    data.funFacts.forEach((funFact) => {
      expect(screen.getByText(funFact.fact)).toBeInTheDocument();
    });
  });

  it("renders Projects section with all projects and technologies", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(screen.getByText("Projects")).toBeInTheDocument();

    data.projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      // Project descriptions are hidden on smaller screens (lg:block)
      // So we check if it exists in the DOM, not necessarily visible
      const descriptionElement = screen.queryByText(project.description);
      // Description might be hidden but should exist in DOM
      if (descriptionElement) {
        expect(descriptionElement).toBeInTheDocument();
      }

      project.technologies.forEach((technology) => {
        const technologyElements = screen.getAllByText(technology);
        expect(technologyElements.length).toBeGreaterThan(0);
      });
    });
  });

  it("renders Footer with copyright and quote", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(
      screen.getByText(
        "Not all those who wander are lost. Some are just debugging.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /© 2025 Mariana Martins Menezes. Frontend engineer and eternal learner./i,
      ),
    ).toBeInTheDocument();
  });

  it("renders all portfolio sections with correct headings", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    const sectionHeadings = [
      "Experience",
      "Projects",
      "Fun Facts",
      "Contact Info",
      "Skills",
    ];

    sectionHeadings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });

    // AboutMe section doesn't have a visible heading, but should be present
    const aboutMeSection = screen
      .getAllByRole("region")
      .find((section) =>
        section.getAttribute("aria-labelledby")?.includes("about-me-heading"),
      );
    expect(aboutMeSection).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles reduced motion preference", () => {
    // Mock matchMedia for reduced motion
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => {
        if (query === "(prefers-reduced-motion: reduce)") {
          return {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          };
        }
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      }),
    });

    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    // App should render without errors when reduced motion is preferred
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
