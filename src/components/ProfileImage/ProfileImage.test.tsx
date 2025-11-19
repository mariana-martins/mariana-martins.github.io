import ProfileImage from "@components/ProfileImage/ProfileImage";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

describe("ProfileImage", () => {
  it("renders figure element", () => {
    render(<ProfileImage />);

    const figure = screen.getByRole("figure");
    expect(figure).toBeInTheDocument();
  });

  it("renders image with alt text", () => {
    render(<ProfileImage />);

    const image = screen.getByAltText("Me and my dog, Margot");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });

  it("renders image with correct source", () => {
    render(<ProfileImage />);

    const image = screen.getByAltText("Me and my dog, Margot");
    expect(image).toHaveAttribute("src");
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<ProfileImage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
