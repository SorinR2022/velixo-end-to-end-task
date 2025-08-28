import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    browserName: "chromium",
    channel: "chrome",
    headless: false,
    video: "on",
    viewport: null, // Let the browser use full window size
    launchOptions: {
      args: ["--start-maximized"], // Launch browser maximized
    },
    permissions: ["clipboard-read", "clipboard-write"],
  },
});
