export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  async main() {
    const scriptUrl = browser.runtime.getURL(
      "/content-scripts/fetch-interceptor.js"
    ) as string;
    const script = document.createElement("script");
    script.src = scriptUrl;

    const observer = new MutationObserver((mutationsList, observer) => {
      if (document.head) {
        document.head.appendChild(script);
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  },
});
