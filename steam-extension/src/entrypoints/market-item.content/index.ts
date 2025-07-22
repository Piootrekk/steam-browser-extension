import "@/styles/button.css";
import { mainItem } from "@/content/market/item/main";

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/listings*"],
  runAt: "document_idle",
  main: mainItem,
});
