import { useTranslations } from "next-intl";

import { type Unit } from "@/services/units";

import SectionTitle from "../components/section-title";
import UnitsSlider from "./units-slider";
import ViewAllUnits from "./view-all-units";

type UnitsProps = {
  units: Array<Unit>;
};

function Units({ units }: UnitsProps) {
  const t = useTranslations("home.units");

  return (
    <div className="pt-24 sm:pt-32">
      <div className="container mx-auto px-6 md:px-8 lg:max-w-7xl">
        <SectionTitle text={t("discoverOurRentalUnits")} />
        <div className="mt-8">
          <ViewAllUnits />
        </div>
        <div className="mt-8">
          <UnitsSlider units={units} />
        </div>
      </div>
    </div>
  );
}

export default Units;
