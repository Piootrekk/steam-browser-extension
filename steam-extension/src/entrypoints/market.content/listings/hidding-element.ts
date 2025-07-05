const generateHidingButton = (element: HTMLElement) => {
  const divWrapper = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "<< HIDE >>";
  button.classList = "extension-added custom-button";
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
    const button = generateHidingButton(listing);
    listingsMainContainer.insertBefore(button, listing);
  });
};

export { injectHiddingButtons, isHideButtonExist };
