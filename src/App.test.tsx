import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  it("renders welcome message", () => {
    render(<App />);

    expect(
      screen.getByText("Welcome to Mariana Martins Portfolio"),
    ).toBeInTheDocument();
  });

  it("renders count button", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: /count is 0/i }),
    ).toBeInTheDocument();
  });

  it("increments count when button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });

    await user.click(button);

    expect(
      screen.getByRole("button", { name: /count is 1/i }),
    ).toBeInTheDocument();
  });

  it("increments count multiple times", async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });

    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(
      screen.getByRole("button", { name: /count is 3/i }),
    ).toBeInTheDocument();
  });

  it("has proper styling classes", () => {
    render(<App />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-primary",
      "text-primary-foreground",
      "px-4",
      "py-2",
      "rounded-md",
    );
  });

  it("has proper heading structure", () => {
    render(<App />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Welcome to Mariana Martins Portfolio");
    expect(heading).toHaveClass("text-4xl", "font-bold", "text-center", "mb-8");
  });
});
