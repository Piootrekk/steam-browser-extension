import { matchIntercept } from "./message";

const interceptNetworkRequests = (onIntercept: (response: string) => void) => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const url = args[0].toString();
    const match = matchIntercept(url);

    if (match && response.status === 200) {
      const cloneResponse = await response.clone().text();
      onIntercept(cloneResponse);
    }
    return response;
  };

  const originalXHR = window.XMLHttpRequest;
  function newXHR() {
    const xhr = new originalXHR();
    xhr.addEventListener("load", function () {
      const match = matchIntercept(this.responseURL);
      if (match && this.status === 200) {
        const cloneResponse = this.response;
        onIntercept(cloneResponse);
      }
    });
    return xhr;
  }
  window.XMLHttpRequest = newXHR as unknown as typeof XMLHttpRequest;
};

export { interceptNetworkRequests };
