const gameMap = new Map([
  ["Team Fortress 2", 440],
  ["Counter-Strike 2", 300],
  ["Rust", 200],
  ["Dota 2", 570],
  ["Don't Starve Together", 322330],
  ["Unturned", 304930],
  ["Banana", 2923300],
  ["Bongo Cat", 3419430],
]);

const searchUrls = {
  relative: "https://steamcommunity.com/market/listings/",
  search: "https://steamcommunity.com/market/search?",
};

const setUrlToItem = (
  itemLink: string,
  anchorDOMElement: HTMLElement,
  childDOMElements: HTMLElement[]
) => {
  const linkElement = document.createElement("a");
  linkElement.target = "_blank";
  linkElement.href = itemLink;
  linkElement.rel;
  childDOMElements.forEach((childElement) => {
    linkElement.appendChild(childElement);
  });
  anchorDOMElement.appendChild(linkElement);
};

const setupLink = (itemName: string, game: string) => {
  const gameId = gameMap.get("game");
  const itemLink = gameId
    ? `${searchUrls.relative}${gameId}/${itemName}`
    : `${searchUrls.search}q=${itemName}`;
  return itemLink;
};

const appendChangesToHistory = async (historyElement: HTMLElement | null) => {
  if (!historyElement) return;
  const observer = new MutationObserver(async () => {
    const tableContent = historyElement.querySelector(
      "#tabContentsMyMarketHistoryRows"
    );
    if (!tableContent) {
      console.log("tableContainer not landed sad");
      return;
    }
    const itemsListings = tableContent.querySelectorAll(
      ".market_listing_row.market_recent_listing_row"
    );
    itemsListings.forEach(async (item) => {
      const itemName = item.querySelector<HTMLSpanElement>(
        ".market_listing_item_name.economy_item_hoverable"
      );
      const gameName = item.querySelector<HTMLSpanElement>(
        ".market_listing_game_name"
      );
    });
  });

  observer.observe(historyElement, {
    childList: true,
    subtree: true,
  });
};

export { appendChangesToHistory };
