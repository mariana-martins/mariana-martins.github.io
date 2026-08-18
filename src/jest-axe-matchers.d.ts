// Declares the matcher that setupTests.ts registers via
// `expect.extend(toHaveNoViolations)`. jest-axe ships no types, so this mirrors
// how @testing-library/jest-dom augments the same interface.
//
// This has to live apart from jest-axe.d.ts: augmenting an existing module
// requires a module file, while the `declare module 'jest-axe'` shim requires a
// global script file.
export {};

declare module '@jest/expect' {
  interface Matchers<R extends void | Promise<void>> {
    toHaveNoViolations(): R;
  }
}
