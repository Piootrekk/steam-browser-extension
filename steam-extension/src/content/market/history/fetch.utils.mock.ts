import { RawResponse } from "./intercept.types";

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

const emptyMockData = {
  success: true,
  pagesize: 50,
  total_count: 1337,
  start: 0,
  assets: {},
  results_html: "",
  hovers: "",
} satisfies RawResponse;

export { mockResponse, emptyMockData };
