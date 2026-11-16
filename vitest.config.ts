import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["libs/**/*.test.ts", "applications/**/*.test.ts"],
    passWithNoTests: true,
  },
});
