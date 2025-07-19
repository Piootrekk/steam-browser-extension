import { mainListings } from "@/content/market/listing/main";
import "./style.css";
import "@/styles/button.css";
import { mainHistory } from "@/content/market/history/main";

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  main() {
    mainListings();
    mainHistory();
  },
  cssInjectionMode: "manifest",
});
