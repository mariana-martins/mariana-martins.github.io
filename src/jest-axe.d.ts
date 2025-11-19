declare module "jest-axe" {
  import type { AxeResults } from "axe-core";
  import type { ExpectExtendMap } from "@jest/expect";

  export function axe(
    element: Element | null,
    options?: Record<string, unknown>,
  ): Promise<AxeResults>;

  export const toHaveNoViolations: ExpectExtendMap;
}
