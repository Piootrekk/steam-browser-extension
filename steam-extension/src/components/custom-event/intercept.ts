import { InterceptNetworkRequestsParams } from "./intercept.types";
// TODO change static new url to static param for example ?page=50 to override base url
const interceptNetworkRequests = ({
  onIntercept,
  overrideUrl,
  watchedEndpoints,
}: InterceptNetworkRequestsParams) => {
  interceptDefaultFetch({ onIntercept, overrideUrl, watchedEndpoints });
  interceptXMLFetch({ onIntercept, watchedEndpoints });
};

const interceptDefaultFetch = ({
  onIntercept,
  overrideUrl,
  watchedEndpoints,
}: InterceptNetworkRequestsParams) => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const basicUrl = args[0].toString();
    const match = matchIntercept(basicUrl, watchedEndpoints);
    if (match && overrideUrl) {
      args[0] = overrideUrl;
    }
    const response = await originalFetch(...args);
    if (match && response.status === 200) {
      const cloneResponse = await response.clone().text();
      onIntercept(cloneResponse);
    }
    return response;
  };
};

const interceptXMLFetch = ({
  onIntercept,
  overrideUrl,
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
      const newUrl = overrideUrl ? overrideUrl : url.toString();

      const isAsync = async !== false;
      return originalOpen.call(this, method, newUrl, isAsync, user, password);
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
