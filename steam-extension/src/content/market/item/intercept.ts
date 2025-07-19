import { sendInterceptMessage } from "@/components/custom-event/message";
import { RawResponse } from "./intercept.types";
import { responseMapper } from "./map.utlis";
import { interceptNetworkRequests } from "@/components/custom-event/intercept";

const WATCHED_ENDPOINTS = ["/market/itemordershistogram"];
const HISTOGRAM_KEY = "FETCH_ITEM_HISTOGRAM";

const onIntercept = (resp: string) => {
  const parsedResp: RawResponse = JSON.parse(resp);
  const sanitizedResp = responseMapper(parsedResp);
  sendInterceptMessage(HISTOGRAM_KEY, sanitizedResp);
};

const setInterceptHistogram = () => {
  interceptNetworkRequests({
    onIntercept,
    watchedEndpoints: WATCHED_ENDPOINTS,
  });
};

const addCustomEventListenerHistogram = (callback: (e: Event) => void) => {
  document.addEventListener(HISTOGRAM_KEY, (e) => {
    callback(e);
  });
};

export { setInterceptHistogram, addCustomEventListenerHistogram };
