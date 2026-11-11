/** Tailwind CSS 4 directives, which plain CSS rules do not know */
const TAILWIND_AT_RULES = [
  'theme',
  'custom-variant',
  'utility',
  'variant',
  'apply',
  'source',
  'plugin',
  'config',
];

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-recommended'],
  plugins: ['stylelint-value-no-unknown-custom-properties'],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: TAILWIND_AT_RULES }],
    // @apply takes class names, and @utility and @variant hold bare declarations
    'at-rule-prelude-no-invalid': [true, { ignoreAtRules: TAILWIND_AT_RULES }],
    'no-invalid-position-declaration': [
      true,
      { ignoreAtRules: TAILWIND_AT_RULES },
    ],
    'nesting-selector-no-missing-scoping-root': [
      true,
      { ignoreAtRules: TAILWIND_AT_RULES },
    ],
    // Theme overrides (.dark body) sit next to the rules they override, on purpose
    'no-descending-specificity': null,
    // A misspelled token is silent in CSS: var(--colour-pink) resolves to nothing
    'csstools/value-no-unknown-custom-properties': [
      true,
      { importFrom: ['src/styles/index.css'] },
    ],
  },
};
