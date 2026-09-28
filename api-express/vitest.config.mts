import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "~": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    include: ["src/**/*.test.ts"],
    setupFiles: ["./src/__tests__/setup.ts"],
    // All test files share one database
    fileParallelism: false,
    env: {
      NODE_ENV: "test",
      SECRET: "test-secret",
      DATABASE_URL: process.env.TEST_DATABASE_URL ?? "postgresql://postgres@localhost/quizz_du_berger_test",
    },
  },
});
