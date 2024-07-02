import { queryOptions } from "@tanstack/react-query";

import { getBanks } from "@/services/banks";

export const banksQuery = queryOptions({
  queryKey: ["banks"],
  queryFn: getBanks,
  staleTime: Infinity,
});
