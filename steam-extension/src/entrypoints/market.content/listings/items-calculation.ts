const parseValueToNumber = (price: string | null | undefined): number => {
  if (!price) return 0;
  const cleaned = price
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^\d.,]/g, "")
    .replace(",", ".");
  const parsedPrice = parseFloat(cleaned);
  return parsedPrice;
};

const getCurrencyFromPrice = (price: string | null | undefined) => {
  if (!price) return "";
  return price.trim().replace(/^[\d\s,.]+/, "");
};

const getListings = (listing: HTMLElement) => {
  const price = {
    setPrice: 0,
    finalPrice: 0,
  };
  const itemRows = listing.querySelectorAll<HTMLElement>(
    'div[id^="mylisting_"]'
  );
  if (itemRows.length > 0) {
    itemRows.forEach((item) => {
      const itemValues = item.querySelector<HTMLElement>(
        "span.market_listing_price"
      );
      const setPriceElement = itemValues?.firstElementChild?.firstElementChild;
      const finalPriceElement = itemValues?.firstElementChild?.lastElementChild;
      const setPrice = parseValueToNumber(setPriceElement?.textContent);
      const finalPrice = parseValueToNumber(finalPriceElement?.textContent);
      price.setPrice += setPrice;
      price.finalPrice += finalPrice;
    });
    return price;
  }
};

const getBuyOrders = (listing: HTMLElement) => {
  const itemRows = listing.querySelectorAll<HTMLElement>(
    'div[id^="mybuyorder_"]'
  );
  let totalPrice = 0;
  if (itemRows.length > 0) {
    itemRows.forEach((item) => {
      const valuesSpan = item.querySelector<HTMLSpanElement>(
        "div.market_listing_right_cell.market_listing_my_price span.market_listing_price"
      );
      const priceElement = valuesSpan?.lastChild;
      const qtyElement = valuesSpan?.firstElementChild;
      const price = parseValueToNumber(priceElement?.textContent);
      const qty = parseValueToNumber(qtyElement?.textContent);
      totalPrice += price * qty;
    });
    return { totalPrice };
  }
};

const getGlobalBalance = () => {
  const aBalanceElement = document.querySelector<HTMLAnchorElement>(
    "a#header_wallet_balance"
  );
  if (!aBalanceElement) return null;
  const balance = parseValueToNumber(aBalanceElement?.textContent);
  const currency = getCurrencyFromPrice(aBalanceElement?.textContent);
  return { balance, currency };
};

const getBuyOrderNotification = (
  buyOrdersPrice: number,
  globalBalance: number,
  currency: string
) => {
  const diff = globalBalance * 10 - buyOrdersPrice;
  const note = `Orders placed total value: ${buyOrdersPrice.toFixed(
    2
  )} ${currency}, ${
    diff > 0
      ? `can place ${diff.toFixed(2)} ${currency} more.`
      : `cannot place more, not enought money.`
  }`;
  return note;
};

const getListingNotification = (
  setPrice: number,
  finalPrice: number,
  currency: string
) => {
  const note = `Total listed price: ${setPrice} ${currency} You will receive: ${finalPrice} ${currency} (on this page)`;
  return note;
};

const spawnSumNotificationDiv = (notification: string) => {
  const divElement = document.createElement("div");
  divElement.classList = "extension-added notification-sum";
  divElement.textContent = notification;
  return divElement;
};

const isSummaryExist = (listingsMainContainer: HTMLElement): boolean => {
  const hiddingButtons = listingsMainContainer.querySelectorAll(
    ".extension-added.notification-sum"
  );
  return hiddingButtons.length !== 0 ? true : false;
};

const injectSummary = (listingsContainer: HTMLElement) => {
  const activeListings = listingsContainer.querySelectorAll<HTMLElement>(
    ".my_listing_section.market_content_block"
  );
  const globalBalance = getGlobalBalance();
  if (!globalBalance) return;
  activeListings.forEach((listing) => {
    const priceListings = getListings(listing);
    if (priceListings) {
      const notification = getListingNotification(
        priceListings.setPrice,
        priceListings.finalPrice,
        globalBalance.currency
      );
      const notifDiv = spawnSumNotificationDiv(notification);
      listingsContainer.insertBefore(notifDiv, listing);
    }
    const priceBuyOrders = getBuyOrders(listing);
    if (priceBuyOrders) {
      const notification = getBuyOrderNotification(
        priceBuyOrders.totalPrice,
        globalBalance.balance,
        globalBalance.currency
      );
      const notifDiv = spawnSumNotificationDiv(notification);
      listingsContainer.insertBefore(notifDiv, listing);
    }
    console.log("-----=-----");
  });
};

export { injectSummary, isSummaryExist };
