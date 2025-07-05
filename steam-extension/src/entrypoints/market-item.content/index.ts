import "@/styles/button.css";
import {
  ItemValue,
  SanitizedResponse,
} from "../intercept-market-item-history.unlisted/intercept.types";
import { aL } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

const getDoubleOrdersContainer = () => {
  const ordersContainer = document.querySelectorAll<HTMLElement>(
    "div.market_commodity_orders_interior"
  );
  return ordersContainer;
};

const getSingleBuyOrderContaier = () => {
  const buyOrderContainer = document.querySelector<HTMLElement>(
    "div#market_buyorder_info"
  );
  return buyOrderContainer;
};

const createShowAllOrdersButton = (onClick?: (e: MouseEvent) => void) => {
  const button = document.createElement("button");
  button.textContent = "Show All";
  button.style.paddingBottom = "10px";
  button.style.display = "block";
  button.style.margin = "0 auto";
  button.classList.add("custom-button", "extension-added", "show-all");
  button.setAttribute("data-show-more", "true");
  if (onClick) button.onclick = onClick;
  return button;
};

const DoubleContainerContentBuilder = () => {
  const ordersContainer = getDoubleOrdersContainer();
  if (ordersContainer.length === 0) return;
  ordersContainer.forEach((container) => {
    const buttonElement = createShowAllOrdersButton();
    container.appendChild(buttonElement);
  });
};

const SingleContainerContentBuilder = () => {
  const buyOrderContainer = getSingleBuyOrderContaier();
  if (!buyOrderContainer) return;
  const detailShowElement = buyOrderContainer.querySelector<HTMLDivElement>(
    "div#market_buyorder_info_show_details"
  );
  if (detailShowElement) detailShowElement.style.display = "none";
  const detailElement = buyOrderContainer.querySelector<HTMLDivElement>(
    "div#market_buyorder_info_details"
  );
  if (detailElement) {
    detailElement.style.display = "block";
    const buttonElement = createShowAllOrdersButton();
    const tableElement = detailElement.querySelector<HTMLElement>(
      "div#market_buyorder_info_details_tablecontainer"
    );
    tableElement?.appendChild(buttonElement);
  }
};

const spawnHeaderRow = (textContent: string, align: string) => {
  const thElement = document.createElement("th");
  thElement.textContent = textContent;
  thElement.style.alignContent = align;
  return thElement;
};

const spawnRow = (textContent: string | number, align: string) => {
  const tdElement = document.createElement("td");
  tdElement.textContent = textContent.toString();
  tdElement.style.alignContent = align;
  return tdElement;
};

const replaceOrderTable = (table: HTMLTableElement, data: ItemValue[]) => {
  table.querySelector("tbody")?.remove();
  const newTBody = table.createTBody();
  const headerRow = newTBody.insertRow();
  const thPrice = spawnHeaderRow("Price", "right");
  const thQuantity = spawnHeaderRow("Quantity", "right");
  headerRow.append(thPrice, thQuantity);
  data.forEach((value) => {
    const valueRow = newTBody.insertRow();
    const tdPrice = spawnRow(value.price, "right");
    const tdQuantity = spawnRow(value.quantity, "right");
    valueRow.append(tdPrice, tdQuantity);
  });
};

const injectSingleDataToTable = (e: Event) => {
  const customEvent = e as CustomEvent<SanitizedResponse>;
  const sigleBuyOrderContainer = getSingleBuyOrderContaier();
  if (!sigleBuyOrderContainer) return;
  const button =
    sigleBuyOrderContainer.querySelector<HTMLElement>("button.show-all");
  const isShowed = button?.getAttribute("data-hidden") === "true";
  if (isShowed) {
    const table = sigleBuyOrderContainer.querySelector("table");
    if (!table) return;
    replaceOrderTable(table, customEvent.detail.buyOrderGraph);
  }
};

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/listings*"],
  runAt: "document_idle",
  main() {
    DoubleContainerContentBuilder();
    SingleContainerContentBuilder();
    document.addEventListener("FETCH_ITEM_HISTOGRAM", (e) => {
      console.log(e);
      injectSingleDataToTable(e);
    });
  },
});
