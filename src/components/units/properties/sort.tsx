"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Sort = () => {
  const t = useTranslations("units");
  const searchParams = useSearchParams();

  const sortOptions = [
    { label: t("newest"), value: "newest" },
    { label: t("highToLow"), value: "high-to-low" },
    { label: t("lowToHigh"), value: "low-to-high" },
  ];

  const onChange = (value: string | null) => {
    const searchParamsObj = new URLSearchParams(searchParams.toString());
    if (value == null || (value === "" && searchParamsObj.has("sort_by"))) {
      searchParamsObj.delete("sort_by");
    } else if (
      value !== "" &&
      searchParamsObj.get("sort_by") !== value.toString()
    ) {
      searchParamsObj.set("sort_by", value.toString());
    }

    window.history.pushState(null, "", `?${searchParamsObj.toString()}`);
  };

  return (
    <div className="my-7">
      <Select
        onValueChange={onChange}
        value={searchParams.get("sort_by") ?? ""}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("sort")} />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((sort) => (
            <SelectItem key={sort.value} value={sort.value.toString()}>
              {sort.label}
            </SelectItem>
          ))}
          <Button
            className="w-full px-2"
            variant="secondary"
            size="sm"
            onClick={() => {
              onChange(null);
            }}
          >
            {t("clear")}
          </Button>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
