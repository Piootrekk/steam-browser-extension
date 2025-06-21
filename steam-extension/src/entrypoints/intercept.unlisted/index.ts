import { sanitizeItemToMsg } from "./fetch.utils";
import { RawResponse } from "./intercept.types";
import { matchIntercept, sendInterceptMessage } from "./intercept.utils";

export default defineUnlistedScript(() => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const url = args[0].toString();
    const match = matchIntercept(url);

    if (match && response.status === 200) {
      const cloned = response.clone();
      const body: RawResponse = await cloned.json();
      const message = sanitizeItemToMsg(body);
      sendInterceptMessage("FETCH_HISTORY", message);
    }
    return response;
  };

  const originalXHR = window.XMLHttpRequest;
  function newXHR() {
    const xhr = new originalXHR();
    xhr.addEventListener("load", function () {
      const match = matchIntercept(this.responseURL);
      if (match && this.status === 200) {
        const response: RawResponse = JSON.parse(this.response);
        const message = sanitizeItemToMsg(response);
        console.log(message);
        sendInterceptMessage("FETCH_HISTORY", message);
      }
    });
    return xhr;
  }
  window.XMLHttpRequest = newXHR as unknown as typeof XMLHttpRequest;
});
