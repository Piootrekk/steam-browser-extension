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
          "intercept-market-history.js",
          "intercept-market-listings.js",
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
