import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import App from "@/App";
import { data } from "@/data";

describe("App", () => {
  it("renders header with title, subtitle, and logo", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Mariana Martins Menezes" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByAltText("Mariana Martins Logo")).toBeInTheDocument();
  });

  it("renders main content area", () => {
    render(<App />);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders AboutMe section with introduction", () => {
    render(<App />);

    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText(data.introduction)).toBeInTheDocument();
  });

  it("renders ProfileImage with correct alt text", () => {
    render(<App />);

    expect(screen.getByAltText("Me and my dog, Margot")).toBeInTheDocument();
  });

  it("renders Experience section with all experience entries", () => {
    render(<App />);

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
      // Use exact match pattern: position at start, then " at ", then company
      const headingPattern = new RegExp(
        `^${escapedPosition} at ${escapedCompany}$`,
        "i",
      );
      // Check that heading contains both position and company
      const headings = screen.getAllByRole("heading", { level: 4 });
      const matchingHeading = headings.find((heading) =>
        headingPattern.test(heading.textContent || ""),
      );
      expect(matchingHeading).toBeDefined();
      expect(screen.getByText(experience.description)).toBeInTheDocument();
    });
  });

  it("renders ContactInfo section with all contact details", () => {
    render(<App />);

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
    render(<App />);

    expect(screen.getByText("Skills")).toBeInTheDocument();

    data.skills.forEach((skill) => {
      const skillElements = screen.getAllByText(skill.name);
      expect(skillElements.length).toBeGreaterThan(0);
    });
  });

  it("renders FunFacts section with all fun facts", () => {
    render(<App />);

    expect(screen.getByText("Fun Facts")).toBeInTheDocument();

    data.funFacts.forEach((funFact) => {
      expect(screen.getByText(funFact.fact)).toBeInTheDocument();
    });
  });

  it("renders Projects section with all projects and technologies", () => {
    render(<App />);

    expect(screen.getByText("Projects")).toBeInTheDocument();

    data.projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();

      project.technologies.forEach((technology) => {
        const technologyElements = screen.getAllByText(technology);
        expect(technologyElements.length).toBeGreaterThan(0);
      });
    });
  });

  it("renders Footer with copyright and quote", () => {
    render(<App />);

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
    render(<App />);

    const sectionHeadings = [
      "About Me",
      "Experience",
      "Projects",
      "Fun Facts",
      "Contact Info",
      "Skills",
    ];

    sectionHeadings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
