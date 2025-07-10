import type {
  ApiType,
  HoverDetailsRow,
  ItemData,
  ItemId,
  MessageResponse,
  RawResponse,
} from "./intercept.types";

const getAppIds = (record: Record<`${number}`, unknown>): string[] => {
  return Object.keys(record);
};

const getFirstVersions = (asset: ApiType): string => {
  const versions = Object.keys(asset);
  if (versions.length === 0) {
    throw new Error("No versions found in asset");
  }
  return versions[0];
};

const getItemsFromItemIds = (itemId: ItemId): ItemData[] => {
  const itemIdKeys = Object.keys(itemId);
  const items = itemIdKeys.map((id) => itemId[id]);
  return items;
};

const getHoverDetails = (hover: string): HoverDetailsRow[] => {
  const regex =
    /CreateItemHoverFromContainer\(\s*g_rgAssets,\s*'(history_row_\d+_\d+_image)',\s*(\d+),\s*'2',\s*'(\d+)',\s*0\s*\);/g;

  const matches = [...hover.matchAll(regex)];
  const mapValues = matches.map(([, historyRow, gameId, itemId]) => ({
    itemNameRow: historyRow.replace("_image", ""),
    gameId,
    itemId,
  }));
  return mapValues;
};

const getMappedItems = (
  items: ItemData[],
  ids: HoverDetailsRow[]
): MessageResponse[] => {
  const mappedItems = items.map((item) => {
    const itemObj = {
      hashName: item.market_hash_name,
      id: item.id,
      appid: item.appid,
      itemNameRow: ids.find((id) => id.itemId === item.id)?.itemNameRow,
    } satisfies MessageResponse;
    if (itemObj.itemNameRow === undefined)
      throw new Error("itemNameRow is undefined, invalid items mapping");
    return itemObj;
  });
  return mappedItems;
};

const sanitizeItemToMsg = (rawResponse: RawResponse): MessageResponse[] => {
  const appIds = getAppIds(rawResponse.assets);
  const items = appIds.flatMap((appid) => {
    const appidValue = rawResponse.assets[appid];
    const version = getFirstVersions(appidValue);
    const itemIdObj = rawResponse.assets[appid][version];
    return getItemsFromItemIds(itemIdObj);
  });
  const ids = getHoverDetails(rawResponse.hovers);
  const mappedItems = getMappedItems(items, ids);
  return mappedItems;
};

const testExport = {
  getAppIds,
  getFirstVersions,
  getItemsFromItemIds,
  getHoverDetails,
  getMappedItems,
  sanitizeItemToMsg,
};

export { sanitizeItemToMsg, testExport };
