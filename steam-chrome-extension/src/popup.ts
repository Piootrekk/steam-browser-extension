const hideButton = (list: NodeListOf<Element>) => {
  const button = document.createElement("button");
  button.textContent = "<< hide >>";
  button.classList.add("custom-button");
  button.setAttribute("data-hidden", "false");
  button.addEventListener("click", () => {
    const currentHidden = button.getAttribute("data-hidden") === "true";
    const isHidden = !currentHidden;
    button.setAttribute("data-hidden", isHidden.toString());
    button.textContent = isHidden ? "<< unhide >>" : "<< hide >>";
    buttonAction(isHidden, list);
  });
  return button;
};

const buttonAction = (
  isHidden: boolean,
  listingsItems: NodeListOf<Element>
) => {
  if (isHidden) {
    listingsItems.forEach((listing) => {
      if (listing instanceof HTMLElement === false) return;
      listing.style.display = "none";
    });
  } else {
    listingsItems.forEach((listing) => {
      if (listing instanceof HTMLElement === false) return;
      listing.style.display = "block";
    });
  }
};

const injectButton = (): void => {
  const listingCards = document.querySelectorAll(
    ".market_content_block.my_listing_section.market_home_listing_table"
  );
  if (listingCards.length === 0) return;
  listingCards.forEach((card) => {
    const header = card.querySelector(".my_market_header");
    const listingsItems = card.querySelectorAll(
      ".market_listing_row.market_recent_listing_row"
    );
    if (header === null) return;
    header.appendChild(hideButton(listingsItems));
  });
};

injectButton();
