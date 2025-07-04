// ActListPageSize

import { appendHistoryListener } from "./history/history";
import { appendListingsListener } from "./listings/listings";
import "./style.css";
import "@/styles/button.css";

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  async main() {
    const myListings = document.querySelector<HTMLElement>("#myListings");
    if (!myListings) return;

    const getTabContents = () => ({
      listings: myListings.querySelector<HTMLElement>("#tabContentsMyListings"),
      history: myListings.querySelector<HTMLElement>(
        "#tabContentsMyMarketHistory"
      ),
    });
    const initValus = getTabContents();
    await appendHistoryListener(initValus.history);
    if (initValus.listings) appendListingsListener(initValus.listings);
  },
  cssInjectionMode: "manifest",
});
