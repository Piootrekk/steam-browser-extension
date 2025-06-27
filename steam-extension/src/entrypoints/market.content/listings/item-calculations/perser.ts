const parseValueToNumber = (price: string | null | undefined): number => {
  if (!price) return 0;
  const cleaned = price
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^\d.,]/g, "")
    .replace(",", ".");
  const parsedPrice = parseFloat(cleaned);
  return isNaN(parsedPrice) ? 0 : parsedPrice;
};

const getCurrencyFromPrice = (price: string | null | undefined) => {
  if (!price) return "";
  return price.trim().replace(/^[\d\s,.]+/, "");
};

const getAmountFromName = (itemName: string | null | undefined) => {
  if (!itemName) return null;
  const match = itemName.match(/^(\d+)\s+\S+/);
  return match ? parseInt(match[1], 10) : null;
};

export { parseValueToNumber, getCurrencyFromPrice, getAmountFromName };
