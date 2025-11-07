import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders title and subtitle", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Mariana Martins Menezes" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
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

  it("renders main content area", () => {
    render(<App />);

    const main = screen.getByRole("main");
    expect(main).toHaveClass("col-span-2");
  });
});
