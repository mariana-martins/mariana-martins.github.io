import React from "react";

import { describe, expect, it } from "@jest/globals";
import { render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { useTheme } from "@/hooks/useTheme";

describe("useTheme", () => {
  it("returns theme and toggleTheme function", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current).toHaveProperty("theme");
    expect(result.current).toHaveProperty("toggleTheme");
    expect(typeof result.current.theme).toBe("string");
    expect(typeof result.current.toggleTheme).toBe("function");
  });

  it("toggles theme when toggleTheme is called", async () => {
    const user = userEvent.setup();
    function TestComponent(): React.JSX.Element {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <span data-testid="theme">{theme}</span>
          <button onClick={toggleTheme}>Toggle</button>
        </div>
      );
    }

    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const initialTheme = getByTestId("theme").textContent;
    const toggleButton = getByText("Toggle");

    await user.click(toggleButton);

    const newTheme = getByTestId("theme").textContent;
    expect(newTheme).not.toBe(initialTheme);
  });

  it("throws error when used outside ThemeProvider", () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {
      // Intentionally empty to suppress console errors in test
    });

    function TestComponent(): React.JSX.Element {
      try {
        useTheme();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe(
          "useTheme must be used within a ThemeProvider",
        );
      }
      return <div>Test</div>;
    }

    render(<TestComponent />);
    consoleSpy.mockRestore();
  });
});
