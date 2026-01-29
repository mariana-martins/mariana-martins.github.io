import Projects from "@components/Projects/Projects";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

// Mock the data module
jest.mock("@/data", () => {
  const { mockPortfolioData } = require("@/__mocks__/mockData");
  return {
    data: mockPortfolioData,
  };
});

describe("Projects", () => {
  it("renders section heading", () => {
    render(<Projects />);

    expect(screen.getByText("Crafted with Care")).toBeInTheDocument();
  });

  it("renders all projects", () => {
    render(<Projects />);

    expect(screen.getByText("Contact App")).toBeInTheDocument();
    expect(screen.getByText("Husky Rescue Org. Website")).toBeInTheDocument();
  });

  it("renders featured project description", () => {
    render(<Projects />);

    // Only the featured (first) project shows its description
    expect(
      screen.getByText("A single-page contact list application."),
    ).toBeInTheDocument();
  });

  it("renders project links with correct hrefs", () => {
    render(<Projects />);

    const contactAppLink = screen.getByRole("link", {
      name: /View Contact App project on GitHub/i,
    });
    expect(contactAppLink).toHaveAttribute(
      "href",
      "https://github.com/mariana-martins/contact-app",
    );

    const huskyRescueLink = screen.getByRole("link", {
      name: /View Husky Rescue Org. Website project on GitHub/i,
    });
    expect(huskyRescueLink).toHaveAttribute(
      "href",
      "https://github.com/mariana-martins/husky-rescue",
    );
  });

  it("renders project links with target and rel attributes", () => {
    render(<Projects />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      if (link.getAttribute("href")?.startsWith("https://github.com")) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    });
  });

  it("renders project links with correct aria-labels", () => {
    render(<Projects />);

    expect(
      screen.getByRole("link", { name: /View Contact App project on GitHub/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /View Husky Rescue Org. Website project on GitHub/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders technologies/Tags for each project", () => {
    render(<Projects />);

    // Use getAllByText since React appears multiple times
    const reactTags = screen.getAllByText("React");
    expect(reactTags.length).toBeGreaterThan(0);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Bootstrap 4")).toBeInTheDocument();
    expect(screen.getByText("Sass")).toBeInTheDocument();
  });

  it("has correct aria-labelledby attribute", () => {
    render(<Projects />);

    const section = screen.getByRole("region", { name: "Crafted with Care" });
    expect(section).toHaveAttribute("aria-labelledby", "projects-heading");
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Projects />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
