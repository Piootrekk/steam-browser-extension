import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { testExport } from "./intercept";
const { matchIntercept, interceptDefaultFetch, interceptXMLFetch } = testExport;

describe("matchIntercept", () => {
  it("should return first enpoint if is in current fetched url", () => {
    const url = "https://steamcommunity.com/market/myhistory";
    const watchedEndpoints = ["/market/myhistory", "/market/mylistings"];
    const resp = matchIntercept(url, watchedEndpoints);
    expect(resp).toBe("/market/myhistory");
  });
  it("should return undefiend if watchedEndpoints is empty array", () => {
    const url = "https://steamcommunity.com/market/myhistory";
    const watchedEndpoints: string[] = [];
    const resp = matchIntercept(url, watchedEndpoints);
    expect(resp).toBe(undefined);
  });
  it("should return undefiend if didnt find in watchedEndpoints array", () => {
    const url = "https://steamcommunity.com/market/myhistory";
    const watchedEndpoints: string[] = ["/market/itemordershistogram"];
    const resp = matchIntercept(url, watchedEndpoints);
    expect(resp).toBe(undefined);
  });
});
