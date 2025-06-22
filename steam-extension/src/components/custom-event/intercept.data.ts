import { InterceptEnpoint } from "./intercept.types";

const globalIntercepts = [
  {
    message: "my-history-fetch",
    endpoint: "/market/myhistory",
  },
] satisfies InterceptEnpoint[];

export { globalIntercepts };
