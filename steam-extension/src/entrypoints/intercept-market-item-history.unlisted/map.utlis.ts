import { RawResponse, SanitizedResponse } from "./intercept.types";

const responseMapper = (resp: RawResponse): SanitizedResponse => {
  const buyOrderGraph: SanitizedResponse["buyOrderGraph"] =
    resp.buy_order_graph.map(([price, quantity, label]) => ({
      price: parseFloat(price),
      quantity: parseInt(quantity),
      label,
    }));
  const sellOrderGraph: SanitizedResponse["sellOrderGraph"] =
    resp.sell_order_graph.map(([price, quantity, label]) => ({
      price: parseFloat(price),
      quantity: parseInt(quantity),
      label,
    }));
  return {
    buyOrderGraph,
    sellOrderGraph,
  };
};

export { responseMapper };
