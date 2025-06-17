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
  }
  return price;
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
  }
  return totalPrice;
};

const getAllSumsListings = (listingsContainer: HTMLElement) => {
  const activeListings = listingsContainer.querySelectorAll<HTMLElement>(
    ".my_listing_section.market_content_block"
  );
  const activeListingsChilds = Array.from(activeListings);

  activeListingsChilds.forEach((listing) => {
    getListings(listing);
    getBuyOrders(listing);
    console.log("-----=-----");
  });
};

const getGlobalBalance = () => {
  const aBalanceElement = document.querySelector<HTMLAnchorElement>(
    "a#header_wallet_balance"
  );
  const balance = parseValueToNumber(aBalanceElement?.textContent);
  return balance;
};

export { getGlobalBalance, getAllSumsListings };
