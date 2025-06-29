import { sanitizeItemToMsg } from "./fetch.utils";
import { RawResponse } from "./intercept.types";
import { sendInterceptMessage } from "@/components/custom-event/message";
import { interceptNetworkRequests } from "@/components/custom-event/intercept";

export default defineUnlistedScript(() => {
  const watchedEndpoints = ["/market/myhistory"];
  const interceptMarketHistoryFetch = (response: string) => {
    const body: RawResponse = JSON.parse(response);
    const eventData = sanitizeItemToMsg(body);
    sendInterceptMessage("FETCH_HISTORY", eventData);
  };
  interceptNetworkRequests({
    onIntercept: interceptMarketHistoryFetch,
    watchedEndpoints,
  });
});
