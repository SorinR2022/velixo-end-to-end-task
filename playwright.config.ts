import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    browserName: "chromium",
    channel: "chrome",
    headless: false,
    video: "on",
    viewport: null,
    launchOptions: {
      args: ["--start-maximized"],
    },
    permissions: ["clipboard-read", "clipboard-write"],
  },
});
