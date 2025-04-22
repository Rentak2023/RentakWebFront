import { type Locale } from "next-intl";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import slugify from "slugify";

import fetcher from "@/lib/fetcher";

export type PropertiesSearchParams = {
  governoment_id?: number | null;
  city_id?: number | null;
  finish_type?: number | null;
  bathroom_numbers?: number | null;
  room_numers?: number | null;
  property_type?: Array<number> | null;
  keyword?: string | null;
  price_to?: number | null;
  price_from?: number | null;
  page?: number | null;
  lang: Locale;
  sort_by?: "newest" | "high-to-low" | "low-to-high" | null;
};

export const propertiesQueryParsers = {
  // Use human-readable variable names throughout your codebase
  keyword: parseAsString,
  governoment_id: parseAsInteger,
  city_id: parseAsInteger,
  price_from: parseAsInteger.withDefault(0),
  price_to: parseAsInteger.withDefault(200_000),
  finish_type: parseAsInteger,
  property_type: parseAsArrayOf(parseAsInteger),
  bathroom_numbers: parseAsInteger,
  room_numers: parseAsInteger,
  page: parseAsInteger.withDefault(1),
  sort_by: parseAsStringEnum(["newest", "high-to-low", "low-to-high"]),
};

export const propertiesQueryCache = createSearchParamsCache(
  propertiesQueryParsers,
);

type AllPropertiesResponse = {
  message: string;
  data: Array<{
    id: number;
    title_ar: string;
    title_en: string;
  }>;
};

export async function getAllProperties() {
  const res = await fetcher
    .get("unit/get-all-listing-units", {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<AllPropertiesResponse>();

  return res.data;
}

function titleToSlug(title: string) {
  const uriSlug = slugify(title, {
    lower: true,
    strict: true,
  });

  return encodeURI(uriSlug);
}

export function getUnitSlug(unit: {
  id: number | string;
  english_name: string;
}) {
  return `${titleToSlug(unit.english_name)}-${unit.id}`;
}

export function getIdFromSlug(slug: string) {
  const id = slug.split("-").pop();
  if (!id) {
    throw new Error("Invalid slug");
  }
  return id;
}
