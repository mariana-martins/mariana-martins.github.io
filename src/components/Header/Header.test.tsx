import Header from "@components/Header/Header";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

describe("Header", () => {
  it("renders header element", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders logo image with alt text", () => {
    render(<Header />);

    const logo = screen.getByAltText("Mariana Martins Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src");
  });

  it("renders name heading", () => {
    render(<Header />);

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
  });

  it("renders title subtitle", () => {
    render(<Header />);

    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
