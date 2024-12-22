import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

import { type UnitTypeTypes } from "@/components/units/types";
import ky from "@/lib/ky";

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
  lang: string;
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

  const res = await ky
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
export async function getFinishingTypes(locale: string) {
  const res = await ky
    .get("unit/get-all-finish-types", {
      searchParams: {
        lang: locale,
      },
      cache: "force-cache",
    })
    .json<TypesResponse>();

  return res.data;
}

export async function getPropertyTypes(locale: string) {
  const res = await ky
    .get("unit/get-all-property-types", {
      searchParams: {
        lang: locale,
      },
      cache: "force-cache",
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
  const res = await ky
    .get("unit/get-min-max-price", {
      cache: "force-cache",
    })
    .json<MinMaxPriceResponse>();

  return res.data;
}

// Single Property
type PropertyResponse = {
  message: string;
  data: TUnit;
};
export async function getProperty(propertyId: string, locale: string) {
  const res = await ky
    .get("unit/get-unit-details", {
      searchParams: {
        id: propertyId,
        lang: locale,
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<PropertyResponse>();

  return res.data;
}
