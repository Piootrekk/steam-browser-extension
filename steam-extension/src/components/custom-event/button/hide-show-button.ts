const spawnHideShowButton = (
  baseText: string,
  baseTextAfter: string,
  qualifiedDataName: `data-${string}`,
  className: string,
  listenerCallBack?: () => void
) => {
  const dataName = qualifiedDataName.toString();
  const button = document.createElement("button");
  button.textContent = baseText;
  button.classList.add(className, "extension-added", "custom-button");
  button.setAttribute(dataName, "false");
  button.addEventListener("click", () => {
    const isHidden = button.getAttribute(dataName) === "true";
    button.setAttribute(dataName, (!isHidden).toString());
    isHidden
      ? (button.textContent = baseTextAfter)
      : (button.textContent = baseText);
    listenerCallBack && listenerCallBack();
  });
  return button;
};

const checkDataAttr = (
  element: HTMLElement,
  qualifiedDataName: `data-${string}`
) => {
  const dataName = qualifiedDataName.toString();
  return element.getAttribute(dataName) === "true";
};

export { spawnHideShowButton, checkDataAttr };
