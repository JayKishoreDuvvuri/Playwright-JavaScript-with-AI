import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true, // Disable parallel execution for WebContainer
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list", // Use simpler reporter
  use: {
    baseURL: "https://www.saucedemo.com",
    trace: "off", // Disable trace
    screenshot: "off", // Disable screenshots
    video: "off", // Disable video
  },
  projects: [
    {
      name: "Chrome",
      use: { ...devices["Desktop Chrome"], headless: false },
    },
  ],
});
