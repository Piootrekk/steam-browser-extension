import { injectHideButtons } from "./listings";
import "@/styles/style.css";

type VisibleElement = "listings" | "history";

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  main() {
    const myListings = document.querySelector<HTMLElement>("#myListings");
    if (!myListings) return;

    let lastVisibleTab: VisibleElement = "listings";

    const getTabContents = () => ({
      listings: myListings.querySelector<HTMLElement>("#tabContentsMyListings"),
      history: myListings.querySelector<HTMLElement>(
        "#tabContentsMyMarketHistory"
      ),
    });

    const mutationExecute = (
      tab: HTMLElement | null,
      visibleTab: VisibleElement,
      action: () => void
    ) => {
      const isVisible = tab && getComputedStyle(tab).display === "block";
      if (isVisible && lastVisibleTab !== visibleTab) {
        action();
        lastVisibleTab = visibleTab;
      }
    };

    const initValus = getTabContents();
    if (initValus.listings) injectHideButtons(initValus.listings);

    const observer = new MutationObserver(() => {
      const { listings, history } = getTabContents();

      mutationExecute(listings, "listings", () => {
        if (listings) injectHideButtons(listings);
      });

      mutationExecute(history, "history", () => {
        console.log("history");
      });
    });

    observer.observe(myListings, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  },
});
