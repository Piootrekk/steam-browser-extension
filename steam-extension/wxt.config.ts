import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  manifestVersion: 3,
  manifest: {
    permissions: [
      "webRequest",
      "declarativeNetRequest",
      "https://steamcommunity.com/*",
    ],
    web_accessible_resources: [
      {
        matches: ["https://steamcommunity.com/*"],
        resources: [
          "market-history-intercept.js",
          "market-listings-intercept.js",
        ],
      },
    ],
  },
  webExt: {
    startUrls: ["https://steamcommunity.com"],
    openConsole: true,
    openDevtools: true,
  },
});
