export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  runAt: "document_start",
  async main() {
    await injectScript("/intercept-market-history.js", {
      keepInDom: true,
    });
    await injectScript("/intercept-market-listings.js", {
      keepInDom: true,
    });
  },
});
