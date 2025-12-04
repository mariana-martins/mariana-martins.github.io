import ProfileImage from "@components/ProfileImage/ProfileImage";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { ThemeProvider } from "@/contexts/ThemeContext";

describe("ProfileImage", () => {
  it("renders figure element", () => {
    render(
      <ThemeProvider>
        <ProfileImage />
      </ThemeProvider>,
    );

    const figure = screen.getByRole("figure");
    expect(figure).toBeInTheDocument();
  });

  it("renders image with alt text", () => {
    render(
      <ThemeProvider>
        <ProfileImage />
      </ThemeProvider>,
    );

    const image = screen.getByAltText("Me and my dog, Margot");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });

  it("renders image with correct source", () => {
    render(
      <ThemeProvider>
        <ProfileImage />
      </ThemeProvider>,
    );

    const image = screen.getByAltText("Me and my dog, Margot");
    expect(image).toHaveAttribute("src");
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <ThemeProvider>
        <ProfileImage />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
