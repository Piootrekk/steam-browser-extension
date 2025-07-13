import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { testExport } from "./intercept";
import { getMockFetchObject, getMockXHRObject } from "./intercept.mock";

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

describe("interceptDefaultFetch", () => {
  const watchedEndpoints = ["market/myhistory"];
  const mockDataResponse = "fetch response";
  let onIntercept: ReturnType<typeof vi.fn>;
  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    onIntercept = vi.fn();
    originalFetch = window.fetch;
  });

  afterEach(() => {
    window.fetch = originalFetch;
    vi.clearAllMocks();
  });

  it("should call interceptDefaultFetch with response text when URL matches", async () => {
    const url = "https://steamcommunity.com/market/myhistory";

    window.fetch = getMockFetchObject(url, 200, mockDataResponse);
    interceptDefaultFetch({
      onIntercept,
      watchedEndpoints,
    });
    await fetch(url);
    expect(onIntercept).toHaveBeenCalledWith(mockDataResponse);
    expect(onIntercept).toHaveBeenCalledTimes(1);
  });

  it("should override base url", async () => {
    const url = "https://steamcommunity.com/market/myhistory";
    const overriddenUrl = "https://steamcommunity.com/market/overridden";

    const fetchMock = getMockFetchObject(url, 200, mockDataResponse);

    window.fetch = fetchMock;

    interceptDefaultFetch({
      onIntercept,
      overrideUrl: overriddenUrl,
      watchedEndpoints,
    });

    await fetch(url);
    expect(fetchMock).toHaveBeenCalledWith(overriddenUrl);
  });

  it("should not call interceptDefaultFetch with response text when URL matches", async () => {
    const url = "https://steamcommunity.com/market/listings";
    window.fetch = getMockFetchObject(url, 200, mockDataResponse);
    interceptDefaultFetch({
      onIntercept,
      watchedEndpoints,
    });
    await fetch(url);
    expect(onIntercept).not.toHaveBeenCalled();
  });

  it("should not call interceptDefaultFetch if status not 200", async () => {
    const url = "https://steamcommunity.com/market/listings";
    window.fetch = getMockFetchObject(url, 404, mockDataResponse);
    interceptDefaultFetch({
      onIntercept,
      watchedEndpoints,
    });
    await fetch(url);
    expect(onIntercept).not.toHaveBeenCalled();
  });
});

describe("interceptXMLFetch", () => {
  const mockDataResponse = "XHR response";
  const watchedEndpoints = ["market/myhistory"];
  const mockURL = "https://steamcommunity.com/market/myhistory";
  let originalXHR: typeof window.XMLHttpRequest;
  let onIntercept: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    originalXHR = window.XMLHttpRequest;
    onIntercept = vi.fn();
  });

  afterEach(() => {
    window.XMLHttpRequest = originalXHR;
    vi.clearAllMocks();
  });

  it("should intercept matching XHR requests and call interceptXMLFetch", () => {
    window.XMLHttpRequest = getMockXHRObject(mockURL, 200, mockDataResponse);
    interceptXMLFetch({
      onIntercept,
      watchedEndpoints,
    });
    const xhrInstance = new XMLHttpRequest();

    xhrInstance.open("GET", mockURL);
    xhrInstance.send();
    expect(onIntercept).toHaveBeenCalledTimes(1);
    expect(onIntercept).toHaveBeenCalledWith(mockDataResponse);
  });
  it("should not call interceptXMLFetch if status not 200", () => {
    window.XMLHttpRequest = getMockXHRObject(mockURL, 404, mockDataResponse);
    interceptXMLFetch({
      onIntercept,
      watchedEndpoints,
    });
    const xhrInstance = new XMLHttpRequest();

    xhrInstance.open("GET", mockURL);
    xhrInstance.send();
    expect(onIntercept).not.toHaveBeenCalled();
  });
  it("should not call interceptXMLFetch with response text when URL not matches", () => {
    const invalidURL = "https://steamcommunity.com/market/listings";
    window.XMLHttpRequest = getMockXHRObject(invalidURL, 200, mockDataResponse);
    interceptXMLFetch({
      onIntercept,
      watchedEndpoints,
    });
    const xhrInstance = new XMLHttpRequest();

    xhrInstance.open("GET", invalidURL);
    xhrInstance.send();
    expect(onIntercept).not.toHaveBeenCalled();
  });
  it("should override base url", () => {
    const overriddenUrl = "https://steamcommunity.com/market/overridden";
    const mockXHR = getMockXHRObject(mockURL, 200, mockDataResponse);
    window.XMLHttpRequest = mockXHR;
    interceptXMLFetch({
      onIntercept,
      overrideUrl: overriddenUrl,
      watchedEndpoints,
    });

    const xhrInstance = new XMLHttpRequest();
    xhrInstance.open("GET", mockURL);
    xhrInstance.send();
    expect(onIntercept).toHaveBeenCalledWith(mockDataResponse);
  });
});
