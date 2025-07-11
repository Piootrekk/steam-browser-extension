const sendInterceptMessage = <T = unknown>(message: string, body?: T) => {
  const event = new CustomEvent(message, {
    detail: body,
  });
  document.dispatchEvent(event);
};

export { sendInterceptMessage };
