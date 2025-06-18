import { injectHiddingButtons, isHideButtonExist } from "./hidding-element";
import { injectSummary, isSummaryExist } from "./items-calculation";

const appendChangesToListings = (listingsMainContainer: HTMLElement | null) => {
  if (!listingsMainContainer) return;
  if (!isHideButtonExist(listingsMainContainer))
    injectHiddingButtons(listingsMainContainer);
  if (!isSummaryExist(listingsMainContainer))
    injectSummary(listingsMainContainer);
};

export { appendChangesToListings };
