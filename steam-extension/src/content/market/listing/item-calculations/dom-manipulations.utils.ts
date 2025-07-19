const spawnSumNotificationDiv = (
  notification: string,
  notificationType: "active-listings" | "buyorder",
  priceDiff?: string
) => {
  const divElement = document.createElement("div");
  divElement.classList = `extension-added notification-sum ${notificationType}`;
  divElement.textContent = notification;
  divElement.style.paddingBottom = "20px";
  if (priceDiff) divElement.style.color = priceDiff;
  return divElement;
};

const insertIdentifyClass = (
  listing: HTMLElement,
  idClass: "buyorder" | "activelisting"
) => {
  listing.classList.add(idClass);
};

export { spawnSumNotificationDiv, insertIdentifyClass };
