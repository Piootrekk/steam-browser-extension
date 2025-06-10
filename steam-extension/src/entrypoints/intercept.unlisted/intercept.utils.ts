import { InterceptEnpoint } from "./intercept.types";

const intercepts = [
  {
    message: "my-history-fetch",
    endpoint: "/market/myhistory",
  },
] satisfies InterceptEnpoint[];

const sendInterceptMessage = (message: string, url: string, body: string) => {
  const event = new CustomEvent(message, {
    detail: {
      body,
      url,
    },
  });
  window.dispatchEvent(event);
};

const matchIntercept = (url: string) => {
  return intercepts.find(({ endpoint }) => url.includes(endpoint));
};

export { sendInterceptMessage, matchIntercept };
