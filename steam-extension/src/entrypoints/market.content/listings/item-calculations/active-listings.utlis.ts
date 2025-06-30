import {
  insertIdentifyClass,
  spawnSumNotificationDiv,
} from "./dom-manipulations.utils";
import { getAmountFromName, parseValueToNumber } from "./perser";

const getMyListingsDivs = (listing: HTMLElement) => {
  return listing.querySelectorAll<HTMLElement>('div[id^="mylisting_"]');
};

const getListingElements = (listing: HTMLElement) => {
  const price = {
    setPrice: 0,
    finalPrice: 0,
  };
  const itemRows = getMyListingsDivs(listing);
  if (itemRows.length > 0) {
    itemRows.forEach((item) => {
      const itemValueElements = item.querySelector<HTMLElement>(
        "span.market_listing_price"
      );

      const itemNameElement = item.querySelector<HTMLElement>(
        "a.market_listing_item_name_link"
      );
      const itemAmount = getAmountFromName(itemNameElement?.textContent);
      const multipler = itemAmount ? itemAmount : 1;

      const setPriceElement =
        itemValueElements?.firstElementChild?.firstElementChild;
      const finalPriceElement =
        itemValueElements?.firstElementChild?.lastElementChild;
      const setPrice = parseValueToNumber(setPriceElement?.textContent);
      const finalPrice = parseValueToNumber(finalPriceElement?.textContent);
      price.setPrice += multipler * setPrice;
      price.finalPrice += multipler * finalPrice;
    });
    return price;
  }
};

const getListingNotification = (
  setPrice: number,
  finalPrice: number,
  currency: string
) => {
  const note = `Total listed price: ${setPrice.toFixed(
    2
  )}${currency} You will receive: ${finalPrice.toFixed(
    2
  )}${currency} (on this page)`;
  return note;
};

const injectCalculationToActiveListings = (
  container: HTMLElement,
  currentListingTab: HTMLElement,
  currency: string
) => {
  const priceListings = getListingElements(currentListingTab);
  if (priceListings) {
    insertIdentifyClass(currentListingTab, "activelisting");
    const note = getListingNotification(
      priceListings.setPrice,
      priceListings.finalPrice,
      currency
    );
    const notifDiv = spawnSumNotificationDiv(note, "active-listings");
    container.insertBefore(notifDiv, currentListingTab);
  }
};

const recalculateActiveListings = (
  listingsContainer: HTMLElement,
  currency: string
) => {
  const summaryDivs = listingsContainer.querySelectorAll<HTMLElement>(
    `div.extension-added.notification-sum.active-listings`
  );
  const containersListings = listingsContainer.querySelectorAll<HTMLElement>(
    "div.my_listing_section.market_content_block.activelisting"
  );

  containersListings.forEach((listing, index) => {
    const priceListings = getListingElements(listing);
    if (!priceListings) return;
    const note = getListingNotification(
      priceListings.setPrice,
      priceListings.finalPrice,
      currency
    );
    summaryDivs[index].textContent = note;
  });
};

export { injectCalculationToActiveListings, recalculateActiveListings };
