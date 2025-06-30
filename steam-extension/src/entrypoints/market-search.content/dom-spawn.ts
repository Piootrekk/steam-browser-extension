const spawnInput = (defaultValue: number | null) => {
  const input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.defaultValue = defaultValue ? defaultValue.toString() : "1";
  input.id = "search-page";
  input.name = "search-page";
  input.classList.add("extension-added");
  return input;
};

const spawnButton = () => {
  const button = document.createElement("button");
  button.classList.add("extension-added", "pagebtn");
  button.textContent = "Go";
  button.type = "submit";
  return button;
};

const spawnSpan = () => {
  const span = document.createElement("span");
  span.textContent = "Jump to page: ";
  return span;
};

const spawnFormWrapper = (
  onSubmit: (event: SubmitEvent) => void,
  ...elements: HTMLElement[]
) => {
  const form = document.createElement("form");
  form.append(...elements);
  form.onsubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };
  return form;
};

export { spawnButton, spawnSpan, spawnInput, spawnFormWrapper };
