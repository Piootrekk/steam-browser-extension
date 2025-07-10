import { describe, expect, it } from "vitest";
import { sanitizeItemToMsg, testExport } from "./fetch.utils";
import { emptyMockData, mockResponse } from "./fetch.utils.mock";
import { computedStyle } from "happy-dom/lib/PropertySymbol.js";

const {
  getAppIds,
  getFirstVersions,
  getItemsFromItemIds,
  getHoverDetails,
  getMappedItems,
} = testExport;

describe("getAppIds", () => {
  it("should return list of key strings ", () => {
    const values = {
      "730": "sss",
      "440": null,
      "252490": [],
    };
    const resp = getAppIds(values);
    expect(resp.sort()).toEqual(["730", "440", "252490"].sort());
  });
});

describe("getFirstVersions", () => {
  it("should return first version from 730 gameid as string from mockdata", () => {
    const resp = getFirstVersions(mockResponse.assets["730"]);
    expect(resp).toBe("2");
  });
  it("should return first version from 440 gameid as string  from mockdata", () => {
    const resp = getFirstVersions(mockResponse.assets["440"]);
    expect(resp).toBe("2");
  });
  it("should return first version from 252490 gameid as string  from mockdata", () => {
    const resp = getFirstVersions(mockResponse.assets["252490"]);
    expect(resp).toBe("2");
  });
  it("should return error from invalid object without version", () => {
    const invalidValue = {
      "1337": {},
    };
    expect(() => getFirstVersions(invalidValue["1337"])).toThrow(
      "No versions found in asset"
    );
  });
  it("should return first version from 440 gameid from mock as string", () => {
    const testValue = {
      "322330": {
        "1": {},
      },
    };
    const resp = getFirstVersions(testValue["322330"]);
    expect(resp).toBe("1");
  });
});

describe("getItemsFromItemIds", () => {
  it("should return array of objects from 730 gameid", () => {
    const resp = getItemsFromItemIds(mockResponse.assets["730"]["2"]);
    expect(Array.isArray(resp)).toBe(true);
    expect(resp.every((item) => "market_hash_name" in item)).toBe(true);
    expect(resp.every((item) => "id" in item)).toBe(true);
    expect(resp[0].id).toBe("44796526383");
  });
});

describe("getHoverDetails", () => {
  it("should return itemNameRow, gameId, itemId using regex", () => {
    const test =
      "CreateItemHoverFromContainer( g_rgAssets, 'history_row_635686093416260017_635686093416260018_image', 440, '2', '15579209217', 0 );";
    const result = getHoverDetails(test);
    expect(result).toEqual([
      {
        itemNameRow: "history_row_635686093416260017_635686093416260018",
        gameId: "440",
        itemId: "15579209217",
      },
    ]);
  });
  it("should return empty array using regex", () => {
    const test =
      "CreateItemHoverFromContainer( g_rgAssets, 'hi6260017093416260018_ie', 440, );";
    const result = getHoverDetails(test);
    expect(result).toEqual([]);
  });
  it("should return array with 3 lenght from mockdata using regex", () => {
    const result = getHoverDetails(mockResponse.hovers);
    expect(result.length).toEqual(3);
    expect(result.map((el) => el.gameId).sort()).toEqual(
      ["440", "730", "252490"].sort()
    );
  });
});

describe("getMappedItems", () => {
  it("should merge item props from itemData and itemNameRow from hoverItems", () => {
    const hoverMockData = [
      {
        itemNameRow: "history_row_662707691145375790_662707691145375791",
        gameId: "730",
        itemId: "44796526383",
      },
    ];
    const resp = getMappedItems(
      [mockResponse.assets[730][2][44796526383]],
      hoverMockData
    );
    expect(resp).toEqual([
      {
        hashName: "StatTrak™ M4A4 | Etch Lord (Battle-Scarred)",
        id: "44796526383",
        appid: 730,
        itemNameRow: "history_row_662707691145375790_662707691145375791",
      },
    ]);
  });
  it("should throw error from invalid hover data itemNameRow as undefined", () => {
    const hoverMockData = [
      {
        itemNameRow: "history_row_3333_662707691145375791",
        gameId: "730",
        itemId: "447965444",
      },
    ];
    expect(() =>
      getMappedItems([mockResponse.assets[730][2][44796526383]], hoverMockData)
    ).toThrowError("itemNameRow is undefined, invalid items mapping");
  });
});

describe("sanitizeItemToMsg", () => {
  it("should return trimmed Array of MessageResponse from RawResponse ", () => {
    const resp = sanitizeItemToMsg(mockResponse);
    expect(Array.isArray(resp)).toBe(true);
    expect(resp.every((item) => "hashName" in item)).toBe(true);
    expect(resp.every((item) => "id" in item)).toBe(true);
    expect(resp.every((item) => "appid" in item)).toBe(true);
    expect(resp.every((item) => "itemNameRow" in item)).toBe(true);
  });
  it("should return empty array if empty asstes in RawResponse ", () => {
    const resp = sanitizeItemToMsg(emptyMockData);
    expect(resp).toEqual([]);
  });
});
