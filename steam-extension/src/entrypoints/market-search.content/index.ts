import { mainSearch } from "@/content/market/search/main";

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/search*"],
  runAt: "document_idle",
  main: mainSearch,
});
