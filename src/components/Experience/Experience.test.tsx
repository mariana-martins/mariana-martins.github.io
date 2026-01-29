import Experience from "@components/Experience/Experience";
import { describe, expect, it } from "@jest/globals";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

// Mock the data module
jest.mock("@/data", () => {
  const { mockPortfolioData } = require("@/__mocks__/mockData");
  return {
    data: mockPortfolioData,
  };
});

describe("Experience", () => {
  it("renders experience section with title", () => {
    render(<Experience />);

    const heading = screen.getByText("Past Chapters");
    expect(heading).toBeInTheDocument();

    // The section should have proper aria-labelledby
    const section = heading.closest("section");
    expect(section).toHaveAttribute("aria-labelledby", "experience-heading");
  });

  it("renders experience entries with position and company", () => {
    render(<Experience />);

    // Check that position and company are rendered (they're separate elements now)
    expect(screen.getByText("Test Position")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
  });

  it("renders experience entries with end date", () => {
    render(<Experience />);

    // Check date range is displayed (abbreviated month format)
    expect(screen.getByText("Jan 2020 - Dec 2021")).toBeInTheDocument();

    // Description is visible in the first accordion (which is open by default)
    expect(
      screen.getByText("Test description with end date"),
    ).toBeInTheDocument();
  });

  it("renders 'Present' when endDate is undefined", () => {
    render(<Experience />);

    // Check position and company
    expect(screen.getByText("Current Position")).toBeInTheDocument();
    expect(screen.getByText("Current Company")).toBeInTheDocument();

    // Check date range shows "Present" (abbreviated month format)
    expect(screen.getByText("Jan 2022 - Present")).toBeInTheDocument();
  });

  it("renders technologies as tags", () => {
    render(<Experience />);

    // Technologies should be rendered in the first accordion (open by default)
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("has collapsible accordion functionality", async () => {
    const user = userEvent.setup();
    render(<Experience />);

    // Find the first accordion trigger (Test Position)
    const firstTrigger = screen.getByRole("button", {
      name: /Test Position at Test Company/,
    });

    // First accordion is open by default
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");

    // Click to close
    await user.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");

    // Click to open again
    await user.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Experience />);

    // Find the first accordion trigger
    const firstTrigger = screen.getByRole("button", {
      name: /Test Position at Test Company/,
    });

    // Tab to focus on the trigger
    await user.tab();
    expect(firstTrigger).toHaveFocus();

    // Press Enter to toggle
    await user.keyboard("{Enter}");
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");

    // Press Space to toggle back
    await user.keyboard(" ");
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
  });

  it("renders timeline visual elements", () => {
    const { container } = render(<Experience />);

    // Check for timeline line (aria-hidden)
    const timelineLine = container.querySelector(
      '[aria-hidden="true"].bg-pink\\/40',
    );
    expect(timelineLine).toBeInTheDocument();

    // Check for star icons
    const starIcons = container.querySelectorAll(".lucide-star");
    expect(starIcons.length).toBeGreaterThan(0);
  });

  it("renders technologies list with proper accessibility attributes", () => {
    render(<Experience />);

    // Check for technologies list with proper role
    const techList = screen.getByRole("list", { name: "Technologies used" });
    expect(techList).toBeInTheDocument();

    // Check for listitems
    const listItems = within(techList).getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Experience />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
