import { getHistoryTab, itemDataSwapper } from "./dom-query.utils";
import { addCustomEventListenerHistory } from "./intercept";

const mainHistory = () => {
  const historyTab = getHistoryTab();
  if (!historyTab) return;
  addCustomEventListenerHistory((e) => {
    itemDataSwapper(e, historyTab);
  });
};

export { mainHistory };
