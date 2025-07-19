import { getSearchResultsElement, onFormSubmit } from "./dom-query";
import {
  spawnButton,
  spawnFormWrapper,
  spawnInput,
  spawnSpan,
} from "./dom-spawn";
import { parseNumberFromHash } from "./hash.utils";

const mainSearch = () => {
  const searchResultDiv = getSearchResultsElement();
  if (!searchResultDiv) {
    return;
  }
  const defaulInputValue = parseNumberFromHash(location.hash);
  const input = spawnInput(defaulInputValue);
  const button = spawnButton();
  const span = spawnSpan();
  const divWrapper = spawnFormWrapper(onFormSubmit, span, input, button);
  searchResultDiv.insertBefore(divWrapper, searchResultDiv.firstChild);
};

export { mainSearch };
