console.log("hello from listings");

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

const injectHideButtons = (listingsMainContainer: HTMLElement) => {
  const activeListings = listingsMainContainer.querySelectorAll(
    ".my_listing_section.market_content_block"
  );

  const childs = Array.from(activeListings);
  childs.forEach((child) => {
    const button = generateHidingButton(child);
    listingsMainContainer.insertBefore(button, child);
  });
};

const startMutationInjection = (listingsMainContainer: HTMLElement) => {
  const observer = new MutationObserver(() => {
    const hiddingButtons = document.querySelectorAll(".hidding-button");
    if (hiddingButtons.length !== 0) return;
    console.log("mutation inject");
    injectHideButtons(listingsMainContainer);
  });
  observer.observe(listingsMainContainer, {
    childList: true,
    subtree: true,
  });
};

const startHybridInjection = () => {
  const listingsMainContainer = document.querySelector<HTMLElement>(
    "#tabContentsMyListings"
  );
  if (!listingsMainContainer) return;
  listingsMainContainer.style.paddingTop = "30px";
  injectHideButtons(listingsMainContainer);
  startMutationInjection(listingsMainContainer);
};

startHybridInjection();
