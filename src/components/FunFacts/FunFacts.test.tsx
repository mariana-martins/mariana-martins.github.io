import FunFacts from "@components/FunFacts/FunFacts";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

// Mock the data module
jest.mock("@/data", () => {
  const { mockPortfolioData } = require("@/__mocks__/mockData");
  return {
    data: mockPortfolioData,
  };
});

describe("FunFacts", () => {
  it("renders section heading", () => {
    render(<FunFacts />);

    expect(screen.getByText("Fun Facts")).toBeInTheDocument();
  });

  it("renders progress counter", () => {
    render(<FunFacts />);

    expect(screen.getByText(/0 of \d+ revealed/)).toBeInTheDocument();
  });

  it("renders first question card with click hint", () => {
    render(<FunFacts />);

    expect(screen.getByText("Click to reveal")).toBeInTheDocument();
  });

  it("flips card and reveals answer when clicked", async () => {
    const user = userEvent.setup();
    render(<FunFacts />);

    const card = screen.getByRole("button", {
      name: /Question:.*Click to reveal/i,
    });
    await user.click(card);

    // After flip, progress should update
    expect(screen.getByText(/1 of \d+ revealed/)).toBeInTheDocument();
  });

  it("shows next fact button after revealing answer", async () => {
    const user = userEvent.setup();
    render(<FunFacts />);

    const card = screen.getByRole("button", {
      name: /Question:.*Click to reveal/i,
    });
    await user.click(card);

    expect(
      screen.getByRole("button", { name: /See next fun fact/i }),
    ).toBeInTheDocument();
  });

  it("has correct aria-labelledby attribute", () => {
    render(<FunFacts />);

    const section = screen.getByRole("region", { name: "Fun Facts" });
    expect(section).toHaveAttribute("aria-labelledby", "fun-facts-heading");
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<FunFacts />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
