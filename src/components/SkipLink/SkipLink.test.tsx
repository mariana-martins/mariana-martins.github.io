import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import SkipLink from "./SkipLink";

describe("SkipLink", () => {
  const mockScrollIntoView = jest.fn();
  const mockFocus = jest.fn();

  beforeEach(() => {
    // Mock scrollIntoView method
    HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

    // Mock focus method using Object.defineProperty since it's read-only
    Object.defineProperty(HTMLElement.prototype, "focus", {
      value: mockFocus,
      writable: true,
      configurable: true,
    });

    // Clear mocks before each test
    mockScrollIntoView.mockClear();
    mockFocus.mockClear();
  });

  afterEach(() => {
    // Clean up any elements created during tests
    const existingElement = document.getElementById("test-target");
    if (existingElement) {
      existingElement.remove();
    }
  });

  it("renders with default label", () => {
    // Create a target element
    const targetElement = document.createElement("h1");
    targetElement.id = "test-target";
    targetElement.textContent = "Test Target";
    document.body.appendChild(targetElement);

    render(<SkipLink targetId="test-target" />);

    const link = screen.getByRole("link", {
      name: /Skip to main content/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#test-target");
  });

  it("renders with custom label", () => {
    const targetElement = document.createElement("h1");
    targetElement.id = "custom-target";
    targetElement.textContent = "Custom Target";
    document.body.appendChild(targetElement);

    render(<SkipLink targetId="custom-target" label="Skip to content" />);

    const link = screen.getByRole("link", { name: /Skip to content/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#custom-target");
  });

  it("handles click event and focuses target element", async () => {
    const user = userEvent.setup();
    const targetElement = document.createElement("h1");
    targetElement.id = "click-target";
    targetElement.textContent = "Click Target";
    document.body.appendChild(targetElement);

    render(<SkipLink targetId="click-target" />);

    // Wait for useEffect to run
    await waitFor(() => {
      expect(document.querySelector("#click-target")).toBeInTheDocument();
    });

    // Clear any previous focus calls
    mockFocus.mockClear();

    const link = screen.getByRole("link");
    await user.click(link);

    // Focus should be called on the target element (not the link)
    expect(mockFocus).toHaveBeenCalled();
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("handles Enter key press", async () => {
    const targetElement = document.createElement("h1");
    targetElement.id = "enter-target";
    targetElement.textContent = "Enter Target";
    document.body.appendChild(targetElement);

    render(<SkipLink targetId="enter-target" />);

    // Wait for useEffect to run
    await waitFor(() => {
      expect(document.querySelector("#enter-target")).toBeInTheDocument();
    });

    const link = screen.getByRole("link");
    fireEvent.keyDown(link, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(mockFocus).toHaveBeenCalledTimes(1);
    });

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("handles Space key press", async () => {
    const targetElement = document.createElement("h1");
    targetElement.id = "space-target";
    targetElement.textContent = "Space Target";
    document.body.appendChild(targetElement);

    render(<SkipLink targetId="space-target" />);

    // Wait for useEffect to run
    await waitFor(() => {
      expect(document.querySelector("#space-target")).toBeInTheDocument();
    });

    const link = screen.getByRole("link");
    fireEvent.keyDown(link, { key: " ", code: "Space" });

    await waitFor(() => {
      expect(mockFocus).toHaveBeenCalledTimes(1);
    });

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("does not throw error when target element does not exist", async () => {
    const user = userEvent.setup();

    render(<SkipLink targetId="non-existent-target" />);

    // Wait for useEffect to run
    await new Promise((resolve) => setTimeout(resolve, 0));

    const link = screen.getByRole("link");

    // Should not throw error when clicking
    await expect(user.click(link)).resolves.not.toThrow();

    // The link itself may get focused, but the target element's focus/scroll should not be called
    // Since the target doesn't exist, only check that scrollIntoView wasn't called
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it("updates target element ref when targetId changes", () => {
    const targetElement1 = document.createElement("h1");
    targetElement1.id = "target-1";
    document.body.appendChild(targetElement1);

    const { rerender } = render(<SkipLink targetId="target-1" />);

    const targetElement2 = document.createElement("h1");
    targetElement2.id = "target-2";
    document.body.appendChild(targetElement2);

    rerender(<SkipLink targetId="target-2" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#target-2");
  });

  it("has correct className for accessibility", () => {
    const targetElement = document.createElement("h1");
    targetElement.id = "class-target";
    document.body.appendChild(targetElement);

    render(<SkipLink targetId="class-target" />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("sr-only");
    expect(link).toHaveClass("focus:not-sr-only");
  });

  it("does not handle other key presses", async () => {
    const targetElement = document.createElement("h1");
    targetElement.id = "other-key-target";
    document.body.appendChild(targetElement);

    render(<SkipLink targetId="other-key-target" />);

    await waitFor(() => {
      expect(document.querySelector("#other-key-target")).toBeInTheDocument();
    });

    // Clear mocks
    mockFocus.mockClear();
    mockScrollIntoView.mockClear();

    const link = screen.getByRole("link");
    fireEvent.keyDown(link, { key: "Tab", code: "Tab" });

    // Should not call focus or scrollIntoView for other keys
    expect(mockFocus).not.toHaveBeenCalled();
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it("should have no accessibility violations", async () => {
    const targetElement = document.createElement("h1");
    targetElement.id = "a11y-target";
    document.body.appendChild(targetElement);

    const { container } = render(<SkipLink targetId="a11y-target" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
