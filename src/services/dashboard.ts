import ky from "@fetcher";
import { type Locale } from "next-intl";

import { type Unit } from "./types";

type LandlordStats = {
  total_income: number;
  upcoming_payments: number;
};

export async function getLandlordStatistics() {
  const res = await ky
    .get("dashboard/get-landloard-statistics")
    .json<LandlordStats>();

  return res;
}

export type RentedUnit = Unit & {
  next_rent: null | string;
  tenant: null | string;
};

type UnitsRes = Array<RentedUnit>;

export async function getUserUnits(locale: Locale) {
  const res = await ky
    .get("dashboard/get-user-units", {
      searchParams: {
        lang: locale === "en" ? "en" : "ar",
      },
    })
    .json<UnitsRes>();

  return res;
}
