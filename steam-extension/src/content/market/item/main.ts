import {
  injectDoubeDataToTable,
  injectSingleDataToTable,
  singleContainerContentShow,
} from "./dom-query";
import { addCustomEventListenerHistogram } from "./intercept";

const mainItem = () => {
  singleContainerContentShow();
  addCustomEventListenerHistogram((e) => {
    injectSingleDataToTable(e);
    injectDoubeDataToTable(e);
  });
};

export { mainItem };
