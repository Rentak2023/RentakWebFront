import {
  type CityTypes,
  type DistrictTypes,
  type UnitTypeTypes,
} from "@/components/units/types";
import ky from "@/lib/ky";

import { type PropertiesDataTypes, type Unit as TUnit } from "./types";

type PropertiesResponse = {
  message: string;
  data: PropertiesDataTypes;
};

export async function getProperties(params: URLSearchParams) {
  // Convert URLSearchParams to a plain object
  const plainParams = Object.fromEntries(params.entries());

  const res = await ky
    .get("unit/get-all-units", {
      searchParams: plainParams,
    })
    .json<PropertiesResponse>();

  return res.data;
}

type CitiesResponse = {
  message: string;
  data: Array<CityTypes>;
};

export async function getCities() {
  const res = await ky
    .get("location/get-all-governorates")
    .json<CitiesResponse>();

  return res.data;
}

type DistrictsResponse = {
  message: string;
  data: Array<DistrictTypes>;
};

export async function getDistricts(governorate_id: number | string) {
  const res = await ky
    .get("location/get-all-cities", {
      searchParams: {
        governorate_id: governorate_id,
      },
    })
    .json<DistrictsResponse>();

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
