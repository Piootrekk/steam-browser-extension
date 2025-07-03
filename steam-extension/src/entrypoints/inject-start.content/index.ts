export default defineContentScript({
  matches: ["https://steamcommunity.com/market/*"],
  runAt: "document_start",
  async main() {
    await Promise.all([
      injectScript("/intercept-market-history.js", { keepInDom: true }),
      injectScript("/intercept-market-listings.js", { keepInDom: true }),
      injectScript("/intercept-market-item-history.js", { keepInDom: true }),
    ]);
  },
});
