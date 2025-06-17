import {
  getAllSumsListings,
  getGlobalBalance,
  getSumListings,
} from "./items-calculation";

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

const isHideButtonExist = (listingsMainContainer: HTMLElement): boolean => {
  const hiddingButtons =
    listingsMainContainer.querySelectorAll(".hidding-button");
  return hiddingButtons.length !== 0 ? true : false;
};

const getBuyOrderNotification = (listingsMainContainer: HTMLElement) => {
  const buyOrdersPrice = getSumBuyOrders(listingsMainContainer);
  const globalBalance = getGlobalBalance();
  const diff = globalBalance * 10 - buyOrdersPrice;
  const note = `Orders placed total value: ${buyOrdersPrice.toFixed(2)}, ${
    diff > 0
      ? `can place ${diff.toFixed(2)} more.`
      : `cannot place more, not enought money.`
  }`;
  return spawnSumNotification(note);
};

const spawnSumNotification = (notification: string) => {
  const divElement = document.createElement("div");
  divElement.textContent = notification;
  return divElement;
};

const injectButtonsForContent = (listingsMainContainer: HTMLElement) => {
  listingsMainContainer.style.paddingTop = "30px";
  listingsMainContainer.style.paddingBottom = "0px";
  if (isHideButtonExist(listingsMainContainer)) return;
  const activeListings = listingsMainContainer.querySelectorAll<HTMLElement>(
    ".my_listing_section.market_content_block"
  );

  const activeListingsChilds = Array.from(activeListings);
  activeListingsChilds.forEach((listing) => {
    const button = generateHidingButton(listing);
    listingsMainContainer.insertBefore(button, listing);
  });
};

const appendChangesToListings = (listingsMainContainer: HTMLElement | null) => {
  if (!listingsMainContainer) return;
  injectButtonsForContent(listingsMainContainer);
  getAllSumsListings(listingsMainContainer);
};

export { appendChangesToListings };
