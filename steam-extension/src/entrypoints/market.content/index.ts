import { mainListings } from "@/content/market/listing/main";
import "./style.css";
import "@/styles/button.css";
import { mainHistory } from "@/content/market/history/main";

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  runAt: "document_idle",
  main() {
    mainListings();
    mainHistory();
  },
  cssInjectionMode: "manifest",
});
