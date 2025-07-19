import {
  injectDoubeDataToTable,
  injectSingleDataToTable,
  SingleContainerContentShow,
} from "./dom-query";
import { addCustomEventListenerHistogram } from "./intercept";

const mainItem = () => {
  SingleContainerContentShow();
  addCustomEventListenerHistogram((e) => {
    injectSingleDataToTable(e);
    injectDoubeDataToTable(e);
  });
};

export { mainItem };
