import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  manifestVersion: 3,
  webExt: {
    startUrls: ["https://steamcommunity.com"],
    o: true,
  },
});
