import { interceptNetworkRequests } from "@/components/custom-event/intercept";
import { responseMapper } from "./map.utlis";
import { RawResponse } from "./intercept.types";
import { sendInterceptMessage } from "@/components/custom-event/message";

export default defineUnlistedScript(() => {
  const watchedEndpoints = ["/market/itemordershistogram"];
  interceptNetworkRequests({
    onIntercept: (resp) => {
      const parsedResp: RawResponse = JSON.parse(resp);
      const sanitizedResp = responseMapper(parsedResp);
      sendInterceptMessage("FETCH_ITEM_HISTOGRAM", sanitizedResp);
    },
    watchedEndpoints,
  });
});
