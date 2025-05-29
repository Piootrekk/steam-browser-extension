const generateButton = (textInside: string) => {
  const button = document.createElement("button");
  button.textContent = textInside;
  button.classList.add("custom-button");
  button.setAttribute("data-hidden", "false");
  button.addEventListener("click", () => {
    const isHidden = button.getAttribute("data-hidden") === "true";
    button.setAttribute("data-hidden", (!isHidden).toString());
    button.textContent = isHidden ? "<< hide >>" : "<< unhide >>";
  });
  return button;
};

const buttonAction = () => {};

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

    if (header === null) throw Error("Header not found");
    header.appendChild(generateButton("<< hide >>"));
  });
};

injectButton();
