const getSearchResultsElement = () => {
  const searchDiv = document.querySelector<HTMLElement>(
    "div#searchResults_ctn"
  );
  return searchDiv;
};

export { getSearchResultsElement };
