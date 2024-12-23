import ky from "@/lib/ky";

import { type Unit } from "./types";

type UnitsResponse = {
  message: string;
  data: Array<Unit>;
};

export async function getUnits({ locale }: { locale: string }) {
  const res = await ky
    .get("home/get-home-units", {
      searchParams: {
        lang: locale,
      },
      cache: "force-cache",
      next: {
        revalidate: 30,
      },
    })
    .json<UnitsResponse>();

  return res.data;
}
