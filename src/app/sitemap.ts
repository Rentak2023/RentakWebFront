import { type MetadataRoute } from "next";

import { getPathname, routing } from "@/i18n/routing";

// Adapt this as necessary
const host = "https://rentakapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Adapt this as necessary
  return [
    // landing pages
    ...getEntries("/"),
    ...getEntries("/landlord"),
    ...getEntries("/tenant"),
    // services
    ...getEntries("/contract"),
    ...getEntries("/maintenance-payment"),
    ...getEntries("/rent-payment"),
    ...getEntries("/rent-collection"),
    // lead forms
    ...getEntries("/brokerage-commission"),
    ...getEntries("/evaluate-property"),
    ...getEntries("/finish-property"),
    ...getEntries("/promote-properties"),
    ...getEntries("/property-valuation"),
    ...getEntries("/rent-management"),
    ...getEntries("/request-property"),
    ...getEntries("/rentak-basic"),
    ...getEntries("/rentak-secure"),
    // units
    ...getEntries("/units"),
  ];
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: {
        ar: getUrl(href, "ar-EG"),
      },
    },
  }));
}

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
