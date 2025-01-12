import { queryOptions, skipToken } from "@tanstack/react-query";
import { type Locale } from "next-intl";

import { getCities, getDistricts } from "@/services/location";

export const citiesQuery = (locale: Locale) =>
  queryOptions({
    queryKey: ["cities", locale],
    queryFn: () => getCities(locale),
    staleTime: Infinity,
    select: (data) =>
      data.map((city) => ({
        label: city.governorate_name,
        value: city.governorate_id,
      })),
  });

export const districtsQuery = (
  governorateId: number | string | null,
  locale: Locale,
) =>
  queryOptions({
    queryKey: ["districts", locale, governorateId],
    queryFn: governorateId
      ? () => getDistricts(governorateId, locale)
      : skipToken,
    staleTime: Infinity,
    select: (data) =>
      data.map((city) => ({
        label: city.city_name,
        value: city.city_id,
      })),
    placeholderData: [],
  });
