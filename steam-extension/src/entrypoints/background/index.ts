export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.message) {
      case "/market/myhistory":
        console.log("Market history data:", message.body);
        break;
    }
  });
});
