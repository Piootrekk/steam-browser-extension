import type {
  ApiType,
  HoverDetailsRow,
  ItemData,
  ItemId,
  MessageResponse,
  RawResponse,
} from "./intercept.types";

const getAppIds = (rawResponse: RawResponse): string[] => {
  return Object.keys(rawResponse.assets);
};

const getFirstVersions = (asset: ApiType): string => {
  const versions = Object.keys(asset);
  return versions[0];
};

const getItemsFromItemsIds = (itemId: ItemId): ItemData[] => {
  const itemIdKeys = Object.keys(itemId);
  const items = itemIdKeys.map((id) => itemId[id]);
  return items;
};

const getHoverDetails = (hover: string): HoverDetailsRow[] => {
  const regex =
    /CreateItemHoverFromContainer\(\s*g_rgAssets,\s*'(history_row_\d+_\d+_image)',\s*(\d+),\s*'2',\s*'(\d+)',\s*0\s*\);/g;

  const matches = [...hover.matchAll(regex)];

  return matches.map(([, historyRow, gameId, itemId]) => ({
    historyRow: historyRow.replace("_image", "_name"),
    gameId,
    itemId,
  }));
};

const getMappedItems = (
  items: ItemData[],
  ids: HoverDetailsRow[]
): MessageResponse[] => {
  const mappedItems = items.map((item) => {
    return {
      market_hash_name: item.market_hash_name,
      id: item.id,
      appid: item.appid,
      row_history: ids.find((id) => id.itemId === item.id)?.historyRow,
    } satisfies MessageResponse;
  });
  return mappedItems;
};

const sanitizeItemToMsg = (rawResponse: RawResponse): MessageResponse[] => {
  const appIds = getAppIds(rawResponse);
  const items = appIds.flatMap((appid) => {
    const appidValue = rawResponse.assets[appid];
    const version = getFirstVersions(appidValue);
    const itemIdObj = rawResponse.assets[appid][version];
    return getItemsFromItemsIds(itemIdObj);
  });
  const ids = getHoverDetails(rawResponse.hovers);
  return getMappedItems(items, ids);
};

export { sanitizeItemToMsg };
