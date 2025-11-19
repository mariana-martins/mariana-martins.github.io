import Experience from "@components/Experience/Experience";
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

describe("Experience", () => {
  it("renders experience section with title", () => {
    render(<Experience />);

    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders experience entries with end date", () => {
    render(<Experience />);

    expect(
      screen.getByText("Test Position at Test Company"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Test description with end date/),
    ).toBeInTheDocument();
  });

  it("renders 'Present' when endDate is undefined", () => {
    render(<Experience />);

    expect(
      screen.getByText("Current Position at Current Company"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Present/)).toBeInTheDocument();
    expect(
      screen.getByText(/Test description without end date/),
    ).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Experience />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
