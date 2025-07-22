import { getListingTab } from "./dom-query";
import { injectHiddingButtons, isHideButtonExist } from "./hidding-element";
import { addCustomEventListenerListing } from "./intercept";
import {
  injectSummary,
  isSummaryExist,
  recalculateSummary,
} from "./item-calculations/items-calculation";

const mainListings = () => {
  const listingContainer = getListingTab();
  if (!listingContainer) return;
  injectHiddingButtons(listingContainer);
  injectSummary(listingContainer);
  addCustomEventListenerListing(() => {
    if (!isHideButtonExist(listingContainer))
      injectHiddingButtons(listingContainer);

    if (isSummaryExist(listingContainer)) {
      recalculateSummary(listingContainer);
    } else injectSummary(listingContainer);
  });
};

export { mainListings };
