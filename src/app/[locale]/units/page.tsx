import { type Metadata } from "next";
import { type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { createSerializer, type SearchParams } from "nuqs/server";

import Properties from "@/components/units/properties/properties";
import SearchForm from "@/components/units/search-form/search-form";
import { generateAlternatesLinks } from "@/lib/utils";
import {
  getProperties,
  propertiesQueryCache,
  propertiesQueryParsers,
} from "@/services/properties";

const serialize = createSerializer(propertiesQueryParsers);

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
    searchParams: Promise<SearchParams>;
  }>,
): Promise<Metadata> {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;

  const parsedParams = propertiesQueryCache.parse(searchParams);

  const properties = await getProperties({ ...parsedParams, lang: locale });
  const totalPages = Math.ceil(properties.total_count / 10);

  return {
    alternates: generateAlternatesLinks(
      `/units${serialize(searchParams)}`,
      locale,
    ),
    pagination: {
      next:
        parsedParams.page < totalPages
          ? `/units${serialize({ ...searchParams, page: parsedParams.page + 1 })}`
          : null,
      previous:
        parsedParams.page > 1
          ? `/units${serialize({ ...searchParams, page: parsedParams.page - 1 })}`
          : null,
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
