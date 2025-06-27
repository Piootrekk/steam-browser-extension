import { injectHiddingButtons, isHideButtonExist } from "./hidding-element";
import {
  injectSummary,
  isSummaryExist,
  recalculateSummary,
} from "./item-calculations/items-calculation";

const appendListingsListener = (listingsMainContainer: HTMLElement | null) => {
  if (!listingsMainContainer) return;
  injectHiddingButtons(listingsMainContainer);
  injectSummary(listingsMainContainer);

  document.addEventListener("FETCH_LISTINGS", () => {
    if (!isHideButtonExist(listingsMainContainer))
      injectHiddingButtons(listingsMainContainer);

    if (isSummaryExist(listingsMainContainer)) {
      recalculateSummary(listingsMainContainer);
    } else injectSummary(listingsMainContainer);
  });
};

export { appendListingsListener };
