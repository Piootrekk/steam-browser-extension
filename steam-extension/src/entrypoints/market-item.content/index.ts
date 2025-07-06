import "@/styles/button.css";
import { SanitizedResponse } from "../intercept-market-item-history.unlisted/intercept.types";
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

const SingleContainerContentShow = () => {
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

  replaceTableTBody(sigleBuyOrderTable, customEvent.detail.buyOrderGraph);
};

const injectDoubeDataToTable = (e: Event) => {
  const customEvent = e as CustomEvent<SanitizedResponse>;
  const { forSaleTable, buyRequestTable } = getDoubleOrdersTables();
  if (!buyRequestTable || !forSaleTable) return;
  replaceTableTBody(buyRequestTable, customEvent.detail.buyOrderGraph);
  replaceTableTBody(forSaleTable, customEvent.detail.sellOrderGraph);
};

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/listings*"],
  runAt: "document_start",
  main() {
    SingleContainerContentShow();
    document.addEventListener("FETCH_ITEM_HISTOGRAM", (e) => {
      injectSingleDataToTable(e);
      injectDoubeDataToTable(e);
    });
  },
});
