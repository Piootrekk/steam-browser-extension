type GlobalIntercept = {
  message: string;
  endpoint: string;
};

type InterceptNetworkRequestsParams = {
  onIntercept: (response: string) => void;
  url?: string;
  body?: Record<string, string>;
  watchedEndpoints: string[];
};

export type { GlobalIntercept, InterceptNetworkRequestsParams };
