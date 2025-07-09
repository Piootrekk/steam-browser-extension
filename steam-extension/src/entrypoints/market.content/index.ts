// ActListPageSize

import { appendHistoryListener } from "./history/history";
import { appendListingsListener } from "./listings/listings";
import "./style.css";
import "@/styles/button.css";

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  async main() {
    const allListingsContainer =
      document.querySelector<HTMLElement>("#myListings");
    if (!allListingsContainer) return;

    const getTabContents = () => ({
      listings: allListingsContainer.querySelector<HTMLElement>(
        "#tabContentsMyListings"
      ),
      history: allListingsContainer.querySelector<HTMLElement>(
        "#tabContentsMyMarketHistory"
      ),
    });
    const initValus = getTabContents();
    await appendHistoryListener(initValus.history);
    if (initValus.listings) appendListingsListener(initValus.listings);
  },
  cssInjectionMode: "manifest",
});
