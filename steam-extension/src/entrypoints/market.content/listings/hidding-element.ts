import {
  checkDataAttr,
  spawnHideShowButton,
} from "@/components/custom-event/button/hide-show-button";

const adjustBaseStylesButton = (button: HTMLButtonElement) => {
  button.style.fontSize = "17px";
  button.style.fontWeight = "bold";
  button.style.display = "block";
};

const adjustButtonToCurrentData = (
  button: HTMLButtonElement,
  element: HTMLElement
) => {
  const isHidden = checkDataAttr(button, "data-hidden");
  if (isHidden) {
    element.style.display = "none";
    button.style.paddingBottom = "0px";
    button.style.marginBottom = "0px";
  } else if (!isHidden) {
    element.style.display = "block";
    button.style.paddingBottom = "0px";
    button.style.marginBottom = "0px";
  }
};

const isHideButtonExist = (listingsMainContainer: HTMLElement): boolean => {
  const hiddingButtons = listingsMainContainer.querySelectorAll(
    ".extension-added.custom-button"
  );
  return hiddingButtons.length !== 0 ? true : false;
};

const injectHiddingButtons = (listingsMainContainer: HTMLElement) => {
  listingsMainContainer.style.paddingTop = "30px";
  listingsMainContainer.style.paddingBottom = "0px";
  const activeListings = listingsMainContainer.querySelectorAll<HTMLElement>(
    ".my_listing_section.market_content_block"
  );
  activeListings.forEach((listing) => {
    const button = spawnHideShowButton(
      "<< SHOW >>",
      "<< HIDE >>",
      "data-hidden",
      "custom-button",
      () => adjustButtonToCurrentData(button, listing)
    );
    adjustBaseStylesButton(button);
    adjustButtonToCurrentData(button, listing);
    listingsMainContainer.insertBefore(button, listing);
  });
};

export { injectHiddingButtons, isHideButtonExist };
