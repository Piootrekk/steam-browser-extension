const sendInterceptMessage = <T = unknown>(
  message: string,
  url: string,
  body: T
) => {
  const event = new CustomEvent(message, {
    detail: {
      body,
      url,
    },
  });
  document.dispatchEvent(event);
};

export { sendInterceptMessage };
