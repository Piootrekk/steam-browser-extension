import { interceptNetworkRequests } from "@/components/custom-event/intercept";
import { sendInterceptMessage } from "@/components/custom-event/message";

const LISTING_KEY = "FETCH_LISTINGS";
const WATCHED_ENDPOINTS = ["/market/mylistings"];
const interceptMarketListingsFetch = (_: string) => {
  sendInterceptMessage(LISTING_KEY);
};

const setInterceptListings = () => {
  interceptNetworkRequests({
    onIntercept: interceptMarketListingsFetch,
    watchedEndpoints: WATCHED_ENDPOINTS,
  });
};

const addCustomEventListenerListing = (callback: () => void) => {
  document.addEventListener(LISTING_KEY, () => {
    callback();
  });
};

export { setInterceptListings, addCustomEventListenerListing };
