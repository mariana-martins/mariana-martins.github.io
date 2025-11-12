import Experience from "@components/Experience/Experience";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

// Mock the data module
jest.mock("@/data", () => ({
  data: {
    experience: [
      {
        id: "test-1",
        company: "Test Company",
        position: "Test Position",
        startDate: "2020-01",
        endDate: "2021-12",
        description: "Test description with end date",
        technologies: ["React", "TypeScript"],
      },
      {
        id: "test-2",
        company: "Current Company",
        position: "Current Position",
        startDate: "2022-01",
        endDate: undefined,
        description: "Test description without end date",
        technologies: ["React"],
      },
    ],
  },
}));

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
});
