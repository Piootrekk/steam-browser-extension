import { MessageResponse } from "../intercept.unlisted/intercept.types";

const searchUrls = {
  relative: "https://steamcommunity.com/market/listings/",
  search: "https://steamcommunity.com/market/search?",
};

const setUrlToItem = (itemLink: string, anchorDOMElement: HTMLElement) => {
  const linkElement = document.createElement("a");
  linkElement.target = "_blank";
  linkElement.href = itemLink;
  const text = anchorDOMElement.textContent || "";
  linkElement.text = text;
  anchorDOMElement.textContent = "";
  anchorDOMElement.appendChild(linkElement);
};

const fetchHistoryHandler = (e: Event, historyElement: HTMLElement) => {
  const customEvent = e as CustomEvent<MessageResponse[]>;
  customEvent.detail.forEach((det) => {
    const url = `${searchUrls.relative}/${det.appid}/${det.market_hash_name}`;
    const spanElement = historyElement.querySelector<HTMLElement>(
      `#${det.row_history}`
    );
    if (!spanElement) return;
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
