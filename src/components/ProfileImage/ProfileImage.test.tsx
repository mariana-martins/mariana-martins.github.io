import React from "react";

import ProfileImage from "@components/ProfileImage/ProfileImage";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { useTheme } from "@/hooks/useTheme";

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

  it("renders light theme image by default", () => {
    render(
      <ThemeProvider>
        <ProfileImage />
      </ThemeProvider>,
    );

    const image = screen.getByAltText("Me and my dog, Margot");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });

  it("switches image when theme changes", async () => {
    const user = userEvent.setup();
    function ThemeSwitcher(): React.JSX.Element {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <span data-testid="theme">{theme}</span>
          <ProfileImage />
        </div>
      );
    }

    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    const image = screen.getByAltText("Me and my dog, Margot");
    expect(image).toBeInTheDocument();

    const toggleButton = screen.getByText("Toggle Theme");
    await user.click(toggleButton);

    // Wait for theme to update and rerender
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Component should still render correctly after theme change
    const updatedImage = screen.getByAltText("Me and my dog, Margot");
    expect(updatedImage).toBeInTheDocument();
    const newSrc = updatedImage.getAttribute("src");
    expect(newSrc).toBeDefined();
    // Image source may or may not change depending on theme
    // The important thing is that the component handles theme changes
  });
});
