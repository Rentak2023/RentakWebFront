import { HTTPError } from "ky";
import { type Locale } from "next-intl";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import { type UnitTypeTypes } from "@/components/units/types";
import fetcher from "@/lib/fetcher";

import { type PropertiesDataTypes, type Unit as TUnit } from "./types";

type PropertiesResponse = {
  message: string;
  data: PropertiesDataTypes;
};

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

export async function getProperties(params: PropertiesSearchParams) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, item.toString());
      }
    } else if (value) {
      searchParams.append(key, value.toString());
    }
  }

  const res = await fetcher
    .get("unit/get-all-units", {
      searchParams,
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<PropertiesResponse>();

  return res.data;
}

type TypesResponse = {
  message: string;
  data: Array<UnitTypeTypes>;
};
export async function getFinishingTypes(locale: Locale) {
  const res = await fetcher
    .get("unit/get-all-finish-types", {
      searchParams: {
        lang: locale === "en" ? "en" : "ar",
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<TypesResponse>();

  return res.data;
}

export async function getPropertyTypes(locale: Locale) {
  const res = await fetcher
    .get("unit/get-all-property-types", {
      searchParams: {
        lang: locale === "en" ? "en" : "ar",
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<TypesResponse>();

  return res.data;
}

type MinMaxPriceResponse = {
  message: string;
  data: {
    min_price: number;
    max_price: number;
  };
};

export async function getMinMaxPrice() {
  const res = await fetcher
    .get("unit/get-min-max-price", {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<MinMaxPriceResponse>();

  return res.data;
}

// Single Property
type PropertyResponse = {
  message: string;
  data: TUnit | null;
};
export async function getProperty(propertyId: string, locale: Locale) {
  const res = await fetcher
    .get("unit/get-unit-details", {
      searchParams: {
        id: propertyId,
        lang: locale === "en" ? "en" : "ar",
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<PropertyResponse>();

  return res.data;
}

type PropertyInspectionResponse = {
  message: string;
  data: {
    unit: TUnit;
    total_score: string;
    rooms: Array<{
      room_type: string;
      room_score: string;
      inspections: Record<
        string,
        {
          status: string;
        }
      >;
    }>;
  };
};

export async function getPropertyInspectionDetails(propertyId: string) {
  try {
    const res = await fetcher
      .get("unit/get-unit-inspection", {
        searchParams: {
          id: propertyId,
        },
        cache: "force-cache",
        next: {
          revalidate: 60,
        },
      })
      .json<PropertyInspectionResponse>();

    return res.data;
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 400) {
      return null;
    }
    throw error;
  }
}
