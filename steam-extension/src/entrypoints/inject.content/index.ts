export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  runAt: "document_start",
  async main() {
    // const scriptUrl = browser.runtime.getURL("/intercept.js");
    // const script = document.createElement("script");
    await injectScript("/intercept.js", {
      keepInDom: true,
    });
    // script.src = scriptUrl;

    // document.documentElement.appendChild(script);
  },
});
