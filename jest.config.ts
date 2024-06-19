import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ['json'], 
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};

export default config;
