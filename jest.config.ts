import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex:  ".*\\.(test)|(spec)\\.ts$",
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/$1"
  },
  collectCoverageFrom: ["./**/*.(t|j)s"]
};
export default config;
