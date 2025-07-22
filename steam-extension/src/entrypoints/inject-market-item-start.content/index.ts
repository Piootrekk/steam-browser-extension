export default defineContentScript({
  matches: ["https://steamcommunity.com/market/listings/*"],
  runAt: "document_start",
  async main() {
    await Promise.all([
      injectScript("/intercept-market-item-history.js", { keepInDom: true }),
    ]);
  },
});
