type InterceptEnpoint = {
  message: string;
  endpoint: string;
};

type MessageResponse = {
  appid: number;
  id: string;
  market_hash_name: string;
  row_history: string | undefined;
};

type HoverDetailsRow = {
  historyRow: string;
  gameId: string;
  itemId: string;
};

type RawResponse = {
  success: boolean;
  pagesize: number;
  total_count: number;
  start: number;
  assets: GameId;
  results_html: string;
  hovers: string;
};

type GameId = Record<string, ApiType>;
type ApiType = Record<string, ItemId>;
type ItemId = Record<string, ItemData>;
type ItemData = {
  currency: number;
  appid: number;
  contextid: string;
  id: string;
  classid: string;
  instanceid: string;
  amount: string;
  status: number;
  original_amount: string;
  unowned_id: string;
  unowned_contextid: string;
  background_color: string;
  icon_url: string;
  icon_url_large: string;
  descriptions: unknown[];
  tradable: number;
  actions: unknown[];
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
};

export type {
  InterceptEnpoint,
  RawResponse,
  MessageResponse,
  ApiType,
  ItemId,
  ItemData,
  HoverDetailsRow,
};
