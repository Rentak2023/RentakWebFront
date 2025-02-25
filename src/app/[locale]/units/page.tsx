import { type Metadata } from "next";
import { type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { type SearchParams } from "nuqs/server";

import Properties from "@/components/units/properties/properties";
import SearchForm from "@/components/units/search-form/search-form";
import { propertiesQueryCache } from "@/services/properties";

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
  }>,
): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    alternates: {
      canonical: "/units",
      languages: {
        en: "/units",
        ar: "/ar/units",
      },
    },
  };
}

export default async function UnitsPage(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
    searchParams: Promise<SearchParams>;
  }>,
) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  propertiesQueryCache.parse(searchParams);

  const { locale } = params;

  setRequestLocale(locale);

  return (
    <main>
      <div className="flex flex-col lg:flex-row">
        <SearchForm />
        <Properties />
      </div>
    </main>
  );
}
