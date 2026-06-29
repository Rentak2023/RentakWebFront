"use client";

import { useTranslations } from "next-intl";
import { useQueryStates } from "nuqs";

import { Button } from "@/components/ui/button";
import { propertiesQueryParsers } from "@/services/properties";

function ResetFilters() {
  const t = useTranslations("units");
  const [, setSearchParams] = useQueryStates(propertiesQueryParsers);

  const handleReset = () => {
    setSearchParams({
      keyword: null,
      governoment_id: null,
      city_id: null,
      price_from: null,
      price_to: null,
      finish_type: null,
      property_type: null,
      bathroom_numbers: null,
      room_numers: null,
      page: null,
    });
  };

  return (
    <Button
      variant="secondary"
      onClick={handleReset}
      className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-900 hover:bg-slate-100 focus-visible:outline-1 focus-visible:outline-primary-800 focus-visible:outline-offset-0"
    >
      {t("reset")}
    </Button>
  );
}

export default ResetFilters;
