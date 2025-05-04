import { type MetadataRoute } from "next";

import { getPathname, routing } from "@/i18n/routing";
import { orpcClient } from "@/lib/orpc";
import { getAllProperties } from "@/services/properties";
import URLS from "@/shared/urls";

// Adapt this as necessary
const host = "https://rentakapp.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await orpcClient.articles.list("en");
  const properties = await getAllProperties();

  // Adapt this as necessary
  return [
    // landing pages
    ...getEntries("/", "weekly", 1),
    ...getEntries("/landlord", "weekly", 0.8),
    ...getEntries("/tenant", "weekly", 0.8),
    // services
    ...getEntries("/contract", "monthly"),
    ...getEntries("/maintenance-payment", "monthly"),
    ...getEntries("/rent-payment", "monthly"),
    ...getEntries("/rent-collection", "monthly"),
    // lead forms
    ...getEntries("/brokerage-commission", "monthly"),
    ...getEntries("/evaluate-property", "monthly"),
    ...getEntries("/finish-property", "monthly"),
    ...getEntries("/promote-properties", "monthly"),
    ...getEntries("/property-valuation", "monthly"),
    ...getEntries("/rent-management", "monthly"),
    ...getEntries("/request-property", "monthly"),
    ...getEntries("/rentak-basic", "monthly", 0.3),
    ...getEntries("/rentak-secure", "monthly", 0.3),
    // units
    ...getEntries("/units", "daily", 0.8),
    ...properties.flatMap((property) =>
      getEntries(
        URLS.viewUnit({ id: property.id, english_name: property.title_en }),
        "weekly",
        0.5,
      ),
    ),
    // blog
    ...articles.flatMap((article) =>
      getEntries(`/blog/${article.slug}`, "weekly", 0.7),
    ),
  ];
}

type Href = Parameters<typeof getPathname>[0]["href"];

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

function getEntries(
  href: Href,
  changeFrequency: ChangeFrequency = "weekly",
  priority = 0.5,
): Array<MetadataRoute.Sitemap[number]> {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    lastModified: new Date(),
    priority,
    changeFrequency,
    alternates: {
      languages: {
        ar: getUrl(href, "ar"),
      },
    },
  }));
}

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
