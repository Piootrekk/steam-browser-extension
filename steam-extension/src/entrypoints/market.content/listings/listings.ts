import { injectHiddingButtons, isHideButtonExist } from "./hidding-element";
import {
  injectSummary,
  isSummaryExist,
  recalculateActiveListings,
} from "./items-calculation";

const appendChangesToListings = (listingsMainContainer: HTMLElement | null) => {
  if (!listingsMainContainer) return;
  injectHiddingButtons(listingsMainContainer);
  injectSummary(listingsMainContainer);
  document.addEventListener("FETCH_LISTINGS", () => {
    if (!isHideButtonExist(listingsMainContainer))
      injectHiddingButtons(listingsMainContainer);

    if (isSummaryExist(listingsMainContainer)) {
      recalculateActiveListings(listingsMainContainer);
    } else injectSummary(listingsMainContainer);
  });
};

export { appendChangesToListings };
