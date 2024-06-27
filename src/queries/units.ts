import { queryOptions } from "@tanstack/react-query";

import { getMinMaxPrice } from "@/services/properties";

export const minMaxPriceQuery = queryOptions({
  queryKey: ["min-max-price"],
  queryFn: getMinMaxPrice,
  staleTime: Infinity,
});
