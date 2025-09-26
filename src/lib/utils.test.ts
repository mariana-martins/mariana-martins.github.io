import { describe, expect, it } from "@jest/globals";

import { cn } from "./utils";

describe("cn utility function", () => {
  it("merges class names correctly", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  it("handles conditional classes", () => {
    const result = cn("base", "conditional");
    expect(result).toBe("base conditional");
  });

  it("handles object syntax", () => {
    const result = cn({
      class1: true,
      class2: false,
      class3: true,
    });
    expect(result).toBe("class1 class3");
  });

  it("handles mixed input types", () => {
    const result = cn(
      "base",
      {
        conditional: true,
        hidden: false,
      },
      "additional",
    );
    expect(result).toBe("base conditional additional");
  });

  it("handles empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("handles undefined and null values", () => {
    const result = cn("base", undefined, null, "end");
    expect(result).toBe("base end");
  });

  it("merges Tailwind classes correctly", () => {
    const result = cn("px-4 py-2", "bg-blue-500", "text-white");
    expect(result).toBe("px-4 py-2 bg-blue-500 text-white");
  });

  it("handles conflicting Tailwind classes", () => {
    // This tests that tailwind-merge is working
    const result = cn("px-4", "px-6");
    expect(result).toBe("px-6"); // Last one should win
  });
});
