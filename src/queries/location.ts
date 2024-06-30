import { queryOptions, skipToken } from "@tanstack/react-query";

import { getCities, getDistricts } from "@/services/location";

export const citiesQuery = queryOptions({
  queryKey: ["cities"],
  queryFn: getCities,
  staleTime: Infinity,
  select: (data) =>
    data.map((city) => ({
      label: city.governorate_name,
      value: city.governorate_id,
    })),
});

export const districtsQuery = (governorateId?: number | string | null) =>
  queryOptions({
    queryKey: ["districts", governorateId],
    queryFn: governorateId ? () => getDistricts(governorateId) : skipToken,
    staleTime: Infinity,
    select: (data) =>
      data.map((city) => ({
        label: city.city_name,
        value: city.city_id,
      })),
    placeholderData: [],
  });
