const sendInterceptMessage = <T = unknown>(message: string, body?: T) => {
  const event = new CustomEvent(message, {
    detail: body,
  });
  document.dispatchEvent(event);
};

const matchIntercept = (url: string, endpoints?: string[]) => {
  if (!endpoints) return undefined;
  return endpoints.find((endpoint) => url.includes(endpoint));
};

export { sendInterceptMessage, matchIntercept };
