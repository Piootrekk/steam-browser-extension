import { MessageResponse } from "../../market-history-intercept.unlisted/intercept.types";

const searchUrls = {
  relative: "https://steamcommunity.com/market/listings",
  search: "https://steamcommunity.com/market/search?",
};

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

const fetchHistoryHandler = (e: Event, historyElement: HTMLElement) => {
  const itemNameTag = "_name";

  const customEvent = e as CustomEvent<MessageResponse[]>;
  customEvent.detail.forEach((det) => {
    const url = `${searchUrls.relative}/${det.appid}/${det.hashName}`;
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

const appendChangesToHistory = async (historyElement: HTMLElement | null) => {
  if (!historyElement) return;
  document.removeEventListener("FETCH_HISTORY", (e) =>
    fetchHistoryHandler(e, historyElement)
  );
  document.addEventListener("FETCH_HISTORY", (e) =>
    fetchHistoryHandler(e, historyElement)
  );
};

export { appendChangesToHistory };
