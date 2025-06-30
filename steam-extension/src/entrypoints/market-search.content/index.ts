const spawnInput = () => {
  const input = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.defaultValue = "0";
  input.id = "search-page";
  input.name = "search-page";
  input.classList.add("extension-added");
  return input;
};

const spawnButton = (onClik: () => Promise<void>) => {
  const button = document.createElement("button");
  button.classList.add("extension-added", "pagebtn");
  button.textContent = "Go";
  button.onclick = onClik;
  return button;
};

const spawnSpan = () => {
  const span = document.createElement("span");
  span.textContent = "Jump to page: ";
  return span;
};

const getSearchResultsElement = () => {
  const searchDiv = document.querySelector<HTMLElement>(
    "div#searchResults_ctn"
  );
  return searchDiv;
};

const spawnDivWrapper = (...elements: HTMLElement[]) => {
  const div = document.createElement("div");
  div.append(...elements);
  return div;
};

const onClickFetch = async () => {
  const baseUrl = new URL("https://steamcommunity.com/market/search/render/");
  const params = new URLSearchParams({
    query: "",
    start: "70",
    count: "10",
    search_descriptions: "0",
    sort_column: "popular",
    sort_dir: "desc",
    appid: "304930",
  });
  baseUrl.search = params.toString();

  const resp = await fetch(baseUrl.href);
  console.log(await resp.json());
  console.log(location.href);
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
    const input = spawnInput();
    const button = spawnButton(onClickFetch);
    const span = spawnSpan();
    const divWrapper = spawnDivWrapper(span, input, button);
    searchResultDiv.insertBefore(divWrapper, searchResultDiv.firstChild);
  },
});
