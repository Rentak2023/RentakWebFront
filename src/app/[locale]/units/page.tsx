import "@/lib/orpc.server";

import { type Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { createSerializer, type SearchParams } from "nuqs/server";
import type { ItemList, WebPage, WithContext } from "schema-dts";

import Properties from "@/components/units/properties/properties";
import SearchForm from "@/components/units/search-form/search-form";
import { orpc, orpcClient } from "@/lib/orpc";
import { generateAlternatesLinks } from "@/lib/utils";
import {
  propertiesQueryCache,
  propertiesQueryParsers,
} from "@/services/properties";

import { makeQueryClient } from "../get-query-client";

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

export default async function UnitsPage(
  props: Readonly<{
    searchParams: Promise<SearchParams>;
  }>,
) {
  const searchParams = await props.searchParams;
  const locale = await getLocale();

  const parsedParams = propertiesQueryCache.parse(searchParams);

  const queryCLient = makeQueryClient();

  const properties = await queryCLient.fetchQuery(
    orpc.units.list.queryOptions({
      input: {
        ...parsedParams,
        lang: locale,
      },
    }),
  );

  const structuredData: [WithContext<WebPage>, WithContext<ItemList>] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Rental Units Search",
      description: "Search for rental units in your area",
      url: "https://rentak.com/units",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://rentak.com/units?keyword={search_term_string}",
        },
        query: "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: properties.items.map((property, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: property.property_name,
          description: property.property_description ?? undefined,
          url: `https://rentak.com/units/${property.id}`,
          image: property.picture,
          offers: {
            "@type": "Offer",
            price: property.price.toString(),
            priceCurrency: "EGP",
            availability: "InStock",
          },
        },
      })),
      numberOfItems: properties.total_count,
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex flex-col lg:flex-row">
        <SearchForm />
        <Properties />
      </div>
    </main>
  );
}
