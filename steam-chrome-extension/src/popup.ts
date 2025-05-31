const generatehidingButton = (element: Element) => {
  const wrapper = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "<< HIDE >>";
  button.classList.add("custom-button");
  button.setAttribute("data-hidden", "false");
  button.addEventListener("click", () => {
    const isHidden = button.getAttribute("data-hidden") === "true";
    button.setAttribute("data-hidden", (!isHidden).toString());
    if (!isHidden) {
      if (element instanceof HTMLElement === false) return;
      button.textContent = "<< UNHIDE >>";
      element.style.display = "none";
    } else if (isHidden) {
      if (element instanceof HTMLElement === false) return;
      button.textContent = "<< HIDE >>";
      element.style.display = "block";
    }
  });
  wrapper.appendChild(button);
  return wrapper;
};

const injectHideButtons = () => {
  const listingsMainContainer = document.querySelector<HTMLElement>(
    "#tabContentsMyListings"
  );
  if (!listingsMainContainer) throw new Error("Main container not exist");
  listingsMainContainer.style.paddingTop = "30px";
  const childs = Array.from(listingsMainContainer.children);
  childs.forEach((child) => {
    const button = generatehidingButton(child);
    listingsMainContainer.insertBefore(button, child);
  });
};

injectHideButtons();
