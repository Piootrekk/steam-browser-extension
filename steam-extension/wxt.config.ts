import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  manifestVersion: 3,
  manifest: {
    permissions: ["webRequest", "webRequestBlocking", "<all_urls>"],
    web_accessible_resources: [
      {
        resources: ["script-inject.js"],
        matches: ["<all_urls>"],
      },
    ],
  },
  webExt: {
    startUrls: ["https://steamcommunity.com"],
    openConsole: true,
    openDevtools: true,
  },
});
