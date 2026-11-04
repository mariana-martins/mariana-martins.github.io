// Types for toHaveNoViolations. Separate from jest-axe.d.ts: module
// augmentation needs a module file, the `declare module` shim a script file.
export {};

declare module '@jest/expect' {
  interface Matchers<R extends void | Promise<void>> {
    toHaveNoViolations(): R;
  }
}
