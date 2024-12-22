import { setRequestLocale } from "next-intl/server";
import { type SearchParams } from "nuqs/server";

import Properties from "@/components/units/properties/properties";
import SearchForm from "@/components/units/search-form/search-form";
import { propertiesQueryCache } from "@/services/properties";

export default async function UnitsPage(
  props: Readonly<{
    params: Promise<{ locale: string }>;
    searchParams: Promise<SearchParams>;
  }>,
) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  propertiesQueryCache.parse(searchParams);

  const { locale } = params;

  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <SearchForm />
        <Properties />
      </div>
    </main>
  );
}
