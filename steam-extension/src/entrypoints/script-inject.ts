type InterceptEnpoint = {
  message: string;
  endpoint: string;
};

const intercepts = [
  {
    message: "my-history-fetch",
    endpoint: "/market/myhistory",
  },
] satisfies InterceptEnpoint[];

const sendInterceptMessage = (message: string, url: string, body: string) => {
  browser.runtime.sendMessage({
    message,
    url,
    body,
  });
};

const matchIntercept = (url: string) => {
  return intercepts.find(({ endpoint }) => url.includes(endpoint));
};

export default defineUnlistedScript(() => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const url = args[0].toString();
    const match = matchIntercept(url);

    if (match && response.status === 200) {
      const cloned = response.clone();
      const body = await cloned.text();
      console.log("[Intercepted fetch]", args[0], body);
      sendInterceptMessage(match.message, url, body);
    }
    return response;
  };

  const originalXHR = window.XMLHttpRequest;
  function newXHR() {
    const xhr = new originalXHR();
    xhr.addEventListener("load", function () {
      const match = matchIntercept(this.responseURL);
      if (match && this.status === 200) {
        console.log("[Intercepted XHR]", this.responseURL, this.responseText);
        sendInterceptMessage(
          match.message,
          this.responseURL,
          this.responseText
        );
      }
    });
    return xhr;
  }
  window.XMLHttpRequest = newXHR as unknown as typeof XMLHttpRequest;
});
