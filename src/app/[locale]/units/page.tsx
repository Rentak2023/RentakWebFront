import { unstable_setRequestLocale } from "next-intl/server";

import PropertiesPage from "@/components/units/properties";
import SearchForm from "@/components/units/search-form/search-form";
import { citiesQuery, districtsQuery } from "@/queries/location";
import { minMaxPriceQuery } from "@/queries/units";
import { getProperties } from "@/services/properties";

import { makeQueryClient } from "../get-query-client";

type UnitsSearchParams = {
  governoment_id?: number;
  city_id?: number;
  finish_type?: number;
  bathroom_numbers?: number;
  room_numers?: number;
  property_type?: Array<number>;
  keyword?: string;
  price_to?: number;
  price_from?: number;
  page?: number;
};

export default async function UnitsPage({
  params: { locale },
  searchParams,
}: Readonly<{
  params: { locale: string };
  searchParams: UnitsSearchParams;
}>) {
  unstable_setRequestLocale(locale);
  const queryClient = makeQueryClient();

  const properties = await getProperties({
    ...searchParams,
    lang: locale,
    page: searchParams.page ?? 1,
  });

  await queryClient.prefetchQuery(minMaxPriceQuery);
  await queryClient.prefetchQuery(citiesQuery);
  await queryClient.prefetchQuery(districtsQuery(searchParams.governoment_id));

  return (
    <main className="min-h-screen">
      <section className="relative py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <SearchForm />
            <PropertiesPage
              properties={properties.items}
              totalProperties={properties.total_count}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
