export default defineContentScript({
  matches: ["https://steamcommunity.com/market/listings*"],
  runAt: "document_end",
  main() {},
});
