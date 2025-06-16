import { getSumActiveOrders, getSumBuyOrders } from "./items-calculation";

const generateHidingButton = (element: HTMLElement) => {
  const divWrapper = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "<< HIDE >>";
  button.classList.add("hidding-button");
  button.setAttribute("data-hidden", "false");
  button.addEventListener("click", () => {
    const isHidden = button.getAttribute("data-hidden") === "true";
    button.setAttribute("data-hidden", (!isHidden).toString());
    if (!isHidden) {
      button.textContent = "<< SHOW >>";
      element.style.display = "none";
      divWrapper.style.paddingBottom = "0px";
      button.style.marginBottom = "0px";
    } else if (isHidden) {
      button.textContent = "<< HIDE >>";
      element.style.display = "block";
      divWrapper.style.paddingBottom = "0px";
      button.style.marginBottom = "0px";
    }
  });
  divWrapper.appendChild(button);
  button.style.fontSize = "17px";
  button.style.fontWeight = "bold";
  return divWrapper;
};

const getMyOrdersSum = () => {
  const note =
    "Total listed price: NaNzł You will receive: 27,56zł (on this page) My buy orders (767)";
};

const getBuyOrderSum = () => {
  const note =
    "Orders placed total value: NaNzł Max allowed by current balance: 0,00zł You can set more orders totaling: NaNzł";
};

const spawnSumNotification = () => {
  const divElement = document.createElement("div");
  divElement.textContent =
    "Total listed price: NaNzł You will receive: 27,56zł (on this page) My buy orders (767";
  return divElement;
};

const injectButtonsForContent = (listingsMainContainer: HTMLElement) => {
  listingsMainContainer.style.paddingTop = "30px";
  listingsMainContainer.style.paddingBottom = "0px";
  const activeListings = listingsMainContainer.querySelectorAll<HTMLElement>(
    ".my_listing_section.market_content_block"
  );
  const hiddingButtons =
    listingsMainContainer.querySelectorAll(".hidding-button");
  if (hiddingButtons.length !== 0) return;
  const childs = Array.from(activeListings);
  childs.forEach((child) => {
    const button = generateHidingButton(child);
    const sumInfo = spawnSumNotification();
    listingsMainContainer.insertBefore(button, child);
    listingsMainContainer.insertBefore(sumInfo, child);
  });
};

const appendChangesToListings = (listingsMainContainer: HTMLElement | null) => {
  if (!listingsMainContainer) return;
  injectButtonsForContent(listingsMainContainer);
  getSumActiveOrders(listingsMainContainer);
  getSumBuyOrders(listingsMainContainer);
};

export { appendChangesToListings };
