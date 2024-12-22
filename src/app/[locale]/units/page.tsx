import { setRequestLocale } from "next-intl/server";
import { createSearchParamsCache } from "nuqs/server";
import { type SearchParams } from "nuqs/server";

import Properties from "@/components/units/properties/properties";
import SearchForm from "@/components/units/search-form/search-form";
import { citiesQuery, districtsQuery } from "@/queries/location";
import {
  finishTypesQuery,
  minMaxPriceQuery,
  propertyTypesQuery,
  unitsQuery,
} from "@/queries/units";
import { propertiesQueryParsers } from "@/services/properties";

import { makeQueryClient } from "../get-query-client";

const searchParamsCache = createSearchParamsCache(propertiesQueryParsers);

export default async function UnitsPage(
  props: Readonly<{
    params: Promise<{ locale: string }>;
    searchParams: Promise<SearchParams>;
  }>,
) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const parsedParams = searchParamsCache.parse(searchParams);

  const { locale } = params;

  setRequestLocale(locale);
  const queryClient = makeQueryClient();

  queryClient.prefetchQuery(minMaxPriceQuery);
  queryClient.prefetchQuery(citiesQuery);
  queryClient.prefetchQuery(finishTypesQuery(locale));
  queryClient.prefetchQuery(propertyTypesQuery(locale));
  queryClient.prefetchQuery(
    unitsQuery({
      ...searchParams,
      lang: locale,
    }),
  );

  if (searchParams.governoment_id) {
    queryClient.prefetchQuery(districtsQuery(parsedParams.governoment_id));
  }

  return (
    <main className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <SearchForm />
        <Properties />
      </div>
    </main>
  );
}
