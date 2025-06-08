export default defineUnlistedScript(async () => {
  const endpoint = "/market/myhistory";

  const interceptFetch = () => {
    console.log("hello from script injection");
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      console.log(response);
      if (args[0].toString().includes(endpoint) && response.status === 200) {
        const cloned = response.clone();
        const body = await cloned.text();
        console.log("[Intercepted fetch]", args[0], body);
      }
      return response;
    };
  };

  interceptFetch();
});
