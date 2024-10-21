import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { Link } from "@/i18n/routing";
import URLS from "@/shared/urls";

import SectionTitle from "../components/section-title";
import UnitsSkeleton from "./units-skeleton";
import UnitsSlider from "./units-slider";

async function Units() {
  const t = await getTranslations("home.units");

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container mx-auto px-6 md:px-8 lg:max-w-7xl">
        <SectionTitle text={t("title")} />
        <p className="mx-auto mt-4 max-w-xl text-balance text-center text-lg text-slate-600">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex">
          <Link
            className="ms-auto text-base font-semibold text-slate-700 underline"
            href={URLS.units}
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="mt-8">
          <Suspense fallback={<UnitsSkeleton />}>
            <UnitsSlider />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Units;
