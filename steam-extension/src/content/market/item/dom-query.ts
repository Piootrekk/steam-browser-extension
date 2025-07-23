import { parseValueToNumber } from "@/components/utils/perser";
import { SanitizedResponse } from "./intercept.types";
import { replaceTableTBody } from "./table";

const getDoubleOrdersTables = () => {
  const forSaleTable = document.querySelector<HTMLTableElement>(
    "div#market_commodity_forsale_table table"
  );
  const buyRequestTable = document.querySelector<HTMLTableElement>(
    "div#market_commodity_buyreqeusts_table table"
  );
  return { forSaleTable, buyRequestTable };
};

const getSingleBuyOrderTable = () => {
  const buyOrderContainer = document.querySelector<HTMLTableElement>(
    "div#market_buyorder_info table"
  );
  return buyOrderContainer;
};

const singleContainerContentShow = () => {
  const detailShowElement = document.querySelector<HTMLDivElement>(
    "div#market_buyorder_info_show_details"
  );
  if (detailShowElement) detailShowElement.style.display = "none";
  const detailElement = document.querySelector<HTMLDivElement>(
    "div#market_buyorder_info_details"
  );
  if (detailElement) {
    detailElement.style.display = "block";
  }
};

const injectSingleDataToTable = (e: Event) => {
  const customEvent = e as CustomEvent<SanitizedResponse>;
  const sigleBuyOrderTable = getSingleBuyOrderTable();
  if (!sigleBuyOrderTable) return;
  const existingBuyOrders = getExistingBuyOrder();
  replaceTableTBody(
    sigleBuyOrderTable,
    customEvent.detail.buyOrderGraph,
    existingBuyOrders
  );
};

const injectDoubeDataToTable = (e: Event) => {
  const customEvent = e as CustomEvent<SanitizedResponse>;
  const { forSaleTable, buyRequestTable } = getDoubleOrdersTables();
  if (!buyRequestTable || !forSaleTable) return;
  const existingBuyOrders = getExistingBuyOrder();
  const existingListings = getExistingListing();
  replaceTableTBody(
    buyRequestTable,
    customEvent.detail.buyOrderGraph,
    existingBuyOrders
  );
  replaceTableTBody(
    forSaleTable,
    customEvent.detail.sellOrderGraph,
    existingListings
  );
};

const getExistingListing = () => {
  const listingsTab = document.querySelector<HTMLElement>(
    "div#tabContentsMyActiveMarketListingsTable"
  );
  if (!listingsTab) return undefined;
  const itemValueElements = listingsTab.querySelectorAll<HTMLElement>(
    "span.market_listing_price"
  );
  const values = [...itemValueElements].map((element) => {
    const elValue = element.firstElementChild?.firstElementChild?.textContent!;
    return parseValueToNumber(elValue);
  });
  return values;
};

const getExistingBuyOrder = () => {
  const buyOrderTab = document.querySelector<HTMLElement>(
    "div.my_listing_section.market_content_block.market_home_listing_table:not(#tabContentsMyActiveMarketListingsTable)"
  );
  if (!buyOrderTab) return undefined;
  const itemValue = buyOrderTab?.querySelector<HTMLElement>(
    "span.market_listing_price"
  );
  const parsedValue = parseValueToNumber(itemValue?.lastChild?.textContent);
  return [parsedValue];
};

export {
  injectDoubeDataToTable,
  injectSingleDataToTable,
  singleContainerContentShow,
  getExistingListing,
  getExistingBuyOrder,
};
