import { onChangeHash } from "./hash.utils";

const getSearchResultsElement = () => {
  const searchDiv = document.querySelector<HTMLElement>(
    "div#searchResults_ctn"
  );
  return searchDiv;
};

const onFormSubmit = (e: SubmitEvent) => {
  const target = e.target;
  if (!(target instanceof HTMLFormElement)) return;
  const formData = new FormData(target);
  const searchPage = formData.get("search-page");
  if (!searchPage) return;
  const parsedPageToNumber = Number(searchPage.toString());
  onChangeHash(parsedPageToNumber);
};

export { getSearchResultsElement, onFormSubmit };
