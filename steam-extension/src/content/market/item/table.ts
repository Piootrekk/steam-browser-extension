import { ItemValue } from "./intercept.types";

const spawnHeaderRow = (textContent: string) => {
  const thElement = document.createElement("th");
  thElement.textContent = textContent;
  thElement.style.alignContent = "right";
  return thElement;
};

const spawnRow = (textContent: string | number, isHighlighted?: boolean) => {
  const tdElement = document.createElement("td");
  tdElement.textContent = textContent.toString();
  tdElement.style.alignContent = "right";
  if (isHighlighted) tdElement.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
  return tdElement;
};

const isHighlighted = (currentPrice: number, highlightedItem?: number[]) => {
  if (highlightedItem === undefined) return false;
  const foundHighlighted = highlightedItem.find(
    (elHighlighted) => elHighlighted === currentPrice
  );
  if (foundHighlighted !== undefined) return true;
  return false;
};

const replaceTableTBody = (
  table: HTMLTableElement,
  data: ItemValue[],
  highlightedItem?: number[]
) => {
  table.querySelector("tbody")?.remove();
  const newTBody = table.createTBody();
  const headerRow = newTBody.insertRow();
  const thPrice = spawnHeaderRow("Price");
  const thQuantity = spawnHeaderRow("Quantity");
  headerRow.append(thPrice, thQuantity);
  data.forEach((value) => {
    const isHighlightedValue = isHighlighted(value.price, highlightedItem);
    const valueRow = newTBody.insertRow();
    const tdPrice = spawnRow(value.price, isHighlightedValue);
    const tdQuantity = spawnRow(value.quantity, isHighlightedValue);
    valueRow.append(tdPrice, tdQuantity);
  });
};

export { replaceTableTBody };
