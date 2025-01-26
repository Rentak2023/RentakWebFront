import { queryOptions } from "@tanstack/react-query";
import type { Locale } from "next-intl";

import { getUnitDetails } from "@/services/dashboard";

export const unitContract = (unitId: number, locale: Locale) =>
  queryOptions({
    queryKey: ["dashboard", locale, "unit", unitId],
    queryFn: () => getUnitDetails(unitId, locale),
    staleTime: Infinity,
  });
