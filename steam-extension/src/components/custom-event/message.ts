import { globalIntercepts } from "./intercept.data";

const sendInterceptMessage = <T = unknown>(message: string, body: T) => {
  const event = new CustomEvent(message, {
    detail: body,
  });
  document.dispatchEvent(event);
};

const matchIntercept = (url: string) => {
  return globalIntercepts.find(({ endpoint }) => url.includes(endpoint));
};

export { sendInterceptMessage, matchIntercept };
