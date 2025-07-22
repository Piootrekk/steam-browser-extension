import { injectCalculationToActiveListings } from "./active-listings";
import { recalculateActiveListings } from "./active-listings";
import { getGlobalBalance } from "./global-balance";
import { injectCalculationToBuyOrders } from "./buyorder";

const isSummaryExist = (listingsMainContainer: HTMLElement): boolean => {
  const sumamryElements = listingsMainContainer.querySelectorAll(
    ".extension-added.notification-sum"
  );
  return sumamryElements.length !== 0 ? true : false;
};

const injectSummary = (listingsContainer: HTMLElement) => {
  const activeListings = listingsContainer.querySelectorAll<HTMLElement>(
    "div.my_listing_section.market_content_block"
  );
  const globalBalance = getGlobalBalance();
  if (!globalBalance) return;

  activeListings.forEach((listing) => {
    injectCalculationToActiveListings(
      listingsContainer,
      listing,
      globalBalance.currency
    );
    injectCalculationToBuyOrders(
      listingsContainer,
      listing,
      globalBalance.currency,
      globalBalance.balance
    );
  });
};

const recalculateSummary = (listingsContainer: HTMLElement) => {
  const globalBalance = getGlobalBalance();
  if (!globalBalance) return;
  recalculateActiveListings(listingsContainer, globalBalance.currency);
};

export { injectSummary, isSummaryExist, recalculateSummary };
