import FunFacts from "@components/FunFacts/FunFacts";
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

describe("FunFacts", () => {
  it("renders section heading", () => {
    render(<FunFacts />);

    expect(screen.getByText("Fun Facts")).toBeInTheDocument();
  });

  it("renders all fun facts from data", () => {
    render(<FunFacts />);

    expect(
      screen.getByText("I love dogs and have a husky named Margot."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I enjoy reading science fiction novels in my free time.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I'm passionate about accessibility in web development.",
      ),
    ).toBeInTheDocument();
  });

  it("renders facts in a list structure", () => {
    render(<FunFacts />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
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
