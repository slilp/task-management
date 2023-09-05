const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testEnvironment: "jest-environment-jsdom",
  coveragePathIgnorePatterns: [
    "<rootDir>/src/utils/test-utils.tsx",
    "<rootDir>/src/views/home/hooks/(.*)$",
  ],
};
module.exports = createJestConfig(customJestConfig);
