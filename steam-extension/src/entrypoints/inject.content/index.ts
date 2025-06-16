export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  runAt: "document_start",
  async main() {
    await injectScript("/intercept.js", {
      keepInDom: true,
    });
  },
});
