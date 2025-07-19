import { logTungTungSahur } from "@/content/base/funny-log";

export default defineContentScript({
  matches: ["https://steamcommunity.com/"],
  main: logTungTungSahur,
});
