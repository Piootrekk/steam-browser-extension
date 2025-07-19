import { ItemValue } from "./intercept.types";

const spawnHeaderRow = (textContent: string, align: string) => {
  const thElement = document.createElement("th");
  thElement.textContent = textContent;
  thElement.style.alignContent = align;
  return thElement;
};

const spawnRow = (textContent: string | number, align: string) => {
  const tdElement = document.createElement("td");
  tdElement.textContent = textContent.toString();
  tdElement.style.alignContent = align;
  return tdElement;
};

const replaceTableTBody = (table: HTMLTableElement, data: ItemValue[]) => {
  table.querySelector("tbody")?.remove();
  const newTBody = table.createTBody();
  const headerRow = newTBody.insertRow();
  const thPrice = spawnHeaderRow("Price", "right");
  const thQuantity = spawnHeaderRow("Quantity", "right");
  headerRow.append(thPrice, thQuantity);
  data.forEach((value) => {
    const valueRow = newTBody.insertRow();
    const tdPrice = spawnRow(value.price, "right");
    const tdQuantity = spawnRow(value.quantity, "right");
    valueRow.append(tdPrice, tdQuantity);
  });
};

export { replaceTableTBody };
