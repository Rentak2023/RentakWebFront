import { queryOptions } from "@tanstack/react-query";

import {
  getFinishingTypes,
  getMinMaxPrice,
  getProperties,
  getPropertyTypes,
  type PropertiesSearchParams,
} from "@/services/properties";

export const minMaxPriceQuery = queryOptions({
  queryKey: ["min-max-price"],
  queryFn: getMinMaxPrice,
  staleTime: Infinity,
});

export const finishTypesQuery = (locale: string) =>
  queryOptions({
    queryKey: ["finish-types", locale],
    queryFn: () => getFinishingTypes(locale),
    staleTime: Infinity,
  });

export const propertyTypesQuery = (locale: string) =>
  queryOptions({
    queryKey: ["property-types", locale],
    queryFn: () => getPropertyTypes(locale),
    staleTime: Infinity,
  });

export const unitsQuery = (searchParams: PropertiesSearchParams) =>
  queryOptions({
    queryKey: ["units", searchParams],
    queryFn: () => getProperties(searchParams),
    staleTime: 1000 * 60 * 60,
  });
