import { InterceptEnpoint } from "./intercept.types";

const intercepts = [
  {
    message: "my-history-fetch",
    endpoint: "/market/myhistory",
  },
] satisfies InterceptEnpoint[];

const sendInterceptMessage = <T = unknown>(message: string, body: T) => {
  const event = new CustomEvent(message, {
    detail: body,
  });
  document.dispatchEvent(event);
};

const matchIntercept = (url: string) => {
  return intercepts.find(({ endpoint }) => url.includes(endpoint));
};

export { sendInterceptMessage, matchIntercept };
