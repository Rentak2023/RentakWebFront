import { type UnitTypeTypes } from "@/components/units/types";
import ky from "@/lib/ky";

import { type PropertiesDataTypes, type Unit as TUnit } from "./types";

type PropertiesResponse = {
  message: string;
  data: PropertiesDataTypes;
};

export type PropertiesSearchParams = {
  governoment_id?: number;
  city_id?: number;
  finish_type?: number;
  bathroom_numbers?: number;
  room_numers?: number;
  property_type?: Array<number>;
  keyword?: string;
  price_to?: number;
  price_from?: number;
  page?: number;
  lang: string;
};

export async function getProperties(params: PropertiesSearchParams) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, item.toString());
      }
    } else {
      searchParams.append(key, value.toString());
    }
  }

  const res = await ky
    .get("unit/get-all-units", {
      searchParams,
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
    .get("unit/get-min-max-price")
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
    })
    .json<PropertyResponse>();

  return res.data;
}
