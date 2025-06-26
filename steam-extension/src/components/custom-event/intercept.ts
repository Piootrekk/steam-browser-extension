import { InterceptNetworkRequestsParams } from "./intercept.types";
import { matchIntercept } from "./message";

const interceptNetworkRequests = ({
  onIntercept,
  url,
  watchedEndpoints,
}: InterceptNetworkRequestsParams) => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const basicUrl = args[0].toString();
    const match = matchIntercept(basicUrl, watchedEndpoints);

    if (match && url) {
      args[0] = url;
    }

    if (match && response.status === 200) {
      const cloneResponse = await response.clone().text();
      onIntercept(cloneResponse);
    }
    return response;
  };

  const originalXHR = window.XMLHttpRequest;
  function newXHR() {
    const xhr = new originalXHR();
    const originalOpen = xhr.open;
    xhr.open = function (
      method: string,
      url: string | URL,
      async?: boolean,
      user?: string,
      password?: string
    ) {
      const originalUrl = url.toString();
      const match = matchIntercept(originalUrl);

      let finalUrl = originalUrl;
      if (match) {
        finalUrl = url.toString();
      }
      const isAsync = async ? async : true;
      return originalOpen.call(this, method, finalUrl, isAsync, user, password);
    };
    xhr.addEventListener("load", function () {
      const match = matchIntercept(this.responseURL, watchedEndpoints);
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
