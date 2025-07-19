import { sendInterceptMessage } from "@/components/custom-event/message";
import { sanitizeItemToMsg } from "./fetch.utils";
import type { RawResponse } from "./intercept.types";
import { interceptNetworkRequests } from "@/components/custom-event/intercept";

const WATCHED_ENDPOINTS = ["/market/myhistory"];
const MY_HISTORY_KEY = "FETCH_HISTORY";

const interceptMarketHistoryFetch = (response: string) => {
  const body: RawResponse = JSON.parse(response);
  const eventData = sanitizeItemToMsg(body);
  sendInterceptMessage(MY_HISTORY_KEY, eventData);
};

const setInterceptHistory = () =>
  interceptNetworkRequests({
    onIntercept: interceptMarketHistoryFetch,
    watchedEndpoints: WATCHED_ENDPOINTS,
  });

const addCustomEventListenerHistory = (callback: (e: Event) => void) => {
  document.addEventListener(MY_HISTORY_KEY, (e) => {
    callback(e);
  });
};

export { setInterceptHistory, addCustomEventListenerHistory };
