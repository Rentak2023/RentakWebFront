import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import SectionTitle from "../components/section-title";
import UnitsSkeleton from "./units-skeleton";
import UnitsSlider from "./units-slider";
import ViewAllUnits from "./view-all-units";

async function Units() {
  const t = await getTranslations("home.units");

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container mx-auto px-6 md:px-8 lg:max-w-7xl">
        <SectionTitle text={t("discoverOurRentalUnits")} />
        <div className="mt-12">
          <ViewAllUnits />
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
