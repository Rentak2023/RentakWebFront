import { type Metadata } from "next";
import { type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createSerializer, type SearchParams } from "nuqs/server";
import type { ItemList, WebPage, WithContext } from "schema-dts";

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
  const t = await getTranslations({
    locale,
    namespace: "units.meta",
  });

  const parsedParams = propertiesQueryCache.parse(searchParams);

  const properties = await getProperties({ ...parsedParams, lang: locale });
  const totalPages = Math.ceil(properties.total_count / 10);

  return {
    title: t("title"),
    description: t("description"),
    alternates: generateAlternatesLinks(
      `/units${serialize(searchParams)}`,
      locale,
    ),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/units${serialize(searchParams)}`,
      type: "website",
    },
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

  const { locale } = params;

  setRequestLocale(locale);

  const parsedParams = propertiesQueryCache.parse(searchParams);
  const properties = await getProperties({ ...parsedParams, lang: locale });

  const structuredData: Array<WithContext<WebPage | ItemList>> = [
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
          description: property.property_description,
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
