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

const getSumActiveOrders = (listingsContainer: HTMLElement) => {
  let setPrice = 0;
  let finalPrice = 0;

  const activeRowsElement = listingsContainer.querySelector<HTMLElement>(
    "#tabContentsMyActiveMarketListingsRows"
  );
  const pricesElements = activeRowsElement?.querySelectorAll<HTMLElement>(
    ".market_listing_price"
  );
  if (!pricesElements || pricesElements.length === 0) {
    return;
  }

  pricesElements.forEach((element) => {
    const priceElements = element.firstElementChild!.querySelectorAll("span");
    const currentSetPrice = parseValueToNumber(priceElements[0].textContent);
    const currentFinalPrice = parseValueToNumber(priceElements[1].textContent);
    console.log(`active price:`, currentSetPrice, currentFinalPrice);
    setPrice += currentSetPrice;
    finalPrice += currentFinalPrice;
  });
};

const getSumAwaitedOrders = (listingsContainer: HTMLElement) => {};

const getSumBuyOrders = (listingsContainer: HTMLElement) => {
  let totalPrice = 0;
  const rowsElements = listingsContainer.querySelectorAll(
    'div[id^="mybuyorder_"]'
  );

  rowsElements.forEach((element) => {
    const detailContainer = element.querySelector(
      ".market_listing_right_cell.market_listing_my_price"
    );

    const valuesSpan = detailContainer?.querySelector<HTMLSpanElement>(
      "span.market_listing_price"
    );
    const priceElement = valuesSpan?.lastChild;
    const qtyElement = valuesSpan?.firstElementChild;
    const price = parseValueToNumber(priceElement?.textContent);
    const qty = parseValueToNumber(qtyElement?.textContent);
    console.log({ price, qty });
    totalPrice += price * qty;
  });
  console.log(totalPrice);
};

export { getSumBuyOrders, getSumActiveOrders };
