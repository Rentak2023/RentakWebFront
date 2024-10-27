import { setRequestLocale } from "next-intl/server";

import Properties from "@/components/units/properties/properties";
import SearchForm from "@/components/units/search-form/search-form";
import { citiesQuery, districtsQuery } from "@/queries/location";
import {
  finishTypesQuery,
  minMaxPriceQuery,
  propertyTypesQuery,
  unitsQuery,
} from "@/queries/units";
import { type PropertiesSearchParams } from "@/services/properties";

import { makeQueryClient } from "../get-query-client";

export default async function UnitsPage(
  props: Readonly<{
    params: Promise<{ locale: string }>;
    searchParams: Promise<Exclude<PropertiesSearchParams, "lang">>;
  }>,
) {
  const searchParams = await props.searchParams;
  const params = await props.params;

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
      page: searchParams.page ?? 1,
    }),
  );

  if (searchParams.governoment_id) {
    queryClient.prefetchQuery(districtsQuery(searchParams.governoment_id));
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
