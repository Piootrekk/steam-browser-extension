import { interceptNetworkRequests } from "@/components/custom-event/intercept";
import { sendInterceptMessage } from "@/components/custom-event/message";

export default defineUnlistedScript(() => {
  const watchedEndpoints = ["/market/mylistings"];
  const interceptMarketListingsFetch = (_: string) => {
    sendInterceptMessage("FETCH_LISTINGS");
  };
  interceptNetworkRequests({
    onIntercept: interceptMarketListingsFetch,
    watchedEndpoints,
  });
});
