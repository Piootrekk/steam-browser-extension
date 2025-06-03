import { startHybridInjection } from "./listings";
import "@/styles/style.css";

export default defineContentScript({
  matches: ["https://steamcommunity.com/market/"],
  main() {
    console.log("hello form market listings");
    startHybridInjection();
  },
});
