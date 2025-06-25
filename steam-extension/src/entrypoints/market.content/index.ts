// ActListPageSize

import { appendHistoryListener } from "./history/history";
import { appendChangesToListings } from "./listings/listings";
import "./style.css";

type VisibleElement = "listings" | "history";

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  async main() {
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
      callback: () => void
    ) => {
      const isVisible = tab && getComputedStyle(tab).display === "block";
      if (isVisible && lastVisibleTab !== visibleTab) {
        callback();
        lastVisibleTab = visibleTab;
      } else {
        console.log("same effected");
      }
    };

    const initValus = getTabContents();
    await appendHistoryListener(initValus.history);
    if (initValus.listings) appendChangesToListings(initValus.listings);

    // const observer = new MutationObserver(() => {
    //   const { listings } = getTabContents();
    //   mutationExecute(listings, "listings", () => {
    //     appendChangesToListings(listings);
    //   });
    // });

    // observer.observe(myListings, {
    //   childList: true,
    //   subtree: true,
    //   attributes: true,
    // });
  },
  cssInjectionMode: "manifest",
});
