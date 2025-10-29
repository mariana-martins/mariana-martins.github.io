import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders welcome message", () => {
    render(<App />);

    expect(screen.getByText("Mariana Martins Menezes")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<App />);

    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
  });

  it("has proper heading structure", () => {
    render(<App />);

    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("Mariana Martins Menezes");
    expect(mainHeading).toHaveClass(
      "text-4xl",
      "font-bold",
      "font-heading",
      "tracking-[0.25rem]",
      "text-heading",
      "uppercase",
    );
  });

  it("has proper subheading structure", () => {
    render(<App />);

    const subHeading = screen.getByRole("heading", { level: 2 });
    expect(subHeading).toHaveTextContent("Frontend Engineer");
  });

  it("renders all portfolio sections", () => {
    render(<App />);

    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Fun Facts")).toBeInTheDocument();
    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(<App />);

    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("has proper layout structure", () => {
    render(<App />);

    const mainContainer = screen.getByRole("heading", {
      level: 1,
    }).parentElement?.parentElement?.parentElement?.parentElement;

    expect(mainContainer).toHaveClass(
      "min-h-screen",
      "grid",
      "grid-cols-2",
      "grid-rows-3",
      "gap-4",
      "px-16",
      "justify-items-center",
    );
  });

  it("renders header with proper structure", () => {
    render(<App />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("col-span-2");
    expect(header).toContainElement(screen.getByRole("heading", { level: 1 }));
    expect(header).toContainElement(screen.getByRole("heading", { level: 2 }));
  });

  it("renders main content area", () => {
    render(<App />);

    const main = screen.getByRole("main");
    expect(main).toHaveClass("col-span-2");
  });
});
