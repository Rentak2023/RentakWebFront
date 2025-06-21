import { type Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { createSerializer, type SearchParams } from "nuqs/server";
import { Suspense } from "react";

import Properties from "@/components/units/properties/properties";
import SearchForm from "@/components/units/search-form/search-form";
import { orpcClient } from "@/lib/orpc";
import { generateAlternatesLinks } from "@/lib/utils";
import {
  propertiesQueryCache,
  propertiesQueryParsers,
} from "@/services/properties";

const serialize = createSerializer(propertiesQueryParsers);

export async function generateMetadata(
  props: Readonly<{
    searchParams: Promise<SearchParams>;
  }>,
): Promise<Metadata> {
  const locale = await getLocale();
  const searchParams = await props.searchParams;
  const t = await getTranslations("units.meta");

  const parsedParams = propertiesQueryCache.parse(searchParams);

  const properties = await orpcClient.units.list({
    ...parsedParams,
    lang: locale,
  });
  const totalPages = Math.ceil(properties.total_count / 10);

  return {
    title: t("title"),
    description: t("description"),
    alternates: generateAlternatesLinks(`/units${serialize(parsedParams)}`),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/units${serialize(parsedParams)}`,
      type: "website",
    },
    pagination: {
      next:
        parsedParams.page < totalPages
          ? `/units${serialize({ ...parsedParams, page: parsedParams.page + 1 })}`
          : null,
      previous:
        parsedParams.page > 1
          ? `/units${serialize({ ...parsedParams, page: parsedParams.page - 1 })}`
          : null,
    },
  };
}

export default function UnitsPage(
  props: Readonly<{
    searchParams: Promise<SearchParams>;
  }>,
) {
  return (
    <main>
      <div className="flex flex-col lg:flex-row">
        <Suspense>
          <SearchForm />
        </Suspense>
        <Properties />
      </div>
    </main>
  );
}
