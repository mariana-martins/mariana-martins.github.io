import AboutMe from "@components/AboutMe/AboutMe";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

// Mock the data module
jest.mock("@/data", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { mockPortfolioData } = require("@/__mocks__/mockData");
  return {
    data: mockPortfolioData,
  };
});

describe("AboutMe", () => {
  it("renders section with heading", () => {
    render(<AboutMe />);

    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("renders introduction text from data", () => {
    render(<AboutMe />);

    expect(
      screen.getByText(
        /Hello, I'm Mariana Martins Menezes, but you can call me Mari!/i,
      ),
    ).toBeInTheDocument();
  });

  it("has correct aria-labelledby attribute", () => {
    render(<AboutMe />);

    const section = screen.getByRole("region", { name: "About Me" });
    expect(section).toHaveAttribute("aria-labelledby", "about-me-heading");
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<AboutMe />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
