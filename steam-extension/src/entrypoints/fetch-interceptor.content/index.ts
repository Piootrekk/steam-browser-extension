export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  async main() {
    const scriptUrl = browser.runtime.getURL("/script-inject.js");
    const script = document.createElement("script");
    script.src = scriptUrl;

    document.documentElement.appendChild(script);
  },
});
