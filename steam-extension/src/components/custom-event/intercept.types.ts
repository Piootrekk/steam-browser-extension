type InterceptEnpoint = {
  message: string;
  endpoint: string;
};

type InterceptNetworkRequestsParams = {
  onIntercept: (response: string) => void;
  url?: string;
  body?: Record<string, string>;
};

export type { InterceptEnpoint, InterceptNetworkRequestsParams };
