import { describe, expect, it } from "vitest";
import { RawResponse } from "./intercept.types";
import { testExport } from "./fetch.utils";

const { getAppIds, getFirstVersions, getItemsFromItemIds, getHoverDetails } =
  testExport;

const mockResponse = {
  success: true,
  pagesize: 50,
  total_count: 1337,
  start: 0,
  assets: {
    "252490": {
      "2": {
        "605285877969263754": {
          currency: 0,
          appid: 252490,
          contextid: "2",
          id: "605285877969263754",
          classid: "6852173213",
          instanceid: "0",
          amount: "0",
          status: 4,
          original_amount: "1",
          unowned_id: "605285877969263831",
          unowned_contextid: "2",
          background_color: "42413e",
          icon_url: "image",
          icon_url_large: "image",
          descriptions: [undefined],
          tradable: 1,
          actions: [undefined],
          name: "Redemption L96",
          name_color: "f15840",
          type: "Przedmiot z warsztatu",
          market_name: "Redemption L96",
          market_hash_name: "Redemption L96",
        },
      },
    },
    "730": {
      "2": {
        "44796526383": {
          currency: 0,
          appid: 730,
          contextid: "2",
          id: "44796526383",
          classid: "5721070419",
          instanceid: "188530170",
          amount: "0",
          status: 4,
          original_amount: "1",
          unowned_id: "44796526383",
          unowned_contextid: "2",
          background_color: "",
          icon_url: "image",
          descriptions: [undefined],
          tradable: 1,
          actions: [undefined],
          name: "M4A4 (StatTrak™) | Mistrz grawerunku",
          name_color: "CF6A32",
          type: "Karabin spoza obiegu (StatTrak™)",
          market_name:
            "M4A4 (StatTrak™) | Mistrz grawerunku (po ciężkich walkach)",
          market_hash_name: "StatTrak™ M4A4 | Etch Lord (Battle-Scarred)",
        },
      },
    },
    "440": {
      "2": {
        "15898976375": {
          currency: 0,
          appid: 440,
          contextid: "2",
          id: "15898976375",
          classid: "4585825910",
          instanceid: "11041265",
          amount: "0",
          status: 4,
          original_amount: "1",
          unowned_id: "15898976375",
          unowned_contextid: "2",
          background_color: "3C352E",
          icon_url: "image",
          icon_url_large: "image",
          descriptions: [undefined],
          tradable: 1,
          actions: [undefined],
          name: "Śmiertelne spojrzenie",
          name_color: "7D6D00",
          type: "Maska poziomu 72",
          market_name: "Śmiertelne spojrzenie",
          market_hash_name: "Death Stare",
        },
      },
    },
  },
  results_html: "",
  hovers:
    "\n\t\tCreateItemHoverFromContainer( g_rgAssets, 'history_row_662707691145375790_662707691145375791_image', 730, '2', '44796526383', 0 );\n\t\t\t; \n\t\tCreateItemHoverFromContainer( g_rgAssets, 'history_row_636811993322142368_636811993322142369_image', 252490, '2', '605285877969263754', 0 );\n\t\t\t; \n\t\tCreateItemHoverFromContainer( g_rgAssets, 'history_row_640189418002347330_640189418002347331_image', 440, '2', '15898976375', 0 );\n\t\t\t ",
} satisfies RawResponse;

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
});
