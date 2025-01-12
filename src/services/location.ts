import { type Locale } from "next-intl";

import { type CityTypes, type DistrictTypes } from "@/components/units/types";
import ky from "@/lib/ky";

type CitiesResponse = {
  message: string;
  data: Array<CityTypes>;
};

export async function getCities(locale: Locale) {
  const res = await ky
    .get("location/get-all-governorates", {
      searchParams: {
        lang: locale === "en" ? "en" : "ar",
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<CitiesResponse>();

  return res.data;
}

type DistrictsResponse = {
  message: string;
  data: Array<DistrictTypes>;
};

export async function getDistricts(
  governorate_id: number | string,
  locale: Locale,
) {
  const res = await ky
    .get("location/get-all-cities", {
      searchParams: {
        governorate_id: governorate_id,
        lang: locale === "en" ? "en" : "ar",
      },
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<DistrictsResponse>();

  return res.data;
}
