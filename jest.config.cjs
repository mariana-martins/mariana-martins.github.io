module.exports = {
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          esModuleInterop: true,
        },
      },
    ],
  },

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx|js)',
  ],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/entry-server.tsx',
    '!src/setupTests.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  coverageDirectory: 'coverage',

  coverageReporters: ['text', 'lcov', 'html'],

  clearMocks: true,

  restoreMocks: true,

  verbose: true,
};
