import { getTranslations } from "next-intl/server";

import { Link } from "@/navigation";
import URLS from "@/shared/urls";

async function ViewAllUnits() {
  const t = await getTranslations("home.units");
  return (
    <div className="flex w-full flex-row justify-between">
      <h3 className="text-2xl font-semibold text-slate-700">
        {t("recentUnits")}
      </h3>
      <Link
        className="text-base font-semibold text-slate-700 underline"
        href={URLS.units}
      >
        {t("viewAll")}
      </Link>
    </div>
  );
}

export default ViewAllUnits;
