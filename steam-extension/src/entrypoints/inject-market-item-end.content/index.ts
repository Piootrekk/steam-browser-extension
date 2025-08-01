export default defineContentScript({
  matches: ["https://steamcommunity.com/market/listings/*"],
  runAt: "document_end",
  async main() {
    await Promise.all([
      injectScript("/intercept-market-item-graph.js", { keepInDom: true }),
    ]);
  },
});
