import { InterceptNetworkRequestsParams } from "./intercept.types";

const interceptNetworkRequests = ({
  onIntercept,
  url,
  watchedEndpoints,
}: InterceptNetworkRequestsParams) => {
  interceptDefaultFetch({ onIntercept, url, watchedEndpoints });
  interceptXMLFetch({ onIntercept, watchedEndpoints });
};

const interceptDefaultFetch = ({
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
};

const interceptXMLFetch = ({
  onIntercept,
  watchedEndpoints,
}: InterceptNetworkRequestsParams) => {
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

const matchIntercept = (url: string, endpoints?: string[]) => {
  if (!endpoints) return undefined;
  return endpoints.find((endpoint) => url.includes(endpoint));
};

const testExport = {
  matchIntercept,
  interceptDefaultFetch,
  interceptXMLFetch,
};

export { interceptNetworkRequests, testExport };
