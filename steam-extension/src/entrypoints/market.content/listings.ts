const generateHidingButton = (element: Element) => {
  const wrapper = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "<< HIDE >>";
  button.classList.add("hidding-button");
  button.setAttribute("data-hidden", "false");
  button.addEventListener("click", () => {
    const isHidden = button.getAttribute("data-hidden") === "true";
    button.setAttribute("data-hidden", (!isHidden).toString());
    if (!isHidden) {
      if (element instanceof HTMLElement === false) return;
      button.textContent = "<< SHOW >>";
      element.style.display = "none";
    } else if (isHidden) {
      if (element instanceof HTMLElement === false) return;
      button.textContent = "<< HIDE >>";
      element.style.display = "block";
    }
  });
  wrapper.appendChild(button);
  button.style.paddingBottom = "20px";
  button.style.fontSize = "17px";
  return wrapper;
};

const injectHideButtons = (listingsMainContainer: HTMLElement | null) => {
  if (!listingsMainContainer) return;
  listingsMainContainer.style.paddingTop = "30px";
  const activeListings = listingsMainContainer.querySelectorAll(
    ".my_listing_section.market_content_block"
  );
  const hiddingButtons =
    listingsMainContainer.querySelectorAll(".hidding-button");
  if (hiddingButtons.length !== 0) return;
  const childs = Array.from(activeListings);
  childs.forEach((child) => {
    const button = generateHidingButton(child);
    listingsMainContainer.insertBefore(button, child);
  });
};

export { injectHideButtons };
