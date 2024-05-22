import { useTranslations } from "next-intl";

import { Link } from "@/navigation";
import URLS from "@/shared/urls";

const ViewAllUnits = () => {
  const t = useTranslations("home.units");
  return (
    <div className="flex w-full flex-row justify-between">
      <h3 className="text-2xl font-semibold text-[#2F2F2F]">
        {t("recentUnits")}
      </h3>
      <Link
        className="text-base font-semibold text-[#2F2F2F] underline"
        href={URLS.units}
      >
        {t("viewAll")}
      </Link>
    </div>
  );
};

export default ViewAllUnits;
