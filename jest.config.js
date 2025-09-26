export default {
  // Test environment
  testEnvironment: "jsdom",

  // Setup files
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Module name mapping for path aliases
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  // File extensions to consider
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Transform files
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  // Test file patterns
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)",
    "<rootDir>/src/**/*.(test|spec).(ts|tsx|js)",
  ],

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/setupTests.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/index.{ts,tsx}",
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Coverage directory
  coverageDirectory: "coverage",

  // Coverage reporters
  coverageReporters: ["text", "lcov", "html"],

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after each test
  restoreMocks: true,

  // Verbose output
  verbose: true,
};
