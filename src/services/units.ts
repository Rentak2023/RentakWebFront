import ky from "@rentak/fetcher";
import { type Locale } from "next-intl";

import { type Unit } from "./types";

type UnitsResponse = {
  message: string;
  data: Array<Unit>;
};

export async function getUnits({ locale }: { locale: Locale }) {
  const res = await ky
    .get("home/get-home-units", {
      searchParams: {
        lang: locale === "en" ? "en" : "ar",
      },
      cache: "force-cache",
      next: {
        revalidate: 30,
      },
    })
    .json<UnitsResponse>();

  return res.data;
}
