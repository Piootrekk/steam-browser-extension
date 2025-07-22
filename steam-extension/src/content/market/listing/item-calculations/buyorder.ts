import {
  insertIdentifyClass,
  spawnSumNotificationDiv,
} from "./dom-manipulations";
import { parseValueToNumber } from "./perser";

const getBuyOrdersDivs = (listing: HTMLElement) => {
  return listing.querySelectorAll<HTMLElement>('div[id^="mybuyorder_"]');
};

const getBuyOrdersPrice = (listing: HTMLElement) => {
  const itemRows = getBuyOrdersDivs(listing);
  if (itemRows.length === 0) return;

  const totalPrice = Array.from(itemRows).reduce((sum, item) => {
    const valuesSpan = item.querySelector<HTMLSpanElement>(
      "div.market_listing_right_cell.market_listing_my_price span.market_listing_price"
    );
    const priceElement = valuesSpan?.lastChild;
    const qtyElement = valuesSpan?.firstElementChild;
    const price = parseValueToNumber(priceElement?.textContent);
    const qty = parseValueToNumber(qtyElement?.textContent);
    return sum + price * qty;
  }, 0);

  return { totalPrice };
};

const getBuyOrderNotification = (
  buyOrdersPrice: number,
  globalBalance: number,
  currency: string
) => {
  const diffMarketable = globalBalance * 10 - buyOrdersPrice;
  const diffWithBalance = diffMarketable / 10;
  const color =
    diffMarketable > 0 ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)";
  const note = `Orders placed total value: ${buyOrdersPrice.toFixed(
    2
  )} ${currency}, ${
    diffMarketable > 0
      ? `Can place ${diffMarketable.toFixed(2)}${currency} more.`
      : `Not enought money. Remove listings with: ${Math.abs(
          diffMarketable
        ).toFixed(2)} ${currency} or increase balance ${Math.abs(
          diffWithBalance
        ).toFixed(2)} ${currency}`
  }`;
  return { note, color };
};

const injectCalculationToBuyOrders = (
  container: HTMLElement,
  currentListingTab: HTMLElement,
  currency: string,
  globalBalance: number
) => {
  const priceBuyOrders = getBuyOrdersPrice(currentListingTab);
  if (priceBuyOrders) {
    insertIdentifyClass(currentListingTab, "buyorder");
    const { note, color } = getBuyOrderNotification(
      priceBuyOrders.totalPrice,
      globalBalance,
      currency
    );
    const notifDiv = spawnSumNotificationDiv(note, "buyorder", color);
    container.insertBefore(notifDiv, currentListingTab);
  }
};

export { injectCalculationToBuyOrders };
