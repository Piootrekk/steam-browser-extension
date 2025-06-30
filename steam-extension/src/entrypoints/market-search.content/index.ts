import { getSearchResultsElement } from "./dom-query";
import {
  spawnInput,
  spawnButton,
  spawnSpan,
  spawnFormWrapper,
} from "./dom-spawn";
import { onChangeHash, parseNumberFromHash } from "./hash.utils";

const onFormSubmit = (e: SubmitEvent) => {
  const target = e.target;
  if (!(target instanceof HTMLFormElement)) return;
  const formData = new FormData(target);
  const searchPage = formData.get("search-page");
  if (!searchPage) return;
  const parsedPageToNumber = Number(searchPage.toString());
  onChangeHash(parsedPageToNumber);
};

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/search*"],
  runAt: "document_idle",
  async main() {
    const searchResultDiv = getSearchResultsElement();
    if (!searchResultDiv) {
      console.log("XDD");
      return;
    }
    const defaulInputValue = parseNumberFromHash(location.hash);
    const input = spawnInput(defaulInputValue);
    const button = spawnButton();
    const span = spawnSpan();
    const divWrapper = spawnFormWrapper(onFormSubmit, span, input, button);
    searchResultDiv.insertBefore(divWrapper, searchResultDiv.firstChild);
  },
});
