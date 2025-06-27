import { getCurrencyFromPrice, parseValueToNumber } from "./perser";

const getGlobalBalance = () => {
  const aBalanceElement = document.querySelector<HTMLAnchorElement>(
    "span#marketWalletBalanceAmount"
  );
  if (!aBalanceElement) return null;
  const balance = parseValueToNumber(aBalanceElement?.textContent);
  const currency = getCurrencyFromPrice(aBalanceElement?.textContent);
  return { balance, currency };
};

export { getGlobalBalance };
