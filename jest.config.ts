export default {
  roots: [
    '<rootDir>/tests'
  ],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/infra/database/models/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest/legacy'
  },
  preset: 'ts-jest',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts', '**/*.test.ts']
}
