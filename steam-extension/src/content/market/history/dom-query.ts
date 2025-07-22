import { MessageResponse } from "./intercept.types";

const setUrlToItem = (
  itemLink: string,
  anchorDOMElement: HTMLElement | null
) => {
  if (!anchorDOMElement) return;
  const linkElement = document.createElement("a");
  linkElement.target = "_blank";
  linkElement.href = itemLink;
  const text = anchorDOMElement.textContent || "";
  linkElement.text = text;
  linkElement.classList = "extension-added a-history";
  anchorDOMElement.textContent = "";
  anchorDOMElement.appendChild(linkElement);
};

const setColorToAction = (actionContainer: HTMLElement | null) => {
  if (!actionContainer) return;
  if (actionContainer.textContent?.trim() === "+")
    actionContainer.parentElement?.classList.add(
      "extension-edited",
      "history-action-purchase"
    );
  if (actionContainer.textContent?.trim() === "-")
    actionContainer.parentElement?.classList.add(
      "extension-edited",
      "history-action-sale"
    );
};

const itemDataSwapper = (e: Event, historyElement: HTMLElement) => {
  const itemNameTag = "_name";

  const relativePath = "https://steamcommunity.com/market/listings";

  const customEvent = e as CustomEvent<MessageResponse[]>;
  customEvent.detail.forEach((det) => {
    const url = `${relativePath}/${det.appid}/${det.hashName}`;
    const itemElement = historyElement.querySelector<HTMLElement>(
      `div#${det.itemNameRow}`
    );
    if (!itemElement) return;
    const actionContaier = itemElement.querySelector<HTMLElement>(
      "div.market_listing_left_cell.market_listing_gainorloss"
    );
    setColorToAction(actionContaier);
    const spanElement = itemElement.querySelector<HTMLElement>(
      `span#${det.itemNameRow}${itemNameTag}`
    );
    setUrlToItem(url, spanElement);
  });
};

const getHistoryTab = () => {
  const HistoryTab = document.querySelector<HTMLElement>(
    "#myListings #tabContentsMyMarketHistory"
  );
  return HistoryTab;
};

export { itemDataSwapper, getHistoryTab };
