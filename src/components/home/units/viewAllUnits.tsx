import Link from "next/link";
import { useTranslations } from "next-intl";

import URLS from "@/shared/urls";

const ViewAllUnits = () => {
  const trans = useTranslations("home");
  return (
    <div className="flex w-full flex-row justify-between">
      <h3 className="text-2xl font-semibold text-[#2F2F2F]">
        {trans("recentUnits")}
      </h3>
      <Link
        className="text-base font-semibold text-[#2F2F2F] underline"
        href={URLS.units}
      >
        {trans("viewAll")}
      </Link>
    </div>
  );
};

export default ViewAllUnits;
