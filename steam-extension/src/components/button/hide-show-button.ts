const spawnHideShowButton = (
  baseText: string,
  baseTextAfter: string,
  dataName: `data-${string}`,
  className: string,
  listenerCallBack?: () => void
) => {
  const button = document.createElement("button");
  button.textContent = baseText;
  button.classList.add(className, "extension-added", "custom-button");
  button.setAttribute(dataName, "false");
  button.addEventListener("click", () => {
    const isHidden = checkDataAttr(button, dataName);
    const newState = (!isHidden).toString();
    button.setAttribute(dataName, newState);

    button.textContent = isHidden ? baseText : baseTextAfter;
    listenerCallBack && listenerCallBack();
  });
  return button;
};

const checkDataAttr = (element: HTMLElement, dataName: `data-${string}`) => {
  return element.getAttribute(dataName) === "true";
};

export { spawnHideShowButton, checkDataAttr };
