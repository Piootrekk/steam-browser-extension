import {
  getExistedListing,
  injectDoubeDataToTable,
  injectSingleDataToTable,
  SingleContainerContentShow,
} from "./dom-query";
import { addCustomEventListenerHistogram } from "./intercept";

const mainItem = () => {
  SingleContainerContentShow();
  getExistedListing();
  addCustomEventListenerHistogram((e) => {
    injectSingleDataToTable(e);
    injectDoubeDataToTable(e);
  });
};

export { mainItem };
