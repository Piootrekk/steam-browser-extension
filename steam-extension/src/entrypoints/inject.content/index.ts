export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  runAt: "document_start",
  async main() {
    await injectScript("/market-history-intercept.js", {
      keepInDom: true,
    });
    await injectScript("/market-listings-intercept.js", {
      keepInDom: true,
    });
  },
});
