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

const createShowAllOrders = () => {
  const div = document.createElement("div");
  div.textContent = "Show All";
  div.style.textAlign = "center";
  return div;
};

const DoubleContainerContentBuilder = () => {
  const ordersContainer = getDoubleOrdersContainer();
  if (ordersContainer.length === 0) return;
  ordersContainer.forEach((container) => {
    const spanElement = createShowAllOrders();
    container.appendChild(spanElement);
  });
};

const SingleContainerContentBuilder = () => {
  const buyOrderContainer = getSingleBuyOrderContaier();
  if (!buyOrderContainer) return;
  const detailShowElement = buyOrderContainer.querySelector<HTMLDivElement>(
    "div#market_buyorder_info_show_details"
  );
  console.log(detailShowElement);
  if (detailShowElement) detailShowElement.style.display = "none";
  const detailElement = buyOrderContainer.querySelector<HTMLDivElement>(
    "div#market_buyorder_info_details"
  );
  if (detailElement) {
    detailElement.style.display = "block";
    const spanElement = createShowAllOrders();
    const tableElement = detailElement.querySelector<HTMLElement>(
      "div#market_buyorder_info_details_tablecontainer"
    );
    tableElement?.appendChild(spanElement);
  }
};

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/listings*"],
  runAt: "document_idle",
  main() {
    DoubleContainerContentBuilder();
    SingleContainerContentBuilder();
  },
});
