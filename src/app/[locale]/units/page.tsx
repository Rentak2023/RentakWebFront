import { unstable_setRequestLocale } from "next-intl/server";

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

export default async function UnitsPage({
  params: { locale },
  searchParams,
}: Readonly<{
  params: { locale: string };
  searchParams: Exclude<PropertiesSearchParams, "lang">;
}>) {
  unstable_setRequestLocale(locale);
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery(minMaxPriceQuery);
  await queryClient.prefetchQuery(citiesQuery);
  await queryClient.prefetchQuery(finishTypesQuery(locale));
  await queryClient.prefetchQuery(propertyTypesQuery(locale));

  await queryClient.prefetchQuery(
    unitsQuery({
      ...searchParams,
      lang: locale,
      page: searchParams.page ?? 1,
    }),
  );

  if (searchParams.governoment_id) {
    await queryClient.prefetchQuery(
      districtsQuery(searchParams.governoment_id),
    );
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
